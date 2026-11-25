import githubQr from './github-qr.svg?inline';

export const repository='https://github.com/MahdiSfri/Ai-energy-green-computing-presentation';

export function ClosingLink(){
 return <div className="closing-repo">
  <div className="closing-repo-copy">
   <p className="eyebrow">کد و فایل‌های ارائه</p>
   <p>برای دیدن فایل‌ها، لینک مخزن رو باز کن یا کد روبه‌رو رو با دوربین گوشی اسکن کن.</p>
   <a className="repo-button" href={repository} target="_blank" rel="noreferrer">باز کردن مخزن در گیت‌هاب ↗</a>
   <a className="repo-link" href={repository} target="_blank" rel="noreferrer" dir="ltr">{repository}</a>
  </div>
  <figure className="repo-code">
   <a className="repo-qr" href={repository} target="_blank" rel="noreferrer" aria-label="باز کردن مخزن ارائه در گیت‌هاب">
    <img src={githubQr} width="360" height="360" alt="کد QR لینک مخزن گیت‌هاب"/>
   </a>
   <figcaption>برای باز کردن لینک اسکن کن</figcaption>
  </figure>
 </div>;
}
