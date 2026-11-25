export const abbreviations: Record<string, readonly [english: string, explanation: string]> = {
 AI: ['Artificial Intelligence', 'هوش مصنوعی؛ سامانه‌هایی که کارهایی مثل تولید متن، تشخیص الگو یا پیش‌بینی را انجام می‌دهند.'],
 IT: ['Information Technology', 'فناوری اطلاعات؛ در بحث دیتاسنتر، انرژی سرورها، شبکه و ذخیره‌سازی را از سربار تأسیسات مثل خنک‌سازی جدا می‌کنیم.'],
 GPU: ['Graphics Processing Unit', 'واحد پردازش گرافیکی؛ محاسبات موازی زیادی را هم‌زمان انجام می‌دهد و برای آموزش و اجرای مدل‌ها به کار می‌رود.'],
 TPU: ['Tensor Processing Unit', 'واحد پردازش تنسور؛ تراشهٔ اختصاصی گوگل برای شتاب‌دادن به محاسبات یادگیری ماشین.'],
 LLM: ['Large Language Model', 'مدل زبانی بزرگ؛ مدلی که با حجم زیادی دادهٔ متنی آموزش می‌بیند و می‌تواند متن را پردازش یا تولید کند.'],
 KV: ['Key–Value (KV cache)', 'کش کلید و مقدار؛ مدل در زمان تولید پاسخ، کلیدها و مقدارهای محاسبه‌شدهٔ توکن‌های قبلی را نگه می‌دارد تا دوباره آن‌ها را حساب نکند.'],
 IEA: ['International Energy Agency', 'آژانس بین‌المللی انرژی؛ منبع برآوردهای مصرف برق جهانی دیتاسنترها و پیش‌بینی سال ۲۰۳۰ در این ارائه.'],
 LBNL: ['Lawrence Berkeley National Laboratory', 'آزمایشگاه ملی لارنس برکلی؛ گزارش استنادشدهٔ آن دربارهٔ مصرف انرژی دیتاسنترهای ایالات متحده است.'],
 'ITU-T': ['International Telecommunication Union — Telecommunication Standardization Sector', 'بخش استانداردسازی مخابرات اتحادیهٔ بین‌المللی مخابرات؛ منبع یکی از توصیه‌های مربوط به شاخص‌های محیط‌زیستی.'],
 'U.S.': ['United States', 'ایالات متحده؛ محدودهٔ جغرافیایی گزارش LBNL، نه کل جهان.'],
 KPIs: ['Key Performance Indicators', 'شاخص‌های کلیدی عملکرد؛ معیارهایی برای سنجش وضعیت یا مقایسهٔ عملکرد، مثل PUE و WUE.'],
 PUE: ['Power Usage Effectiveness', 'نسبت انرژی کل دیتاسنتر به انرژی تجهیزات IT در همان بازه. مثلاً ۱٫۲ یعنی به ازای هر ۱ کیلووات‌ساعت IT، کل مرکز ۱٫۲ کیلووات‌ساعت مصرف کرده است.'],
 WUE: ['Water Usage Effectiveness', 'نسبت آب مصرفی به انرژی تجهیزات IT؛ معمولاً با لیتر بر کیلووات‌ساعت بیان می‌شود. برای مقایسه، محدودهٔ محاسبهٔ آب را مشخص کن.'],
 CUE: ['Carbon Usage Effectiveness', 'نسبت انتشار معادل دی‌اکسید کربن به انرژی تجهیزات IT؛ مثلاً کیلوگرم معادل CO₂ به ازای هر کیلووات‌ساعت انرژی IT.'],
 P95: ['95th Percentile', 'صدک ۹۵؛ اگر تأخیر P95 دو ثانیه باشد، حدود ۹۵٪ درخواست‌ها در دو ثانیه یا کمتر پاسخ گرفته‌اند.'],
 SLA: ['Service Level Agreement', 'توافق‌نامهٔ سطح خدمت؛ تعهد مشخص دربارهٔ کیفیت سرویس، مثلاً حداکثر تأخیر یا حداقل دسترس‌پذیری.'],
 MLPerf: ['MLPerf — Machine Learning Performance Benchmarks', 'نام مجموعه آزمون‌های MLCommons برای مقایسهٔ عملکرد سامانه‌های یادگیری ماشین در شرایط مشخص؛ بعضی آزمون‌ها برق کل سرور را هم می‌سنجند.'],
 'CO₂': ['Carbon Dioxide', 'دی‌اکسید کربن. «معادل CO₂» انتشار گازهای گلخانه‌ای مختلف را بر اساس اثر گرمایشی‌شان در یک واحد مشترک بیان می‌کند.'],
 kW: ['Kilowatt', 'کیلووات؛ واحد توان. ۱ کیلووات برابر ۱٬۰۰۰ وات است و نرخ مصرف لحظه‌ای انرژی را نشان می‌دهد.'],
 Wh: ['Watt-hour', 'وات‌ساعت؛ واحد انرژی. مصرف ثابت ۱ وات به مدت ۱ ساعت برابر با ۱ وات‌ساعت است.'],
 kWh: ['Kilowatt-hour', 'کیلووات‌ساعت؛ واحد انرژی. مصرف ثابت ۱ کیلووات به مدت ۱ ساعت برابر با ۱ کیلووات‌ساعت است.'],
 MWh: ['Megawatt-hour', 'مگاوات‌ساعت؛ برابر با ۱٬۰۰۰ کیلووات‌ساعت. در مثال اثر بازگشتی، یک میلیون درخواستِ ۱ وات‌ساعتی مجموعاً ۱ مگاوات‌ساعت مصرف می‌کند.'],
 TWh: ['Terawatt-hour', 'تراوات‌ساعت؛ برابر با یک میلیارد کیلووات‌ساعت. در نمودار، این واحد مصرف سالانه را نشان می‌دهد.'],
 'Wh/request': ['Watt-hours per Request', 'وات‌ساعت به ازای هر درخواست؛ انرژی اندازه‌گیری‌شده تقسیم بر تعداد درخواست‌ها. نوع درخواست و مرز اندازه‌گیری را هم گزارش کن.'],
 'Wh/token': ['Watt-hours per Token', 'وات‌ساعت به ازای هر توکن؛ انرژی اندازه‌گیری‌شده تقسیم بر تعداد توکن‌ها. مشخص کن که توکن ورودی، خروجی یا هر دو را شمرده‌ای.'],
 QR: ['Quick Response (QR Code)', 'کد دوبعدی قابل اسکن با دوربین گوشی؛ در اسلاید آخر، نشانی مخزن گیت‌هاب را باز می‌کند.'],
};
const displayTerms: Record<string,string[]> = {
 'base-0':['AI','kWh'], 'base-1':['AI'],
 peak:['kW','kWh'], lifetime:['Wh','MWh'],
 'base-5':['IEA','kWh'], 'base-8':['CO₂'],
 'base-14':[], 'base-15':['Wh'], 'base-16':['Wh','MWh'],
 'base-18':['U.S.'], 'pue-example':['kWh'], benchmark:['Wh'],
 'dirty-hour':['CO₂','kWh'], github:['QR'],
};
export function termsForSlide(slide:{id:string;title:string;rows:string[]|string[][];note:string}){
 const words=slide.rows.flat().filter(word=>!/^https?:\/\//i.test(word));
 const text=[slide.title,...words,slide.note].join(' ');
 const extra=new Set(displayTerms[slide.id]??[]);
 return Object.entries(abbreviations).filter(([term])=>{
  const literal=term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  return extra.has(term)||new RegExp('(^|[^A-Za-z0-9/])'+literal+'(?![A-Za-z0-9/])').test(text);
 });
}
