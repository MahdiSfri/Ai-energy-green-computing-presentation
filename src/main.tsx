import {useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import Reveal from 'reveal.js';
import type {RevealApi} from 'reveal.js';
import Notes from 'reveal.js/plugin/notes';
import {ArrowLeft,ArrowRight,BookOpen,Grid2X2,Maximize,NotebookPen,ExternalLink,X,Zap} from 'lucide-react';
import baseDeck from './deck.json';
import {makeDeck} from './expansion';
import {ClosingLink,repository} from './ClosingLink';
import {PowerExample,PueExample,CarbonExample} from './WorkedExamples';
import {speakerLayoutCss} from './presenter-layout';
import 'reveal.js/reveal.css';
import './styles.css';

const fa=(v:number)=>v.toLocaleString('fa-IR',{maximumFractionDigits:2});
const short=new URLSearchParams(location.search).get('route')==='quick';
const deck=[...makeDeck(baseDeck,short),{id:'github',title:'لینک و فایل‌های ارائه',rows:[],src:[repository],sec:0,note:'به مخاطب فرصت بده تا QR را اسکن کند یا لینک مخزن را باز کند.',mode:'github',original:-1,section:3,added:false}];
const sourcesIndex=deck.findIndex(s=>s.mode==='sources');
const total=deck.length;
function switchRoute(quick:boolean){
 const url=new URL(location.href);
 if(quick)url.searchParams.set('route','quick');else url.searchParams.delete('route');
 url.hash='';
 location.assign(url.href);
}
const print=new URLSearchParams(location.search).has('print-pdf');
const receiver=new URLSearchParams(location.search).has('receiver');
const assets='/images/';
const observations=[{year:2024,v:415,kind:'برآورد',detail:'حدود ۱٫۵٪ از برق مصرفی جهان.'},{year:2025,v:485,kind:'برآورد',detail:'حدود ۱۷٪ رشد نسبت به ۲۰۲۴.'},{year:2030,v:950,kind:'پیش‌بینی',detail:'حدود ۳٪ از تقاضای جهانی برق در پیش‌بینی مرکزی.'}];
function EnergyChart(){
 const [picked,setPicked]=useState(2);
 const selected=observations[picked];
 const homes=Math.round(selected.v*1e9/(300*12)/1e6);
 return <div className="split chart-layout"><div className="chart-info"><p className="eyebrow">{observations[picked].kind} {fa(observations[picked].year)}</p><strong className="hero-number">{fa(observations[picked].v)}</strong><p>تراوات‌ساعت در سال</p><p>{observations[picked].detail}</p><small>ارقام برای کل دیتاسنترهاست؛ ۲۰۳۰ پیش‌بینی است.</small><aside className="energy-analogy" aria-live="polite"><b>معادل برق یک سالِ حدود {fa(homes)} میلیون خانوار</b><small>فرض آموزشی: ۳۰۰ کیلووات‌ساعت برق در ماه برای هر خانوار.</small></aside></div><div className="graph" dir="ltr"><p dir="rtl">مصرف سالانه (TWh)</p><div className="plot"><div aria-hidden="true" className="gridlines">{[1000,750,500,250,0].map(v=><div key={v}><span>{v.toLocaleString('en')}</span></div>)}</div><div className="bars">{observations.map((o,i)=><button type="button" key={o.year} aria-pressed={picked===i} aria-label={o.kind+' '+fa(o.year)+': '+fa(o.v)+' تراوات‌ساعت'} onClick={()=>setPicked(i)} className={i===2?'bar forecast':'bar'} style={{height:o.v/10+'%'}}><b>{fa(o.v)}</b><span>{fa(o.year)}{i===2?'*':''}</span></button>)}</div></div><small dir="rtl">* پیش‌بینی مرکزی IEA</small></div></div>
}
function Rebound(){
 const [demand,setDemand]=useState(3),[eff,setEff]=useState(.5);
 const use=demand*eff, change=Math.round((use-1)*100);
 return <div className="interactive rebound-example"><div><p className="eyebrow">مثال فرضی · مبنا: ۱ مگاوات‌ساعت</p><label>درخواست‌ها: <b>{fa(demand)} میلیون</b><input dir="ltr" type="range" min="1" max="5" step=".25" value={demand} onChange={e=>setDemand(+e.target.value)}/></label><label>انرژی هر درخواست: <b>{fa(eff)} وات‌ساعت</b><input dir="ltr" type="range" min=".2" max="1" step=".05" value={eff} onChange={e=>setEff(+e.target.value)}/></label><p className="calc" aria-live="polite"><strong>{fa(use)} مگاوات‌ساعت</strong> <span>{change===0?'برابر با مبنا':fa(Math.abs(change))+'٪ '+(change>0?'بیشتر':'کمتر')+' از مبنا'}</span></p></div></div>
}
function CloseSlide({rows}:{rows:string[][]}){
 const [answer,setAnswer]=useState(false);
 return <div className="split closing-summary"><div className="closing"><p>اگر انرژی هر درخواست نصف شود، با چند برابر شدن تعداد درخواست‌ها مصرف کل به نقطهٔ قبلی برمی‌گردد؟</p><button className="primary" onClick={()=>setAnswer(!answer)} aria-expanded={answer}>{answer?'پنهان کردن پاسخ':'دیدن پاسخ'}</button>{answer&&<p className="answer">با <b>دو برابر</b> شدن تعداد درخواست‌ها؛ به شرط ثابت ماندن نوع درخواست‌ها و سایر هزینه‌ها.</p>}</div><Rows rows={rows}/></div>
}
function Rows({rows}:{rows:string[][]}){return <dl className="rows">{rows.map(([name,value])=><div key={name}><dt dir="auto">{name}</dt><dd>{value}</dd></div>)}</dl>}
function Content({i}:{i:number}){
 const s=deck[i], rows=s.rows as string[][], original=s.original;
 if(s.mode==='github')return <ClosingLink/>;
 if(s.mode==='power')return <PowerExample/>;
 if(s.mode==='pue')return <PueExample/>;
 if(s.mode==='carbon')return <CarbonExample/>;
 if(original===5)return <EnergyChart/>;
 if(original===16)return <Rebound/>;
 if(original===17)return <CloseSlide rows={rows}/>;
 if(s.mode==='sources')return <div className="sources-list">{rows.map(([name,v,url])=><a key={name} href={url} target="_blank" rel="noreferrer"><span>{name}</span><b dir="ltr">{v} <ExternalLink size={17}/></b></a>)}</div>;
 if(s.mode.startsWith('case')){
  const r=s.rows as string[];return <div className="split cases"><div><strong className="hero-number">{r[0]}</strong><h2>{r[1]}</h2><p className="eyebrow">{r[2]}</p><p className="case-limit">{r[3]}</p>{s.mode==='case2'&&<aside className="energy-analogy"><b>تقریباً مثل روشن ماندن یک لامپ ۱۰ واتی برای ۱ دقیقه و ۲۶ ثانیه.</b><small>این مقایسه فقط برای عدد گزارش‌شدهٔ همین درخواست متنی است.</small></aside>}</div><figure><img src={assets+(original===14?'google-a.jpg':'google-b.jpg')} alt="نمای داخلی زیرساخت دیتاسنتر گوگل"/><figcaption>تصویر نمونه از زیرساخت گوگل</figcaption></figure></div>
 }
 return <Rows rows={rows}/>;
}
function SpeakerText({i}:{i:number}){const s=deck[i];return <div className="presenter-script" lang="fa" dir="rtl" style={{fontFamily:'Vazirmatn, Tahoma, sans-serif',fontSize:24,lineHeight:1.9}}><h3>{s.title}</h3><p>{s.sec?fa(s.sec)+' ثانیه · ':''}{s.note}</p>{s.src.length>0&&<p style={{fontSize:16}}>منابع: {s.src.map((v,j)=><a key={v} href={v} target="_blank" rel="noreferrer">[{fa(j+1)}] </a>)}</p>}</div>}
function App(){
 const root=useRef<HTMLDivElement>(null), api=useRef<RevealApi|null>(null); const [i,setI]=useState(0),[notes,setNotes]=useState(false),[ready,setReady]=useState(false),[error,setError]=useState(false);
 const noteRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(!root.current)return;const r=new Reveal(root.current,{width:1600,height:900,margin:.04,center:false,embedded:true,rtl:true,hash:true,hashOneBasedIndex:true,controls:false,progress:false,transition:'fade',view:print?'print':null,pdfSeparateFragments:false,pdfMaxPagesPerSlide:1,plugins:receiver?[]:[Notes],keyboard:{78:()=>setNotes(v=>!v),71:()=>r.toggleOverview()},keyboardCondition:e=>!((e.target as Element)?.closest('input,select,textarea'))&&!(e.key===' '&&(e.target as Element)?.closest('button,a'))});api.current=r;const sync=()=>setI(r.getIndices().h);r.on('slidechanged',sync);let live=true;r.initialize().then(async()=>{await document.fonts.ready;if(live){r.layout();sync();setReady(true)}}).catch(()=>setError(true));return()=>{live=false;r.destroy();api.current=null};},[]);
 useEffect(()=>{const id=requestAnimationFrame(()=>api.current?.layout());return()=>cancelAnimationFrame(id)},[notes]);
 useEffect(()=>{noteRef.current?.scrollTo(0,0)},[i]);
 return <main className={(notes?'with-notes ':'')+(print?'print-mode ':'')+(receiver?'receiver':'')}>
 {!print&&!receiver&&<header className="topbar"><div className="brand"><Zap size={22}/> انرژی هوش مصنوعی <span>ارائهٔ دانشگاهی</span></div><nav aria-label="کنترل ارائه"><select className="route" aria-label="مسیر ارائه" value={short?"quick":"full"} onChange={e=>switchRoute(e.target.value==="quick")}><option value="full">مسیر کامل · {fa(makeDeck(baseDeck,false).length+1)} اسلاید</option><option value="quick">مسیر کوتاه · ۲۰ دقیقه</option></select><button title="نمای کلی (G)" aria-label="نمای کلی" onClick={()=>api.current?.toggleOverview()}><Grid2X2 size={19}/></button><button aria-pressed={notes} title="یادداشت‌ها (N)" onClick={()=>setNotes(!notes)}><NotebookPen size={19}/><span>یادداشت</span></button><button title="نمای سخنران (S)" disabled={!ready} onClick={()=>{const p=api.current?.getPlugin('notes') as {open?:()=>void}|undefined;p?.open?.()}}>نمای سخنران</button><button title="منابع" aria-label="منابع" onClick={()=>api.current?.slide(sourcesIndex)}><BookOpen size={19}/></button><button title="تمام‌صفحه" aria-label="تمام‌صفحه" onClick={()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.()}><Maximize size={19}/></button></nav><div className="step"><button title="اسلاید قبلی" aria-label="اسلاید قبلی" disabled={!i} onClick={()=>api.current?.prev()}><ArrowRight size={19}/></button><span>{fa(i+1)} / {fa(total)}</span><button title="اسلاید بعدی" aria-label="اسلاید بعدی" disabled={i===total-1} onClick={()=>api.current?.next()}><ArrowLeft size={19}/></button></div></header>}
 <div className="stage"><div className="reveal" ref={root}><div className="slides">{deck.map((s,j)=>{
 return <section className="deck-slide dark" key={s.id} data-timing={s.sec}><div className="frame" dir="rtl">
 {j===0?<div className="cover"><div className="cover-copy"><h1>{s.title}<br/><em>و راهکارهای محاسبات سبز</em></h1><p className="english" dir="ltr">Energy Consumption of Artificial Intelligence<br/>and Green Computing Solutions</p><div className="author">{(s.rows as string[]).slice(2).map(name=><b key={name}>{name}</b>)}</div><p className="cover-instructor"><span>استاد:</span> دکتر مهدی خزاعی پور</p></div><div className="cover-mark" aria-hidden="true"><Zap size={265} strokeWidth={.9}/><span dir="ltr">kWh</span></div></div>:<><h1>{s.title}</h1><div className="body"><Content i={j}/></div></>}
 <footer className="slide-meta">{j!==0&&s.mode!=='github'&&s.src.length>0&&<a href={s.src[0]} target="_blank" rel="noreferrer">منبع ↗</a>}<span className="slide-index" aria-label={'اسلاید '+fa(j+1)+' از '+fa(total)}>{fa(j+1)} از {fa(total)}</span></footer>
 </div><aside className="notes"><style>{`@font-face{font-family:Vazirmatn;src:url('${location.origin}/fonts/Vazirmatn-Variable.woff2') format('woff2');font-weight:100 900}`+speakerLayoutCss}</style><SpeakerText i={j}/></aside></section>
 })}</div></div>{!ready&&!print&&<div className="loader">{error?'بارگذاری انجام نشد؛ صفحه را تازه کن.':'در حال آماده‌سازی اسلایدها…'}</div>}</div>
 {notes&&!print&&!receiver&&<aside className="note-panel" ref={noteRef}><button title="بستن یادداشت" aria-label="بستن یادداشت" onClick={()=>setNotes(false)}><X size={22}/></button><p className="eyebrow">یادداشت ارائه‌دهنده · اسلاید {fa(i+1)}</p><SpeakerText i={i}/></aside>}
 </main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
