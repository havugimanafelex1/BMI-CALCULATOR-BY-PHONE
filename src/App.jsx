import { useEffect, useMemo, useState } from 'react'
import {
  Activity, Search, ArrowDownRight, ArrowUpRight, BarChart3, Calculator, CalendarDays,
  Check, ChevronDown, CircleHelp, Download, HeartPulse, History, House, Languages,
  Menu, RefreshCw, ShieldCheck, UserRound, X, Trash2, Weight, Ruler
} from 'lucide-react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const words = {
  rw: {
    brand: 'BMI Calculator', tagline: 'Menya igipimo cyawe, ubyiteho neza.',
    home: 'Ahabanza', calculator: 'Kubara BMI', dashboard: 'Imbonerahamwe', history: 'Amateka', profile: 'Umwirondoro', adminDashboard: 'Admin Dashboard',
    welcome: 'Murakaza neza!', intro: 'Kubara BMI yawe mu buryo bworoshye kandi bwihuse.',
    heroText: 'Menya aho igipimo cyawe gihagaze, ukurikirane impinduka kandi wite ku buzima bwawe.',
    start: 'Tangira kubara', learn: 'Sobanukirwa na BMI', trusted: 'Byoroshye • Byihuse • Bisobanutse',
    calculatorTitle: 'Kubara BMI yawe', calculatorDesc: 'Andika ibiro n’uburebure bwawe kugira ngo ubone igisubizo.',
    weight: 'Ibiro', height: 'Uburebure', kg: 'kg', cm: 'cm', age: 'Imyaka',
    calculate: 'Bara BMI', profileGateMessage: 'Banza ukore umwirondoro wawe kandi uwubike mbere yo kubara BMI.', clear: 'Siba ibyo wanditse', result: 'Igisubizo cyawe', yourBMI: 'BMI yawe',
    category: 'Icyiciro', explanation: 'Ibisobanuro', healthyRange: 'Urwego rusanzwe rwa BMI ku bantu bakuru ni 18.5 kugeza munsi ya 25.',
    under: 'Ibiro biri munsi y’urwego rusanzwe', normal: 'Ibiro biri mu rwego rusanzwe', over: 'Ibiro birengeje urwego rusanzwe', obese: 'Umubyibuho ukabije',
    adultNote: 'Ibyiciro bigenewe abantu bakuru bafite imyaka 20 kuzamura. BMI si isuzuma ry’indwara.',
    save: 'Bika igisubizo', saved: 'Igisubizo kibitswe', calculateFirst: 'Banza ubare BMI.',
    dashboardTitle: 'Imbonerahamwe yawe', dashboardDesc: 'Reba uko ibipimo byawe byagiye bihinduka.',
    latest: 'BMI iheruka', records: 'Ibipimo wabaze', latestWeight: 'Ibiro biheruka', trend: 'Impinduka za BMI',
    noData: 'Nta bipimo urabika. Banza ubare BMI kugira ngo utangire gukurikirana.',
    historyTitle: 'Amateka ya BMI', date: 'Itariki', bmi: 'BMI', action: 'Igikorwa', export: 'Kuramo CSV', delete: 'Siba amateka',
    confirmDelete: 'Urashaka gusiba amateka yose ya BMI?', emptyHistory: 'Nta mateka ahari.',
    profileTitle: 'Umwirondoro', name: 'Amazina', email: 'Imeyili', phone: 'Numero ya telefone ya Admin', patientName: 'Amazina y’uwo upima', patientPhone: 'Numero ya telefone y’uwo upima', saveProfile: 'Bika umwirondoro',
    profileSaved: 'Umwirondoro wabitswe kuri iyi browser.', profileRequired: 'Banza wuzuze umwirondoro wawe.', invalidEmailProfile: 'Andika imeyili yemewe mbere yo kubika umwirondoro.', profileHint: 'Andika numero ya Admin izajya ihabwa kopi ya SMS. Numero ibikwa kuri browser; SMS ikenera backend na SMS API.', invalidPhone: 'Andika numero ya telefone yemewe, urugero +2507XXXXXXXX.', patientRequired: 'Andika amazina na numero ya telefone by’uwo upima.', smsSending: 'BMI yabazwe. SMS irimo koherezwa...', smsSent: 'SMS yoherejwe kuri numero y’uwo upimye na Admin.', smsFailed: 'BMI yabazwe ariko SMS ntiyoherejwe. Reba backend na SMS API.', goToBmi: 'Jya kuri Kubara BMI',
    guideTitle: 'BMI ni iki?', guideText: 'BMI (Body Mass Index) ni igipimo kigereranya ibiro n’uburebure. Ntigisimbura inama za muganga.',
    guide1: 'Munsi ya 18.5', guide2: '18.5 kugeza munsi ya 25', guide3: '25 kugeza munsi ya 30', guide4: '30 kuzamura',
    guideUnder: 'Ibiro biri munsi y’urwego', guideNormal: 'Urwego rusanzwe', guideOver: 'Ibiro birengeje urwego', guideObese: 'Umubyibuho ukabije',
    how: 'Uko ikoreshwa', step1: 'Andika ibiro byawe muri kg.', step2: 'Andika uburebure muri cm.', step3: 'Kanda “Bara BMI” urebe igisubizo.',
    warning: 'BMI ni igipimo rusange. Ntigisuzuma indwara kandi ntigisimbura muganga.',
    invalidWeight: 'Andika ibiro biri hagati ya 1 na 500 kg.', invalidHeight: 'Andika uburebure buri hagati ya 50 na 300 cm.',
    invalidAge: 'Andika imyaka yawe neza.', under20: 'Iyi mibare y’ibyiciro igenewe abantu bafite imyaka 20 kuzamura. Ku bantu bari munsi yayo, BMI isobanurwa hakoreshejwe imyaka n’igitsina.',
    footer: 'BMI Calculator — Wite ku buzima bwawe.', frontOnly: 'Frontend gusa • Amakuru abikwa kuri iyi browser',
    menu: 'Fungura menu', close: 'Funga', language: 'Ururimi', csvDone: 'Raporo yakuweho.'
  },
  en: {
    brand: 'BMI Calculator', tagline: 'Understand your number. Care for yourself.',
    home: 'Home', calculator: 'BMI Calculator', dashboard: 'Dashboard', history: 'History', profile: 'Profile', adminDashboard: 'Admin Dashboard',
    welcome: 'Welcome!', intro: 'Calculate your BMI easily and quickly.',
    heroText: 'Understand your BMI range, track changes, and take care of your health.',
    start: 'Calculate BMI', learn: 'Learn about BMI', trusted: 'Simple • Fast • Clear',
    calculatorTitle: 'Calculate your BMI', calculatorDesc: 'Enter your weight and height to see your result.',
    weight: 'Weight', height: 'Height', kg: 'kg', cm: 'cm', age: 'Age',
    calculate: 'Calculate BMI', profileGateMessage: 'Please complete and save your profile before calculating BMI.', clear: 'Clear inputs', result: 'Your result', yourBMI: 'Your BMI',
    category: 'Category', explanation: 'Explanation', healthyRange: 'The usual adult BMI range is 18.5 to under 25.',
    under: 'Below the usual weight range', normal: 'Within the usual weight range', over: 'Above the usual weight range', obese: 'Obesity range',
    adultNote: 'Categories are for adults aged 20 and over. BMI is not a diagnosis.',
    save: 'Save result', saved: 'Result saved', calculateFirst: 'Calculate your BMI first.',
    dashboardTitle: 'Your dashboard', dashboardDesc: 'See how your measurements have changed.',
    latest: 'Latest BMI', records: 'Saved measurements', latestWeight: 'Latest weight', trend: 'BMI trend',
    noData: 'No measurements saved yet. Calculate your BMI to start tracking.',
    historyTitle: 'BMI history', date: 'Date', bmi: 'BMI', action: 'Action', export: 'Export CSV', delete: 'Clear history',
    confirmDelete: 'Are you sure you want to delete all BMI history?', emptyHistory: 'No history yet.',
    profileTitle: 'Profile', name: 'Name', email: 'Email', phone: 'Admin phone number', patientName: 'Person’s name', patientPhone: 'Person’s phone number', saveProfile: 'Save profile',
    profileSaved: 'Profile saved in this browser.', profileRequired: 'Please complete your profile first.', invalidEmailProfile: 'Enter a valid email address before saving your profile.', profileHint: 'Enter the Admin number that should receive a copy of each SMS. SMS requires a backend and SMS API.', invalidPhone: 'Enter a valid phone number, for example +2507XXXXXXXX.', patientRequired: 'Enter the name and phone number of the person being measured.', smsSending: 'BMI calculated. Sending SMS...', smsSent: 'SMS sent to the person and Admin.', smsFailed: 'BMI calculated, but SMS was not sent. Check the backend and SMS API.', goToBmi: 'Go to BMI Calculator',
    guideTitle: 'What is BMI?', guideText: 'BMI (Body Mass Index) compares weight with height. It does not replace medical advice.',
    guide1: 'Below 18.5', guide2: '18.5 to under 25', guide3: '25 to under 30', guide4: '30 and above',
    guideUnder: 'Below usual range', guideNormal: 'Usual range', guideOver: 'Above usual range', guideObese: 'Obesity range',
    how: 'How to use it', step1: 'Enter your weight in kg.', step2: 'Enter your height in cm.', step3: 'Select “Calculate BMI” to see your result.',
    warning: 'BMI is a general measure. It does not diagnose illness or replace a clinician.',
    invalidWeight: 'Enter a weight between 1 and 500 kg.', invalidHeight: 'Enter a height between 50 and 300 cm.',
    invalidAge: 'Enter a valid age.', under20: 'These categories are for people aged 20 and over. For younger people, BMI is interpreted using age and sex.',
    footer: 'BMI Calculator — Take care of your health.', frontOnly: 'Frontend only • Data stays in this browser',
    menu: 'Open menu', close: 'Close', language: 'Language', csvDone: 'Report exported.'
  }
}

const getCategory = (bmi, lang) => {
  const t = words[lang]
  if (bmi < 18.5) return { label: t.under, className: 'under' }
  if (bmi < 25) return { label: t.normal, className: 'normal' }
  if (bmi < 30) return { label: t.over, className: 'over' }
  return { label: t.obese, className: 'obese' }
}
const getCategoryAdvice = (bmi, lang) => {
  if (lang === 'rw') {
    if (bmi < 18.5) return 'Ibiro byawe biri munsi y’urwego rusanzwe. Gerageza kurya indyo yuzuye kandi ugishe inama inzobere mu by’imirire.'
    if (bmi < 25) return 'Ni byiza! Ibiro byawe biri mu rugero rusanzwe. Komeza kurya neza no gukora imyitozo ngororamubiri.'
    if (bmi < 30) return 'Ibiro byawe birenze urwego rusanzwe. Gerageza guhitamo indyo yuzuye no gukora imyitozo ngororamubiri.'
    return 'BMI yawe iri hejuru. Ni byiza kugisha inama inzobere mu buzima kugira ngo ubone ubufasha bukwiye.'
  }
  if (bmi < 18.5) return 'Your weight is below the usual range. Eat a balanced diet and consider advice from a nutrition professional.'
  if (bmi < 25) return 'Great! Your BMI is within the usual range. Keep eating well and staying physically active.'
  if (bmi < 30) return 'Your weight is above the usual range. Choose balanced meals and stay physically active.'
  return 'Your BMI is high. Consider speaking with a healthcare professional for appropriate guidance.'
}
const readStore = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

export default function App() {
  const [lang, setLang] = useState(() => readStore('bmi-language', 'rw'))
  const [page, setPage] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [developerOpen, setDeveloperOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [bmiAiOpen, setBmiAiOpen] = useState(false)
  const [bmiAiQuestion, setBmiAiQuestion] = useState('')
  const [bmiAiAnswer, setBmiAiAnswer] = useState('')
  const [developerPhoto, setDeveloperPhoto] = useState(() => readStore('developer-photo', ''))
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [patientName, setPatientName] = useState('')
  const [patientPhone, setPatientPhone] = useState('')
  const [smsStatus, setSmsStatus] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [records, setRecords] = useState(() => readStore('bmi-records', []))
  const [historySearch, setHistorySearch] = useState('')
  const [historySelected, setHistorySelected] = useState(null)
  const [profile, setProfile] = useState(() => readStore('bmi-profile', { name: '', email: '', phone: '' }))
  const [adminAuthenticated, setAdminAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [adminLoginError, setAdminLoginError] = useState('')
  const [profileConfirmed, setProfileConfirmed] = useState(() => {
    const saved = readStore('bmi-profile', { name: '', email: '', phone: '' })
    const confirmed = readStore('bmi-profile-confirmed', null)
    const valid = Boolean(saved?.name?.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(saved?.email?.trim() || '') && /^\+?[0-9]{10,15}$/.test((saved?.phone || '').replace(/[\s()-]/g, '')))
    return valid && (!confirmed || (confirmed.name === saved.name.trim() && confirmed.email === saved.email.trim() && confirmed.phone === (saved.phone || '').replace(/[\s()-]/g, '')))
  })
  const t = words[lang]

  useEffect(() => localStorage.setItem('bmi-language', JSON.stringify(lang)), [lang])
  useEffect(() => localStorage.setItem('bmi-records', JSON.stringify(records)), [records])
  useEffect(() => localStorage.setItem('bmi-profile', JSON.stringify(profile)), [profile])

  const latest = records[0]
  const chartData = useMemo(() => [...records].reverse().map((r) => ({
    date: new Date(r.createdAt).toLocaleDateString(lang === 'rw' ? 'rw-RW' : 'en-US', { month: 'short', day: 'numeric' }),
    bmi: Number(r.bmi.toFixed(1))
  })), [records, lang])

  function calculate(e) {
    e?.preventDefault()
    setError('')
    setNotice('')
    const savedProfile = readStore('bmi-profile-confirmed', null)
    const currentName = profile.name?.trim() || ''
    const currentEmail = profile.email?.trim() || ''
    const currentPhone = (profile.phone || '').replace(/[\s()-]/g, '')
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentEmail)
    const profileWasSaved = Boolean(profileConfirmed && currentName && validEmail && /^\+?[0-9]{10,15}$/.test(currentPhone) && savedProfile &&
      savedProfile.name === currentName && savedProfile.email === currentEmail && savedProfile.phone === currentPhone)
    if (!profileWasSaved) {
      setPage('profile')
      setProfileConfirmed(false)
      setNotice(t.profileGateMessage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const w = Number(weight), h = Number(height), a = Number(age)
    if (!weight || !Number.isFinite(w) || w < 1 || w > 500) return setError(t.invalidWeight)
    if (!height || !Number.isFinite(h) || h < 50 || h > 300) return setError(t.invalidHeight)
    if (!age || !Number.isFinite(a) || a < 1 || a > 120) return setError(t.invalidAge)
    const bmi = w / ((h / 100) ** 2)
    const recipientPhone = patientPhone.replace(/[\s()-]/g, '')
    if (!patientName.trim() || !/^\+?[0-9]{10,15}$/.test(recipientPhone)) return setError(t.patientRequired + ' ' + t.invalidPhone)
    const item = { id: crypto.randomUUID?.() ?? String(Date.now()), name: patientName.trim(), phone: recipientPhone, weight: w, height: h, age: a, bmi, category: getCategory(bmi, lang).className, createdAt: new Date().toISOString() }
    setResult(item)
    setSmsStatus('sending')
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/sms/bmi-result`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientName: item.name, patientPhone: item.phone, adminPhone: currentPhone, bmi: Number(bmi.toFixed(1)), category: getCategory(bmi, lang).label, advice: getCategoryAdvice(bmi, lang), language: lang, age: a })
    }).then(async response => { if (!response.ok) throw new Error('SMS request failed'); return response.json() })
      .then(() => setSmsStatus('sent')).catch(() => setSmsStatus('failed'))
  }
  function saveResult() {
    if (!result) return setNotice(t.calculateFirst)
    setRecords(prev => [result, ...prev.filter(r => r.id !== result.id)])
    setNotice(t.saved)
  }
  function clearForm() { setWeight(''); setHeight(''); setAge(''); setPatientName(''); setPatientPhone(''); setError(''); setNotice(''); setResult(null); setSmsStatus('') }
  function navigate(next) { setPage(next); setMobileOpen(false); setError(''); setNotice('') }
  function exportCSV() {
    if (!records.length) return
    const rows = [['Name','Date','Weight (kg)','Height (cm)','Age','BMI','Category'], ...records.map(r => [r.name || '',new Date(r.createdAt).toLocaleString(),r.weight,r.height,r.age,r.bmi.toFixed(2),getCategory(r.bmi, 'en').label])]
    const csv = rows.map(row => row.map(v => `"${String(v).replaceAll('"','""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a')
    a.href = url; a.download = 'bmi-history.csv'; a.click(); URL.revokeObjectURL(url)
  }
  function requireAdmin() {
    if (!adminAuthenticated) { window.alert('Please you are not admin try again.'); return false }
    return true
  }
  function clearHistory() {
    if (!requireAdmin()) return
    if (window.confirm(t.confirmDelete)) { setRecords([]); setNotice('') }
  }
  function deleteRecord(id) {
    if (!requireAdmin()) return
    if (window.confirm(t.confirmDelete)) setRecords(prev => prev.filter(item => item.id !== id))
  }
  function loginAdmin(e) {
    e.preventDefault()
    // Frontend demonstration credentials. Use server-side authentication for production.
    if (adminPassword === 'Felex@2026') { setAdminAuthenticated(true); setAdminLoginError(''); setAdminPassword('') }
    else setAdminLoginError('Incorrect admin password. Please try again.')
  }

  const navItems = [
    ['home', House, t.home], ['calculator', Calculator, t.calculator],
    ['dashboard', BarChart3, t.dashboard], ['history', History, t.history], ['profile', UserRound, t.profile], ['admin', ShieldCheck, t.adminDashboard]
  ]
  const goCalculate = () => { navigate('calculator'); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return <div className="app-shell developer-layout">
    <aside className="developer-sidebar">
      <div className="developer-sidebar-brand"><strong>◈ BMI Calculator</strong><em>Take care of your health</em></div>
      <button className="sidebar-photo-button" onClick={() => setDeveloperOpen(true)} aria-label="Open developer biography">
        <span className="sidebar-photo">{developerPhoto ? <img src={developerPhoto} alt="Havugimana Felex"/> : <UserRound size={48}/>}</span>
        <span className="sidebar-info-badge"><UserRound size={20}/></span>
      </button>
      <h2 className="sidebar-name">EAV KIVUMU TSS</h2>
      <button className="sidebar-profile-button" onClick={() => setDeveloperOpen(true)}><UserRound size={17}/> Developer Profile</button>
      <p className="sidebar-hint">Kanda ku ifoto cyangwa izina ugahita ureba amateka.</p>
      <section className="sidebar-bio"><h3>AMATEKA Y'EAV KIVUMU TSS</h3><p>EAV Kivumu TSS ni ishuri ry'imyuga n'ubumenyi ngiro riherereye mu Murenge wa Nyange, Akarere ka Ngororero, mu Ntara y'Iburengerazuba.</p><button className="button primary more-details-button" type="button" onClick={() => setHistoryOpen(true)}>MORE DETAILS <ArrowUpRight size={16}/></button></section>
      <div className="sidebar-credit">This System Was Developed By Eav Kivumu Tss Students In L5 Software Development Trade</div>
    </aside>
    <header className="topbar">
      <div className="topbar-inner">
        <button className="brand" onClick={() => navigate('home')} aria-label={t.home}>
          <span className="brand-icon"><HeartPulse size={22}/></span>
          <span><strong>{t.brand}</strong><small>{t.tagline}</small></span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([id, Icon, label]) => <button key={id} className={`nav-link ${page === id ? 'active' : ''}`} onClick={() => navigate(id)}><Icon size={17}/>{label}</button>)}
        </nav>
        <div className="header-actions">
          <div className="language-picker">
            <Languages size={17}/>
            <select aria-label={t.language} value={lang} onChange={e => setLang(e.target.value)}>
              <option value="rw">Kinyarwanda</option><option value="en">English</option>
            </select>
            <ChevronDown size={14}/>
          </div>
          <button className="mobile-menu" onClick={() => setMobileOpen(v => !v)} aria-label={t.menu}>{mobileOpen ? <X/> : <Menu/>}</button>
        </div>
      </div>
      {mobileOpen && <nav className="mobile-nav">{navItems.map(([id, Icon, label]) => <button key={id} onClick={() => navigate(id)}><Icon size={18}/>{label}</button>)}</nav>}
    </header>

    <main>
      {page === 'home' && <Home t={t} onCalculate={goCalculate} onNavigate={navigate}/>}
      {page === 'guide' && <section className="page-wrap">
        <PageHeading eyebrow={t.learn} title={t.guideTitle} description={t.guideText}/>
        <div className="panel guide-detail">
          <h2>{lang === 'rw' ? 'BMI ni iki?' : 'What is BMI?'}</h2>
          <p>{lang === 'rw' ? 'BMI (Body Mass Index) ni igipimo kibara isano iri hagati y’ibiro n’uburebure. Kiboneka ugabanyije ibiro byawe muri kg n’uburebure bwawe muri metero wikubye kabiri.' : 'BMI (Body Mass Index) is a measure that relates a person’s weight to their height. It is calculated by dividing weight in kilograms by height in meters squared.'}</p>
          <h3>{lang === 'rw' ? 'Uko usoma igisubizo ku bantu bakuru' : 'How to read adult BMI'}</h3>
          <div className="guide-grid"><GuideRange range={t.guide1} label={t.guideUnder} color="under"/><GuideRange range={t.guide2} label={t.guideNormal} color="normal"/><GuideRange range={t.guide3} label={t.guideOver} color="over"/><GuideRange range={t.guide4} label={t.guideObese} color="obese"/></div>
          <p className="small-note"><ShieldCheck size={16}/>{t.warning}</p>
          <button className="button primary" onClick={goCalculate}>{t.start}<ArrowUpRight size={18}/></button>
        </div>
      </section>}
      {page === 'calculator' && <section className="page-wrap">
        <PageHeading eyebrow={t.calculator} title={t.calculatorTitle} description={t.calculatorDesc}/>
        <div className="calculator-layout">
          <form className="panel calculator-form" onSubmit={calculate}>
            <div className="form-heading"><span className="soft-icon"><Calculator/></span><div><h2>{t.calculatorTitle}</h2><p>{t.calculatorDesc}</p></div></div>
            <label>{t.weight}<span className="input-wrap"><Weight size={18}/><input type="number" min="1" max="500" step="0.1" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" required/><b>{t.kg}</b></span></label>
            <label>{t.height}<span className="input-wrap"><Ruler size={18}/><input type="number" min="50" max="300" step="0.1" value={height} onChange={e => setHeight(e.target.value)} placeholder="170" required/><b>{t.cm}</b></span></label>
            <label>{t.age}<span className="input-wrap"><CalendarDays size={18}/><input type="number" min="1" max="120" value={age} onChange={e => setAge(e.target.value)} placeholder="25" required/><b>{lang === 'rw' ? 'imyaka' : 'years'}</b></span></label>
            <label>{t.patientName}<input className="text-input" value={patientName} onChange={e => setPatientName(e.target.value)} placeholder={t.patientName} required/></label>
            <label>{t.patientPhone}<input className="text-input" type="tel" value={patientPhone} onChange={e => setPatientPhone(e.target.value)} placeholder="+2507XXXXXXXX" autoComplete="tel" required/></label>
            {error && <p className="message error" role="alert">{error}</p>}
            {smsStatus && <p className={`message ${smsStatus === 'sent' ? 'success' : smsStatus === 'failed' ? 'error' : 'warning'}`} role="status">{smsStatus === 'sent' ? t.smsSent : smsStatus === 'failed' ? t.smsFailed : t.smsSending}</p>}
            <div className="form-actions"><button className="button primary" type="submit"><Calculator size={18}/>{t.calculate}</button><button className="button secondary" type="button" onClick={clearForm}><RefreshCw size={17}/>{t.clear}</button></div>
          </form>
          <section className="panel result-panel">
            <div className="result-top"><span className="soft-icon green"><Activity/></span><span className="eyebrow">{t.result}</span></div>
            {result ? <div className="result-content">
              <div className="bmi-number">{result.bmi.toFixed(1)}<small>{t.yourBMI}</small></div>
              <div className={`category-pill ${getCategory(result.bmi,lang).className}`}><span/>{getCategory(result.bmi,lang).label}</div>
              <div className="bmi-scale"><span/><span/><span/><span/><i style={{left:`${Math.max(2,Math.min(98,(result.bmi/40)*100))}%`}}/></div>
              <div className="scale-labels"><span>18.5</span><span>25</span><span>30</span></div>
              <p className={`result-explain ${getCategory(result.bmi,lang).className}`}>{getCategoryAdvice(result.bmi,lang)}</p>
              {result.age < 20 && <p className="message warning">{t.under20}</p>}
              <p className="small-note">{t.adultNote}</p>
              <button className="button primary full" onClick={saveResult}><Check size={18}/>{t.save}</button>
            </div> : <div className="empty-result"><div className="result-placeholder"><Activity size={35}/></div><h3>{t.yourBMI}</h3><p>{t.healthyRange}</p><div className="skeleton-line"/><div className="skeleton-line short"/></div>}
            {notice && <p className="message success">{notice}</p>}
          </section>
        </div>
        <div className="notice-strip"><ShieldCheck size={19}/><span>{t.warning}</span></div>
      </section>}
      {page === 'dashboard' && <section className="page-wrap">
        <PageHeading eyebrow={t.dashboard} title={t.dashboardTitle} description={t.dashboardDesc}/>
        {records.length ? <>
          <div className="stats-grid">
            <StatCard icon={Activity} label={t.latest} value={latest.bmi.toFixed(1)} hint={getCategory(latest.bmi,lang).label}/>
            <StatCard icon={History} label={t.records} value={records.length} hint={t.records}/>
            <StatCard icon={Weight} label={t.latestWeight} value={`${latest.weight} kg`} hint={`${latest.height} cm`}/>
          </div>
          <div className="panel chart-panel"><div className="section-title"><div><h2>{t.trend}</h2><p>{t.dashboardDesc}</p></div><span className="soft-icon"><BarChart3/></span></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8edf5"/><XAxis dataKey="date" tickLine={false} axisLine={false}/><YAxis domain={['auto','auto']} tickLine={false} axisLine={false}/><Tooltip/><Line type="monotone" dataKey="bmi" stroke="#155eef" strokeWidth={3} dot={{r:4,fill:'#18a979'}} activeDot={{r:6}}/></LineChart></ResponsiveContainer></div></div>
          <button className="button secondary" onClick={() => navigate('history')}>{t.history} <ArrowDownRight size={17}/></button>
        </> : <EmptyState t={t} onCalculate={goCalculate}/>}
      </section>}
      {page === 'admin' && <section className="page-wrap">
        <PageHeading eyebrow={t.adminDashboard} title={t.adminDashboard} description={lang === 'rw' ? 'Igenzura n’ibikorwa byihariye by’umuyobozi wa system.' : 'Administration and privileged system actions.'}/>
        {!adminAuthenticated ? <form className="panel profile-form admin-login" onSubmit={loginAdmin}>
          <div className="profile-avatar"><ShieldCheck size={30}/></div>
          <h2>{lang === 'rw' ? 'Admin Login' : 'Admin Login'}</h2>
          <p>{lang === 'rw' ? 'Injiza ijambo ry’ibanga ry’umuyobozi kugira ngo wemerewe guhindura cyangwa gusiba amateka.' : 'Enter the administrator password to manage or delete history.'}</p>
          <label>{lang === 'rw' ? 'Ijambo ry’ibanga rya Admin' : 'Admin password'}<input className="text-input" type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} required autoComplete="current-password"/></label>
          {adminLoginError && <p className="message error" role="alert">{adminLoginError}</p>}
          <button className="button primary full" type="submit"><ShieldCheck size={17}/>{lang === 'rw' ? 'Injira nka Admin' : 'Sign in as Admin'}</button>
          <p className="small-note">Demo password: <strong>Felex@2026</strong>. Frontend-only demo; not secure for public production use.</p>
        </form> : <>
        <div className="admin-auth-bar"><span><ShieldCheck size={17}/> {lang === 'rw' ? 'Winjiye nka Admin — wemerewe gucunga amateka.' : 'Signed in as Admin — history management enabled.'}</span><button className="button secondary small" onClick={() => { setAdminAuthenticated(false); navigate('admin') }}>{lang === 'rw' ? 'Sohoka' : 'Log out'}</button></div>
        <div className="stats-grid">
          <StatCard icon={UserRound} label={lang === 'rw' ? 'Umwirondoro' : 'Profile'} value={profileConfirmed ? (profile.name || '—') : (lang === 'rw' ? 'Ntiwabitswe' : 'Not saved')} hint={profileConfirmed ? (profile.email || '') : (lang === 'rw' ? 'Umwirondoro nturemezwa' : 'Profile is not confirmed')}/>
          <StatCard icon={History} label={lang === 'rw' ? 'Ibipimo bya BMI byabitswe' : 'Saved BMI records'} value={records.length} hint={lang === 'rw' ? 'Umubare w’ibipimo biri muri browser' : 'Records stored in this browser'}/>
          <StatCard icon={Activity} label={lang === 'rw' ? 'BMI iheruka' : 'Latest BMI'} value={latest ? latest.bmi.toFixed(1) : '—'} hint={latest ? getCategory(latest.bmi,lang).label : (lang === 'rw' ? 'Nta gipimo kirabikwa' : 'No saved measurement yet')}/>
        </div>
        <div className="panel chart-panel">
          <div className="section-title"><div><h2>{lang === 'rw' ? 'Igenzura rusange' : 'Overview'}</h2><p>{lang === 'rw' ? 'Aya makuru agaragaza gusa ibibitswe kuri iyi browser.' : 'This information reflects data saved in this browser only.'}</p></div><span className="soft-icon"><ShieldCheck/></span></div>
          <div className="admin-overview-actions">
            <button className="button secondary" onClick={() => navigate('profile')}><UserRound size={17}/>{t.profile}</button>
            <button className="button secondary" onClick={() => navigate('history')}><History size={17}/>{t.history}</button>
            <button className="button primary" onClick={goCalculate}><Calculator size={17}/>{t.calculator}</button>
          </div>
          <p className="small-note">{lang === 'rw' ? 'Uburenganzira bwa Admin bugenzurwa muri iyi demo ya frontend gusa. Koresha backend authentication mbere yo kuyishyira kuri internet.' : 'Admin access is checked in this frontend demo only. Add backend authentication before publishing publicly.'}</p>
        </div>
        </>}
      </section>}
      {page === 'history' && <section className="page-wrap">
        <PageHeading eyebrow={t.history} title={t.historyTitle} description={t.dashboardDesc}/>
        <div className="panel history-panel">
          <div className="history-search-wrap"><div className="history-search"><Search size={18}/><input value={historySearch} onChange={e => {setHistorySearch(e.target.value);setHistorySelected(null)}} onKeyDown={e => {if(e.key==='Enter'){const match=records.find(r=>(r.name||'').toLowerCase().includes(historySearch.trim().toLowerCase()));if(match){setHistorySelected(match.id);setHistorySearch(match.name||'')}}}} placeholder={lang==='rw'?'Shakisha izina ry’umuntu…':'Search a person by name…'} aria-label="Search BMI history"/><button type="button" className="button primary small" onClick={()=>{const match=records.find(r=>(r.name||'').toLowerCase().includes(historySearch.trim().toLowerCase()));if(match){setHistorySelected(match.id);setHistorySearch(match.name||'')}}}>{lang==='rw'?'Shakisha':'Search'}</button></div>{historySearch.trim() && <div className="history-suggestions">{records.filter(r=>(r.name||'').toLowerCase().includes(historySearch.trim().toLowerCase())).slice(0,6).map(r=><button key={r.id} type="button" onClick={()=>{setHistorySelected(r.id);setHistorySearch(r.name||'')}}><strong>{r.name||'Nta zina'}</strong><small>BMI {Number(r.bmi).toFixed(1)} · {new Date(r.createdAt).toLocaleDateString()}</small></button>)}</div>}</div>
          {historySelected && records.find(r=>r.id===historySelected) && <div className="history-person-detail"><strong>{records.find(r=>r.id===historySelected).name||'Nta zina'}</strong><span>BMI: {Number(records.find(r=>r.id===historySelected).bmi).toFixed(1)} — {getCategory(Number(records.find(r=>r.id===historySelected).bmi),lang).label}</span><span>{records.find(r=>r.id===historySelected).weight} kg · {records.find(r=>r.id===historySelected).height} cm</span><small>{getCategoryAdvice(Number(records.find(r=>r.id===historySelected).bmi),lang)}</small></div>}
          {records.length ? <div className="table-scroll"><table><thead><tr><th>{t.name}</th><th>{t.date}</th><th>{t.weight}</th><th>{t.height}</th><th>{t.bmi}</th><th>{t.category}</th><th>{t.action}</th></tr></thead><tbody>{records.filter(r=>!historySearch.trim()||(r.name||'').toLowerCase().includes(historySearch.trim().toLowerCase())).map(r => <tr key={r.id}><td><strong>{r.name || (lang === 'rw' ? 'Nta zina' : 'Unnamed')}</strong></td><td>{new Date(r.createdAt).toLocaleString(lang === 'rw' ? 'rw-RW' : 'en-US')}</td><td>{r.weight} kg</td><td>{r.height} cm</td><td><strong>{r.bmi.toFixed(1)}</strong></td><td><span className={`category-pill compact ${getCategory(r.bmi,lang).className}`}>{getCategory(r.bmi,lang).label}</span></td><td><button className="icon-button" title={t.delete} onClick={() => deleteRecord(r.id)}><Trash2 size={17}/></button></td></tr>)}</tbody></table></div> : <div className="empty-history"><History size={36}/><p>{t.emptyHistory}</p><button className="button primary" onClick={goCalculate}>{t.start}</button></div>}
        </div>
      </section>}
      {page === 'profile' && <section className="page-wrap narrow">
        <PageHeading eyebrow={t.profile} title={t.profileTitle} description={t.profileHint}/>
        <form className="panel profile-form" noValidate onSubmit={e => {
          e.preventDefault()
          const name = profile.name?.trim() || ''
          const email = profile.email?.trim() || ''
          const phone = (profile.phone || '').replace(/[\s()-]/g, '')
          if (!name || !email || !phone) {
            setProfileConfirmed(false)
            setNotice(t.profileRequired)
            return
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setProfileConfirmed(false)
            setNotice(t.invalidEmailProfile)
            return
          }
          if (!/^\+?[0-9]{10,15}$/.test(phone)) { setProfileConfirmed(false); setNotice(t.invalidPhone); return }
          setProfile({ name, email, phone })
          localStorage.setItem('bmi-profile-confirmed', JSON.stringify({ name, email, phone }))
          setProfileConfirmed(true)
          setNotice(t.profileSaved)
        }}>
          <div className="profile-avatar"><UserRound size={30}/></div>
          <label>{t.name}<input className="text-input" value={profile.name} onChange={e => {setProfile({...profile,name:e.target.value});setProfileConfirmed(false);setNotice('')}} placeholder={t.name} autoComplete="name"/></label>
          <label>{t.email}<input className="text-input" type="email" value={profile.email} onChange={e => {setProfile({...profile,email:e.target.value});setProfileConfirmed(false);setNotice('')}} placeholder="name@example.com" autoComplete="email"/></label>
          <label>{t.phone}<input className="text-input" type="tel" value={profile.phone || ''} onChange={e => {setProfile({...profile,phone:e.target.value});setProfileConfirmed(false);setNotice('')}} placeholder="+2507XXXXXXXX" autoComplete="tel"/></label>
          <button className="button primary" type="submit"><Check size={18}/>{t.saveProfile}</button>
          {notice && <p role="status" aria-live="polite" className={`message ${notice === t.profileSaved ? 'success' : 'error'}`}>{notice}</p>}
          <p className="small-note">{t.profileHint}</p>
        </form>
        {profileConfirmed && (
          <div className="profile-next-step">
            <p>{lang === 'rw' ? 'Umwirondoro wawe wemejwe. Ushobora gukomeza kubara BMI yawe.' : 'Your profile is complete. You can continue to calculate your BMI.'}</p>
            <button className="button primary" type="button" onClick={() => {
              const name = profile.name?.trim() || ''
              const email = profile.email?.trim() || ''
              const phone = (profile.phone || '').replace(/[\s()-]/g, '')
              if (!name || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\+?[0-9]{10,15}$/.test(phone)) {
                setProfileConfirmed(false)
                setNotice(!name || !email || !phone ? t.profileRequired : !/^\+?[0-9]{10,15}$/.test(phone) ? t.invalidPhone : t.invalidEmailProfile)
                return
              }
              goCalculate()
            }}>
              <Calculator size={18}/>{t.goToBmi}<ArrowUpRight size={18}/>
            </button>
          </div>
        )}
      </section>}
    </main>
    <button className="bmi-ai-fab" type="button" onClick={() => setBmiAiOpen(v => !v)} aria-expanded={bmiAiOpen} aria-controls="bmi-ai-panel"><span className="bmi-ai-dot">✦</span> BAZA BMI AI</button>
    {bmiAiOpen && <section className="bmi-ai-panel" id="bmi-ai-panel" role="dialog" aria-label="BAZA BMI AI"><div className="bmi-ai-panel-head"><strong>BAZA BMI AI</strong><button type="button" onClick={() => setBmiAiOpen(false)} aria-label="Funga"><X size={16}/></button></div><p>{lang === 'rw' ? 'Baza ibibazo bijyanye na BMI gusa. Urugero: ibara ry’icyiciro cyanjye risobanura iki?' : 'Ask questions about BMI only. Example: What does my category color mean?'}</p><form className="bmi-ai-form" onSubmit={e => {e.preventDefault(); const q=bmiAiQuestion.trim().toLowerCase(); if(!q)return; const aboutBMI=/bmi|body mass|ibiro|umubyibuho|ibara|icyiciro|18[.,]?5|25|30|uburebure|weight|height/.test(q); let answer=''; const bmiMatch=q.match(/(?:bmi\s*(?:yange ni|yanjye ni|is|=|:)?\s*)?(\d{1,2}(?:[.,]\d{1,2})?)/i); const bmiValue=bmiMatch?Number(bmiMatch[1].replace(',','.')):NaN; const asksOwnNumber=Number.isFinite(bmiValue) && bmiValue>0 && bmiValue<100 && /bmi|ni|ifite|mfite|my|is|=/.test(q); if(!aboutBMI){answer=lang==='rw'?'Turakwinginze baza ibijyanye na BMI gusa; twiteguye kugusubiza.':'Please ask only about BMI; we are ready to help.';} else if(asksOwnNumber){const cat=bmiValue<18.5?'under':bmiValue<25?'normal':bmiValue<30?'over':'obese'; const rw={under:`BMI yawe ni ${bmiValue.toFixed(1)}. Iri munsi ya 18.5, bityo iri mu cyiciro cy’ibiro biri munsi y’urwego rusanzwe (ubururu). BMI ni igipimo cy’ibiro ugereranyije n’uburebure; ntigaragaza impamvu y’ibiro cyangwa uko ubuzima bwawe bwose buhagaze. Kurya indyo yuzuye, kandi niba ugira impungenge cyangwa wagabanutse ibiro utabishaka, ganira n’inzobere mu buzima.`,normal:`BMI yawe ni ${bmiValue.toFixed(1)}. Iri hagati ya 18.5 na munsi ya 25, icyiciro cy’urwego rusanzwe (icyatsi). Ibi bivuze ko igipimo cy’ibiro n’uburebure kiri mu rugero rusanzwe ku bantu bakuru. Komeza indyo yuzuye, imyitozo ijyanye n’ubushobozi bwawe, no gusinzira bihagije. BMI yonyine ntisuzuma ubuzima bwawe bwose.`,over:`BMI yawe ni ${bmiValue.toFixed(1)}. Iri hagati ya 25 na munsi ya 30, icyiciro cy’ibiro birengeje urwego rusanzwe (icunga). Ibi ni ikimenyetso rusange gusa, si indwara cyangwa isuzuma. Imirire iringaniye, kugenda cyangwa gukora imyitozo buhoro buhoro bishobora gufasha; ganira n’inzobere ku nama zijyanye n’imyaka yawe n’ubuzima bwawe.`,obese:`BMI yawe ni ${bmiValue.toFixed(1)}. Iri kuri 30 cyangwa hejuru yayo, icyiciro cy’umubyibuho ukabije (umutuku). BMI ni igipimo cyo gusuzuma ibyago, si isuzuma ry’indwara kandi ntisobanura ubuzima bwawe bwose. Byaba byiza uganiriye n’inzobere mu buzima kugira ngo igufashe gusuzuma ibindi bipimo n’inama zikubereye.`}; const en={under:`Your BMI is ${bmiValue.toFixed(1)}, below 18.5 (blue: below the usual adult range). BMI compares weight with height; it does not explain the cause or assess your overall health. Aim for balanced nutrition, and seek professional advice if you are concerned or have unintentional weight loss.`,normal:`Your BMI is ${bmiValue.toFixed(1)}, within 18.5 to under 25 (green: usual adult range). This is a general weight-for-height range for adults. Maintain balanced eating, activity suited to you, and adequate sleep. BMI alone does not assess your overall health.`,over:`Your BMI is ${bmiValue.toFixed(1)}, within 25 to under 30 (orange: above the usual adult range). This is a screening indicator, not a diagnosis. Balanced nutrition and gradual activity may help; ask a health professional for advice suited to your age and health.`,obese:`Your BMI is ${bmiValue.toFixed(1)}, 30 or above (red: obesity range). BMI is a screening measure, not a diagnosis and not a complete picture of health. Consider discussing it with a health professional who can assess other factors and offer appropriate guidance.`}; answer=lang==='rw'?rw[cat]:en[cat];} else if(/ibara|color|colour/.test(q)){answer=lang==='rw'?'Ubururu (BMI munsi ya 18.5): ibiro biri munsi y’urwego rusanzwe. Icyatsi (18.5–munsi ya 25): urwego rusanzwe. Icunga (25–munsi ya 30): ibiro birengeje urwego. Umutuku (30 kuzamura): umubyibuho ukabije. BMI ni igipimo rusange, si isuzuma rya muganga.':'Blue (<18.5): below the usual range. Green (18.5–<25): usual adult range. Orange (25–<30): above the usual range. Red (30+): obesity range. BMI is a screening measure, not a diagnosis.';} else if(/18[.,]?5/.test(q)){answer=lang==='rw'?'BMI iri munsi ya 18.5 ishyirwa mu cyiciro cy’ibiro biri munsi y’urwego rusanzwe. Gerageza indyo yuzuye; niba bikureba, ganira n’inzobere mu buzima.':'A BMI below 18.5 is classified as below the usual adult range. Aim for balanced nutrition and consider speaking with a health professional.';} else if(/25|30|umubyibuho|overweight|obes/.test(q)){answer=lang==='rw'?'BMI ya 25 kugeza munsi ya 30 iri hejuru y’urwego rusanzwe; 30 kuzamura iri mu cyiciro cy’umubyibuho ukabije. BMI yonyine ntisuzuma ubuzima—ganira n’inzobere ku nama zijyanye nawe.':'BMI 25 to under 30 is above the usual adult range; 30 and above is the obesity range. BMI alone cannot diagnose health; consult a professional for personalized advice.';} else if(/ibara|normal|urwego|green|icyatsi/.test(q)){answer=lang==='rw'?'BMI 18.5 kugeza munsi ya 25 ni urwego rusanzwe ku bantu bakuru. Komeza indyo yuzuye n’imyitozo ijyanye n’ubushobozi bwawe.':'A BMI from 18.5 to under 25 is the usual adult range. Maintain balanced habits and activity suited to you.';} else {answer=lang==='rw'?'BMI ibarwa ugabanya ibiro (kg) n’uburebure (m) bwikubye kabiri. Ku bantu bakuru: munsi ya 18.5 ni munsi y’urwego; 18.5–munsi ya 25 ni urwego rusanzwe; 25–munsi ya 30 ni hejuru; 30+ ni umubyibuho ukabije. Ibyiciro ntibikoreshwa kimwe ku bana n’ingimbi.':'BMI = weight in kilograms divided by height in meters squared. Adult ranges: under 18.5 below usual range; 18.5–<25 usual range; 25–<30 above range; 30+ obesity range. Children and teens need age- and sex-specific interpretation.';} setBmiAiAnswer(answer); }}><textarea value={bmiAiQuestion} onChange={e=>setBmiAiQuestion(e.target.value)} rows="3" placeholder={lang==='rw'?'Andika ikibazo cyawe kuri BMI...':'Type your BMI question...'} aria-label="Ikibazo kuri BMI"/><button type="submit">{lang==='rw'?'Ohereza ikibazo cyawe':'Send your question'}</button></form>{bmiAiAnswer && <div className="bmi-ai-answer" aria-live="polite"><strong>{lang==='rw'?'Igisubizo':'Answer'}</strong><p>{bmiAiAnswer}</p></div>}<p className="bmi-ai-note">{lang==='rw'?'Ibisubizo by’amakuru rusange gusa; BMI si isuzuma rya muganga.':'General information only; BMI is not a medical diagnosis.'}</p></section>}
    <footer className="footer"><div className="footer-inner"><span className="footer-brand"><span className="footer-mark"><HeartPulse size={17}/></span> {t.footer}</span><p className="footer-description">BMI Calculator is a simple health tool that calculates your Body Mass Index (BMI) using your height and weight, helps you understand your BMI category, and lets you review your measurement history.</p><span className="footer-marquee" aria-label="Developed by Havugimana felex in Eav kivumu Tss students"><span>Developed by Havugimana felex in Eav kivumu Tss students</span></span><nav className="footer-socials" aria-label="Social media">
<a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8z" fill="currentColor"/></svg><span>Facebook</span></a>
<a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" title="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 7.1a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.9a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9ZM9.7 15.5v-7l6 3.5z" fill="currentColor"/></svg><span>YouTube</span></a>
<a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.8" r="1.2" fill="currentColor"/></svg><span>Instagram</span></a>
<a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="Twitter / X" title="Twitter / X"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 3H22l-6.8 7.8L23.2 21h-6.3L12 14.8 6.5 21H3.4l7.3-8.4L2.8 3h6.5l4.5 5.9zm-1.1 16h1.7L8.3 4.9H6.5z" fill="currentColor"/></svg><span>Twitter</span></a>
</nav><button className="developer-link" onClick={() => setDeveloperOpen(true)}><span className="developer-thumb">{developerPhoto ? <img src={developerPhoto} alt="Havugimana Felex"/> : <UserRound size={22}/>}</span><span>Developer: Havugimana Felex</span></button><span className="footer-note">{t.frontOnly}</span></div></footer>
    {historyOpen && <div className="developer-overlay history-overlay" role="dialog" aria-modal="true" aria-label="Amateka ya EAV Kivumu TSS" onClick={(e) => { if (e.target === e.currentTarget) setHistoryOpen(false) }}><section className="developer-card history-card"><button className="developer-close" onClick={() => setHistoryOpen(false)} aria-label="Funga"><X/></button><span className="eyebrow">EAV KIVUMU TSS</span><h2>AMATEKA Y'EAV KIVUMU TSS</h2><p>EAV Kivumu TSS ni ishuri ry'imyuga n'ubumenyi ngiro riherereye mu Murenge wa Nyange, Akarere ka Ngororero, mu Ntara y'Iburengerazuba.</p><p>Ishuri ryashinzwe mu mwaka wa <strong>1989</strong>, rishingwa n'Umuryango w'Amatorero y'Ababatisita mu Rwanda (Association of Baptist Churches of Rwanda). Mu ntangiriro ryibandaga ku buhinzi (Agronomy) n'ubuvuzi bw'amatungo (Veterinary).</p><p>Nyuma ya <strong>2009</strong>, ryagutse ritangira no gutanga amasomo ajyanye n'amashanyarazi n'ubwubatsi.</p><p>Uko imyaka yagiye ihita, ryakomeje kwagura imyuga, ubu rikaba ritanga amasomo arimo <strong>Software Development, Building Construction, Public Works, Agriculture</strong> na <strong>Animal Health</strong>. Rifasha urubyiruko kubona ubumenyi ngiro no kwiteza imbere.</p><div className="history-facts"><p><strong>Igihe ryashingiwe:</strong> 1989</p><p><strong>Aho riherereye:</strong> Nyange, Ngororero, Rwanda</p></div><p className="history-source-note">Iyi ni incamake ishingiye ku makuru y'amateka aboneka; si amateka yose yemejwe n'ubuyobozi bw'ishuri.</p><a className="history-source-link" href="https://gpenreformation.net/members/eav-kivumu/" target="_blank" rel="noreferrer">Reba urubuga rw'amateka: EAV Kivumu – GPEN</a><button className="button primary history-done" onClick={() => setHistoryOpen(false)}>Funga</button></section></div>}
    {developerOpen && <div className="developer-overlay" role="dialog" aria-modal="true" aria-label="Developer biography"><section className="developer-card"><button className="developer-close" onClick={() => setDeveloperOpen(false)} aria-label="Close"><X/></button><div className="developer-photo">{developerPhoto ? <img src={developerPhoto} alt="Havugimana Felex"/> : <UserRound size={42}/>}</div><h2>Havugimana Felex</h2><p>My name is Havugimana Felex.</p><p>I studied at EAV Kivumu TSS.</p><p>I live in Nyamagabe District. I was born in 1999.</p><p>I have helped many students develop their projects.</p><label className="developer-upload">Add or change photo<input type="file" accept="image/*" onChange={e => {const file=e.target.files?.[0]; if(file){const reader=new FileReader();reader.onload=()=>{setDeveloperPhoto(reader.result);try{localStorage.setItem('developer-photo',JSON.stringify(reader.result))}catch{}};reader.readAsDataURL(file)}}}/></label></section></div>}
  </div>
}

function PageHeading({eyebrow,title,description}) {
  return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
}
function StatCard({icon:Icon,label,value,hint}) {
  return <div className="panel stat-card"><span className="soft-icon"><Icon/></span><span className="stat-label">{label}</span><strong>{value}</strong><small>{hint}</small></div>
}
function EmptyState({t,onCalculate}) {
  return <div className="panel empty-state"><span className="empty-icon"><BarChart3 size={32}/></span><h2>{t.noData}</h2><p>{t.noData}</p><button className="button primary" onClick={onCalculate}>{t.start}</button></div>
}
function Home({t,onCalculate,onNavigate}) {
  return <div className="home-page">
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy"><span className="hero-tag"><HeartPulse size={16}/>{t.trusted}</span><h1>{t.welcome}<br/><em>{t.intro}</em></h1><p>{t.heroText}</p><div className="hero-actions"><button className="button primary large" onClick={onCalculate}>{t.start}<ArrowUpRight size={19}/></button><button className="button hero-secondary large" onClick={() => onNavigate('guide')}>{t.learn}<CircleHelp size={18}/></button></div><div className="hero-foot"><span className="tiny-check"><Check size={13}/></span>{t.adultNote}</div></div>
        <div className="hero-visual" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-card"><div className="hero-card-top"><span className="pulse-icon"><Activity size={21}/></span><span>BMI <b>22.9</b></span><span className="mini-status">●</span></div><div className="hero-graph"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div><div className="hero-card-bottom"><span><i/>18.5 — 24.9</span><b>Normal</b></div></div><div className="floating-badge badge-one"><span className="badge-icon"><Check size={15}/></span><span><b>22.9</b><small>Healthy range</small></span></div><div className="floating-badge badge-two"><span className="badge-icon green"><HeartPulse size={17}/></span><span><b>Wite ku buzima</b><small>Umunsi ku wundi</small></span></div><div className="hero-blob"/></div>
      </div>
    </section>
    <section className="home-features page-wrap"><div className="center-heading"><span className="eyebrow">{t.brand}</span><h2>{t.guideTitle}</h2><p>{t.guideText}</p></div><div className="feature-grid"><Feature icon={Calculator} title={t.calculator} text={t.calculatorDesc} onClick={onCalculate}/><Feature icon={History} title={t.history} text={t.dashboardDesc} onClick={() => onNavigate('history')}/><Feature icon={BarChart3} title={t.dashboard} text={t.trend} onClick={() => onNavigate('dashboard')}/></div><div className="how-panel panel"><div><span className="eyebrow">{t.how}</span><h2>{t.how}</h2></div><ol><li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li></ol><button className="button primary" onClick={onCalculate}>{t.start}<ArrowUpRight size={18}/></button></div><div className="bmi-guide"><h2>{t.guideTitle}</h2><div className="guide-grid"><GuideRange range={t.guide1} label={t.guideUnder} color="under"/><GuideRange range={t.guide2} label={t.guideNormal} color="normal"/><GuideRange range={t.guide3} label={t.guideOver} color="over"/><GuideRange range={t.guide4} label={t.guideObese} color="obese"/></div><p className="small-note"><ShieldCheck size={16}/>{t.warning}</p></div></section>
  </div>
}
function Feature({icon:Icon,title,text,onClick}) {
  return <button className="feature-card panel" onClick={onClick}><span className="soft-icon"><Icon/></span><h3>{title}</h3><p>{text}</p><span className="feature-link">Fungura <ArrowUpRight size={16}/></span></button>
}
function GuideRange({range,label,color}) {
  return <div className="guide-item"><span className={`guide-dot ${color}`}/><strong>{range}</strong><small>{label}</small></div>
}
