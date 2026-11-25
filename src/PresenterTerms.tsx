import {termsForSlide} from './abbreviations';
export function PresenterTerms({slide}:{slide:Parameters<typeof termsForSlide>[0]}){
 const entries=termsForSlide(slide);
 if(!entries.length)return null;
 return <section aria-label="مخفف‌های این اسلاید" style={{marginTop:24,paddingTop:16,borderTop:'1px solid currentColor'}}>
 <h4 style={{fontSize:22,margin:'0 0 12px'}}>مخفف‌های این اسلاید</h4>
 <dl style={{margin:0,display:'grid',gap:14}}>
 {entries.map(([term,[english,explanation]])=><div key={term}>
 <dt lang="en" dir="ltr" style={{fontSize:18,lineHeight:1.5,textAlign:'right',fontWeight:750}}>{term} — {english}</dt>
 <dd style={{fontSize:18,margin:'4px 0 0',lineHeight:1.75}}>{explanation}</dd>
 </div>)}
 </dl>
 </section>;
}
