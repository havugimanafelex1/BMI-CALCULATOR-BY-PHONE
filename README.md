# BMI Calculator — React + SMS Notifications

BMI Calculator ni urubuga rwa React/Vite rubara BMI, rukabika amateka muri browser, kandi rushobora kohereza SMS ku muntu upimwe no kuri Admin binyuze kuri backend ya Node.js na Twilio.

## Ibyo byongeweho
- Umwirondoro wa Admin: amazina, imeyili na numero ya telefone.
- Muri BMI Calculator: amazina na numero ya telefone by'umuntu uri gupimwa.
- BMI imaze kubarwa, frontend ihita isaba backend kohereza SMS irimo BMI, icyiciro n'ubusobanuro kuri numero zombi.
- SMS API credentials zibikwa muri `server/.env`, ntabwo zishyirwa muri React/browser.
- Amateka n'umwirondoro bibikwa muri browser ukoresha (localStorage); si cloud database.

## Icyangombwa: SMS ntizoherezwa utarashyiraho provider
Iyi ZIP irimo code yiteguye, ariko nta SMS API key cyangwa amafaranga yo kohereza SMS birimo. Ugomba kugira konti ya Twilio (cyangwa provider ihuza na API ya Twilio), numero yemerewe kohereza SMS, no gushyiramo credentials zawe. Twilio ishobora gusaba kwemeza recipient numbers kuri trial account; amategeko n'ubushobozi bwo kohereza SMS mu Rwanda bigenzurwa na provider.

## Gutangiza frontend
1. Shyiramo Node.js.
2. Fungura terminal muri `bmi-calculator-react`.
3. Koresha:
   ```bash
   npm install
   npm run dev
   ```
4. Fungura URL Vite iguha, akenshi `http://localhost:5173`.

## Gutangiza backend ya SMS
Fungura terminal ya kabiri muri `bmi-calculator-react/server`:

```bash
npm install
```

Kora kopi ya `.env.example` uyite `.env`, hanyuma wuzuze amakuru ya Twilio:

```env
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
TWILIO_ACCOUNT_SID=AC... 
TWILIO_AUTH_TOKEN=...
TWILIO_FROM_NUMBER=+1...
```

Hanyuma tangiza backend:

```bash
npm run dev
```

Gerageza ko ikora ufungura `http://localhost:5000/api/health`; igomba kugaragaza `status: ok`.

### Uko ukoresha SMS
1. Muri BMI Calculator, jya kuri **Umwirondoro**.
2. Injiza amazina, imeyili na numero ya Admin mu buryo mpuzamahanga, urugero `+2507XXXXXXXX`, ubike.
3. Jya kuri **Kubara BMI**.
4. Injiza ibiro, uburebure, imyaka, amazina y'umuntu uri gupima na numero ye.
5. Kanda **Bara BMI**. BMI igaragara kuri screen, backend igerageza kohereza SMS kuri numero y'umuntu no kuri Admin.
6. Ubutumwa buri kuri screen bugaragaza niba kohereza byagenze neza cyangwa byanze.

## Gushyira online
- Shyira frontend kuri hosting yawe (urugero Vercel/Netlify).
- Shyira `server/` kuri backend hosting (urugero Render/Railway/VPS).
- Shyira `VITE_API_BASE_URL` muri frontend hosting ibe URL ya backend yawe, nta `/` isoza, urugero `https://your-bmi-api.example.com`.
- Hindura `FRONTEND_ORIGIN` muri backend ibe URL nyayo ya frontend.
- Shyira Twilio credentials muri Environment Variables za backend hosting; ntuzishyire muri frontend.
- Koresha HTTPS kuri frontend na backend.

## Icyitonderwa cy'umutekano n'ubuzima
- Ntushyire `.env` kuri GitHub cyangwa muri frontend. Ntugasangize umuntu `TWILIO_AUTH_TOKEN`.
- Iyi ni starter implementation. Mbere yo kuyishyira ku mugaragaro, ongeramo rate limiting, authentication/authorization ya Admin, privacy notice no kurinda amakuru y'abakoresha. Ntukoreshe localStorage nk'ububiko bwizewe bw'amakuru y'ubuzima.
- Menya neza ko umuntu yemeye ko numero ye yakira SMS mbere yo kumupimira no kohereza ubutumwa.
- BMI ni igipimo rusange, si isuzuma ry'indwara. Ibyiciro biri muri system bigenewe abantu bakuru; abana n'ingimbi bakeneye ubusobanuro bushingiye ku myaka n'igitsina.
