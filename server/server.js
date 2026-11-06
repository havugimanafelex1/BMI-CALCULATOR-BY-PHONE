import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
const port = Number(process.env.PORT || 5000)
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '20kb' }))

const cleanPhone = value => String(value || '').replace(/[\s()-]/g, '')
const validPhone = value => /^\+[1-9]\d{7,14}$/.test(value)

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'BMI SMS API' }))

async function sendSms(to, body) {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER } = process.env
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER || TWILIO_ACCOUNT_SID.startsWith('ACxxx')) {
    throw new Error('SMS provider is not configured. Fill in the Twilio settings in server/.env.')
  }
  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`
  const form = new URLSearchParams({ To: to, From: TWILIO_FROM_NUMBER, Body: body })
  const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64')
  const response = await fetch(endpoint, { method: 'POST', headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body: form })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || `SMS provider returned ${response.status}`)
  return { sid: data.sid, status: data.status }
}

app.post('/api/sms/bmi-result', async (req, res) => {
  try {
    const { patientName, patientPhone, adminPhone, bmi, category, advice, language, age } = req.body || {}
    const patient = cleanPhone(patientPhone)
    const admin = cleanPhone(adminPhone)
    const value = Number(bmi)
    if (!patientName || !validPhone(patient) || !validPhone(admin) || !Number.isFinite(value) || value < 5 || value > 100 || !category || !advice) {
      return res.status(400).json({ error: 'Please provide a name, valid international phone numbers, and a valid BMI result.' })
    }
    const rw = language !== 'en'
    const message = [
      `BMI Calculator${rw ? ' - Igisubizo cya BMI' : ' - BMI result'}`,
      `${rw ? 'Amazina' : 'Name'}: ${String(patientName).slice(0, 80)}`,
      `BMI: ${value.toFixed(1)}`,
      `${rw ? 'Icyiciro' : 'Category'}: ${category}`,
      advice,
      Number(age) < 20 ? (rw ? 'Icyitonderwa: Ibyiciro byoroshye by’abantu bakuru ntibikoreshwa ku bari munsi y’imyaka 20.' : 'Note: adult BMI categories are not intended for people under 20.') : '',
      rw ? 'BMI si isuzuma ry’indwara.' : 'BMI is not a medical diagnosis.'
    ].filter(Boolean).join('\n')
    const recipients = [...new Set([patient, admin])]
    const deliveries = await Promise.all(recipients.map(async to => ({ to, ...(await sendSms(to, message)) })))
    return res.json({ success: true, sent: deliveries.length, deliveries })
  } catch (error) {
    console.error('BMI SMS error:', error.message)
    return res.status(502).json({ error: 'SMS delivery failed. Check the SMS provider configuration and phone-number permissions.' })
  }
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Unexpected server error.' })
})

app.listen(port, () => console.log(`BMI SMS API running at http://localhost:${port}`))
