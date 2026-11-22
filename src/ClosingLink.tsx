export const repository='https://github.com/MahdiSfri/Ai-energy-green-computing-presentation';
export function ClosingLink(){
 return <div className="closing-repo">
  <div><p>کد و فایل‌های ارائه رو می‌تونی از مخزن پروژه بگیری.</p><a className="repo-link" href={repository} target="_blank" rel="noreferrer" dir="ltr">{repository}</a></div>
  <a className="repo-qr" href={repository} target="_blank" rel="noreferrer" aria-label="باز کردن مخزن ارائه در گیت‌هاب"><img src="/images/github-qr.svg" width="360" height="360" alt="QR کد مخزن ارائه در گیت‌هاب"/></a>
 </div>;
}
