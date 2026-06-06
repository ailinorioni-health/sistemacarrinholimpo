import { useState, useEffect, useRef, useCallback, useMemo } from "react";



const STOPS = [
  { id:1, name:"Hortifruti", time:480, emoji:"🥬", color:"#4ECDC4",
    insight:"80% dos fitonutrientes que seu corpo precisa vêm das cores dos vegetais. Vermelho = licopeno (proteção celular). Laranja = betacaroteno (pele, visão). Verde escuro = ferro e clorofila. Roxo = antocianinas (anti-envelhecimento). Quanto mais cores, mais completa a nutrição.",
    tip:"Comece sempre aqui. Carrinho com verduras cria ancoragem positiva — seu cérebro resiste mais ao impulso depois.",
    items: [
      {n:"Folhas verdes (alface, rúcula, espinafre, couve)",h:"1 tipo por pessoa",t:["verde","fibra"]},
      {n:"Tomate",h:"2-3 por pessoa/sem",t:["vermelho"]},
      {n:"Cebola",h:"1-2 por pessoa/sem",t:["base"]},
      {n:"Alho",h:"1 cabeça dura ~2 sem",t:["base","anti-inflam"]},
      {n:"Cenoura",h:"2-3 por pessoa/sem",t:["laranja"]},
      {n:"Abobrinha / Brócolis / Vagem",h:"escolha 1-2 tipos",t:["verde","fibra"]},
      {n:"Batata-doce / Abóbora / Mandioca",h:"1-2x na semana",t:["laranja","energia"]},
      {n:"Banana",h:"3-4 por pessoa/sem",t:["amarelo","energia"]},
      {n:"Frutas cítricas (laranja, mexerica, kiwi)",h:"2-3 por pessoa/sem",t:["amarelo","vitC"]},
      {n:"Frutas da estação (manga, mamão, melão)",h:"varie conforme a estação",t:["variado"]},
      {n:"Frutas vermelhas (morango, amora, mirtilo)",h:"1 bandeja por compra",t:["roxo","antioxid"]},
      {n:"Abacate",h:"1-2 por pessoa/sem",t:["verde","gord-boa"]},
      {n:"Limão",h:"2-3 por pessoa/sem",t:["verde"]},
      {n:"Gengibre",h:"1 pedaço dura ~2 sem",t:["anti-inflam"]},
      {n:"Ervas frescas (salsinha, cebolinha, hortelã)",h:"1 maço por compra",t:["verde"]},
    ]},
  { id:2, name:"Proteínas", time:300, emoji:"🥚", color:"#3ecfb8",
    insight:"Proteína não é só músculo — é saciedade, estabilidade de humor, reparação celular e energia que dura. Sem proteína adequada, vem a fome em 2h e o impulso por açúcar. Varie entre fontes animais e vegetais pra diversificar aminoácidos e nutrientes.",
    tip:"Embutidos: se \"peru\" não é o 1º ingrediente do peito de peru, não é peito de peru. Prefira proteínas de 1 ingrediente.",
    items: [
      {n:"Ovos (caipira se possível)",h:"~1 por pessoa/dia",t:["completa","essencial"]},
      {n:"Frango (peito ou coxa/sobrecoxa)",h:"2-3 refeições/sem",t:["magra"]},
      {n:"Peixe (sardinha, salmão, tilápia, pescada)",h:"1-2x na semana",t:["omega3"]},
      {n:"Carne vermelha (patinho, alcatra, acém)",h:"1-2x na semana",t:["ferro"]},
      {n:"Tofu / Tempeh",h:"se consumir, 1-2x/sem",t:["vegetal"]},
      {n:"Sardinha em lata (em azeite)",h:"1-2 latas/sem",t:["omega3","pratico"]},
      {n:"Atum em lata (em água)",h:"1-2 latas/sem",t:["pratico"]},
      {n:"Camarão / Frutos do mar",h:"opcional, 1x/sem",t:["omega3"]},
    ]},
  { id:3, name:"Grãos e Secos", time:300, emoji:"🌾", color:"#4dbfa5",
    insight:"A combinação arroz + feijão forma uma proteína completa e é uma das refeições mais equilibradas do mundo. Grãos integrais liberam glicose devagar, mantendo energia estável por horas. Isso é ouro nutricional — e custa pouco.",
    tip:"Se vem em pacote, idealmente tem 1 ingrediente: ele mesmo. Prefira granel — mais barato, menos marketing, zero embalagem desnecessária.",
    items: [
      {n:"Arroz (integral, branco ou parboilizado)",h:"base diária, ajuste ao consumo",t:["energia","base"]},
      {n:"Feijão (carioca, preto, branco, fradinho)",h:"base diária ou dia sim/dia não",t:["prot-veg","fibra"]},
      {n:"Lentilha / Grão de bico",h:"1-2x/sem como alternativa",t:["prot-veg","ferro"]},
      {n:"Aveia em flocos (grossa ou fina)",h:"~3 colheres/dia por pessoa",t:["fibra","energia"]},
      {n:"Castanhas / Nozes / Amêndoas",h:"~1 punhado/dia por pessoa",t:["gord-boa","saciedade"]},
      {n:"Quinoa / Amaranto",h:"1-2x/sem como variação",t:["prot-completa"]},
      {n:"Linhaça dourada / Chia",h:"1 colher/dia por pessoa",t:["omega3","fibra"]},
      {n:"Farinha integral / Polvilho / Tapioca",h:"conforme uso na cozinha",t:["base"]},
      {n:"Pipoca de milho (grão, não micro-ondas)",h:"1 pacote dura várias vezes",t:["snack-real"]},
      {n:"Gergelim / Semente de abóbora",h:"1 pacote dura ~2 sem",t:["mineral"]},
    ]},
  { id:4, name:"Laticínios", time:300, emoji:"🧀", color:"#5cb392",
    insight:"Zona de maior disfarce no mercado. Um \"iogurte grego zero\" pode ter mais ingredientes que um bolo. A regra de ouro: iogurte natural = leite + fermento. Se tem lista longa, não é natural — é marketing. Se não consome laticínios, pule sem culpa: bio-individualidade é um princípio central.",
    tip:"Simplicidade é o guia aqui. Iogurte: máx. 2-3 ingredientes. Queijo: até 4. Se não consome laticínio, passe direto pra parada 5.",
    items: [
      {n:"Iogurte natural integral (leite + fermento)",h:"~1 por pessoa/dia",t:["probiotico","essencial"]},
      {n:"Leite integral ou semidesnatado",h:"conforme consumo da casa",t:["base"]},
      {n:"Bebida vegetal (aveia, coco, castanha)",h:"conforme consumo da casa",t:["vegetal"]},
      {n:"Queijo fresco / Cottage / Minas frescal",h:"1-2 tipos por compra",t:["proteina","calcio"]},
      {n:"Queijo parmesão (peça, não ralado)",h:"1 pedaço dura ~2 sem",t:["sabor"]},
      {n:"Ricota fresca",h:"se gostar, 1 por compra",t:["leve"]},
      {n:"Manteiga (de verdade, não margarina)",h:"1 tablete dura ~2 sem",t:["gord-boa"]},
      {n:"Kefir (se encontrar)",h:"1 por compra pra testar",t:["probiotico"]},
    ]},
  { id:5, name:"Complementos", time:420, emoji:"🫒", color:"#3BA99E",
    insight:"Estes itens transformam comida básica em refeição saborosa. Azeite, temperos, pasta de amendoim — são eles que garantem que comer bem não seja monótono. Sem sabor, nenhum sistema se sustenta. O segredo da alimentação sustentável é prazer consciente.",
    tip:"Última parada, carrinho cheio. Menos espaço mental pro impulso. Se algo entra aqui \"só pra experimentar\", observe: é curiosidade legítima ou padrão de compra automática?",
    items: [
      {n:"Azeite extra virgem",h:"1 garrafa dura ~2-3 sem",t:["gord-boa","essencial"]},
      {n:"Pasta de amendoim (sem açúcar, sem hidrogenada)",h:"1 pote dura ~2 sem",t:["proteina","saciedade"]},
      {n:"Chocolate 70%+ (quanto mais cacau, melhor)",h:"1-2 barras/sem",t:["antioxid","prazer"]},
      {n:"Mel puro / Melado de cana",h:"1 pote dura ~3-4 sem",t:["adocante"]},
      {n:"Frutas secas (uva-passa, tâmara, damasco)",h:"1 pacote/sem",t:["energia"]},
      {n:"Coco ralado / Leite de coco",h:"conforme receitas",t:["gord-boa"]},
      {n:"Tahine (pasta de gergelim)",h:"1 pote dura ~3 sem",t:["mineral","gord-boa"]},
      {n:"Temperos (cúrcuma, páprica, cominho, orégano)",h:"reponha quando acabar",t:["anti-inflam"]},
      {n:"Vinagre de maçã",h:"1 garrafa dura ~1 mês",t:["digestao"]},
      {n:"Café / Chás naturais (camomila, hortelã, verde)",h:"conforme ritual diário",t:["ritual"]},
    ]},
];

function evaluate(ck, setup) {
  const res = []; let tCk=0, tIt=0; const cats={}; const tags={};
  const colors = new Set();
  STOPS.forEach(s => { let sc=0; s.items.forEach((it,i) => { tIt++; if(ck[`${s.id}-${i}`]) { tCk++; sc++; it.t.forEach(t => {tags[t]=(tags[t]||0)+1}); if(s.id===1) it.t.forEach(t => {if(["verde","vermelho","laranja","amarelo","roxo"].includes(t)) colors.add(t);}); }}); cats[s.id]={c:sc,t:s.items.length,n:s.name}; });
  const pct = Math.round((tCk/tIt)*100);

  if(pct>=75) res.push({tp:"s",ti:"Compra completa e equilibrada 🎯",m:"Você cobriu a grande maioria dos grupos alimentares. Isso cria uma base nutricional sólida pra semana — o tipo de compra que sustenta energia estável, humor equilibrado e menos impulsos."});
  else if(pct>=45) res.push({tp:"i",ti:"Boa base, com espaço pra crescer",m:"Você cobriu o essencial. Observe as categorias com menos itens — podem ser oportunidades de diversificar gradualmente. Sem pressa, sem pressão."});
  else res.push({tp:"g",ti:"Compra mais enxuta",m:"Pode ser intencional (complementando despensa). Se não, vale priorizar hortifruti e proteínas nas próximas — são a base de energia e saciedade."});

  if(colors.size>=4) res.push({tp:"s",ti:`Arco-íris no carrinho: ${colors.size} cores`,m:"Cada cor é um grupo de fitonutrientes diferente trabalhando no seu corpo. Vermelho protege células, laranja fortalece pele e visão, verde traz ferro, roxo combate envelhecimento. Variedade é o melhor suplemento natural."});
  else if(colors.size>=2) { const miss=["verde","vermelho","laranja","amarelo","roxo"].filter(c=>!colors.has(c)).map(c=>({"verde":"🟢","vermelho":"🔴","laranja":"🟠","amarelo":"🟡","roxo":"🟣"}[c])).join(" "); res.push({tp:"i",ti:`${colors.size} cores — espaço pra mais`,m:`Cores que faltaram: ${miss}. Na próxima compra, observe se consegue adicionar mais uma cor — cada nova cor é um grupo inteiro de nutrientes que entra na sua semana.`}); }
  else if(cats[1].c<3) res.push({tp:"g",ti:"Hortifruti merece mais atenção",m:"Frutas e verduras são a base de energia estável, digestão e imunidade. É também onde está o maior retorno nutricional por real investido. Priorize esta parada na próxima."});

  if(cats[2].c===0) res.push({tp:"g",ti:"Sem fontes de proteína",m:"Proteína sustenta saciedade e estabilidade de energia. Sem ela, a tendência é fome rápida e impulso por açúcar. Se já tem em casa, perfeito — se não, vale reconsiderar."});
  else if(tags["omega3"]) res.push({tp:"s",ti:"Ômega-3 presente",m:"Incluir peixes ou sardinha é um dos hábitos com maior impacto em inflamação, humor e função cerebral. Ponto muito positivo pra sua semana."});

  if((tags["fibra"]||0)>=3) res.push({tp:"s",ti:"Rica em fibras",m:"Aveia, feijão, linhaça, legumes — essas fibras alimentam sua microbiota intestinal. Intestino saudável impacta humor, imunidade, energia e até qualidade do sono."});
  else if(!(tags["fibra"])) res.push({tp:"i",ti:"Fibras em falta",m:"Fibra é o combustível da microbiota. Aveia no café, feijão no almoço e chia no iogurte já transformam a digestão e a energia do dia."});

  if((tags["gord-boa"]||0)>=2) res.push({tp:"s",ti:"Gorduras boas equilibradas",m:"Azeite, abacate, castanhas, tahine — sustentam saciedade, absorção de vitaminas lipossolúveis e saúde hormonal. Seu corpo precisa dessas gorduras pra funcionar bem."});

  if(tags["probiotico"]) res.push({tp:"s",ti:"Probióticos incluídos",m:"Iogurte natural ou kefir alimentam bactérias benéficas do intestino. Impacto direto em digestão, imunidade e clareza mental. Hábito simples com retorno alto."});

  const h=cats[1].c>=5, p=cats[2].c>=2, g=cats[3].c>=3;
  if(h&&p&&g) res.push({tp:"s",ti:"Trifecta nutricional completa ⭐",m:"Hortifruti + Proteína + Grãos = a base da nutrição integrativa. Com esses três pilares cobertos, seu corpo tem estrutura pra funcionar com energia estável, humor equilibrado e sistema imune forte durante toda a semana."});

  if((tags["anti-inflam"]||0)>=2) res.push({tp:"s",ti:"Perfil anti-inflamatório",m:"Alho, gengibre, cúrcuma, azeite — combinação poderosa contra inflamação crônica. Inflamação silenciosa é a raiz de cansaço persistente, dores e baixa imunidade."});

  return {res, pct, tCk, tIt, colors:colors.size, cats};
}

const fmt = s => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`;

export default function App() {
  const [scr,setScr] = useState("welcome");
  const [su,setSu] = useState({people:"",days:"7",budget:""});
  const [cur,setCur] = useState(0);
  const [ck,setCk] = useState({});
  const [notes,setNotes] = useState({});
  const [tmr,setTmr] = useState(0);
  const [tmrOn,setTmrOn] = useState(false);
  const [tot,setTot] = useState(0);
  const [spend,setSpend] = useState("");
  const [showIns,setShowIns] = useState(false);
  const tr = useRef(null);
  const totr = useRef(null);

  useEffect(() => { if(tmrOn&&tmr>0){tr.current=setTimeout(()=>setTmr(t=>t-1),1000)} return()=>clearTimeout(tr.current) },[tmrOn,tmr]);
  useEffect(() => { if(scr==="route"){totr.current=setInterval(()=>setTot(t=>t+1),1000)}else{clearInterval(totr.current)} return()=>clearInterval(totr.current) },[scr]);

  const toggle = useCallback((sid,i) => setCk(p=>({...p,[`${sid}-${i}`]:!p[`${sid}-${i}`]})),[]);
  const go = () => { setScr("route"); setCur(0); setTmr(STOPS[0].time); setTmrOn(true); };
  const next = () => { if(cur<STOPS.length-1){const n=cur+1;setCur(n);setTmr(STOPS[n].time);setTmrOn(true);setShowIns(false)}else{setTmrOn(false);setScr("review")} };
  const reset = () => { setScr("welcome");setCk({});setNotes({});setTot(0);setCur(0);setTmr(0);setTmrOn(false);setSpend("");setSu({people:"",days:"7",budget:""}); };

  const ev = useMemo(()=>evaluate(ck,su),[ck,su]);
  const st = STOPS[cur];
  const stCk = st ? st.items.filter((_,i)=>ck[`${st.id}-${i}`]).length : 0;
  const tPct = st ? (tmr/st.time)*100 : 0;

  const iSt = {width:"100%",padding:"12px 16px",border:"2px solid #E0D8CF",borderRadius:"12px",fontSize:"16px",fontFamily:"'Poppins',sans-serif",background:"white",color:"#1A1A2E",outline:"none",boxSizing:"border-box"};

  if(scr==="welcome") return (
    <div style={{minHeight:"100vh",background:"#0B1426",fontFamily:"'Poppins',system-ui,sans-serif"}}>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"48px 24px 24px",textAlign:"center"}}>
        <div style={{fontSize:"11px",fontWeight:600,letterSpacing:"3px",color:"#4ECDC4",border:"1px solid rgba(78,205,196,0.4)",padding:"6px 16px",borderRadius:"20px",marginBottom:"24px"}}>SISTEMA CARRINHO LIMPO</div>
        <div style={{fontSize:"36px",fontWeight:700,color:"white",lineHeight:1.1,marginBottom:"4px"}}>Rota Express</div>
        <div style={{fontSize:"48px",fontWeight:700,color:"#4ECDC4",lineHeight:1,marginBottom:"16px"}}>30™</div>
        <div style={{width:"50px",height:"2px",background:"#4ECDC4",marginBottom:"16px"}}/>
        <p style={{fontSize:"14px",color:"#A8E6E0",lineHeight:1.6,fontStyle:"italic",fontFamily:"'Georgia',serif"}}>Navegação guiada + avaliação Health Coach<br/>personalizada no final da compra.</p>
      </div>
      <div style={{background:"#FAF6F1",borderRadius:"24px 24px 0 0",padding:"24px 24px 40px"}}>
        <p style={{fontSize:"11px",fontWeight:600,letterSpacing:"2px",color:"#B8A99A",marginBottom:"16px"}}>CONFIGURAR COMPRA</p>
        {[{k:"people",l:"Quantas pessoas comem em casa?",p:"Ex: 3",t:"number",h:"Use as orientações por pessoa pra calcular sua quantidade"},
          {k:"days",l:"Dias até a próxima compra",p:"Ex: 7",t:"number",h:"Ajuda a dimensionar a compra certa"},
          {k:"budget",l:"Orçamento planejado",p:"Ex: R$ 300",t:"text",h:"Compare com o real no final"}
        ].map(f=>(
          <div key={f.k} style={{marginBottom:"14px"}}>
            <label style={{display:"block",fontSize:"12px",fontWeight:600,color:"#1A1A2E",marginBottom:"4px"}}>{f.l}</label>
            <input type={f.t} placeholder={f.p} value={su[f.k]} onChange={e=>setSu({...su,[f.k]:e.target.value})} style={iSt} onFocus={e=>e.target.style.borderColor="#4ECDC4"} onBlur={e=>e.target.style.borderColor="#E0D8CF"} />
            <p style={{fontSize:"10px",color:"#B8A99A",marginTop:"3px"}}>{f.h}</p>
          </div>
        ))}
        <button onClick={go} style={{width:"100%",padding:"16px",background:"#4ECDC4",color:"#0B1426",fontSize:"16px",fontWeight:700,fontFamily:"'Poppins',sans-serif",border:"none",borderRadius:"14px",cursor:"pointer",marginTop:"4px",boxShadow:"0 4px 20px rgba(78,205,196,0.3)"}}>Iniciar Rota →</button>
      </div>
    </div>
  );

  if(scr==="route") return (
    <div style={{minHeight:"100vh",background:"#FAF6F1",fontFamily:"'Poppins',system-ui,sans-serif",display:"flex",flexDirection:"column"}}>
      <div style={{background:"#0B1426",padding:"12px 16px 10px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",marginBottom:"10px"}}>
          {STOPS.map((s,i)=>(<div key={s.id} style={{display:"flex",alignItems:"center",gap:"6px"}}>
            <div style={{width:i===cur?"32px":"10px",height:"10px",borderRadius:i===cur?"5px":"50%",background:i<=cur?"#4ECDC4":"rgba(255,255,255,0.12)",transition:"all 0.3s",position:"relative"}}>
              {i<cur&&<span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"7px",color:"#0B1426",fontWeight:700}}>✓</span>}
            </div>
            {i<STOPS.length-1&&<div style={{width:"14px",height:"1px",background:i<cur?"#4ECDC4":"rgba(255,255,255,0.08)"}}/>}
          </div>))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:"11px",color:"rgba(255,255,255,0.35)"}}>⏱ {fmt(tot)}</div>
          <div style={{fontSize:"24px",fontWeight:700,color:tmr<=60?"#E05555":"#4ECDC4",fontVariantNumeric:"tabular-nums"}}>{fmt(tmr)}</div>
          <div style={{fontSize:"11px",color:"rgba(255,255,255,0.35)"}}>{stCk}/{st.items.length}</div>
        </div>
        <div style={{width:"100%",height:"3px",background:"rgba(255,255,255,0.06)",borderRadius:"2px",marginTop:"6px",overflow:"hidden"}}>
          <div style={{width:`${tPct}%`,height:"100%",background:tmr<=60?"#E05555":st.color,borderRadius:"2px",transition:"width 1s linear"}}/>
        </div>
      </div>

      <div style={{padding:"16px 20px 10px",display:"flex",alignItems:"center",gap:"14px"}}>
        <div style={{width:"50px",height:"50px",borderRadius:"14px",background:`linear-gradient(135deg,${st.color},${st.color}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px",boxShadow:`0 4px 16px ${st.color}33`,flexShrink:0}}>{st.emoji}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:"10px",fontWeight:600,color:"#B8A99A",letterSpacing:"2px",marginBottom:"1px"}}>PARADA {st.id} DE 5</div>
          <div style={{fontSize:"22px",fontWeight:700,color:"#0B1426"}}>{st.name}</div>
        </div>
        <button onClick={()=>setShowIns(!showIns)} style={{width:"36px",height:"36px",borderRadius:"50%",background:showIns?st.color:"white",border:`2px solid ${st.color}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",color:showIns?"#0B1426":st.color,fontWeight:700,flexShrink:0}}>{showIns?"×":"i"}</button>
      </div>

      {showIns&&<div style={{margin:"0 20px 10px",padding:"14px 16px",background:`${st.color}12`,border:`1px solid ${st.color}25`,borderRadius:"14px"}}>
        <p style={{fontSize:"10px",fontWeight:700,color:st.color,letterSpacing:"1.5px",marginBottom:"6px"}}>SABIA QUE...</p>
        <p style={{fontSize:"13px",color:"#1A1A2E",lineHeight:1.6,margin:0,fontFamily:"'Georgia',serif"}}>{st.insight}</p>
      </div>}

      <div style={{margin:"0 20px 8px",padding:"10px 14px",background:"#0B1426",borderRadius:"10px",display:"flex",gap:"8px",alignItems:"flex-start"}}>
        <span style={{color:"#4ECDC4",fontWeight:700,fontSize:"12px",flexShrink:0}}>→</span>
        <p style={{fontSize:"12px",color:"#A8E6E0",lineHeight:1.5,margin:0,fontWeight:500}}>{st.tip}</p>
      </div>

      <div style={{flex:1,padding:"0 20px",overflow:"auto"}}>
        <div style={{background:"white",borderRadius:"16px",overflow:"hidden",boxShadow:"0 1px 8px rgba(0,0,0,0.04)"}}>
          {st.items.map((it,i)=>{const ic=ck[`${st.id}-${i}`];return(
            <div key={i} onClick={()=>toggle(st.id,i)} style={{display:"flex",alignItems:"center",gap:"12px",padding:"12px 14px",borderBottom:i<st.items.length-1?"1px solid #f5f0ea":"none",cursor:"pointer",opacity:ic?0.4:1,transition:"all 0.15s",userSelect:"none"}}>
              <div style={{width:"22px",height:"22px",borderRadius:"7px",border:ic?"none":"2px solid #ddd5cc",background:ic?st.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",flexShrink:0}}>
                {ic&&<svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="#0B1426" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span style={{flex:1,fontSize:"14px",color:ic?"#B8A99A":"#1A1A2E",textDecoration:ic?"line-through":"none",fontWeight:ic?400:500,lineHeight:1.3}}>{it.n}</span>
              {it.h&&<span style={{fontSize:"10px",color:"#B8A99A",fontWeight:500,background:"#FAF6F1",padding:"2px 8px",borderRadius:"6px",whiteSpace:"nowrap",flexShrink:0,fontStyle:"italic"}}>{it.h}</span>}
            </div>
          )})}
        </div>
        <textarea placeholder={`Anotações — ${st.name}...`} value={notes[st.id]||""} onChange={e=>{e.stopPropagation();setNotes({...notes,[st.id]:e.target.value})}} onClick={e=>e.stopPropagation()} rows={2} style={{width:"100%",padding:"12px 14px",border:"1.5px solid #E0D8CF",borderRadius:"12px",fontSize:"13px",fontFamily:"'Poppins',sans-serif",background:"white",color:"#1A1A2E",outline:"none",resize:"vertical",lineHeight:1.5,marginTop:"10px",marginBottom:"10px",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor=st.color} onBlur={e=>e.target.style.borderColor="#E0D8CF"} />
      </div>

      <div style={{padding:"10px 20px 28px"}}>
        <button onClick={next} style={{width:"100%",padding:"16px",background:st.color,color:"#0B1426",fontSize:"15px",fontWeight:700,fontFamily:"'Poppins',sans-serif",border:"none",borderRadius:"14px",cursor:"pointer",boxShadow:`0 4px 20px ${st.color}40`}}>
          {cur<STOPS.length-1?`Próxima: ${STOPS[cur+1].name} →`:"Finalizar → Ver Avaliação Health Coach"}
        </button>
      </div>
    </div>
  );

  if(scr==="review") {
    const sty={s:{bg:"#F0F9F0",br:"#7BC47F",ic:"✓",cl:"#4A9E4F"},i:{bg:"#FDF8F3",br:"#D4A574",ic:"→",cl:"#B8884E"},g:{bg:"#FDF2F2",br:"#E0A0A0",ic:"○",cl:"#C07070"}};
    return (
      <div style={{minHeight:"100vh",background:"#FAF6F1",fontFamily:"'Poppins',system-ui,sans-serif"}}>
        <div style={{background:"#0B1426",padding:"28px 20px 24px",textAlign:"center"}}>
          <div style={{fontSize:"10px",fontWeight:600,letterSpacing:"2px",color:"#4ECDC4",marginBottom:"6px"}}>AVALIAÇÃO HEALTH COACH</div>
          <div style={{fontSize:"24px",fontWeight:700,color:"white",marginBottom:"4px"}}>Sua Compra Analisada</div>
          <p style={{fontSize:"12px",color:"rgba(255,255,255,0.4)",margin:0}}>Baseada nos itens que você selecionou</p>
        </div>

        <div style={{display:"flex",justifyContent:"center",margin:"-20px auto 16px",position:"relative",zIndex:2}}>
          <div style={{width:"96px",height:"96px",borderRadius:"50%",background:"white",boxShadow:"0 4px 20px rgba(0,0,0,0.08)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:`4px solid ${ev.pct>=70?"#4ECDC4":ev.pct>=40?"#D4A574":"#E0A0A0"}`}}>
            <div style={{fontSize:"28px",fontWeight:700,color:"#0B1426",lineHeight:1}}>{ev.pct}%</div>
            <div style={{fontSize:"7px",color:"#B8A99A",fontWeight:600,letterSpacing:"1px"}}>COBERTURA</div>
          </div>
        </div>

        <div style={{display:"flex",gap:"8px",padding:"0 20px",marginBottom:"16px"}}>
          {[{l:"Tempo",v:fmt(tot)},{l:"Itens",v:`${ev.tCk}/${ev.tIt}`},{l:"Cores",v:`${ev.colors}/5`}].map((s,i)=>(
            <div key={i} style={{flex:1,background:"white",borderRadius:"12px",padding:"12px 8px",textAlign:"center",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
              <div style={{fontSize:"18px",fontWeight:700,color:"#0B1426"}}>{s.v}</div>
              <div style={{fontSize:"8px",color:"#B8A99A",fontWeight:600,letterSpacing:"1px"}}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{padding:"0 20px",marginBottom:"16px"}}>
          <div style={{background:"white",borderRadius:"14px",padding:"14px",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
            <p style={{fontSize:"9px",fontWeight:700,color:"#B8A99A",letterSpacing:"1.5px",marginBottom:"10px"}}>POR PARADA</p>
            {STOPS.map(s=>{const sc=ev.cats[s.id];const p=Math.round((sc.c/sc.t)*100);return(
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
                <span style={{fontSize:"14px",width:"22px",textAlign:"center"}}>{s.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}><span style={{fontSize:"11px",fontWeight:600,color:"#1A1A2E"}}>{s.name}</span><span style={{fontSize:"10px",color:"#B8A99A"}}>{sc.c}/{sc.t}</span></div>
                  <div style={{height:"6px",background:"#f0ebe4",borderRadius:"3px",overflow:"hidden"}}><div style={{height:"100%",width:`${p}%`,background:s.color,borderRadius:"3px",transition:"width 0.5s"}}/></div>
                </div>
              </div>
            )})}
          </div>
        </div>

        <div style={{padding:"0 20px",marginBottom:"16px"}}>
          <p style={{fontSize:"9px",fontWeight:700,color:"#B8A99A",letterSpacing:"1.5px",marginBottom:"10px"}}>💬 INSIGHTS DA SUA HEALTH COACH</p>
          {ev.res.map((r,i)=>{const s=sty[r.tp];return(
            <div key={i} style={{background:s.bg,borderLeft:`3px solid ${s.br}`,borderRadius:"0 12px 12px 0",padding:"14px 16px",marginBottom:"8px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                <span style={{fontSize:"11px",fontWeight:700,color:s.cl}}>{s.ic}</span>
                <span style={{fontSize:"13px",fontWeight:700,color:"#1A1A2E"}}>{r.ti}</span>
              </div>
              <p style={{fontSize:"12px",color:"#5A5A6E",lineHeight:1.6,margin:0}}>{r.m}</p>
            </div>
          )})}
        </div>

        <div style={{padding:"0 20px",marginBottom:"16px"}}>
          <div style={{background:"white",borderRadius:"14px",padding:"16px",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
            <p style={{fontSize:"9px",fontWeight:700,color:"#B8A99A",letterSpacing:"1.5px",marginBottom:"10px"}}>💰 ORÇAMENTO: EXPECTATIVA × REALIDADE</p>
            <div style={{display:"flex",gap:"10px",marginBottom:"12px"}}>
              <div style={{flex:1}}><label style={{fontSize:"9px",color:"#B8A99A",fontWeight:600,display:"block",marginBottom:"4px"}}>PLANEJADO</label><div style={{padding:"10px 12px",background:"#FAF6F1",borderRadius:"8px",fontSize:"16px",fontWeight:600,color:"#1A1A2E",minHeight:"40px",display:"flex",alignItems:"center"}}>{su.budget||"—"}</div></div>
              <div style={{flex:1}}><label style={{fontSize:"9px",color:"#B8A99A",fontWeight:600,display:"block",marginBottom:"4px"}}>GASTOU DE FATO</label><input type="text" placeholder="R$ ..." value={spend} onChange={e=>setSpend(e.target.value)} style={{...iSt,padding:"10px 12px",fontSize:"16px",fontWeight:600,boxSizing:"border-box"}} /></div>
            </div>
            {spend&&su.budget&&(()=>{const pl=parseFloat(su.budget.replace(/[^\d.,]/g,"").replace(",","."));const ac=parseFloat(spend.replace(/[^\d.,]/g,"").replace(",","."));if(isNaN(pl)||isNaN(ac))return null;const d=ac-pl;const p=Math.round((d/pl)*100);let msg,bg;if(d<=0){msg=`🎯 Dentro do orçamento! ${Math.abs(p)}% a menos. Compra consciente se reflete direto no bolso.`;bg="#F0F9F0"}else if(p<=15){msg=`📊 ${p}% acima (R$${d.toFixed(0)} a mais). Margem aceitável — observe se houve impulso.`;bg="#FDF8F3"}else{msg=`⚠️ ${p}% acima (R$${d.toFixed(0)} a mais). Revise: entraram itens fora do plano? Use isso pra calibrar o próximo orçamento.`;bg="#FDF2F2"} return<p style={{fontSize:"12px",color:"#5A5A6E",lineHeight:1.5,margin:0,padding:"10px 12px",background:bg,borderRadius:"8px"}}>{msg}</p>})()}
          </div>
        </div>

        {Object.values(notes).some(n=>n&&n.trim())&&<div style={{padding:"0 20px",marginBottom:"16px"}}><div style={{background:"white",borderRadius:"14px",padding:"16px",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
          <p style={{fontSize:"9px",fontWeight:700,color:"#B8A99A",letterSpacing:"1.5px",marginBottom:"10px"}}>📝 SUAS ANOTAÇÕES</p>
          {STOPS.filter(s=>notes[s.id]?.trim()).map(s=>(<div key={s.id} style={{marginBottom:"8px",paddingBottom:"8px",borderBottom:"1px solid #f0ebe4"}}><span style={{fontSize:"11px",fontWeight:600,color:s.color}}>{s.emoji} {s.name}</span><p style={{fontSize:"12px",color:"#5A5A6E",margin:"4px 0 0",lineHeight:1.5}}>{notes[s.id]}</p></div>))}
        </div></div>}

        <div style={{padding:"20px",textAlign:"center"}}>
          <p style={{fontSize:"14px",fontStyle:"italic",color:"#3BA99E",fontFamily:"'Georgia',serif",lineHeight:1.5,marginBottom:"16px"}}>"Energia não se força. Energia se constrói."</p>
          <button onClick={reset} style={{padding:"12px 28px",background:"transparent",color:"#3BA99E",fontSize:"13px",fontWeight:600,fontFamily:"'Poppins',sans-serif",border:"1.5px solid rgba(59,169,158,0.3)",borderRadius:"12px",cursor:"pointer"}}>Nova compra</button>
          <p style={{fontSize:"9px",color:"#B8A99A",marginTop:"16px",letterSpacing:"1px"}}>CARRINHO LIMPO™ · AILIN ORIONI · HEALTH COACH IIN</p>
        </div>
      </div>
    );
  }
  return null;
}
