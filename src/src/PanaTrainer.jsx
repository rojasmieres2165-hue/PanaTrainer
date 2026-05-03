import { useState } from “react”;

const C = {
bg: “#0d0f14”, card: “#141720”, border: “#1e2230”,
accent: “#00e5a0”, accentDim: “#00b87c”,
red: “#ff4d6d”, yellow: “#ffd166”, blue: “#4cc9f0”,
text: “#e8eaf0”, muted: “#6b7280”, sub: “#9ca3af”,
};

// ─── NUTRITION DB ────────────────────────────────────────────────────────────
const MACROS_DB = {
“Arroz blanco”:       { cal:130, prot:2.7, carb:28,  fat:0.3, unit:“100g” },
“Pechuga de pollo”:   { cal:165, prot:31,  carb:0,   fat:3.6, unit:“100g” },
“Huevo”:              { cal:78,  prot:6,   carb:0.6, fat:5,   unit:“unidad” },
“Avena”:              { cal:389, prot:17,  carb:66,  fat:7,   unit:“100g” },
“Atún en lata”:       { cal:116, prot:26,  carb:0,   fat:1,   unit:“100g” },
“Plátano”:            { cal:89,  prot:1.1, carb:23,  fat:0.3, unit:“unidad” },
“Leche entera”:       { cal:61,  prot:3.2, carb:4.7, fat:3.3, unit:“100ml” },
“Papa cocida”:        { cal:87,  prot:1.9, carb:20,  fat:0.1, unit:“100g” },
“Caraotas negras”:    { cal:132, prot:8.9, carb:24,  fat:0.5, unit:“100g” },
“Salmon”:             { cal:208, prot:20,  carb:0,   fat:13,  unit:“100g” },
“Brócoli”:            { cal:34,  prot:2.8, carb:7,   fat:0.4, unit:“100g” },
“Pan integral”:       { cal:247, prot:13,  carb:41,  fat:4,   unit:“100g” },
“Yogur griego”:       { cal:100, prot:10,  carb:4,   fat:5,   unit:“100g” },
“Almendras”:          { cal:579, prot:21,  carb:22,  fat:50,  unit:“100g” },
“Aguacate”:           { cal:160, prot:2,   carb:9,   fat:15,  unit:“100g” },
“Arepa de maíz”:      { cal:160, prot:3,   carb:33,  fat:1.5, unit:“unidad” },
“Carne molida (res)”: { cal:215, prot:26,  carb:0,   fat:12,  unit:“100g” },
“Sardinas”:           { cal:208, prot:25,  carb:0,   fat:11,  unit:“100g” },
“Queso blanco”:       { cal:264, prot:18,  carb:1,   fat:21,  unit:“100g” },
“Yuca cocida”:        { cal:160, prot:1.4, carb:38,  fat:0.3, unit:“100g” },
};

// ─── ROUTINES DB ─────────────────────────────────────────────────────────────
const ROUTINES = {
“🦵 Piernas”: {
icon: “🦵”,
warmup: [“5–10 min caminata o bicicleta”, “Círculos de cadera x10 cada lado”, “Sentadillas sin peso x15”, “Bisagra de cadera x15”],
levels: {
“🟢 Principiante”: {
rest: “60–90 seg”,
exercises: [
{ name:“Sentadilla goblet”,         sets:“3”, reps:“12”,    muscles:“Cuádriceps, glúteos, core”,           tip:“Sostén un peso frente al pecho. Espalda recta, baja hasta 90°.” },
{ name:“Prensa de piernas”,          sets:“3”, reps:“12”,    muscles:“Cuádriceps, glúteos”,                 tip:“Pies a ancho de cadera. No bloquees las rodillas al extender.” },
{ name:“Curl femoral acostado”,      sets:“3”, reps:“12”,    muscles:“Isquiotibiales (femoral)”,            tip:“Contrae el femoral al subir, baja controlado. No uses impulso.” },
{ name:“Extensión de cuádriceps”,    sets:“3”, reps:“12”,    muscles:“Cuádriceps”,                          tip:“Extiende completamente. Sostén 1 seg arriba para activar mejor.” },
{ name:“Peso muerto rumano (mancuernas)”, sets:“3”, reps:“10”, muscles:“Femoral, glúteo, espalda baja”,   tip:“Caderas atrás, espalda neutral. Siente el estiramiento del femoral.” },
],
},
“🟡 Intermedio”: {
rest: “90–120 seg”,
exercises: [
{ name:“Sentadilla con barra”,       sets:“4 ef. + 2 aprox.”, reps:“8–10”, muscles:“Cuádriceps, glúteos, core”, tip:“2 series de calentamiento ligeras antes de las 4 efectivas. Barra sobre trapecios.” },
{ name:“Prensa de piernas”,          sets:“3”, reps:“10–12”,  muscles:“Cuádriceps, glúteos”,                tip:“Aumenta el peso vs principiante. Controla la bajada.” },
{ name:“Peso muerto rumano”,         sets:“3”, reps:“10”,     muscles:“Femoral, glúteo, lumbar”,            tip:“Barra o mancuernas. Caderas atrás, espalda neutra siempre.” },
{ name:“Curl femoral”,               sets:“3”, reps:“10–12”,  muscles:“Isquiotibiales”,                     tip:“Rango completo de movimiento. Evita arquear la espalda.” },
{ name:“Extensión de cuádriceps + dropset”, sets:“3”, reps:“12 + dropset”, muscles:“Cuádriceps”, tip:“Al terminar la última serie, baja el peso 30% y lleva al fallo.” },
],
},
“🔴 Pro”: {
rest: “2–3 min”,
exercises: [
{ name:“Sentadilla pesada”,          sets:“4 ef. + 2 aprox.”, reps:“6–8”, muscles:“Cuádriceps, glúteos, core”, tip:“2 aprox ligeras. 4 series pesadas. Control en la bajada, explosivo al subir.” },
{ name:“Prensa pesada”,              sets:“3”, reps:“8–10”,   muscles:“Cuádriceps, glúteos”,                tip:“Agarre amplio. Descenso lento 3 seg. Empuje completo.” },
{ name:“Peso muerto rumano”,         sets:“4”, reps:“8”,      muscles:“Femoral, glúteo, lumbar”,            tip:“Carga alta. Cinturón lumbar recomendado. Caderas atrás siempre.” },
{ name:“Curl femoral + drop”,        sets:“3”, reps:“10 + drop”, muscles:“Isquiotibiales”,                 tip:“Dropset al final de cada serie. Máxima fatiga del femoral.” },
{ name:“Extensión cuádriceps c/pausa”, sets:“3”, reps:“12”,  muscles:“Cuádriceps”,                         tip:“Pausa de 2 seg arriba en cada rep. Activa más el músculo.” },
{ name:“Hack squat”,                 sets:“2”, reps:“al fallo controlado”, muscles:“Cuádriceps, glúteos”, tip:“Máquina o con barra detrás. Último ejercicio, deja todo en la cancha.” },
],
},
},
},
“🍑 Glúteos”: {
icon: “🍑”,
warmup: [“Activación glúteo con banda x20”, “Puente de glúteo sin peso x15”, “Patada de burro x12 por lado”],
levels: {
“🟡 Intermedio”: {
rest: “60–90 seg”,
exercises: [
{ name:“Hip thrust”,                 sets:“4”, reps:“10”,    muscles:“Glúteo mayor (principal)”,           tip:“Espalda en banco, barra sobre caderas. Empuja con el talón. Aprieta glúteo arriba.” },
{ name:“Peso muerto rumano”,         sets:“3”, reps:“10”,    muscles:“Glúteo, femoral”,                    tip:“Bisagra de cadera perfecta. Siente el estiramiento antes de subir.” },
{ name:“Patada de glúteo (máquina)”, sets:“3”, reps:“12”,    muscles:“Glúteo mayor”,                      tip:“No uses impulso. Contracción máxima al final del recorrido.” },
{ name:“Abducción (máquina o banda)”, sets:“3”, reps:“15”,   muscles:“Glúteo medio y menor”,              tip:“Glúteo medio = forma y ancho. Mueve solo la cadera, no la espalda.” },
{ name:“Zancadas zig-zag abiertas”,  sets:“3”, reps:“12”,    muscles:“Glúteo, cuádriceps, aductores”,     tip:“Paso bien largo y abierto. El glúteo trabaja más que en zancada clásica.” },
],
},
},
},
“💪 Espalda”: {
icon: “💪”,
warmup: [“Rotación de hombros x10”, “Band pull-apart x15”, “Peso muerto con barra ligera x10”],
levels: {
“🟡 Intermedio”: {
rest: “90 seg”,
exercises: [
{ name:“Jalón al pecho”,             sets:“4”, reps:“10”,    muscles:“Dorsal ancho, bíceps, romboides”,   tip:“Agarre ancho. Jala hacia el pecho, no hacia atrás. Codos hacia abajo.” },
{ name:“Remo en polea”,              sets:“3”, reps:“10”,    muscles:“Dorsales, trapecio medio, bíceps”,  tip:“Espalda recta. Jala el codo atrás, aprieta escápulas al final.” },
{ name:“Remo con mancuerna”,         sets:“3”, reps:“10”,    muscles:“Dorsal, romboides, bíceps”,         tip:“Apoya rodilla y mano en banco. Codo pegado al cuerpo al subir.” },
{ name:“Pullover (mancuerna)”,       sets:“3”, reps:“12”,    muscles:“Dorsal, serrato, pectoral”,         tip:“Acostado en banco. Baja la mancuerna por detrás de la cabeza en arco.” },
{ name:“Face pull”,                  sets:“3”, reps:“15”,    muscles:“Trapecio posterior, manguito rotador”, tip:“Cuerda en polea alta. Jala hacia la cara separando las manos. Codos arriba.” },
],
},
},
},
“💥 Pecho + Tríceps”: {
icon: “💥”,
warmup: [“Rotaciones de hombro x10”, “Flexiones lentas x10”, “Pec fly sin peso x15”],
levels: {
“🟡 Intermedio”: {
rest: “90 seg”,
exercises: [
{ name:“Press de banca”,             sets:“4”, reps:“8–10”,  muscles:“Pectoral mayor, tríceps, deltoides”, tip:“Agarre algo más que ancho de hombros. Baja la barra al esternón. Empuja explosivo.” },
{ name:“Press inclinado mancuernas”, sets:“3”, reps:“10”,    muscles:“Pectoral superior, deltoides”,       tip:“Banco a 30–45°. Mancuernas se juntan arriba sin chocarse. Rango completo.” },
{ name:“Pec deck (mariposa)”,        sets:“3”, reps:“12”,    muscles:“Pectoral, aislamiento total”,        tip:“Codos ligeramente flexionados. Aprieta el pecho al cerrar. Abre lento.” },
{ name:“Extensión de polea”,         sets:“3”, reps:“12”,    muscles:“Tríceps largo, medial y lateral”,   tip:“Codos fijos al lado del cuerpo. Extiende completamente. Contrae abajo.” },
{ name:“Copa (tríceps)”,             sets:“3”, reps:“10”,    muscles:“Tríceps largo”,                     tip:“Mancuerna con ambas manos sobre la cabeza. Baja detrás de la nuca. Codos juntos.” },
{ name:“Rompecráneo”,                sets:“3”, reps:“10”,    muscles:“Tríceps”,                           tip:“Barra EZ o mancuernas. Baja hacia la frente. Solo mueves el codo, no el hombro.” },
],
},
},
},
“💪 Bíceps”: {
icon: “💪”,
warmup: [“Curl ligero x20”, “Rotación de muñecas x10”],
levels: {
“🟡 Intermedio”: {
rest: “60–75 seg”,
exercises: [
{ name:“Curl con barra”,             sets:“3”, reps:“10”,    muscles:“Bíceps braquial (cabeza larga y corta)”, tip:“Codos fijos a los lados. No uses la espalda. Gira las muñecas al subir.” },
{ name:“Predicador (curl)”,          sets:“3”, reps:“10”,    muscles:“Bíceps cabeza corta, braquial”,      tip:“Bíceps apoyados en el pad. Rango completo. Baja lento para mayor tensión.” },
{ name:“Curl martillo”,              sets:“3”, reps:“12”,    muscles:“Bíceps, braquiorradial (antebrazo)”, tip:“Agarre neutro (pulgar arriba). Trabaja el antebrazo también. Codos fijos.” },
{ name:“Curl inclinado”,             sets:“2”, reps:“12”,    muscles:“Bíceps cabeza larga (pico)”,         tip:“En banco inclinado. Brazos colgando atrás. Aísla la cabeza larga del bíceps.” },
],
},
},
},
“🧠 Hombros”: {
icon: “🧠”,
warmup: [“Rotación de hombros x10 por lado”, “Band pull-apart x15”, “Elevaciones frontales ligeras x10”],
levels: {
“🟡 Intermedio”: {
rest: “75–90 seg”,
exercises: [
{ name:“Press militar”,              sets:“4”, reps:“8”,     muscles:“Deltoides anterior y medio, tríceps”, tip:“De pie o sentado. Barra baja hasta la barbilla. No arquees la espalda.” },
{ name:“Elevaciones laterales”,      sets:“4”, reps:“12”,    muscles:“Deltoides medio (anchura)”,          tip:“Codos ligeramente doblados. Sube hasta la altura del hombro. Controla la bajada.” },
{ name:“Face pull”,                  sets:“3”, reps:“15”,    muscles:“Deltoides posterior, manguito”,      tip:“Cuerda en polea alta. Jala a la altura de los ojos. Codos por encima de los hombros.” },
{ name:“Pájaros (posteriores)”,      sets:“3”, reps:“12”,    muscles:“Deltoides posterior, romboides”,     tip:“Inclinado hacia adelante. Brazos abiertos como alas. Aprieta escápulas al final.” },
],
},
},
},
“🦵 Gemelos”: {
icon: “🦵”,
warmup: [“Caminata de puntillas x20 pasos”, “Estiramiento de pantorrilla x30 seg”],
levels: {
“🟡 Intermedio”: {
rest: “45–60 seg”,
exercises: [
{ name:“Elevación de talón de pie”,  sets:“4”, reps:“15”,    muscles:“Gastrocnemio (gemelo exterior)”,     tip:“Pausa arriba 1 seg. Baja hasta el estiramiento completo. Con peso si puedes.” },
{ name:“Elevación de talón sentado”, sets:“3”, reps:“15”,    muscles:“Sóleo (gemelo interior profundo)”,  tip:“Rodillas a 90°. El sóleo solo se activa con la rodilla doblada. Rango completo.” },
],
},
},
},
“💪 Antebrazo”: {
icon: “💪”,
warmup: [“Rotación de muñecas x15”, “Apertura y cierre de mano x20”],
levels: {
“🟡 Intermedio”: {
rest: “45 seg”,
exercises: [
{ name:“Curl de muñeca”,             sets:“3”, reps:“15”,    muscles:“Flexores del antebrazo”,             tip:“Antebrazos apoyados en el banco. Mueve solo la muñeca. Rango completo.” },
{ name:“Reverse curl”,               sets:“3”, reps:“12”,    muscles:“Extensores del antebrazo, braquiorradial”, tip:“Agarre pronado (palmas abajo). Más difícil. Trabaja el lado contrario del antebrazo.” },
],
},
},
},
};

// ─── ENERGY MODIFIER ─────────────────────────────────────────────────────────
const ENERGY_MODS = {
5: { label:“🔥 Listo para romperla”, mod:”+10% peso, +1 serie”, color: C.accent },
4: { label:“💪 Buen día”,           mod:“Rutina normal”,         color: “#7bed9f” },
3: { label:“😐 Regular”,            mod:”-10% peso sugerido”,    color: C.yellow },
2: { label:“😴 Cansado”,            mod:“Solo ejercicios base”,  color: “#ffa502” },
1: { label:“🤕 Muy bajo”,           mod:“Movilidad y descanso”,  color: C.red },
};
const PAIN_ZONES = [“Sin molestias”,“Espalda baja”,“Rodilla”,“Hombro”,“Cuello”,“Cadera”,“Tobillo”];

// ─── HELPER COMPONENTS ───────────────────────────────────────────────────────
const MacroBar = ({ label, value, max, color }) => {
const pct = Math.min((value / max) * 100, 100);
return (
<div style={{ marginBottom: 10 }}>
<div style={{ display:“flex”, justifyContent:“space-between”, fontSize:12, color:C.sub, marginBottom:4 }}>
<span style={{ fontWeight:700, color:C.text }}>{label}</span>
<span>{Math.round(value)}g / {max}g</span>
</div>
<div style={{ background:”#1e2230”, borderRadius:8, height:8, overflow:“hidden” }}>
<div style={{ width:`${pct}%`, height:“100%”, background:color, borderRadius:8, transition:“width 0.5s ease” }} />
</div>
</div>
);
};

const CalRing = ({ consumed, goal }) => {
const pct = Math.min(consumed / goal, 1);
const r=54, cx=64, cy=64, circ=2*Math.PI*r, dash=pct*circ;
const color = pct>1 ? C.red : pct>0.8 ? C.yellow : C.accent;
return (
<div style={{ position:“relative”, width:128, height:128 }}>
<svg width="128" height="128">
<circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e2230" strokeWidth="10"/>
<circle cx={cx} cy={cy} r={r} fill=“none” stroke={color} strokeWidth=“10”
strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ/4} strokeLinecap=“round”
style={{ transition:“stroke-dasharray 0.6s ease”, filter:`drop-shadow(0 0 6px ${color})` }}/>
</svg>
<div style={{ position:“absolute”, top:“50%”, left:“50%”, transform:“translate(-50%,-50%)”, textAlign:“center” }}>
<div style={{ fontSize:22, fontWeight:800, color:C.text, fontFamily:”‘Syne’,sans-serif” }}>{Math.round(consumed)}</div>
<div style={{ fontSize:10, color:C.muted }}>/ {goal} kcal</div>
</div>
</div>
);
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function PanaTrainer() {
const [tab, setTab]               = useState(“rutinas”);
const [meals, setMeals]           = useState([]);
const [search, setSearch]         = useState(””);
const [qty, setQty]               = useState(100);
const [selFood, setSelFood]       = useState(null);
const [goal, setGoal]             = useState(2000);
const [protG, setProtG]           = useState(150);
const [carbG, setCarbG]           = useState(200);
const [fatG, setFatG]             = useState(65);
const [selectedRoutine, setSelectedRoutine] = useState(“🦵 Piernas”);
const [selectedLevel, setSelectedLevel]     = useState(null);
const [completedSets, setCompletedSets]     = useState({});
const [showTip, setShowTip]       = useState(null);
const [energy, setEnergy]         = useState(null);
const [painZone, setPainZone]     = useState(“Sin molestias”);
const [showWarmup, setShowWarmup] = useState(false);
const [profile, setProfile]       = useState({ peso:””, altura:””, edad:””, objetivo:“ganar músculo” });
const [showProfile, setShowProfile] = useState(false);
const [aiQ, setAiQ]               = useState(””);
const [aiResp, setAiResp]         = useState(””);
const [aiLoad, setAiLoad]         = useState(false);

const totals = meals.reduce((a,m)=>({ cal:a.cal+m.cal, prot:a.prot+m.prot, carb:a.carb+m.carb, fat:a.fat+m.fat }),
{ cal:0, prot:0, carb:0, fat:0 });

const filteredFoods = Object.entries(MACROS_DB).filter(([n])=>n.toLowerCase().includes(search.toLowerCase()));

const addMeal = () => {
if (!selFood) return;
const [name, d] = selFood;
const f = qty / 100;
setMeals(p=>[…p,{ id:Date.now(), name, qty, cal:+(d.cal*f).toFixed(1), prot:+(d.prot*f).toFixed(1), carb:+(d.carb*f).toFixed(1), fat:+(d.fat*f).toFixed(1) }]);
setSearch(””); setSelFood(null); setQty(100);
};

const toggleSet = (key) => setCompletedSets(p=>({ …p, [key]:!p[key] }));

const askAI = async () => {
if (!aiQ.trim()) return;
setAiLoad(true); setAiResp(””);
const pInfo = profile.peso ? `Peso:${profile.peso}kg, Altura:${profile.altura}cm, Edad:${profile.edad}, Objetivo:${profile.objetivo}.` : “”;
const nInfo = meals.length ? `Hoy consumió: ${Math.round(totals.cal)}kcal, ${Math.round(totals.prot)}g prot, ${Math.round(totals.carb)}g carbos, ${Math.round(totals.fat)}g grasa.` : “”;
const eInfo = energy ? `Nivel de energía hoy: ${energy}/5 (${ENERGY_MODS[energy].label}). Molestia: ${painZone}.` : “”;
try {
const res = await fetch(“https://api.anthropic.com/v1/messages”,{
method:“POST”, headers:{“Content-Type”:“application/json”},
body: JSON.stringify({
model:“claude-sonnet-4-20250514”, max_tokens:1000,
system:`Eres PanaTrainer AI, entrenador personal y nutricionista virtual gratuito para la comunidad venezolana. Hablas de forma cercana, venezolana y motivadora. Usas términos como "pana", "chamo", "vamos a romperla". Das consejos prácticos y basados en ciencia. ${pInfo} ${nInfo} ${eInfo} Responde en máximo 3 párrafos cortos.`,
messages:[{ role:“user”, content:aiQ }],
}),
});
const data = await res.json();
setAiResp(data.content?.[0]?.text || “No pude procesar la respuesta.”);
} catch { setAiResp(“Error de conexión. Verifica tu internet.”); }
setAiLoad(false);
};

const S = {
app:  { minHeight:“100vh”, background:C.bg, color:C.text, fontFamily:”‘DM Sans’,sans-serif”, maxWidth:480, margin:“0 auto”, paddingBottom:100 },
card: { background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:16, marginBottom:12 },
inp:  { width:“100%”, background:”#1a1d28”, border:`1px solid ${C.border}`, borderRadius:10, padding:“10px 14px”, color:C.text, fontSize:14, outline:“none”, fontFamily:”‘DM Sans’,sans-serif”, boxSizing:“border-box” },
btn:  (col=C.accent) => ({ background:col, color:”#000”, border:“none”, borderRadius:10, padding:“10px 18px”, fontWeight:800, fontSize:13, cursor:“pointer”, fontFamily:”‘DM Sans’,sans-serif”, letterSpacing:0.3 }),
bOut: { background:“transparent”, color:C.accent, border:`1px solid ${C.accent}`, borderRadius:10, padding:“8px 14px”, fontWeight:700, fontSize:12, cursor:“pointer”, fontFamily:”‘DM Sans’,sans-serif” },
chip: (col) => ({ display:“inline-block”, background:`${col}22`, color:col, borderRadius:6, padding:“2px 8px”, fontSize:11, fontWeight:700 }),
sec:  { padding:“16px 16px 0” },
tab:  (a) => ({ flex:1, padding:“10px 4px”, border:“none”, background:“none”, cursor:“pointer”, fontSize:10, fontWeight:700, letterSpacing:0.5, textTransform:“uppercase”, color:a?C.accent:C.muted, borderBottom:a?`2px solid ${C.accent}`:“2px solid transparent”, transition:“all 0.2s”, fontFamily:”‘DM Sans’,sans-serif” }),
};

const routine = ROUTINES[selectedRoutine];
const levels  = routine ? Object.keys(routine.levels) : [];
const activeLevel = selectedLevel && routine?.levels[selectedLevel] ? selectedLevel : levels[0];

return (
<>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;700;800&display=swap" rel="stylesheet"/>
<div style={S.app}>

```
    {/* ── HEADER ── */}
    <div style={{ padding:"20px 16px 0", background:`linear-gradient(180deg,#090b0f 0%,${C.bg} 100%)` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:26, fontWeight:900, fontFamily:"'Syne',sans-serif", letterSpacing:-1 }}>
            Pana<span style={{ color:C.accent }}>Trainer</span>
            <span style={{ fontSize:14, marginLeft:6 }}>🇻🇪</span>
          </div>
          <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>Tu entrenador gratuito, pana 💪</div>
        </div>
        <button style={S.bOut} onClick={()=>setShowProfile(!showProfile)}>
          {profile.peso ? `${profile.peso}kg` : "Mi perfil"}
        </button>
      </div>
    </div>

    {/* ── ENERGY CHECK-IN ── */}
    {tab==="rutinas" && (
      <div style={{ ...S.sec }}>
        <div style={{ ...S.card, padding:"14px 16px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:1, marginBottom:10 }}>¿CÓMO ESTÁS HOY, PANA?</div>
          <div style={{ display:"flex", gap:6, marginBottom:10 }}>
            {[1,2,3,4,5].map(n=>(
              <button key={n} onClick={()=>setEnergy(n)} style={{
                flex:1, padding:"8px 4px", borderRadius:10, border:`2px solid ${energy===n ? ENERGY_MODS[n].color : C.border}`,
                background: energy===n ? `${ENERGY_MODS[n].color}20` : "transparent",
                cursor:"pointer", fontSize:18, transition:"all 0.15s",
              }}>{["😴","🤕","😐","💪","🔥"][n-1]}</button>
            ))}
          </div>
          {energy && (
            <div style={{ fontSize:12, color:ENERGY_MODS[energy].color, fontWeight:700, marginBottom:8 }}>
              {ENERGY_MODS[energy].label} — {ENERGY_MODS[energy].mod}
            </div>
          )}
          <div style={{ fontSize:11, color:C.muted, marginBottom:6 }}>Molestias / dolores hoy:</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
            {PAIN_ZONES.map(z=>(
              <button key={z} onClick={()=>setPainZone(z)} style={{
                padding:"4px 10px", borderRadius:20, border:"none", cursor:"pointer", fontSize:11, fontWeight:700,
                background: painZone===z ? (z==="Sin molestias"?`${C.accent}30`:`${C.red}30`) : "#1e2230",
                color: painZone===z ? (z==="Sin molestias"?C.accent:C.red) : C.sub,
                transition:"all 0.15s",
              }}>{z}</button>
            ))}
          </div>
          {painZone!=="Sin molestias" && (
            <div style={{ marginTop:8, background:`${C.red}15`, border:`1px solid ${C.red}44`, borderRadius:8, padding:"8px 10px", fontSize:11, color:C.red }}>
              ⚠️ Tienes molestia en <strong>{painZone}</strong>. Evita ejercicios que carguen esa zona. Consulta tu coach IA.
            </div>
          )}
        </div>
      </div>
    )}

    {/* ── PROFILE ── */}
    {showProfile && (
      <div style={S.sec}>
        <div style={S.card}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:12, color:C.accent }}>⚙️ Tu perfil</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {[["peso","Peso (kg)","70"],["altura","Altura (cm)","170"],["edad","Edad","25"]].map(([k,l,ph])=>(
              <div key={k}>
                <div style={{ fontSize:11, color:C.muted, marginBottom:3 }}>{l}</div>
                <input style={S.inp} type="number" placeholder={ph} value={profile[k]} onChange={e=>setProfile(p=>({...p,[k]:e.target.value}))}/>
              </div>
            ))}
            <div>
              <div style={{ fontSize:11, color:C.muted, marginBottom:3 }}>Objetivo</div>
              <select style={{ ...S.inp, cursor:"pointer" }} value={profile.objetivo} onChange={e=>setProfile(p=>({...p,objetivo:e.target.value}))}>
                {["ganar músculo","perder grasa","mantenimiento","mejorar resistencia"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <button style={{ ...S.btn(), marginTop:12, width:"100%" }} onClick={()=>setShowProfile(false)}>Guardar ✓</button>
        </div>
      </div>
    )}

    {/* ── TABS ── */}
    <div style={{ display:"flex", gap:4, padding:"12px 16px 0", borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, background:C.bg, zIndex:10 }}>
      {[["rutinas","🏋️ Rutinas"],["nutricion","🥗 Nutrición"],["ai","🤖 Coach IA"]].map(([id,label])=>(
        <button key={id} style={S.tab(tab===id)} onClick={()=>setTab(id)}>{label}</button>
      ))}
    </div>

    {/* ════════════ RUTINAS TAB ════════════ */}
    {tab==="rutinas" && (
      <div style={S.sec}>
        {/* Routine selector */}
        <div style={{ ...S.card, padding:"12px 14px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:1, marginBottom:10 }}>GRUPO MUSCULAR</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {Object.keys(ROUTINES).map(r=>(
              <button key={r} onClick={()=>{ setSelectedRoutine(r); setSelectedLevel(null); setShowWarmup(false); }} style={{
                padding:"6px 12px", borderRadius:20, border:"none", cursor:"pointer", fontSize:12, fontWeight:700,
                background: selectedRoutine===r ? C.accent : "#1e2230",
                color: selectedRoutine===r ? "#000" : C.sub,
                transition:"all 0.2s",
              }}>{r}</button>
            ))}
          </div>
        </div>

        {routine && (
          <>
            {/* Warmup */}
            <div style={S.card}>
              <button style={{ background:"none", border:"none", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%", padding:0 }}
                onClick={()=>setShowWarmup(!showWarmup)}>
                <span style={{ fontWeight:800, fontSize:14, color:C.yellow }}>🔥 Calentamiento</span>
                <span style={{ color:C.muted, fontSize:12 }}>{showWarmup?"▲ Ocultar":"▼ Ver"}</span>
              </button>
              {showWarmup && (
                <div style={{ marginTop:10 }}>
                  {routine.warmup.map((w,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 0", borderBottom:i<routine.warmup.length-1?`1px solid ${C.border}`:"none" }}>
                      <span style={{ color:C.yellow, fontWeight:700 }}>{i+1}.</span>
                      <span style={{ fontSize:13, color:C.sub }}>{w}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Level tabs */}
            {levels.length > 1 && (
              <div style={{ display:"flex", gap:6, marginBottom:12 }}>
                {levels.map(l=>(
                  <button key={l} onClick={()=>setSelectedLevel(l)} style={{
                    flex:1, padding:"8px", borderRadius:10, border:`2px solid ${activeLevel===l?C.accent:C.border}`,
                    background: activeLevel===l?`${C.accent}15`:"transparent",
                    cursor:"pointer", fontSize:12, fontWeight:700,
                    color: activeLevel===l?C.accent:C.muted,
                    transition:"all 0.15s",
                  }}>{l}</button>
                ))}
              </div>
            )}

            {/* Exercises */}
            {routine.levels[activeLevel] && (() => {
              const lvl = routine.levels[activeLevel];
              return (
                <>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <span style={{ fontSize:11, color:C.muted, fontWeight:700 }}>DESCANSO ENTRE SERIES</span>
                    <span style={{ fontSize:12, fontWeight:800, color:C.yellow }}>{lvl.rest}</span>
                  </div>
                  {lvl.exercises.map((ex,ei)=>{
                    const numSets = parseInt(ex.sets) || 3;
                    return (
                      <div key={ex.name} style={S.card}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                          <div style={{ flex:1 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
                              <span style={{ background:`${C.accent}22`, color:C.accent, borderRadius:6, padding:"1px 7px", fontSize:11, fontWeight:800 }}>{ei+1}</span>
                              <span style={{ fontWeight:800, fontSize:14 }}>{ex.name}</span>
                            </div>
                            <div style={{ fontSize:11, color:C.muted }}>{ex.muscles}</div>
                          </div>
                        </div>
                        <div style={{ display:"flex", gap:8, marginBottom:12 }}>
                          {[["Series",ex.sets],["Reps",ex.reps]].map(([l,v])=>(
                            <div key={l} style={{ flex:1, background:"#1a1d28", borderRadius:10, padding:"8px 10px", textAlign:"center" }}>
                              <div style={{ fontSize:10, color:C.muted }}>{l}</div>
                              <div style={{ fontWeight:800, fontSize:12, color:C.text, marginTop:2 }}>{v}</div>
                            </div>
                          ))}
                        </div>
                        {/* Set tracker */}
                        <div style={{ marginBottom:10 }}>
                          <div style={{ fontSize:10, color:C.muted, marginBottom:6, letterSpacing:0.5 }}>MARCAR SERIES</div>
                          <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                            {Array.from({ length: numSets }).map((_,i)=>{
                              const k=`${selectedRoutine}-${activeLevel}-${ex.name}-${i}`;
                              const done=completedSets[k];
                              return (
                                <button key={i} onClick={()=>toggleSet(k)} style={{
                                  width:34, height:34, borderRadius:9, border:`2px solid ${done?C.accent:C.border}`,
                                  background:done?`${C.accent}20`:"transparent", cursor:"pointer",
                                  fontSize:done?14:12, fontWeight:700,
                                  color:done?C.accent:C.muted,
                                  transition:"all 0.2s",
                                }}>{done?"✓":i+1}</button>
                              );
                            })}
                          </div>
                        </div>
                        <button style={{ ...S.bOut, fontSize:11, width:"100%" }} onClick={()=>setShowTip(showTip===ex.name?null:ex.name)}>
                          {showTip===ex.name?"▲ Cerrar técnica":"💡 Técnica correcta"}
                        </button>
                        {showTip===ex.name && (
                          <div style={{ marginTop:10, background:`${C.accent}10`, border:`1px solid ${C.accentDim}33`, borderRadius:10, padding:12, fontSize:13, color:C.sub, lineHeight:1.7 }}>
                            {ex.tip}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              );
            })()}
          </>
        )}
      </div>
    )}

    {/* ════════════ NUTRICIÓN TAB ════════════ */}
    {tab==="nutricion" && (
      <div style={S.sec}>
        <div style={{ ...S.card, display:"flex", alignItems:"center", gap:16 }}>
          <CalRing consumed={totals.cal} goal={goal}/>
          <div style={{ flex:1 }}>
            <MacroBar label="Proteína" value={totals.prot} max={protG} color={C.blue}/>
            <MacroBar label="Carbos"   value={totals.carb} max={carbG} color={C.yellow}/>
            <MacroBar label="Grasa"    value={totals.fat}  max={fatG}  color={C.red}/>
          </div>
        </div>
        <div style={S.card}>
          <div style={{ fontSize:11, fontWeight:700, color:C.muted, marginBottom:10, letterSpacing:1 }}>METAS DIARIAS</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {[["Meta kcal",goal,setGoal,C.accent],["Proteína g",protG,setProtG,C.blue],["Carbos g",carbG,setCarbG,C.yellow],["Grasa g",fatG,setFatG,C.red]].map(([l,v,s,col])=>(
              <div key={l}>
                <div style={{ fontSize:10, color:C.muted, marginBottom:3 }}>{l}</div>
                <input style={{ ...S.inp, borderColor:`${col}44`, fontSize:14 }} type="number" value={v} onChange={e=>s(+e.target.value)}/>
              </div>
            ))}
          </div>
        </div>
        <div style={S.card}>
          <div style={{ fontSize:11, fontWeight:700, color:C.muted, marginBottom:10, letterSpacing:1 }}>AGREGAR ALIMENTO</div>
          <input style={{ ...S.inp, marginBottom:8 }} placeholder="Buscar alimento..." value={search} onChange={e=>{ setSearch(e.target.value); setSelFood(null); }}/>
          {search && (
            <div style={{ maxHeight:180, overflowY:"auto", marginBottom:8 }}>
              {filteredFoods.map(([name,d])=>(
                <div key={name} onClick={()=>setSelFood([name,d])} style={{
                  padding:"9px 12px", borderRadius:10, cursor:"pointer", marginBottom:4,
                  background:selFood?.[0]===name?`${C.accent}15`:"transparent",
                  border:selFood?.[0]===name?`1px solid ${C.accentDim}`:`1px solid transparent`,
                  transition:"all 0.1s",
                }}>
                  <div style={{ fontWeight:600, fontSize:13 }}>{name}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{d.cal}kcal · {d.prot}g prot · por {d.unit}</div>
                </div>
              ))}
              {!filteredFoods.length && <div style={{ fontSize:12, color:C.muted, padding:8 }}>Sin resultados</div>}
            </div>
          )}
          {selFood && (
            <div style={{ display:"flex", gap:8, alignItems:"flex-end" }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:11, color:C.muted, marginBottom:3 }}>Cantidad ({selFood[1].unit})</div>
                <input style={S.inp} type="number" value={qty} onChange={e=>setQty(+e.target.value)} min={1}/>
              </div>
              <button style={S.btn()} onClick={addMeal}>+ Agregar</button>
            </div>
          )}
        </div>
        {meals.length>0 && (
          <div style={S.card}>
            <div style={{ fontSize:11, fontWeight:700, color:C.muted, marginBottom:10, letterSpacing:1 }}>REGISTRO DE HOY</div>
            {meals.map(m=>(
              <div key={m.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:600 }}>{m.name}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{m.qty}g · P:{m.prot}g · C:{m.carb}g · G:{m.fat}g</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontWeight:800, color:C.accent }}>{m.cal}kcal</span>
                  <button style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:16 }} onClick={()=>setMeals(p=>p.filter(x=>x.id!==m.id))}>×</button>
                </div>
              </div>
            ))}
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:10, fontWeight:800 }}>
              <span>TOTAL</span>
              <span style={{ color:C.accent }}>{Math.round(totals.cal)} kcal</span>
            </div>
          </div>
        )}
      </div>
    )}

    {/* ════════════ AI COACH TAB ════════════ */}
    {tab==="ai" && (
      <div style={S.sec}>
        <div style={{ ...S.card, background:`linear-gradient(135deg,#0d1a14 0%,${C.card} 100%)`, border:`1px solid ${C.accentDim}44` }}>
          <div style={{ fontSize:22, marginBottom:4 }}>🤖🇻🇪</div>
          <div style={{ fontWeight:800, fontSize:16, color:C.accent, marginBottom:6 }}>PanaTrainer AI Coach</div>
          <div style={{ fontSize:13, color:C.sub, lineHeight:1.6 }}>
            Chamo, pregúntame lo que quieras sobre entrenamiento, nutrición o tu cuerpo. Tengo en cuenta tu perfil, lo que comiste y cómo estás hoy.
          </div>
        </div>
        <div style={S.card}>
          <div style={{ fontSize:11, color:C.muted, marginBottom:10, fontWeight:700, letterSpacing:1 }}>PREGUNTAS RÁPIDAS</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {[
              "¿Qué como antes y después de entrenar?",
              "Tengo molestia en la rodilla, ¿qué hago?",
              "¿Cuánta proteína necesito para ganar músculo?",
              "Dame una rutina rápida de 20 min en casa",
              "Explícame por qué el hip thrust es clave para el glúteo",
              "¿Cómo gano músculo sin suplementos caros?",
            ].map(q=>(
              <button key={q} onClick={()=>setAiQ(q)} style={{
                textAlign:"left", padding:"10px 12px", background:"#1a1d28", border:`1px solid ${C.border}`,
                borderRadius:10, cursor:"pointer", fontSize:12, color:C.sub, fontFamily:"'DM Sans',sans-serif",
              }}>💬 {q}</button>
            ))}
          </div>
        </div>
        <div style={S.card}>
          <textarea style={{ ...S.inp, minHeight:80, resize:"none", marginBottom:10 }}
            placeholder="Escribe tu pregunta, pana..."
            value={aiQ} onChange={e=>setAiQ(e.target.value)}
          />
          <button style={{ ...S.btn(), width:"100%", opacity:aiLoad?0.7:1 }} onClick={askAI} disabled={aiLoad}>
            {aiLoad?"⏳ Pensando...":"🚀 Preguntarle al Coach IA"}
          </button>
        </div>
        {aiResp && (
          <div style={{ ...S.card, border:`1px solid ${C.accentDim}44`, background:`linear-gradient(135deg,#0d1a14 0%,${C.card} 100%)` }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.accent, marginBottom:10 }}>🤖 PANATRAINER AI</div>
            <div style={{ fontSize:14, color:C.sub, lineHeight:1.7, whiteSpace:"pre-wrap" }}>{aiResp}</div>
          </div>
        )}
        <div style={{ textAlign:"center", fontSize:11, color:C.muted, padding:"8px 16px 0" }}>
          PanaTrainer esta basado en estudios
          cientificos y cuenta con un team especiLizado en sala de musculacion
        </div>
      </div>
    )}

    {/* ── FOOTER ── */}
    <div style={{ textAlign:"center", padding:"24px 16px 16px", borderTop:`1px solid ${C.border}`, marginTop:16 }}>
      <div style={{ fontWeight:900, fontFamily:"'Syne',sans-serif", fontSize:14, letterSpacing:-0.5 }}>
        Pana<span style={{ color:C.accent }}>Trainer</span>
      </div>
      <div style={{ fontSize:11, color:C.muted, marginTop:4 }}>
        Elaborada por <span style={{ color:C.accent, fontWeight:700 }}>InversionesRojas</span> 🇻🇪
      </div>
      <div style={{ fontSize:10, color:"#3a3f50", marginTop:4 }}>
        © 2026 · Para la comunidad hispanohablante 💪
      </div>
    </div>

  </div>
</>
```

);
}
