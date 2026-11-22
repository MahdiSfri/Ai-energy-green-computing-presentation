import {useState} from 'react';
const fa=(v:number)=>v.toLocaleString('fa-IR',{maximumFractionDigits:2});
export function PowerExample(){
 return <div className="worked"><p className="eyebrow">مثال فرضی · توان بر حسب کیلووات</p>
 <div className="power-plots">
 <figure><svg viewBox="0 0 520 205" role="img" aria-label="بار ثابت ۵۰ کیلوواتی در طول ۲۴ ساعت"><path className="axis" d="M48 20V160H497"/><path className="load-a" d="M50 160V95H480V160Z"/><text x="39" y="100" textAnchor="end">۵۰</text><text x="480" y="192" textAnchor="middle">۲۴ ساعت</text></svg><figcaption>پیک ۵۰ کیلووات</figcaption></figure>
 <figure><svg viewBox="0 0 520 205" role="img" aria-label="بار ۱۰۰ کیلوواتی نیمهٔ اول روز و صفر در نیمهٔ دوم"><path className="axis" d="M48 20V160H497"/><path className="load-b" d="M50 160V30H265V160Z"/><text x="39" y="36" textAnchor="end">۱۰۰</text><text x="265" y="192" textAnchor="middle">۱۲ ساعت</text><text x="480" y="192" textAnchor="middle">۲۴ ساعت</text></svg><figcaption>پیک ۱۰۰ کیلووات</figcaption></figure>
 </div><p className="example-takeaway">مساحت هر دو: <b>۱٬۲۰۰ کیلووات‌ساعت</b>. اتصال ۷۰ کیلوواتی فقط بار اول را پوشش می‌دهد.</p></div>
}
const scenarios=[{label:'قبل',it:1000,pue:1.4},{label:'بعد',it:1500,pue:1.2}];
export function PueExample(){
 const [selected,set]=useState(1);const {it,pue}=scenarios[selected];const energy=Math.round(it*pue);
 return <div className="worked"><p className="eyebrow">دو سناریوی فرضی برای یک روز</p><div className="choice">{scenarios.map((s,i)=><button key={s.label} onClick={()=>set(i)} aria-pressed={selected===i}>{s.label} · PUE {fa(s.pue)}</button>)}</div>
 <div className="metrics" aria-live="polite"><div><b>{fa(it)}</b><span>انرژی تجهیزات IT</span></div><div><b>{fa(energy-it)}</b><span>سربار تأسیسات</span></div><div><b>{fa(energy)}</b><span>مصرف کل (کیلووات‌ساعت)</span></div></div>
 <p className="example-takeaway">در سناریوی دوم سربار کمتر است، اما مصرف کل از <b>۱٬۴۰۰</b> به <b>۱٬۸۰۰</b> می‌رسد.</p></div>
}
const times=[{label:'امروز، ساعت ۱۸',factor:500,price:12},{label:'فردا، ساعت ۰۲',factor:200,price:8}];
export function CarbonExample(){
 const [selected,set]=useState(1);const {factor,price}=times[selected];
 return <div className="worked"><p className="eyebrow">مثال فرضی · انرژی پردازش در هر دو زمان: ۱۰۰ کیلووات‌ساعت</p><div className="choice">{times.map((s,i)=><button key={s.label} onClick={()=>set(i)} aria-pressed={selected===i}>{s.label}</button>)}</div>
 <div className="metrics" aria-live="polite"><div><b>{fa(factor)}</b><span>گرم معادل CO₂ / کیلووات‌ساعت</span></div><div><b>{fa(factor*100/1000)}</b><span>کیلوگرم معادل CO₂</span></div><div><b>{fa(price)}</b><span>هزینهٔ فرضی کل (واحد پولی)</span></div></div>
 <p className="example-takeaway">در این مثال اجرای شبانه انتشار و هزینه را کم می‌کند، <b>اگر مهلت تحویل اجازه بدهد.</b></p></div>
}
