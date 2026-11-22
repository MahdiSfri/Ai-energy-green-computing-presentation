// This CSS travels with the notes HTML into Reveal's separate speaker window.
// It targets speaker-window IDs only, leaving audience slides untouched.
export const speakerLayoutCss = `
body[data-speaker-layout]{margin:0;background:#eeeae1;font-family:Vazirmatn,Tahoma,sans-serif}
body[data-speaker-layout] #current-slide,
body[data-speaker-layout] #upcoming-slide{display:block!important;position:absolute!important;left:0!important;right:auto!important;width:30%!important;height:50%!important;padding:8px!important;box-sizing:border-box!important}
body[data-speaker-layout] #current-slide{top:0!important}
body[data-speaker-layout] #upcoming-slide{top:50%!important}
body[data-speaker-layout] #speaker-controls{position:absolute!important;left:30%!important;right:0!important;top:0!important;width:70%!important;height:100%!important;padding:20px 28px!important;box-sizing:border-box!important;overflow:auto!important;font-size:24px!important;background:#f5f1e6;border-left:1px solid #c6d1b3;scrollbar-gutter:stable}
body[data-speaker-layout] #speaker-layout{display:none!important}
body[data-speaker-layout] .speaker-controls-time{padding:4px 0 12px!important;margin:0 0 16px!important;direction:ltr;font-family:Vazirmatn,Tahoma,sans-serif}
body[data-speaker-layout] .speaker-controls-time .timer,
body[data-speaker-layout] .speaker-controls-time .clock{font-size:23px!important}
body[data-speaker-layout] .speaker-controls-time .label{font-size:12px!important}
body[data-speaker-layout] .speaker-controls-notes{padding:0!important;direction:rtl}
body[data-speaker-layout] .speaker-controls-notes>.label{font-size:14px!important}
body[data-speaker-layout] .speaker-controls-notes .value{font-size:26px!important;line-height:2!important;margin-top:14px!important}
body[data-speaker-layout] .presenter-script{font-size:26px!important;line-height:2!important;color:#33452b}
body[data-speaker-layout] .presenter-script>h3{font-family:inherit;font-size:30px!important;line-height:1.7;margin:0 0 18px}
body[data-speaker-layout] .presenter-script>p{font-size:26px!important;line-height:2!important;margin:0 0 24px}
body[data-speaker-layout] .presenter-glossary h3{font-size:24px!important}
body[data-speaker-layout] .presenter-glossary>p{font-size:16px!important}
body[data-speaker-layout] .presenter-glossary table{font-size:20px!important;line-height:1.9!important}
body[data-speaker-layout] .presenter-glossary td span{font-size:17px!important}
body[data-speaker-layout] .presenter-glossary th,
body[data-speaker-layout] .presenter-glossary td{padding:12px 10px!important}
`;
