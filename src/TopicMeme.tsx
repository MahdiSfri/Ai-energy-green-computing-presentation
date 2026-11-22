import {useState} from 'react';
import type {ReactNode} from 'react';
import {Image,ArrowRight,ExternalLink} from 'lucide-react';

const collection = {
 peak:{file:'This-Is-Fine',source:'This-Is-Fine',name:'This Is Fine',lines:[
 ['تیم پروژه','«مصرف روزانه‌مون که تغییری نکرده.»'],
 ['ترانس، وقتی توان پیک دو برابر می‌شه','«آره، همه‌چی خوبه.»']
 ],point:'انرژی روزانه ثابت مانده؛ توان پیک دو برابر شده.'},
 'pue-example':{file:'Grus-Plan',source:'Grus-Plan',name:'Gru’s Plan',lines:[
 ['۱','خنک‌سازی رو بهینه کن.'],['۲','PUE رو از ۱٫۴ برسون به ۱٫۲.'],['۳','مصرف کل از ۱۴۰۰ رفت روی ۱۸۰۰.'],['۴','مصرف کل از ۱۴۰۰ رفت روی ۱۸۰۰؟!']
 ],point:'سربار کمتر شده، ولی بار IT آن‌قدر بالا رفته که مصرف کل بیشتر شده.'},
 'base-5':{file:'Is-This-A-Pigeon',source:'Is-This-A-Pigeon',name:'Is This a Pigeon?',lines:[
 ['پروانه','برق مصرفی کل دیتاسنترها'],['شخصیت','«این همون برق مصرفی خودِ AIـه؟»']
 ],point:'اعداد نمودار مصرف کل دیتاسنترها را نشان می‌دهند.'},
 'base-14':{file:'Batman-Slapping-Robin',source:'Batman-Slapping-Robin',name:'Batman Slapping Robin',lines:[
 ['رابین','«دیپ‌مایند برق کل دیتاسنتر رو ۴۰٪ کم کرد!»'],['بتمن','«تا ۴۰٪، اونم فقط بخش خنک‌سازی!»']
 ],point:'«تا ۴۰٪» به انرژی خنک‌سازی در گزارش گوگل اشاره دارد.'},
 benchmark:{file:'Expanding-Brain',source:'Expanding-Brain',name:'Expanding Brain',lines:[
 ['۱','توان اسمی GPU رو بخون.'],['۲','برق کل سرور رو اندازه بگیر.'],['۳','مصرف رو بر تعداد جواب‌ها تقسیم کن.'],['۴','فقط جواب‌های معتبر رو بشمار؛ مدل اشتباه‌گو هم می‌تونه کم‌مصرف باشه!']
 ],point:'کیفیت جواب و زمان پاسخ را هم کنار مصرف گزارش کن.'}
} as const;

export function TopicMeme({id,children}:{id:string;children:ReactNode}){
 const [show,setShow]=useState(false);
 const meme=collection[id as keyof typeof collection];
 const embedded=['pue-example','base-14','benchmark'].includes(id);
 if(!meme)return <>{children}</>;
 return <div className="topic-meme">
 <button type="button" className="meme-toggle" aria-expanded={show} aria-controls={'meme-'+id} onClick={()=>setShow(v=>!v)}>{show?<ArrowRight size={22}/>:<Image size={22}/>} {show?'برگشت به اسلاید':'نمایش میم'}</button>
 <div hidden={show}>{children}</div>
 <div className={'topic-meme-panel meme-for-'+id} id={'meme-'+id} hidden={!show}>
  <div className="meme-dialogue"><dl>{meme.lines.map(([speaker,line])=><div key={speaker}><dt>{speaker}</dt><dd>{line}</dd></div>)}</dl><p>{meme.point}</p></div>
  <figure><div className="caption-template"><img loading="lazy" src={'/images/memes/'+meme.file+'.jpg'} alt={meme.name}/>{embedded&&<div aria-hidden="true" className="template-captions">{meme.lines.map(([,line],i)=><span key={i} className={'template-line line-'+i}>{line}</span>)}</div>}</div><figcaption><a href={'https://imgflip.com/memetemplate/'+meme.source} target="_blank" rel="noreferrer" dir="ltr">{meme.name} <ExternalLink size={13}/></a></figcaption></figure>
 </div></div>;
}
