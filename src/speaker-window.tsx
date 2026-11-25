import {useEffect,useRef,useState} from 'react';
import type {ReactNode} from 'react';
import {ArrowLeft,ArrowRight,RotateCcw} from 'lucide-react';
import './speaker-window.css';

export function speakerUrl(index:number){
 const url=new URL(location.href);
 url.searchParams.delete('receiver');
 url.searchParams.delete('print-pdf');
 url.searchParams.set('speaker','1');
 url.hash='/'+(index+1);
 return url;
}

function previewUrl(index:number){
 const url=new URL(location.href);
 url.searchParams.delete('speaker');
 url.searchParams.set('receiver','1');
 url.hash='/'+(index+1);
 return url.href;
}

export const speakerChannel='ai-energy-speaker-v1';
type Message={channel:typeof speakerChannel;type:'ready'|'slide';index?:number};

export function sendSpeaker(target:Window|null,message:Omit<Message,'channel'>){
 if(target&&!target.closed)target.postMessage({channel:speakerChannel,...message},location.origin);
}

export function receiveSpeaker(event:MessageEvent,peer:Window|null,total:number):Message|undefined{
 const data=event.data;
 if(!peer||event.source!==peer||event.origin!==location.origin||data?.channel!==speakerChannel)return;
 if(data.type==='ready')return {channel:speakerChannel,type:'ready'};
 if(data.type==='slide'&&Number.isInteger(data.index)&&data.index>=0&&data.index<total)return {channel:speakerChannel,type:'slide',index:data.index};
}

function initialSlide(total:number){
 const match=location.hash.match(/^#\/?(\d+)$/);
 return match?Math.min(total-1,Math.max(0,Number(match[1])-1)):0;
}

export function SpeakerWindow({total,renderNotes}:{total:number;renderNotes:(index:number)=>ReactNode}){
 const [index,setIndex]=useState(()=>initialSlide(total));
 const [started,setStarted]=useState(Date.now);
 const [elapsed,setElapsed]=useState(0);
 const pane=useRef<HTMLElement>(null);
 const go=(next:number)=>{
  if(next<0||next>=total)return;
  setIndex(next);
  sendSpeaker(window.opener,{type:'slide',index:next});
 };
 useEffect(()=>{
  document.title='نمای سخنران | مصرف انرژی هوش مصنوعی';
  const onMessage=(event:MessageEvent)=>{
   const message=receiveSpeaker(event,window.opener,total);
   if(message?.type==='slide'&&message.index!==undefined)setIndex(message.index);
  };
  window.addEventListener('message',onMessage);
  sendSpeaker(window.opener,{type:'ready'});
  return ()=>window.removeEventListener('message',onMessage);
 },[total]);
 useEffect(()=>{
  pane.current?.scrollTo(0,0);
  history.replaceState(null,'',speakerUrl(index));
 },[index]);
 useEffect(()=>{
  setElapsed(0);
  const timer=window.setInterval(()=>setElapsed(Math.max(0,Math.floor((Date.now()-started)/1000))),1000);
  return ()=>window.clearInterval(timer);
 },[started]);
 useEffect(()=>{
  const onKey=(event:KeyboardEvent)=>{
   if(event.altKey||event.ctrlKey||event.metaKey||(event.target as HTMLElement)?.closest('button,a,input'))return;
   const delta=event.key==='ArrowLeft'?1:event.key==='ArrowRight'?-1:0;
   if(delta){event.preventDefault();go(index+delta)}
  };
  window.addEventListener('keydown',onKey);
  return ()=>window.removeEventListener('keydown',onKey);
 },[index,total]);
 const clock=[Math.floor(elapsed/3600),Math.floor(elapsed/60)%60,elapsed%60].map(v=>String(v).padStart(2,'0')).join(':');
 return <main className="speaker-window" dir="rtl">
  <header className="speaker-bar">
   <strong>نمای سخنران</strong>
   <nav aria-label="کنترل اسلاید">
    <button type="button" onClick={()=>go(index-1)} disabled={index===0} aria-label="اسلاید قبلی"><ArrowRight size={19}/></button>
    <span>{(index+1).toLocaleString('fa-IR')} از {total.toLocaleString('fa-IR')}</span>
    <button type="button" onClick={()=>go(index+1)} disabled={index===total-1} aria-label="اسلاید بعدی"><ArrowLeft size={19}/></button>
   </nav>
   <div className="speaker-clock"><time dir="ltr">{clock}</time><button type="button" onClick={()=>setStarted(Date.now())} aria-label="شروع دوبارهٔ زمان‌سنج"><RotateCcw size={17}/></button></div>
  </header>
  <div className="speaker-previews" aria-label="پیش‌نمایش اسلایدها">
   <figure><figcaption>اسلاید فعلی</figcaption><iframe title="اسلاید فعلی" tabIndex={-1} src={previewUrl(index)}/></figure>
   <figure><figcaption>اسلاید بعدی</figcaption>{index+1<total?<iframe title="اسلاید بعدی" tabIndex={-1} src={previewUrl(index+1)}/>:<p>پایان ارائه</p>}</figure>
  </div>
  <article ref={pane} className="speaker-reading" aria-label="یادداشت‌های اسلاید">{renderNotes(index)}</article>
 </main>;
}
