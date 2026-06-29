import { useState, useEffect, useMemo } from "react";

// ─── 3D ICON URLS via jsDelivr CDN (3dicons CC0 — no attribution required) ──
const CDN = "https://cdn.jsdelivr.net/gh/realvjy/3dicons@main/icons";
const I = {
  user:     `${CDN}/man/man-dynamic-color.png`,
  palette:  `${CDN}/palette/palette-dynamic-color.png`,
  keyboard: `${CDN}/keyboard/keyboard-dynamic-color.png`,
  link:     `${CDN}/link/link-dynamic-color.png`,
  tool:     `${CDN}/settings/settings-dynamic-color.png`,
  chart:    `${CDN}/graph/graph-dynamic-color.png`,
  folder:   `${CDN}/folder/folder-dynamic-color.png`,
  star:     `${CDN}/star/star-dynamic-color.png`,
  heart:    `${CDN}/heart/heart-dynamic-color.png`,
  list:     `${CDN}/note/note-dynamic-color.png`,
  rocket:   `${CDN}/rocket/rocket-dynamic-color.png`,
  check:    `${CDN}/shield/shield-dynamic-color.png`,
  coin:     `${CDN}/coin/coin-dynamic-color.png`,
  globe:    `${CDN}/globe/globe-dynamic-color.png`,
  trophy:   `${CDN}/trophy/trophy-dynamic-color.png`,
  fire:     `${CDN}/fire/fire-dynamic-color.png`,
  crown:    `${CDN}/crown/crown-dynamic-color.png`,
  gem:      `${CDN}/gem/gem-dynamic-color.png`,
  bolt:     `${CDN}/lightning/lightning-dynamic-color.png`,
  music:    `${CDN}/music/music-dynamic-color.png`,
  code:     `${CDN}/code/code-dynamic-color.png`,
  lock:     `${CDN}/lock/lock-dynamic-color.png`,
  mail:     `${CDN}/mail/mail-dynamic-color.png`,
  map:      `${CDN}/map/map-dynamic-color.png`,
  clock:    `${CDN}/time/time-dynamic-color.png`,
  target:   `${CDN}/target/target-dynamic-color.png`,
  idea:     `${CDN}/idea/idea-dynamic-color.png`,
  camera:   `${CDN}/camera/camera-dynamic-color.png`,
  phone:    `${CDN}/phone/phone-dynamic-color.png`,
  diamond:  `${CDN}/diamond/diamond-dynamic-color.png`,
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const THEMES = [
  { id:"tokyonight", label:"Tokyo Night", primary:"#7aa2f7", bg:"#1a1b2e", accent:"#bb9af7", glow:"124,58,237" },
  { id:"radical",    label:"Radical",     primary:"#fe428e", bg:"#141321", accent:"#a9fef7", glow:"254,66,142" },
  { id:"dracula",    label:"Dracula",     primary:"#ff79c6", bg:"#282a36", accent:"#50fa7b", glow:"255,121,198" },
  { id:"onedark",    label:"One Dark",    primary:"#e06c75", bg:"#282c34", accent:"#98c379", glow:"224,108,117" },
  { id:"gruvbox",    label:"Gruvbox",     primary:"#d79921", bg:"#282828", accent:"#689d6a", glow:"215,153,33" },
  { id:"nord",       label:"Nord",        primary:"#88c0d0", bg:"#2e3440", accent:"#81a1c1", glow:"136,192,208" },
  { id:"aura",       label:"Aura",        primary:"#a277ff", bg:"#15141b", accent:"#61ffca", glow:"162,119,255" },
  { id:"dark_lover", label:"Dark Lover",  primary:"#e966a0", bg:"#191c35", accent:"#c0cafd", glow:"233,102,160" },
];

const HEADER_STYLES = [
  {id:"waving",label:"Wave 🌊"},{id:"soft",label:"Soft ☁️"},{id:"rect",label:"Rect ▬"},
  {id:"rounded",label:"Round ⭕"},{id:"egg",label:"Egg 🥚"},{id:"cylinder",label:"Cylinder"},{id:"shark",label:"Shark 🦈"},
];

const SKILL_GROUPS = {
  "Languages":    ["js","ts","py","java","cpp","c","cs","php","rb","go","rs","swift","kotlin","dart","scala","r","elixir","lua","bash","powershell"],
  "Frontend":     ["html","css","sass","tailwind","react","vue","angular","svelte","nextjs","nuxtjs","remix","astro","bootstrap","jquery","vite"],
  "Backend":      ["nodejs","deno","express","fastapi","django","flask","spring","laravel","rails","nestjs","actix","gin"],
  "Databases":    ["mysql","postgres","mongodb","redis","sqlite","supabase","firebase","cassandra","prisma","graphql"],
  "DevOps/Cloud": ["docker","kubernetes","aws","azure","gcp","vercel","netlify","heroku","linux","nginx","terraform","githubactions"],
  "Tools":        ["git","github","gitlab","figma","vscode","vim","postman","notion","npm","yarn"],
  "ML / AI":      ["tensorflow","pytorch","opencv","pandas","numpy","jupyter"],
  "Mobile":       ["flutter","reactnative","android","ios"],
};

const SOCIALS = [
  {id:"github",       label:"GitHub",          color:"181717",logo:"github"},
  {id:"linkedin",     label:"LinkedIn",        color:"0A66C2",logo:"linkedin"},
  {id:"youtube",      label:"YouTube",         color:"FF0000",logo:"youtube"},
  {id:"twitch",       label:"Twitch",          color:"9146FF",logo:"twitch"},
  {id:"twitter",      label:"X / Twitter",     color:"000000",logo:"x"},
  {id:"instagram",    label:"Instagram",       color:"E4405F",logo:"instagram"},
  {id:"discord",      label:"Discord",         color:"5865F2",logo:"discord"},
  {id:"reddit",       label:"Reddit",          color:"FF4500",logo:"reddit"},
  {id:"devto",        label:"Dev.to",          color:"0A0A0A",logo:"devdotto"},
  {id:"medium",       label:"Medium",          color:"000000",logo:"medium"},
  {id:"stackoverflow",label:"Stack Overflow",  color:"FE7A16",logo:"stackoverflow"},
  {id:"codepen",      label:"CodePen",         color:"000000",logo:"codepen"},
  {id:"hashnode",     label:"Hashnode",        color:"2962FF",logo:"hashnode"},
  {id:"portfolio",    label:"Portfolio",       color:"4285F4",logo:"googlechrome"},
];

const SUPPORT_PLATFORMS = [
  {id:"buymeacoffee",label:"Buy Me a Coffee",color:"FFDD00",logo:"buymeacoffee",prefix:"https://buymeacoffee.com/",emoji:"☕"},
  {id:"kofi",        label:"Ko-Fi",          color:"F16061",logo:"kofi",         prefix:"https://ko-fi.com/",       emoji:"☕"},
  {id:"patreon",     label:"Patreon",        color:"F96854",logo:"patreon",      prefix:"https://patreon.com/",     emoji:"🎨"},
  {id:"githubsponsors",label:"GitHub Sponsors",color:"EA4AAA",logo:"githubsponsors",prefix:"https://github.com/sponsors/",emoji:"💜"},
  {id:"paypal",      label:"PayPal",         color:"00457C",logo:"paypal",       prefix:"https://paypal.me/",       emoji:"💳"},
];

const SECTION_LIST = [
  {id:"header",   label:"Animated Header",  icon:"🎨", locked:true},
  {id:"typing",   label:"Typing Animation", icon:"⌨️"},
  {id:"socials",  label:"Social Badges",    icon:"🌐"},
  {id:"whoami",   label:"Who Am I",         icon:"⚡"},
  {id:"skills",   label:"Tech Stack",       icon:"🛠️"},
  {id:"stats",    label:"GitHub Stats",     icon:"📊"},
  {id:"streak",   label:"Streak",           icon:"🔥"},
  {id:"summary",  label:"Summary Cards",    icon:"📋"},
  {id:"graph",    label:"Activity Graph",   icon:"📈"},
  {id:"snake",    label:"Snake Animation",  icon:"🐍"},
  {id:"trophies", label:"Trophies",         icon:"🏆"},
  {id:"projects", label:"Projects Table",   icon:"🎯"},
  {id:"pinned",   label:"Pinned Repos",     icon:"📌"},
  {id:"goals",    label:"Goals",            icon:"🌱"},
  {id:"funfacts", label:"Fun Facts",        icon:"💡"},
  {id:"quote",    label:"Dev Quote",        icon:"✍️"},
  {id:"wakatime", label:"WakaTime Stats",   icon:"⏱️"},
  {id:"spotify",  label:"Spotify Playing",  icon:"🎵"},
  {id:"support",  label:"Support Links",    icon:"❤️"},
  {id:"footer",   label:"Footer Wave",      icon:"🏁"},
];

const STEPS = [
  {id:"identity", icon:I.user,    label:"Identity",   desc:"Who you are",        color:"#7c3aed"},
  {id:"style",    icon:I.palette, label:"Style",      desc:"Theme & colours",     color:"#ec4899"},
  {id:"typing",   icon:I.keyboard,label:"Typing SVG", desc:"Animated lines",     color:"#f59e0b"},
  {id:"socials",  icon:I.globe,   label:"Socials",    desc:"Your platforms",      color:"#10b981"},
  {id:"skills",   icon:I.tool,    label:"Tech Stack",  desc:"Your arsenal",       color:"#3b82f6"},
  {id:"widgets",  icon:I.chart,   label:"Widgets",    desc:"Stats & extras",      color:"#8b5cf6"},
  {id:"projects", icon:I.target,  label:"Projects",   desc:"Showcase your work",  color:"#f97316"},
  {id:"extras",   icon:I.idea,    label:"Extras",     desc:"Personality touches", color:"#06b6d4"},
  {id:"support",  icon:I.heart,   label:"Support",    desc:"Donation links",      color:"#ef4444"},
  {id:"sections", icon:I.list,    label:"Sections",   desc:"Enable/disable",      color:"#84cc16"},
];

const INIT = {
  username:"", displayName:"", tagline:"", role:"", location:"", building:"", learning:"", collab:"",
  theme:"tokyonight", headerStyle:"waving", headerColor1:"#9146FF", headerColor2:"#FF4500", badgeStyle:"for-the-badge",
  typingLines:["","","",""],
  skills:[], socials:{}, supportLinks:{}, wakatimeUser:"", spotifyUrl:"", utcOffset:"0",
  projects:[{name:"",stack:"",status:"🟢 Live",link:""}],
  pinnedRepos:[],
  goals:[""], funFacts:[""],
  sections:{
    header:true,typing:true,socials:true,whoami:true,skills:true,
    stats:true,streak:true,summary:false,graph:true,snake:true,
    trophies:true,projects:true,pinned:false,goals:false,funfacts:true,
    quote:true,wakatime:false,spotify:false,support:false,footer:true,
  },
};

// ─── README BUILDER ──────────────────────────────────────────────────────────
function cleanHex(v){const c=(v||"").replace(/^#/,"");return /^[0-9a-fA-F]{6}$/.test(c)?c:null;}
function badgeEnc(s){return s.replace(/ /g,"_").replace(/-/g,"--");}
function cleanUser(v){return v.replace(/^https?:\/\/(www\.)?github\.com\//i,"").replace(/[^a-zA-Z0-9\-]/g,"").trim();}

function buildReadme(s){
  const theme=THEMES.find(t=>t.id===s.theme)||THEMES[0];
  const enc=encodeURIComponent;
  const u=cleanUser(s.username);
  const h1=cleanHex(s.headerColor1)||"9146FF";
  const h2=cleanHex(s.headerColor2)||"FF4500";
  const pv=theme.primary.replace("#","");
  const ac=theme.accent.replace("#","");
  const bs=s.badgeStyle||"for-the-badge";
  const out=[];
  const sec=id=>s.sections[id];

  if(sec("header")){
    const name=s.displayName||u||"Your Name";
    const desc=s.tagline||"Developer · Creator · Builder";
    out.push(`<div align="center">\n`);
    out.push(`<img src="https://capsule-render.vercel.app/api?type=${s.headerStyle}&color=0:${h1},100:${h2}&height=220&section=header&text=${enc(name)}&fontSize=70&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=${enc(desc)}&descAlignY=58&descSize=18&descColor=dddddd" width="100%" alt="${name} banner" />`);
  }
  if(sec("typing")){
    const lines=s.typingLines.filter(l=>l&&l.trim());
    if(lines.length) out.push(`\n<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=20&duration=3500&pause=1200&color=${pv}&center=true&vCenter=true&width=500&lines=${lines.map(enc).join(";")}" alt="Typing SVG" />`);
  }
  if(sec("socials")){
    const active=SOCIALS.filter(p=>s.socials[p.id]&&s.socials[p.id].trim());
    if(active.length){
      out.push(`\n<br/><br/>\n`);
      active.forEach(p=>out.push(`[![${p.label}](https://img.shields.io/badge/${badgeEnc(p.label)}-${p.color}?style=${bs}&logo=${p.logo}&logoColor=white)](${s.socials[p.id]})`));
    }
    if(u){
      out.push(`\n<br/>\n`);
      out.push(`![Views](https://komarev.com/ghpvc/?username=${u}&color=${pv}&style=${bs}&label=PROFILE+VIEWS) ![Followers](https://img.shields.io/github/followers/${u}?style=${bs}&color=${pv}&labelColor=555555&label=FOLLOWERS)`);
    }
  }
  if(sec("header")||sec("typing")||sec("socials")) out.push(`\n\n</div>\n`);

  if(sec("whoami")&&(s.role||s.location||s.building||s.learning||s.collab)){
    out.push(`---\n\n## ⚡ Who Am I?\n\n<div align="center">\n<table>`);
    if(s.role)     out.push(`  <tr><td align="center">🚀</td><td><strong>${s.role}</strong></td></tr>`);
    if(s.location) out.push(`  <tr><td align="center">📍</td><td>${s.location}</td></tr>`);
    if(s.building) out.push(`  <tr><td align="center">🔭</td><td>Currently building <strong>${s.building}</strong></td></tr>`);
    if(s.learning) out.push(`  <tr><td align="center">🌱</td><td>Learning ${s.learning}</td></tr>`);
    if(s.collab)   out.push(`  <tr><td align="center">🤝</td><td>Open to collaborate on ${s.collab}</td></tr>`);
    out.push(`</table>\n</div>\n`);
  }
  if(sec("skills")&&s.skills.length){
    out.push(`---\n\n## 🛠️ Tech Stack\n\n<div align="center">\n\n[![Skills](https://skillicons.dev/icons?i=${s.skills.slice(0,60).join(",")}&perline=8)](https://skillicons.dev)\n\n</div>\n`);
  }
  if(sec("stats")&&u){
    const base=`https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=${s.theme}&include_all_commits=true&count_private=true&hide_border=true&rank_icon=github`;
    const langs=`https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&layout=compact&theme=${s.theme}&hide_border=true&langs_count=8`;
    out.push(`---\n\n## 📊 GitHub Stats\n\n<div align="center">\n<picture><source media="(prefers-color-scheme:dark)" srcset="${base}"/><source media="(prefers-color-scheme:light)" srcset="${base.replace("theme="+s.theme,"theme=default")}"/><img height="180em" src="${base}" alt="stats"/></picture>\n<picture><source media="(prefers-color-scheme:dark)" srcset="${langs}"/><source media="(prefers-color-scheme:light)" srcset="${langs.replace("theme="+s.theme,"theme=default")}"/><img height="180em" src="${langs}" alt="langs"/></picture>\n</div>\n`);
  }
  if(sec("streak")&&u){
    const su=`https://streak-stats.demolab.com?user=${u}&theme=${s.theme}&hide_border=true`;
    out.push(`---\n\n## 🔥 Streak\n\n<div align="center">\n<picture><source media="(prefers-color-scheme:dark)" srcset="${su}"/><source media="(prefers-color-scheme:light)" srcset="${su.replace("theme="+s.theme,"theme=default")}"/><img src="${su}" alt="streak"/></picture>\n</div>\n`);
  }
  if(sec("summary")&&u){
    const sb=`https://github-profile-summary-cards.vercel.app/api/cards`;
    out.push(`---\n\n## 📋 Profile Summary\n\n<div align="center">\n<img src="${sb}/profile-details?username=${u}&theme=tokyonight" width="100%" alt="summary"/>\n<img src="${sb}/repos-per-language?username=${u}&theme=tokyonight" height="160em" alt="repos"/>\n<img src="${sb}/most-commit-language?username=${u}&theme=tokyonight" height="160em" alt="commits"/>\n<img src="${sb}/stats?username=${u}&theme=tokyonight" height="160em" alt="stats"/>\n<img src="${sb}/productive-time?username=${u}&theme=tokyonight&utcOffset=${s.utcOffset||0}" height="160em" alt="time"/>\n</div>\n`);
  }
  if(sec("graph")&&u){
    const gd=`https://github-readme-activity-graph.vercel.app/graph?username=${u}&bg_color=1a1b27&color=ffffff&line=${pv}&point=${ac}&area=true&area_color=${pv}&hide_border=true&custom_title=Contribution+Graph`;
    const gl=gd.replace("bg_color=1a1b27","bg_color=ffffff").replace("color=ffffff","color=333333");
    out.push(`---\n\n## 📈 Contribution Graph\n\n<div align="center">\n<picture><source media="(prefers-color-scheme:dark)" srcset="${gd}"/><source media="(prefers-color-scheme:light)" srcset="${gl}"/><img src="${gd}" width="100%" alt="graph"/></picture>\n</div>\n`);
  }
  if(sec("snake")&&u){
    const raw=`https://raw.githubusercontent.com/${u}/${u}/output`;
    out.push(`---\n\n## 🐍 Contribution Snake\n\n<div align="center">\n<picture><source media="(prefers-color-scheme:dark)" srcset="${raw}/github-snake-dark.svg"/><source media="(prefers-color-scheme:light)" srcset="${raw}/github-snake.svg"/><img src="${raw}/github-snake.svg" alt="snake"/></picture>\n\n> 💡 Add \`snake.yml\` to \`.github/workflows/\` → Actions → Run workflow once.\n</div>\n`);
  }
  if(sec("trophies")&&u){
    const tp=`https://github-profile-trophy-fork-two.vercel.app/?username=${u}&theme=${s.theme}&no-frame=true&no-bg=true&margin-w=8&column=4&rank=SSS,SS,S,AAA,AA,A,B,C`;
    out.push(`---\n\n## 🏆 Achievements\n\n<div align="center">\n<img src="${tp}" alt="trophies"/>\n</div>\n`);
  }
  if(sec("projects")&&s.projects.filter(p=>p.name).length){
    out.push(`---\n\n## 🎯 Projects\n\n<div align="center">\n\n| 🚀 Project | 🔧 Stack | 📌 Status | 🔗 Link |\n|:---|:---|:---|:---|\n`);
    s.projects.filter(p=>p.name).forEach(p=>out.push(`| **${p.name}** | ${p.stack||"—"} | ${p.status} | ${p.link?`[View →](${p.link})`:"Coming soon"} |`));
    out.push(`\n</div>\n`);
  }
  if(sec("pinned")&&s.pinnedRepos&&s.pinnedRepos.filter(r=>r.name).length){
    out.push(`---\n\n## 📌 Pinned Repositories\n\n<div align="center">\n\n| 📦 Repo | 📝 About | ⭐ | 🔧 |\n|:---|:---|:---:|:---|\n`);
    s.pinnedRepos.filter(r=>r.name).forEach(r=>out.push(`| **${r.link?`[${r.name}](${r.link})`:r.name}** | ${r.desc||"—"} | ${r.stars||"—"} | ${r.lang||"—"} |`));
    out.push(`\n</div>\n`);
  }
  if(sec("goals")&&s.goals.filter(g=>g&&g.trim()).length){
    out.push(`---\n\n## 🌱 Goals\n\n`);
    s.goals.filter(g=>g&&g.trim()).forEach(g=>out.push(`- ${g}\n`));
  }
  if(sec("funfacts")&&s.funFacts.filter(f=>f&&f.trim()).length){
    out.push(`---\n\n## 💡 Fun Facts\n\n`);
    s.funFacts.filter(f=>f&&f.trim()).forEach(f=>out.push(`- ${f}\n`));
  }
  if(sec("quote")) out.push(`---\n\n## ✍️ Dev Quote\n\n<div align="center">\n\n![Quote](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=tokyonight)\n\n</div>\n`);
  if(sec("wakatime")&&s.wakatimeUser){
    out.push(`---\n\n## ⏱️ Coding Stats\n\n<div align="center">\n\n[![WakaTime](https://github-readme-stats.vercel.app/api/wakatime?username=${s.wakatimeUser.trim()}&theme=${s.theme}&hide_border=true&layout=compact)](https://wakatime.com/@${s.wakatimeUser.trim()})\n\n</div>\n`);
  }
  if(sec("spotify")&&s.spotifyUrl){
    out.push(`---\n\n## 🎵 Now Playing\n\n<div align="center">\n\n[![Spotify](${s.spotifyUrl.trim()})](https://open.spotify.com)\n\n</div>\n`);
  }
  if(sec("support")){
    const active=SUPPORT_PLATFORMS.filter(p=>s.supportLinks[p.id]&&s.supportLinks[p.id].trim());
    if(active.length){
      out.push(`---\n\n## ❤️ Support My Work\n\n<div align="center">\n\n*If my work has been valuable to you — every coffee helps fuel the next build!*\n\n`);
      active.forEach(p=>out.push(`[![${p.label}](https://img.shields.io/badge/${badgeEnc(p.label)}-${p.color}?style=${bs}&logo=${p.logo}&logoColor=white)](${p.prefix}${s.supportLinks[p.id].trim()})\n`));
      out.push(`\n</div>\n`);
    }
  }
  if(sec("footer")){
    out.push(`---\n\n<div align="center">\n<img src="https://capsule-render.vercel.app/api?type=waving&color=0:${h2},100:${h1}&height=130&section=footer" width="100%" alt="footer"/>\n\n**Thanks for visiting — follow, fork, or reach out. Let's build something exceptional together.**\n</div>`);
  }
  return out.join("\n");
}

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const BG = "#05070a";
const SURFACE = "#0d1117";
const CARD = "#111827";
const BORDER = "#1f2937";
const BORDER2 = "#374151";
const TEXT = "#f9fafb";
const MUTED = "#6b7280";
const DIM = "#374151";
const PURPLE = "#7c3aed";
const PURPLE_L = "#a78bfa";
const PURPLE_GLOW = "rgba(124,58,237,0.4)";

// ─── ATOMS ───────────────────────────────────────────────────────────────────

const GS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',system-ui,sans-serif;background:${BG};color:${TEXT};min-height:100vh}
input,textarea,button{font-family:inherit}
input::placeholder,textarea::placeholder{color:#4b5563}
input[type=color]{-webkit-appearance:none;padding:0;border:none;cursor:pointer;border-radius:8px;overflow:hidden}
input[type=color]::-webkit-color-swatch-wrapper{padding:0}
input[type=color]::-webkit-color-swatch{border:none}
input[type=range]{accent-color:${PURPLE};cursor:pointer;width:100%}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#374151;border-radius:4px}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes pulse-glow{0%,100%{box-shadow:0 0 20px ${PURPLE_GLOW}}50%{box-shadow:0 0 40px ${PURPLE_GLOW},0 0 80px rgba(124,58,237,0.2)}}
@keyframes slide-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.float{animation:float 3s ease-in-out infinite}
.slide-up{animation:slide-up .4s ease both}
.glow{animation:pulse-glow 2s ease-in-out infinite}
`;

function PremiumInput({value,onChange,placeholder,warn,mono,style={},multiline,rows=3,icon}){
  const [focused,setFocused]=useState(false);
  const borderCol=warn?"#f59e0b":focused?PURPLE:BORDER;
  const base={
    width:"100%",background:"#0a0e18",
    border:`1.5px solid ${borderCol}`,borderRadius:10,
    padding:icon?"9px 12px 9px 38px":"9px 14px",
    color:TEXT,fontSize:13,outline:"none",
    fontFamily:mono?"'JetBrains Mono',monospace":"inherit",
    transition:"border-color .2s,box-shadow .2s",
    boxShadow:focused?`0 0 0 3px rgba(124,58,237,0.15)`:"none",
    ...style
  };
  const wrap={position:"relative",width:"100%"};
  const el=multiline
    ?<textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        rows={rows} style={{...base,resize:"vertical",lineHeight:1.6}}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}/>
    :<input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={base} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}/>;
  return <div style={wrap}>
    {icon&&<span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:15,pointerEvents:"none"}}>{icon}</span>}
    {el}
    {warn&&<div style={{fontSize:10.5,color:"#f59e0b",marginTop:4}}>⚠ {warn}</div>}
  </div>;
}

function Field({label,hint,required,children}){
  return <div style={{display:"flex",flexDirection:"column",gap:6}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <label style={{fontSize:11,fontWeight:700,color:MUTED,letterSpacing:"0.08em",textTransform:"uppercase"}}>
        {label}{required&&<span style={{color:"#ef4444",marginLeft:3}}>✦</span>}
      </label>
      {hint&&<span style={{fontSize:10.5,color:"#4b5563",fontStyle:"italic"}}>{hint}</span>}
    </div>
    {children}
  </div>;
}

function GlowChip({label,active,onClick,color,small}){
  return <div onClick={onClick} style={{
    padding:small?"3px 8px":"5px 12px",borderRadius:20,fontSize:small?11:12.5,
    cursor:"pointer",userSelect:"none",transition:"all .15s",fontWeight:500,
    background:active?(color||PURPLE)+"22":"#111827",
    border:`1.5px solid ${active?(color||PURPLE):BORDER2}`,
    color:active?(color||PURPLE_L):MUTED,
    boxShadow:active?`0 0 12px ${(color||PURPLE)}44`:"none",
  }}>{label}</div>;
}

function GlowToggle({checked,onChange,label,disabled}){
  return <label style={{display:"flex",alignItems:"center",gap:10,cursor:disabled?"default":"pointer",userSelect:"none",opacity:disabled?.5:1}}>
    <div onClick={disabled?undefined:()=>onChange(!checked)} style={{
      width:40,height:22,borderRadius:11,position:"relative",flexShrink:0,
      background:checked?PURPLE:BORDER,transition:"all .25s",
      boxShadow:checked?`0 0 12px ${PURPLE_GLOW}`:"none",
    }}>
      <div style={{position:"absolute",top:2,left:checked?20:2,width:18,height:18,
        borderRadius:"50%",background:"#fff",transition:"left .25s",
        boxShadow:"0 2px 6px rgba(0,0,0,.4)"}}/>
    </div>
    <span style={{fontSize:13,color:checked?TEXT:MUTED,fontWeight:checked?500:400}}>{label}</span>
  </label>;
}

function GlassCard({children,style={},glow}){
  return <div style={{
    background:"linear-gradient(135deg,rgba(255,255,255,.04) 0%,rgba(255,255,255,.01) 100%)",
    border:`1px solid rgba(255,255,255,.07)`,borderRadius:16,
    backdropFilter:"blur(10px)",padding:20,
    boxShadow:glow?`0 0 30px rgba(124,58,237,.15),0 8px 32px rgba(0,0,0,.4)`:"0 4px 24px rgba(0,0,0,.3)",
    ...style
  }}>{children}</div>;
}

function Icon3D({src,size=48,float,style={}}){
  return <img src={src} alt="" width={size} height={size}
    className={float?"float":""}
    style={{objectFit:"contain",filter:"drop-shadow(0 8px 16px rgba(0,0,0,.5))",
      imageRendering:"auto",...style}}
    onError={e=>{e.target.style.display="none"}}/>;
}

function StepDot({step,current,onClick}){
  const done=current>STEPS.indexOf(step);
  const active=current===STEPS.indexOf(step);
  return <div onClick={done||active?()=>onClick(STEPS.indexOf(step)):undefined}
    style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,
      cursor:done||active?"pointer":"default",opacity:done||active?1:.4,transition:"opacity .2s"}}>
    <div style={{
      width:40,height:40,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",
      background:done?"#059669":active?"#7c3aed":"#1f2937",
      border:`2px solid ${done?"#059669":active?"#a78bfa":"#374151"}`,
      boxShadow:active?`0 0 20px rgba(124,58,237,.5)`:done?"0 0 12px rgba(5,150,105,.4)":"none",
      transition:"all .3s",fontSize:18,
    }}>
      {done?"✓":<Icon3D src={step.icon} size={24}/>}
    </div>
    <span style={{fontSize:9.5,fontWeight:600,color:active?PURPLE_L:done?"#34d399":MUTED,
      letterSpacing:"0.04em",textTransform:"uppercase",whiteSpace:"nowrap"}}>{step.label}</span>
  </div>;
}

// ─── STEP PAGES ───────────────────────────────────────────────────────────────

function StepHero({icon,title,subtitle,color}){
  return <div style={{textAlign:"center",padding:"8px 0 24px"}}>
    <Icon3D src={icon} size={72} float style={{marginBottom:12}}/>
    <h2 style={{fontSize:26,fontWeight:900,letterSpacing:"-0.04em",
      background:`linear-gradient(135deg, ${color||PURPLE_L}, #fff)`,
      WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:6}}>{title}</h2>
    <p style={{fontSize:14,color:MUTED}}>{subtitle}</p>
  </div>;
}

function StepIdentity({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:18}} className="slide-up">
    <StepHero icon={I.user} title="Your Identity" subtitle="The foundation of your GitHub presence — make every word count." color="#a78bfa"/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <div style={{gridColumn:"1/-1"}}>
        <Field label="GitHub Username" required hint="Paste full URL or just the handle">
          <PremiumInput value={s.username} onChange={v=>upd("username",v)} placeholder="e.g. torvalds — or paste https://github.com/you" icon="⚡"/>
        </Field>
      </div>
      <Field label="Display Name">
        <PremiumInput value={s.displayName} onChange={v=>upd("displayName",v)} placeholder="Linus Torvalds" icon="✦"/>
      </Field>
      <Field label="Location" hint="optional">
        <PremiumInput value={s.location} onChange={v=>upd("location",v)} placeholder="San Francisco, CA 🌁" icon="📍"/>
      </Field>
      <div style={{gridColumn:"1/-1"}}>
        <Field label="Tagline" hint="shown in your animated header banner">
          <PremiumInput value={s.tagline} onChange={v=>upd("tagline",v)} placeholder="Full-Stack Engineer · Open Source Builder · Creator" icon="✍️"/>
        </Field>
      </div>
      <div style={{gridColumn:"1/-1"}}>
        <Field label="Professional Role">
          <PremiumInput value={s.role} onChange={v=>upd("role",v)} placeholder="Senior Software Engineer & Content Creator at Big Tech Co." icon="🚀"/>
        </Field>
      </div>
      <Field label="Currently Building" hint="what are you shipping?">
        <PremiumInput value={s.building} onChange={v=>upd("building",v)} placeholder="the next developer tool the world needs" icon="🔭"/>
      </Field>
      <Field label="Currently Learning">
        <PremiumInput value={s.learning} onChange={v=>upd("learning",v)} placeholder="Rust, distributed systems, and patience" icon="🌱"/>
      </Field>
      <div style={{gridColumn:"1/-1"}}>
        <Field label="Open to Collaborate On" hint="what kind of collaborators are you looking for?">
          <PremiumInput value={s.collab} onChange={v=>upd("collab",v)} placeholder="ambitious open-source tools that millions of devs will use" icon="🤝"/>
        </Field>
      </div>
    </div>
  </div>;
}

function StepStyle({s,upd}){
  const thm=THEMES.find(t=>t.id===s.theme)||THEMES[0];
  return <div style={{display:"flex",flexDirection:"column",gap:20}} className="slide-up">
    <StepHero icon={I.palette} title="Your Visual Identity" subtitle="A theme that turns visitors into followers. Choose every detail." color="#f472b6"/>
    <Field label="Color Theme — pick your vibe">
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:4}}>
        {THEMES.map(t=>(
          <div key={t.id} onClick={()=>upd("theme",t.id)} style={{
            background:t.bg,border:`2px solid ${s.theme===t.id?t.primary:BORDER}`,
            borderRadius:12,padding:"10px 6px",cursor:"pointer",textAlign:"center",
            boxShadow:s.theme===t.id?`0 0 16px ${t.primary}66`:"none",transition:"all .2s"
          }}>
            <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:5}}>
              {[t.bg,t.primary,t.accent].map((c,i)=><div key={i} style={{width:10,height:10,borderRadius:"50%",background:c,border:`1px solid rgba(255,255,255,.15)`}}/>)}
            </div>
            <div style={{fontSize:10.5,fontWeight:700,color:s.theme===t.id?t.primary:"#6b7280"}}>{t.label}</div>
          </div>
        ))}
      </div>
    </Field>
    <Field label="Header Banner Shape">
      <div style={{display:"flex",flexWrap:"wrap",gap:7,marginTop:4}}>
        {HEADER_STYLES.map(h=><GlowChip key={h.id} label={h.label} active={s.headerStyle===h.id} onClick={()=>upd("headerStyle",h.id)}/>)}
      </div>
    </Field>
    <Field label="Gradient Palette — the colour signature of your profile">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:4}}>
        {[["headerColor1","✦ Start colour"],["headerColor2","✦ End colour"]].map(([k,lbl])=>(
          <div key={k} style={{display:"flex",flexDirection:"column",gap:6}}>
            <span style={{fontSize:11,color:MUTED}}>{lbl}</span>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input type="color" value={s[k]} onChange={e=>upd(k,e.target.value)}
                style={{width:44,height:44,borderRadius:10,cursor:"pointer",border:`2px solid ${BORDER2}`,flexShrink:0}}/>
              <PremiumInput value={s[k]} onChange={v=>upd(k,v)} placeholder="#7c3aed" style={{flex:1,fontFamily:"monospace",fontSize:12}}/>
            </div>
          </div>
        ))}
      </div>
      {/* Live banner preview */}
      <div style={{
        height:70,borderRadius:14,overflow:"hidden",marginTop:8,
        background:`linear-gradient(135deg, ${s.headerColor1}, ${s.headerColor2})`,
        display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:3,
        boxShadow:`0 4px 24px rgba(0,0,0,.5)`,position:"relative"
      }}>
        <div style={{fontSize:18,fontWeight:900,color:"#fff",letterSpacing:"-0.02em"}}>
          {s.displayName||s.username||"Your Name"}
        </div>
        <div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>{s.tagline||"Developer · Creator · Builder"}</div>
      </div>
    </Field>
    <Field label="Badge Style">
      <div style={{display:"flex",gap:7,flexWrap:"wrap",marginTop:4}}>
        {["for-the-badge","flat","flat-square","plastic"].map(b=><GlowChip key={b} label={b} active={s.badgeStyle===b} onClick={()=>upd("badgeStyle",b)}/>)}
      </div>
    </Field>
  </div>;
}

function StepTyping({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:18}} className="slide-up">
    <StepHero icon={I.keyboard} title="Animated Typing Lines" subtitle="These cycle through on your profile like a live terminal. Choose words that stop the scroll." color="#fbbf24"/>
    {[0,1,2,3].map(i=>{
      const val=s.typingLines[i]||"";
      const over=val.length>55;
      const hints=["Your headline — what do you build?","Your identity — who are you becoming?","Your personality — what makes you different?","Your motto — the line people screenshot."];
      return <Field key={i} label={`Line ${i+1} of 4`} hint={val.length?`${val.length}/55`:undefined}>
        <PremiumInput value={val} warn={over?"Keep under 55 chars — may overflow the SVG width":undefined}
          onChange={v=>{const l=[...s.typingLines];l[i]=v;upd("typingLines",l);}}
          placeholder={hints[i]} icon={["⚡","🚀","✨","🔥"][i]}/>
      </Field>;
    })}
    <GlassCard>
      <div style={{fontSize:12,fontWeight:700,color:PURPLE_L,marginBottom:8}}>✦ Proven line formulas that get stars</div>
      <div style={{display:"flex",flexDirection:"column",gap:5}}>
        {[
          ["Building","Next.js apps that feel like magic"],
          ["Turning","coffee into open-source code since 2018"],
          ["I ship","before most people finish planning"],
          ["Ask me","about anything — I'll figure it out"],
        ].map(([bold,rest],i)=>(
          <div key={i} style={{fontSize:12,color:MUTED}}>
            <span style={{color:TEXT,fontWeight:600}}>{bold}</span> {rest}
          </div>
        ))}
      </div>
    </GlassCard>
  </div>;
}

function StepSocials({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:16}} className="slide-up">
    <StepHero icon={I.globe} title="Your Platforms" subtitle="Only filled links appear. Skip what doesn't apply — quality beats quantity." color="#34d399"/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      {SOCIALS.map(p=>{
        const val=s.socials[p.id]||"";
        const warn=val&&!val.startsWith("http")?"Must start with https://":undefined;
        return <Field key={p.id} label={p.label}>
          <PremiumInput value={val} warn={warn}
            onChange={v=>upd("socials",{...s.socials,[p.id]:v})}
            placeholder={`https://${p.id==="portfolio"?"yoursite.com":p.id+".com/you"}`}/>
        </Field>;
      })}
    </div>
  </div>;
}

function StepSkills({s,upd}){
  const [search,setSearch]=useState("");
  const [tab,setTab]=useState("Languages");
  const visible=search?Object.values(SKILL_GROUPS).flat().filter(sk=>sk.toLowerCase().includes(search.toLowerCase())):(SKILL_GROUPS[tab]||[]);
  return <div style={{display:"flex",flexDirection:"column",gap:16}} className="slide-up">
    <StepHero icon={I.tool} title="Your Tech Arsenal" subtitle="Pick the tools you actually use — precision over padding." color="#60a5fa"/>
    <div style={{display:"flex",gap:10,alignItems:"center"}}>
      <PremiumInput value={search} onChange={setSearch}
        placeholder="Search 120+ technologies — react, rust, postgres, terraform..." icon="🔍" style={{flex:1}}/>
      <div style={{
        background:`${PURPLE}22`,border:`1.5px solid ${PURPLE}`,borderRadius:10,
        padding:"9px 14px",fontSize:12,fontWeight:800,color:PURPLE_L,whiteSpace:"nowrap",
        boxShadow:`0 0 12px ${PURPLE_GLOW}`
      }}>{s.skills.length}<span style={{color:MUTED,fontWeight:400}}>/60</span></div>
    </div>
    {!search&&(
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        {Object.keys(SKILL_GROUPS).map(g=><GlowChip key={g} label={g} small active={tab===g} onClick={()=>setTab(g)}/>)}
      </div>
    )}
    <div style={{display:"flex",flexWrap:"wrap",gap:6,maxHeight:220,overflowY:"auto",padding:2}}>
      {visible.map(sk=>{
        const on=s.skills.includes(sk);
        return <div key={sk} onClick={()=>{
          if(on)upd("skills",s.skills.filter(x=>x!==sk));
          else if(s.skills.length<60)upd("skills",[...s.skills,sk]);
        }} style={{
          display:"flex",alignItems:"center",gap:6,padding:"5px 10px",borderRadius:10,cursor:"pointer",
          background:on?`${PURPLE}30`:"#0f172a",
          border:`1.5px solid ${on?PURPLE:BORDER2}`,
          color:on?PURPLE_L:MUTED,fontSize:12,userSelect:"none",transition:"all .12s",fontWeight:500,
          boxShadow:on?`0 0 10px ${PURPLE_GLOW}`:"none",
        }}>
          <img src={`https://skillicons.dev/icons?i=${sk}`} alt={sk} width={16} height={16}
            style={{borderRadius:3}} onError={e=>{e.target.style.display="none"}}/>
          {sk}
        </div>;
      })}
    </div>
    {s.skills.length>0&&(
      <GlassCard style={{padding:12}}>
        <div style={{fontSize:10.5,color:MUTED,marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"}}>Selected</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
          {s.skills.map(sk=>(
            <div key={sk} onClick={()=>upd("skills",s.skills.filter(x=>x!==sk))} style={{
              display:"flex",alignItems:"center",gap:5,background:PURPLE,
              borderRadius:8,padding:"3px 8px",color:"#fff",fontSize:11,cursor:"pointer",fontWeight:600
            }}>
              <img src={`https://skillicons.dev/icons?i=${sk}`} alt={sk} width={12} height={12}
                onError={e=>{e.target.style.display="none"}}/>
              {sk} <span style={{opacity:.6,marginLeft:1}}>×</span>
            </div>
          ))}
        </div>
      </GlassCard>
    )}
  </div>;
}

function StepWidgets({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:18}} className="slide-up">
    <StepHero icon={I.chart} title="Stats & Widgets" subtitle="The data layer of your profile — configure what GitHub shows the world." color="#c084fc"/>
    <GlassCard>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <Icon3D src={I.chart} size={36}/>
        <div><div style={{fontSize:14,fontWeight:700}}>GitHub Stats Layout</div>
        <div style={{fontSize:12,color:MUTED}}>How your stat cards are arranged</div></div>
      </div>
      <div style={{display:"flex",gap:8}}>
        <GlowChip label="Side by Side" active={s.statsLayout==="side"} onClick={()=>upd("statsLayout","side")}/>
        <GlowChip label="Stacked" active={s.statsLayout==="stacked"} onClick={()=>upd("statsLayout","stacked")}/>
      </div>
    </GlassCard>
    <GlassCard>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <Icon3D src={I.trophy} size={36}/>
        <div><div style={{fontSize:14,fontWeight:700}}>Trophy Columns — {s.trophyColumns||4}</div>
        <div style={{fontSize:12,color:MUTED}}>How many trophies per row</div></div>
      </div>
      <input type="range" min={1} max={6} value={s.trophyColumns||4} onChange={e=>upd("trophyColumns",+e.target.value)}/>
      <div style={{display:"flex",gap:5,marginTop:8}}>
        {Array.from({length:s.trophyColumns||4}).map((_,i)=>(
          <div key={i} style={{flex:1,height:28,background:"#1f2937",border:`1px solid ${BORDER2}`,
            borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>🏆</div>
        ))}
      </div>
    </GlassCard>
    <GlassCard>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <Icon3D src={I.clock} size={36}/>
        <div><div style={{fontSize:14,fontWeight:700}}>WakaTime Coding Stats</div>
        <div style={{fontSize:12,color:MUTED}}>Proves you actually write code — not just talk about it</div></div>
      </div>
      <Field label="WakaTime Username" hint="get it free at wakatime.com">
        <PremiumInput value={s.wakatimeUser||""} onChange={v=>upd("wakatimeUser",v)} placeholder="your-wakatime-handle" icon="⏱️"/>
      </Field>
    </GlassCard>
    <GlassCard>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <Icon3D src={I.music} size={36}/>
        <div><div style={{fontSize:14,fontWeight:700}}>Spotify Now Playing</div>
        <div style={{fontSize:12,color:MUTED}}>Shows what you're listening to in real time</div></div>
      </div>
      <Field label="Novatorem card URL" hint="deploy free at github.com/novatorem/novatorem">
        <PremiumInput value={s.spotifyUrl||""} onChange={v=>upd("spotifyUrl",v)} placeholder="https://novatorem-xxx.vercel.app/api/spotify" icon="🎵"/>
      </Field>
    </GlassCard>
    <GlassCard>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <Icon3D src={I.globe} size={36}/>
        <div><div style={{fontSize:14,fontWeight:700}}>Timezone</div>
        <div style={{fontSize:12,color:MUTED}}>For the productive-time summary card</div></div>
      </div>
      <Field label="UTC Offset" hint="Nepal: 5.75  ·  London: 0  ·  New York: -5  ·  Tokyo: 9">
        <PremiumInput value={s.utcOffset||"0"} onChange={v=>upd("utcOffset",v)} placeholder="0" icon="🌍"/>
      </Field>
    </GlassCard>
  </div>;
}

function StepProjects({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:16}} className="slide-up">
    <StepHero icon={I.target} title="Your Projects" subtitle="Show what you've shipped. Real work beats any description." color="#fb923c"/>
    {s.projects.map((p,i)=>(
      <GlassCard key={i} glow={i===0}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:28,height:28,borderRadius:8,background:`${PURPLE}33`,border:`1px solid ${PURPLE}`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:PURPLE_L}}>{i+1}</div>
            <span style={{fontSize:13,fontWeight:700,color:TEXT}}>Project {i+1}</span>
          </div>
          {s.projects.length>1&&(
            <button onClick={()=>upd("projects",s.projects.filter((_,j)=>j!==i))} style={{
              background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",
              color:"#f87171",borderRadius:8,padding:"4px 12px",fontSize:11,fontWeight:600,cursor:"pointer"
            }}>Remove</button>
          )}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <Field label="Project Name">
              <PremiumInput value={p.name} onChange={v=>{const ps=[...s.projects];ps[i]={...ps[i],name:v};upd("projects",ps);}} placeholder="ReadMeCraft Pro" icon="📦"/>
            </Field>
            <Field label="Tech Stack">
              <PremiumInput value={p.stack} onChange={v=>{const ps=[...s.projects];ps[i]={...ps[i],stack:v};upd("projects",ps);}} placeholder="React · TypeScript · Vercel" icon="🔧"/>
            </Field>
          </div>
          <Field label="Status">
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["🟢 Live","🟡 In Progress","🔵 Planning","🔴 Paused"].map(st=>(
                <GlowChip key={st} label={st} active={p.status===st}
                  color={st.includes("🟢")?"#16a34a":st.includes("🟡")?"#ca8a04":st.includes("🔵")?"#2563eb":"#dc2626"}
                  onClick={()=>{const ps=[...s.projects];ps[i]={...ps[i],status:st};upd("projects",ps);}}/>
              ))}
            </div>
          </Field>
          <Field label="Repository / Demo Link" hint="optional">
            <PremiumInput value={p.link} onChange={v=>{const ps=[...s.projects];ps[i]={...ps[i],link:v};upd("projects",ps);}} placeholder="https://github.com/you/project" icon="🔗"/>
          </Field>
        </div>
      </GlassCard>
    ))}
    <button onClick={()=>upd("projects",[...s.projects,{name:"",stack:"",status:"🔵 Planning",link:""}])}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=PURPLE;e.currentTarget.style.color=PURPLE_L;}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=BORDER2;e.currentTarget.style.color=MUTED;}}
      style={{background:"transparent",border:`2px dashed ${BORDER2}`,color:MUTED,
        borderRadius:12,padding:"14px",fontSize:13,fontWeight:600,cursor:"pointer",transition:"all .2s"}}>
      + Add Another Project
    </button>
  </div>;
}

function StepExtras({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:18}} className="slide-up">
    <StepHero icon={I.idea} title="Your Personality" subtitle="This is what people remember. Be specific, be weird, be real." color="#22d3ee"/>
    <GlassCard>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <Icon3D src={I.bolt} size={36}/>
        <div><div style={{fontSize:14,fontWeight:700}}>Fun Facts</div>
        <div style={{fontSize:12,color:MUTED}}>The details that make visitors want to follow you</div></div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {s.funFacts.map((f,i)=>(
          <div key={i} style={{display:"flex",gap:8}}>
            <PremiumInput value={f} onChange={v=>{const fs=[...s.funFacts];fs[i]=v;upd("funFacts",fs);}}
              placeholder={["I've reviewed code at 3am and found it beautiful","My rubber duck debugger has a name","I type faster than I think — chaos ensues","I commit before I test. Twice.","My shortest PR message was 'pls work'"][i%5]}
              icon={["⚡","🦆","🧠","🔥","😭"][i%5]} style={{flex:1}}/>
            {s.funFacts.length>1&&<button onClick={()=>upd("funFacts",s.funFacts.filter((_,j)=>j!==i))}
              style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",
                color:"#f87171",borderRadius:8,padding:"0 12px",cursor:"pointer",fontSize:13}}>✕</button>}
          </div>
        ))}
        <button onClick={()=>upd("funFacts",[...s.funFacts,""])}
          style={{background:"transparent",border:`1px dashed ${BORDER2}`,color:MUTED,
            borderRadius:8,padding:"9px",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Add another fact</button>
      </div>
    </GlassCard>
    <GlassCard>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <Icon3D src={I.star} size={36}/>
        <div><div style={{fontSize:14,fontWeight:700}}>Goals</div>
        <div style={{fontSize:12,color:MUTED}}>Public accountability — the devs who write it down, ship it</div></div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {s.goals.map((g,i)=>(
          <div key={i} style={{display:"flex",gap:8}}>
            <PremiumInput value={g} onChange={v=>{const gs=[...s.goals];gs[i]=v;upd("goals",gs);}}
              placeholder={["Reach 1,000 GitHub stars before end of year","Launch my first SaaS and hit $1 MRR","Contribute to a top-100 open source project","Give a talk at a developer conference","Build the tool I always wished existed"][i%5]}
              icon="🎯" style={{flex:1}}/>
            {s.goals.length>1&&<button onClick={()=>upd("goals",s.goals.filter((_,j)=>j!==i))}
              style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",
                color:"#f87171",borderRadius:8,padding:"0 12px",cursor:"pointer",fontSize:13}}>✕</button>}
          </div>
        ))}
        <button onClick={()=>upd("goals",[...s.goals,""])}
          style={{background:"transparent",border:`1px dashed ${BORDER2}`,color:MUTED,
            borderRadius:8,padding:"9px",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Add another goal</button>
      </div>
    </GlassCard>
  </div>;
}

function StepSupport({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:14}} className="slide-up">
    <StepHero icon={I.heart} title="Support Links" subtitle="Optional. Let the people who love your work fuel the next build." color="#fb7185"/>
    {SUPPORT_PLATFORMS.map(p=>(
      <GlassCard key={p.id} style={{padding:16}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
          <div style={{width:36,height:36,borderRadius:10,background:`#${p.color}22`,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,
            border:`1px solid #${p.color}44`}}>{p.emoji}</div>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:TEXT}}>{p.label}</div>
            <div style={{fontSize:11,color:MUTED,fontFamily:"monospace"}}>{p.prefix}yourusername</div>
          </div>
        </div>
        <PremiumInput value={s.supportLinks[p.id]||""}
          onChange={v=>upd("supportLinks",{...s.supportLinks,[p.id]:v})}
          placeholder="yourusername — leave blank to hide this platform"/>
      </GlassCard>
    ))}
  </div>;
}

function StepSections({s,upd}){
  const enabled=SECTION_LIST.filter(sec=>s.sections[sec.id]).length;
  return <div style={{display:"flex",flexDirection:"column",gap:16}} className="slide-up">
    <StepHero icon={I.list} title="Section Control" subtitle="Curate your story. Every section you enable is a reason to stay." color="#86efac"/>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
      background:"#0f172a",borderRadius:10,padding:"10px 14px",border:`1px solid ${BORDER}`}}>
      <span style={{fontSize:13,color:MUTED}}><span style={{color:TEXT,fontWeight:700}}>{enabled}</span> sections enabled</span>
      <span style={{fontSize:11,color:MUTED}}>{SECTION_LIST.length} total available</span>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
      {SECTION_LIST.map(sec=>{
        const on=!!s.sections[sec.id];
        return <div key={sec.id} style={{
          display:"flex",alignItems:"center",justifyContent:"space-between",
          background:on?`${PURPLE}15`:"#0a0e18",
          border:`1.5px solid ${on?PURPLE:BORDER}`,borderRadius:10,
          padding:"10px 12px",transition:"all .2s",
          boxShadow:on?`0 0 10px ${PURPLE_GLOW}`:"none",
        }}>
          <span style={{fontSize:12.5,color:on?TEXT:MUTED,fontWeight:on?600:400}}>
            {sec.icon} {sec.label}
          </span>
          {sec.locked
            ?<span style={{fontSize:9,color:"#4b5563",fontWeight:600,letterSpacing:"0.06em"}}>ALWAYS ON</span>
            :<GlowToggle checked={on} onChange={v=>upd("sections",{...s.sections,[sec.id]:v})} label=""/>
          }
        </div>;
      })}
    </div>
  </div>;
}

// ─── RESULT SCREEN ────────────────────────────────────────────────────────────

function ResultScreen({readme,s,onEdit}){
  const [copied,setCopied]=useState(false);
  const [tab,setTab]=useState("highlighted");
  const theme=THEMES.find(t=>t.id===s.theme)||THEMES[0];

  const copy=()=>{ navigator.clipboard.writeText(readme).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500);}); };
  const dl=()=>{
    const a=document.createElement("a");
    a.href=URL.createObjectURL(new Blob([readme],{type:"text/markdown"}));
    a.download="README.md";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),200);
  };

  const highlighted=readme.split("\n").map((line,i)=>{
    let col="#c9d1d9",fw="normal";
    if(/^## /.test(line)){col="#7aa2f7";fw="700";}
    else if(/^# /.test(line)){col="#bb9af7";fw="800";}
    else if(/^\!\[/.test(line)||/^\[!\[/.test(line))col="#a9fef7";
    else if(/^---/.test(line))col="#30363d";
    else if(/^>/.test(line))col="#9ece6a";
    else if(/^- /.test(line))col="#c0caf5";
    else if(/^\|/.test(line))col="#cba6f7";
    else if(/^</.test(line))col="#f7768e";
    else if(/^<!--/.test(line))col="#4d5566";
    return <div key={i} style={{color:col,fontWeight:fw,minHeight:19,lineHeight:1.9}}>{line||"\u00a0"}</div>;
  });

  return <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
    <style>{GS}</style>

    {/* Result header */}
    <div style={{background:"#0d1117",borderBottom:`1px solid ${BORDER}`,padding:"0 20px",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:58}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <button onClick={onEdit} style={{
            background:"transparent",border:`1px solid ${BORDER2}`,color:MUTED,
            borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",
            display:"flex",alignItems:"center",gap:5
          }}>← Edit</button>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Icon3D src={I.rocket} size={28} style={{animation:"float 3s ease-in-out infinite"}}/>
            <div>
              <div style={{fontSize:14,fontWeight:800,letterSpacing:"-0.02em"}}>
                README ready for <span style={{color:theme.primary}}>{s.displayName||cleanUser(s.username)||"your profile"}</span>
              </div>
              <div style={{fontSize:11,color:MUTED}}>{readme.split("\n").length} lines · {(readme.length/1024).toFixed(1)} KB · {SECTION_LIST.filter(sec=>s.sections[sec.id]).length} sections</div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={copy} style={{
            background:copied?"#059669":"transparent",border:`1.5px solid ${copied?"#059669":BORDER2}`,
            color:copied?"#fff":TEXT,borderRadius:10,padding:"9px 20px",fontSize:13,fontWeight:700,
            cursor:"pointer",transition:"all .25s",display:"flex",alignItems:"center",gap:6
          }}>{copied?"✓ Copied!":"⎘ Copy README"}</button>
          <button onClick={dl} style={{
            background:`linear-gradient(135deg,${PURPLE},#a855f7)`,border:"none",color:"#fff",
            borderRadius:10,padding:"9px 22px",fontSize:13,fontWeight:800,cursor:"pointer",
            boxShadow:`0 4px 20px ${PURPLE_GLOW}`,display:"flex",alignItems:"center",gap:6
          }}>↓ Download .md</button>
        </div>
      </div>
    </div>

    {/* Setup steps */}
    <div style={{background:"#020d07",borderBottom:`1px solid #064e3b`,padding:"12px 20px"}}>
      <div style={{fontSize:11,fontWeight:700,color:"#34d399",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>✦ How to publish your README in 60 seconds</div>
      <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
        {[
          ["1","Go to GitHub","Create a new repository named exactly your username"],
          ["2","Make it public","Tick 'Add a README file' during creation"],
          ["3","Paste & commit","Replace the content with this file and commit"],
          ["4","Done","Your profile updates within seconds ✨"],
        ].map(([n,bold,desc])=>(
          <div key={n} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:12}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#059669",
              color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:10,fontWeight:800,flexShrink:0,marginTop:1}}>{n}</div>
            <div>
              <span style={{color:"#a7f3d0",fontWeight:700}}>{bold} — </span>
              <span style={{color:"#6b7280"}}>{desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Tab bar */}
    <div style={{background:"#0d1117",borderBottom:`1px solid ${BORDER}`,
      padding:"0 20px",display:"flex",gap:0,alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
      <div style={{display:"flex",gap:0}}>
        {[["highlighted","✦ Highlighted"],["raw","Raw Markdown"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setTab(id)} style={{
            background:"none",border:"none",borderBottom:`2px solid ${tab===id?PURPLE:"transparent"}`,
            color:tab===id?PURPLE_L:MUTED,padding:"12px 16px",fontSize:13,fontWeight:tab===id?700:400,
            cursor:"pointer",transition:"all .15s"
          }}>{lbl}</button>
        ))}
      </div>
      <button onClick={copy} style={{
        background:`${PURPLE}22`,border:`1px solid ${PURPLE}`,color:PURPLE_L,
        borderRadius:8,padding:"5px 14px",fontSize:11,fontWeight:700,cursor:"pointer"
      }}>⎘ Copy</button>
    </div>

    {/* README content */}
    <div style={{flex:1,overflowY:"auto",padding:"20px 24px",
      fontFamily:"'JetBrains Mono','Fira Code','Courier New',monospace",
      fontSize:12,lineHeight:1,background:"#0d1117",color:"#c9d1d9"}}>
      {tab==="raw" ? readme : highlighted}
    </div>

    {/* Sticky bottom bar */}
    <div style={{background:"#111827",borderTop:`1px solid ${BORDER}`,padding:"12px 20px",
      display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <Icon3D src={I.gem} size={24}/>
        <span style={{fontSize:12,color:MUTED}}>Built with <span style={{color:PURPLE_L,fontWeight:700}}>ReadMeCraft Pro</span> — the world's most professional GitHub README maker</span>
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={copy} style={{
          background:copied?"#059669":CARD,border:`1px solid ${BORDER2}`,color:TEXT,
          borderRadius:8,padding:"9px 18px",fontSize:12,fontWeight:700,cursor:"pointer"
        }}>{copied?"✓ Copied":"⎘ Copy README"}</button>
        <button onClick={dl} style={{
          background:`linear-gradient(135deg,${PURPLE},#a855f7)`,border:"none",color:"#fff",
          borderRadius:8,padding:"9px 22px",fontSize:12,fontWeight:800,cursor:"pointer",
          boxShadow:`0 0 20px ${PURPLE_GLOW}`
        }}>↓ Download README.md</button>
      </div>
    </div>
  </div>;
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App(){
  const [s,setS]=useState(()=>{
    try{const p=JSON.parse(localStorage.getItem("rmc_v4")||"null");
      if(p)return{...INIT,...p,sections:{...INIT.sections,...p.sections}};}catch(e){}
    return INIT;
  });
  const [step,setStep]=useState(0);
  const [showResult,setShowResult]=useState(false);

  const upd=(k,v)=>setS(prev=>({...prev,[k]:v}));

  useEffect(()=>{ try{localStorage.setItem("rmc_v4",JSON.stringify(s));}catch(e){} },[s]);

  const readme=useMemo(()=>buildReadme(s),[s]);
  const PAGES=[
    <StepIdentity s={s} upd={upd}/>,
    <StepStyle s={s} upd={upd}/>,
    <StepTyping s={s} upd={upd}/>,
    <StepSocials s={s} upd={upd}/>,
    <StepSkills s={s} upd={upd}/>,
    <StepWidgets s={s} upd={upd}/>,
    <StepProjects s={s} upd={upd}/>,
    <StepExtras s={s} upd={upd}/>,
    <StepSupport s={s} upd={upd}/>,
    <StepSections s={s} upd={upd}/>,
  ];

  const canProceed=step===0?!!cleanUser(s.username):true;

  if(showResult) return <ResultScreen readme={readme} s={s} onEdit={()=>setShowResult(false)}/>;

  const pct=Math.round(((step+1)/STEPS.length)*100);

  return <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column"}}>
    <style>{GS}</style>

    {/* Top bar */}
    <header style={{
      background:"rgba(13,17,23,.95)",backdropFilter:"blur(12px)",
      borderBottom:`1px solid ${BORDER}`,padding:"0 20px",flexShrink:0,
      position:"sticky",top:0,zIndex:100
    }}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:52}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{
            width:30,height:30,borderRadius:8,
            background:`linear-gradient(135deg,${PURPLE},#a855f7)`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:15,fontWeight:900,boxShadow:`0 0 16px ${PURPLE_GLOW}`
          }}>✦</div>
          <span style={{fontWeight:900,fontSize:16,letterSpacing:"-0.04em"}}>
            ReadMe<span style={{color:PURPLE_L}}>Craft</span>
          </span>
          <span style={{fontSize:9,fontWeight:700,background:`${PURPLE}22`,border:`1px solid ${PURPLE}55`,
            color:PURPLE_L,borderRadius:5,padding:"2px 7px",letterSpacing:"0.08em"}}>PRO</span>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={()=>setShowResult(true)} style={{
            background:"transparent",border:`1px solid ${BORDER2}`,color:MUTED,
            borderRadius:8,padding:"6px 14px",fontSize:11,fontWeight:600,cursor:"pointer"
          }}>Preview README →</button>
          <button onClick={()=>{if(window.confirm("Reset everything?"))setS(INIT);}} style={{
            background:"none",border:"none",color:"#4b5563",fontSize:11,cursor:"pointer"
          }}>Reset</button>
        </div>
      </div>
    </header>

    {/* Progress bar */}
    <div style={{height:3,background:BORDER,flexShrink:0}}>
      <div style={{height:"100%",width:`${pct}%`,
        background:`linear-gradient(90deg,${PURPLE},#a855f7)`,
        transition:"width .4s ease",boxShadow:`0 0 10px ${PURPLE_GLOW}`}}/>
    </div>

    {/* Step dots */}
    <div style={{background:"rgba(13,17,23,.8)",backdropFilter:"blur(8px)",
      borderBottom:`1px solid ${BORDER}`,padding:"12px 20px",
      display:"flex",gap:6,alignItems:"center",overflowX:"auto",flexShrink:0,
      scrollbarWidth:"none"}}>
      {STEPS.map((st,i)=><StepDot key={st.id} step={st} current={step} onClick={setStep}/>)}
    </div>

    {/* Page content */}
    <div style={{flex:1,overflowY:"auto",display:"flex",justifyContent:"center",padding:"32px 20px 120px"}}>
      <div style={{width:"100%",maxWidth:680}}>
        {PAGES[step]}
      </div>
    </div>

    {/* Sticky footer nav */}
    <div style={{
      position:"fixed",bottom:0,left:0,right:0,
      background:"rgba(5,7,10,.95)",backdropFilter:"blur(16px)",
      borderTop:`1px solid ${BORDER}`,padding:"14px 24px",
      display:"flex",alignItems:"center",justifyContent:"space-between",zIndex:100
    }}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {step>0&&(
          <button onClick={()=>setStep(s=>s-1)} style={{
            background:"transparent",border:`1px solid ${BORDER2}`,color:MUTED,
            borderRadius:10,padding:"10px 20px",fontSize:13,fontWeight:600,cursor:"pointer"
          }}>← Back</button>
        )}
        <span style={{fontSize:11,color:"#374151",display:"flex",alignItems:"center",gap:4}}>
          <span style={{color:"#059669",fontSize:8}}>●</span> Auto-saved
        </span>
      </div>

      <div style={{textAlign:"center",position:"absolute",left:"50%",transform:"translateX(-50%)"}}>
        <span style={{fontSize:11,color:MUTED}}>Step <span style={{color:TEXT,fontWeight:700}}>{step+1}</span> of {STEPS.length}</span>
      </div>

      <div style={{display:"flex",gap:8}}>
        {step<STEPS.length-1?(
          <button onClick={()=>{ if(canProceed)setStep(s=>s+1); }} style={{
            background:canProceed?`linear-gradient(135deg,${PURPLE},#a855f7)`:"#1f2937",
            border:"none",color:canProceed?"#fff":"#4b5563",
            borderRadius:10,padding:"10px 28px",fontSize:13,fontWeight:800,
            cursor:canProceed?"pointer":"not-allowed",
            boxShadow:canProceed?`0 4px 20px ${PURPLE_GLOW}`:"none",
            transition:"all .2s"
          }}>{step===0&&!canProceed?"Enter username first →":"Continue →"}</button>
        ):(
          <button onClick={()=>setShowResult(true)} style={{
            background:`linear-gradient(135deg,${PURPLE},#a855f7,#ec4899)`,
            border:"none",color:"#fff",
            borderRadius:10,padding:"10px 28px",fontSize:13,fontWeight:800,
            cursor:"pointer",boxShadow:`0 4px 24px ${PURPLE_GLOW}`,
            display:"flex",alignItems:"center",gap:8
          }}>
            <span>🚀</span> Generate My README
          </button>
        )}
      </div>
    </div>
  </div>;
}
