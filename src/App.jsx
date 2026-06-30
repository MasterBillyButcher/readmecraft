import { useState, useEffect, useMemo, useRef } from "react";

// ─── 3D ICONS CDN ────────────────────────────────────────────────────────────
const CDN = "https://cdn.jsdelivr.net/gh/realvjy/3dicons@main/icons";
const I = {
  user:I.user=>`${CDN}/man/man-dynamic-color.png`,
  palette:`${CDN}/palette/palette-dynamic-color.png`,
  keyboard:`${CDN}/keyboard/keyboard-dynamic-color.png`,
  globe:`${CDN}/globe/globe-dynamic-color.png`,
  tool:`${CDN}/settings/settings-dynamic-color.png`,
  chart:`${CDN}/graph/graph-dynamic-color.png`,
  target:`${CDN}/target/target-dynamic-color.png`,
  idea:`${CDN}/idea/idea-dynamic-color.png`,
  heart:`${CDN}/heart/heart-dynamic-color.png`,
  list:`${CDN}/note/note-dynamic-color.png`,
  rocket:`${CDN}/rocket/rocket-dynamic-color.png`,
  gem:`${CDN}/gem/gem-dynamic-color.png`,
  trophy:`${CDN}/trophy/trophy-dynamic-color.png`,
  star:`${CDN}/star/star-dynamic-color.png`,
  music:`${CDN}/music/music-dynamic-color.png`,
  clock:`${CDN}/time/time-dynamic-color.png`,
  bolt:`${CDN}/lightning/lightning-dynamic-color.png`,
  crown:`${CDN}/crown/crown-dynamic-color.png`,
  brush:`${CDN}/palette/palette-dynamic-color.png`,
  text:`${CDN}/note/note-dynamic-color.png`,
  emoji:`${CDN}/star/star-dynamic-color.png`,
};
// Fix self-reference
I.user = `${CDN}/man/man-dynamic-color.png`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const THEMES = [
  {id:"tokyonight",label:"Tokyo Night",primary:"#7aa2f7",bg:"#1a1b2e",accent:"#bb9af7",glow:"124,58,237"},
  {id:"radical",   label:"Radical",    primary:"#fe428e",bg:"#141321",accent:"#a9fef7",glow:"254,66,142"},
  {id:"dracula",   label:"Dracula",    primary:"#ff79c6",bg:"#282a36",accent:"#50fa7b",glow:"255,121,198"},
  {id:"onedark",   label:"One Dark",   primary:"#e06c75",bg:"#282c34",accent:"#98c379",glow:"224,108,117"},
  {id:"gruvbox",   label:"Gruvbox",    primary:"#d79921",bg:"#282828",accent:"#689d6a",glow:"215,153,33"},
  {id:"nord",      label:"Nord",       primary:"#88c0d0",bg:"#2e3440",accent:"#81a1c1",glow:"136,192,208"},
  {id:"aura",      label:"Aura",       primary:"#a277ff",bg:"#15141b",accent:"#61ffca",glow:"162,119,255"},
  {id:"dark_lover",label:"Dark Lover", primary:"#e966a0",bg:"#191c35",accent:"#c0cafd",glow:"233,102,160"},
  {id:"merko",     label:"Merko",      primary:"#68b587",bg:"#0a0f0d",accent:"#abd5a8",glow:"104,181,135"},
  {id:"midnight",  label:"Midnight",   primary:"#4dabf7",bg:"#0a0e27",accent:"#74c0fc",glow:"77,171,247"},
  {id:"synthwave", label:"Synthwave",  primary:"#ff7eb3",bg:"#2b213a",accent:"#fecc50",glow:"255,126,179"},
  {id:"ocean",     label:"Ocean",      primary:"#40afff",bg:"#071521",accent:"#00ffc8",glow:"64,175,255"},
];

const HEADER_STYLES = [
  {id:"waving",label:"Wave 🌊"},{id:"soft",label:"Soft ☁️"},{id:"rect",label:"Rect ▬"},
  {id:"rounded",label:"Round ⭕"},{id:"egg",label:"Egg 🥚"},{id:"cylinder",label:"Cylinder"},
  {id:"shark",label:"Shark 🦈"},{id:"slice",label:"Slice ◢"},
];

const README_FONTS = [
  {id:"Fira Code",   label:"Fira Code"},
  {id:"JetBrains Mono",label:"JetBrains Mono"},
  {id:"Source Code Pro",label:"Source Code Pro"},
  {id:"Roboto",      label:"Roboto"},
  {id:"Ubuntu",      label:"Ubuntu"},
  {id:"Courier Prime",label:"Courier Prime"},
];

const TYPING_SIZES = [
  {id:"16",label:"Small"},{id:"18",label:"Medium"},{id:"20",label:"Large (default)"},{id:"24",label:"XL"},{id:"28",label:"XXL"},
];

const BANNER_HEIGHTS = [
  {id:"150",label:"Compact"},{id:"180",label:"Small"},{id:"220",label:"Default"},{id:"260",label:"Tall"},{id:"300",label:"Hero"},
];

const BANNER_FONT_SIZES = [
  {id:"40",label:"Small"},{id:"55",label:"Medium"},{id:"70",label:"Large"},{id:"85",label:"XL"},{id:"100",label:"XXL"},
];

const DIVIDER_STYLES = [
  {id:"---",         label:"─── Line"},
  {id:"<hr/>",       label:"─── HR Tag"},
  {id:"<!-- div -->",label:"No Divider"},
];

const PROFILE_VIEWS_STYLES = [
  {id:"flat",           label:"Flat"},
  {id:"flat-square",    label:"Square"},
  {id:"for-the-badge",  label:"Badge"},
  {id:"plastic",        label:"Plastic"},
];

const WHOAMI_EMOJIS = {
  role:     ["🚀","💼","👨‍💻","👩‍💻","🌟","⚡","🔥","💡"],
  location: ["📍","🌍","🌎","🌏","🏠","📌","🗺️","✈️"],
  building: ["🔭","🏗️","⚙️","🛠️","🚧","🔨","🏛️","🎯"],
  learning: ["🌱","📚","🎓","🧠","📖","🔬","⚗️","🌿"],
  collab:   ["🤝","💬","🙌","👥","🤜","💪","🤲","🫱"],
  fun:      ["⚡","😄","🎮","☕","🎵","🌙","🦄","🔮"],
};

const STAT_CARD_CONFIGS = [
  {id:"all_commits",    label:"Count all commits"},
  {id:"private_count",  label:"Count private repos"},
  {id:"show_icons",     label:"Show icons"},
  {id:"rank_icon",      label:"Show rank icon"},
  {id:"hide_border",    label:"Hide border"},
  {id:"count_private",  label:"Count private contributions"},
];

const TROPHY_THEMES = [
  "tokyonight","radical","dracula","onedark","gruvbox","nord","darkhub",
  "juicyfresh","discord","onestar","algolia","gitdimmed","flat","monokai",
];

const SNAKE_COLORS = [
  {id:"github",      label:"GitHub Green",  preview:"#2ea043"},
  {id:"github-dark", label:"GitHub Dark",   preview:"#238636"},
  {id:"custom",      label:"Custom Color",  preview:"#9146ff"},
];

const SKILL_GROUPS = {
  "Languages":    ["js","ts","py","java","cpp","c","cs","php","rb","go","rs","swift","kotlin","dart","scala","r","elixir","lua","bash","powershell","perl","zig"],
  "Frontend":     ["html","css","sass","tailwind","react","vue","angular","svelte","nextjs","nuxtjs","remix","astro","bootstrap","jquery","vite","webpack","styledcomponents"],
  "Backend":      ["nodejs","deno","express","fastapi","django","flask","spring","laravel","rails","nestjs","actix","gin","hapi","koa","fiber"],
  "Databases":    ["mysql","postgres","mongodb","redis","sqlite","supabase","firebase","cassandra","prisma","graphql","dynamodb","planetscale","cockroachdb"],
  "DevOps/Cloud": ["docker","kubernetes","aws","azure","gcp","vercel","netlify","heroku","linux","nginx","terraform","githubactions","ansible","jenkins","cloudflare"],
  "Tools":        ["git","github","gitlab","figma","vscode","vim","postman","notion","jira","slack","npm","yarn","pnpm","bun"],
  "ML / AI":      ["tensorflow","pytorch","opencv","pandas","numpy","jupyter","sklearn","matlab","r","spark"],
  "Mobile":       ["flutter","reactnative","android","ios","kotlin","swift","xamarin","ionic"],
};

const SOCIALS = [
  {id:"github",       label:"GitHub",         color:"181717",logo:"github"},
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
  {id:"portfolio",    label:"Portfolio/Website",color:"4285F4",logo:"googlechrome"},
  {id:"telegram",     label:"Telegram",        color:"2CA5E0",logo:"telegram"},
  {id:"tiktok",       label:"TikTok",          color:"000000",logo:"tiktok"},
  {id:"mastodon",     label:"Mastodon",        color:"6364FF",logo:"mastodon"},
  {id:"bluesky",      label:"Bluesky",         color:"0085ff",logo:"bluesky"},
];

const SUPPORT_PLATFORMS = [
  {id:"buymeacoffee",label:"Buy Me a Coffee",color:"FFDD00",logo:"buymeacoffee",prefix:"https://buymeacoffee.com/",emoji:"☕"},
  {id:"kofi",        label:"Ko-Fi",          color:"F16061",logo:"kofi",         prefix:"https://ko-fi.com/",       emoji:"☕"},
  {id:"patreon",     label:"Patreon",        color:"F96854",logo:"patreon",      prefix:"https://patreon.com/",     emoji:"🎨"},
  {id:"githubsponsors",label:"GitHub Sponsors",color:"EA4AAA",logo:"githubsponsors",prefix:"https://github.com/sponsors/",emoji:"💜"},
  {id:"paypal",      label:"PayPal",         color:"00457C",logo:"paypal",       prefix:"https://paypal.me/",       emoji:"💳"},
  {id:"opencollective",label:"Open Collective",color:"7FADF2",logo:"opencollective",prefix:"https://opencollective.com/",emoji:"🌐"},
];

const SECTION_LIST = [
  {id:"header",   label:"Animated Header",   icon:"🎨",locked:true},
  {id:"typing",   label:"Typing Animation",  icon:"⌨️"},
  {id:"socials",  label:"Social Badges",     icon:"🌐"},
  {id:"whoami",   label:"Who Am I",          icon:"⚡"},
  {id:"skills",   label:"Tech Stack",        icon:"🛠️"},
  {id:"stats",    label:"GitHub Stats",      icon:"📊"},
  {id:"streak",   label:"Streak",            icon:"🔥"},
  {id:"summary",  label:"Summary Cards",     icon:"📋"},
  {id:"graph",    label:"Activity Graph",    icon:"📈"},
  {id:"snake",    label:"Snake Animation",   icon:"🐍"},
  {id:"trophies", label:"Trophies",          icon:"🏆"},
  {id:"projects", label:"Projects Table",    icon:"🎯"},
  {id:"pinned",   label:"Pinned Repos",      icon:"📌"},
  {id:"goals",    label:"Goals",             icon:"🌱"},
  {id:"funfacts", label:"Fun Facts",         icon:"💡"},
  {id:"quote",    label:"Dev Quote",         icon:"✍️"},
  {id:"wakatime", label:"WakaTime Stats",    icon:"⏱️"},
  {id:"spotify",  label:"Spotify Playing",   icon:"🎵"},
  {id:"support",  label:"Support Links",     icon:"❤️"},
  {id:"footer",   label:"Footer Wave",       icon:"🏁"},
];

const STEPS = [
  {id:"identity",  icon:I.user,    label:"Identity",    color:"#7c3aed"},
  {id:"style",     icon:I.brush,   label:"Style",       color:"#ec4899"},
  {id:"text",      icon:I.text,    label:"Text & Font", color:"#f59e0b"},
  {id:"typing",    icon:I.keyboard,label:"Typing SVG",  color:"#10b981"},
  {id:"socials",   icon:I.globe,   label:"Socials",     color:"#3b82f6"},
  {id:"skills",    icon:I.tool,    label:"Tech Stack",  color:"#8b5cf6"},
  {id:"widgets",   icon:I.chart,   label:"Widgets",     color:"#f97316"},
  {id:"projects",  icon:I.target,  label:"Projects",    color:"#06b6d4"},
  {id:"extras",    icon:I.idea,    label:"Extras",      color:"#ef4444"},
  {id:"support",   icon:I.heart,   label:"Support",     color:"#84cc16"},
  {id:"sections",  icon:I.list,    label:"Sections",    color:"#a855f7"},
];

const EMOJI_PACKS = {
  "Roles":      ["👨‍💻","👩‍💻","🧑‍💻","👨‍🔬","👩‍🔬","👨‍🎨","👩‍🎨","👨‍🏫","👩‍🏫","🧑‍🚀","🕵️","🦸"],
  "Status":     ["🚀","⚡","🔥","💡","🌟","✨","💫","🎯","🏆","👑","💎","🌈"],
  "Tech":       ["💻","🖥️","⌨️","🖱️","📱","🔧","⚙️","🔨","🛠️","📡","🤖","🦾"],
  "Nature":     ["🌱","🌿","🍃","🌊","🔮","🌙","⭐","🌸","🦋","🐍","🦄","🐉"],
  "Social":     ["👥","🤝","💬","🙌","❤️","💜","💙","💚","🤜","🫱","🫂","👏"],
  "Fun":        ["☕","🍕","🎮","🎵","🎬","📚","🎨","🎭","🎪","🎯","🎲","🎸"],
};

const INIT = {
  // Identity
  username:"", displayName:"", tagline:"", role:"", location:"", building:"", learning:"", collab:"",
  // Style
  theme:"tokyonight", headerStyle:"waving",
  headerColor1:"#9146FF", headerColor2:"#FF4500",
  headerColor3:"", useThreeColorGradient:false,
  headerHeight:"220", headerFontSize:"70",
  headerTextColor:"ffffff", headerDescColor:"dddddd",
  headerAnimation:"fadeIn",
  bannerTextAlign:"center",
  badgeStyle:"for-the-badge",
  dividerStyle:"---",
  // Text & Font customization
  readmeFont:"Fira Code", typingFontSize:"20",
  typingWidth:"500", typingDuration:"3500", typingPause:"1200",
  sectionTitleEmoji:true,
  customSectionTitles:{
    whoami:"⚡ Who Am I?", skills:"🛠️ Tech Stack", stats:"📊 GitHub Stats",
    streak:"🔥 Streak", graph:"📈 Contribution Graph", snake:"🐍 Contribution Snake",
    trophies:"🏆 Achievements", projects:"🎯 Projects", goals:"🌱 Goals",
    funfacts:"💡 Fun Facts", quote:"✍️ Dev Quote", wakatime:"⏱️ Coding Stats",
    spotify:"🎵 Now Playing", support:"❤️ Support My Work", pinned:"📌 Pinned Repos",
    summary:"📋 Profile Summary",
  },
  // Typing
  typingLines:["","","",""],
  typingColor:"", // empty = use theme primary
  // Socials
  socials:{}, socialBadgeStyle:"for-the-badge",
  showProfileViews:true, showFollowers:true, profileViewsStyle:"for-the-badge",
  // Skills
  skills:[], skillIconsPerLine:"8", skillIconsTheme:"light",
  // Widgets
  statsLayout:"side",
  statShowIcons:true, statHideBorder:true, statCountPrivate:true, statAllCommits:true,
  langsCount:"8", langsLayout:"compact",
  trophyColumns:"4", trophyTheme:"tokyonight", trophyNoFrame:true, trophyNoBg:true,
  snakeColor:"github", snakeCustomColor:"#9146ff",
  wakatimeUser:"", spotifyUrl:"", utcOffset:"0",
  showWakatimeLangs:true,
  // Projects
  projects:[{name:"",stack:"",status:"🟢 Live",link:"",desc:""}],
  pinnedRepos:[],
  // Extras
  goals:[""], funFacts:[""],
  whoamiEmojis:{role:"🚀",location:"📍",building:"🔭",learning:"🌱",collab:"🤝"},
  customAbout:"",
  // Support
  supportLinks:{},
  // Sections
  sections:{
    header:true,typing:true,socials:true,whoami:true,skills:true,
    stats:true,streak:true,summary:false,graph:true,snake:true,
    trophies:true,projects:true,pinned:false,goals:false,funfacts:true,
    quote:true,wakatime:false,spotify:false,support:false,footer:true,
  },
  // App UI
  appTheme:"dark", // "dark" | "light"
  accentColor:"#7c3aed",
};

// ─── README BUILDER ───────────────────────────────────────────────────────────
function cleanHex(v){const c=(v||"").replace(/^#/,"");return /^[0-9a-fA-F]{6}$/.test(c)?c:null;}
function badgeEnc(s){return s.replace(/ /g,"_").replace(/-/g,"--");}
function cleanUser(v){return v.replace(/^https?:\/\/(www\.)?github\.com\//i,"").replace(/[^a-zA-Z0-9\-]/g,"").trim();}
function enc(v){return encodeURIComponent(v);}

function buildReadme(s){
  const theme = THEMES.find(t=>t.id===s.theme)||THEMES[0];
  const u = cleanUser(s.username);
  const h1 = cleanHex(s.headerColor1)||"9146FF";
  const h2 = cleanHex(s.headerColor2)||"FF4500";
  const h3 = s.useThreeColorGradient && cleanHex(s.headerColor3);
  const grad = h3
    ? `0:${h1},50:${h3},100:${h2}`
    : `0:${h1},100:${h2}`;
  const gradR = h3
    ? `0:${h2},50:${h3},100:${h1}`
    : `0:${h2},100:${h1}`;
  const pv = (s.typingColor && cleanHex(s.typingColor)) || theme.primary.replace("#","");
  const ac = theme.accent.replace("#","");
  const bs = s.badgeStyle||"for-the-badge";
  const sbs = s.socialBadgeStyle||"for-the-badge";
  const div = s.dividerStyle||"---";
  const tFont = s.readmeFont||"Fira Code";
  const tSize = s.typingFontSize||"20";
  const tWidth = s.typingWidth||"500";
  const tDur = s.typingDuration||"3500";
  const tPause = s.typingPause||"1200";
  const T = s.customSectionTitles||INIT.customSectionTitles;
  const sec = id => s.sections[id];
  const out = [];

  const D = () => div==="<!-- div -->" ? "" : `\n${div}\n`;

  // ── HEADER
  if(sec("header")){
    const name = s.displayName||u||"Your Name";
    const desc = s.tagline||"Developer · Creator · Builder";
    const ht = s.headerHeight||"220";
    const hfs = s.headerFontSize||"70";
    const htc = cleanHex(s.headerTextColor)||"ffffff";
    const hdc = cleanHex(s.headerDescColor)||"dddddd";
    const anim = s.headerAnimation||"fadeIn";
    const align = s.bannerTextAlign||"center";
    const fontAlign = align==="left"?"15":align==="right"?"85":"38";
    const descFontAlign = align==="left"?"15":align==="right"?"85":"58";
    out.push(`<div align="center">\n`);
    out.push(`<img src="https://capsule-render.vercel.app/api?type=${s.headerStyle}&color=${grad}&height=${ht}&section=header&text=${enc(name)}&fontSize=${hfs}&fontColor=${htc}&animation=${anim}&fontAlignY=${fontAlign}&desc=${enc(desc)}&descAlignY=${descFontAlign}&descSize=18&descColor=${hdc}" width="100%" alt="${name} banner" />`);
  }

  // ── TYPING
  if(sec("typing")){
    const lines = s.typingLines.filter(l=>l&&l.trim());
    if(lines.length){
      out.push(`\n<img src="https://readme-typing-svg.demolab.com?font=${enc(tFont)}&weight=700&size=${tSize}&duration=${tDur}&pause=${tPause}&color=${pv}&center=true&vCenter=true&width=${tWidth}&lines=${lines.map(enc).join(";")}" alt="Typing SVG" />`);
    }
  }

  // ── SOCIALS
  if(sec("socials")){
    const active = SOCIALS.filter(p=>s.socials[p.id]&&s.socials[p.id].trim());
    if(active.length){
      out.push(`\n<br/><br/>\n`);
      active.forEach(p=>{
        out.push(`[![${p.label}](https://img.shields.io/badge/${badgeEnc(p.label)}-${p.color}?style=${sbs}&logo=${p.logo}&logoColor=white)](${s.socials[p.id]})`);
      });
    }
    if(u){
      const pvs = s.profileViewsStyle||"for-the-badge";
      const badges = [];
      if(s.showProfileViews!==false)
        badges.push(`![Profile Views](https://komarev.com/ghpvc/?username=${u}&color=${pv}&style=${pvs}&label=PROFILE+VIEWS)`);
      if(s.showFollowers!==false)
        badges.push(`![Followers](https://img.shields.io/github/followers/${u}?style=${pvs}&color=${pv}&labelColor=555555&label=FOLLOWERS)`);
      if(badges.length) out.push(`\n<br/>\n${badges.join(" ")}`);
    }
  }

  if(sec("header")||sec("typing")||sec("socials")) out.push(`\n\n</div>\n`);

  // ── WHO AM I
  if(sec("whoami")&&(s.role||s.location||s.building||s.learning||s.collab||s.customAbout)){
    const em = s.whoamiEmojis||INIT.whoamiEmojis;
    out.push(`${D()}\n## ${T.whoami}\n\n<div align="center">\n<table>`);
    if(s.role)       out.push(`  <tr><td align="center">${em.role||"🚀"}</td><td><strong>${s.role}</strong></td></tr>`);
    if(s.location)   out.push(`  <tr><td align="center">${em.location||"📍"}</td><td>${s.location}</td></tr>`);
    if(s.building)   out.push(`  <tr><td align="center">${em.building||"🔭"}</td><td>Currently building <strong>${s.building}</strong></td></tr>`);
    if(s.learning)   out.push(`  <tr><td align="center">${em.learning||"🌱"}</td><td>Learning ${s.learning}</td></tr>`);
    if(s.collab)     out.push(`  <tr><td align="center">${em.collab||"🤝"}</td><td>Open to collaborate on ${s.collab}</td></tr>`);
    if(s.customAbout)out.push(`  <tr><td align="center">💬</td><td>${s.customAbout}</td></tr>`);
    out.push(`</table>\n</div>\n`);
  }

  // ── SKILLS
  if(sec("skills")&&s.skills.length){
    const perline = s.skillIconsPerLine||"8";
    const skTheme = s.skillIconsTheme==="dark"?"dark":"";
    const themeParam = skTheme ? `&theme=${skTheme}` : "";
    out.push(`${D()}\n## ${T.skills}\n\n<div align="center">\n\n[![Skills](https://skillicons.dev/icons?i=${s.skills.slice(0,60).join(",")}&perline=${perline}${themeParam})](https://skillicons.dev)\n\n</div>\n`);
  }

  // ── STATS
  if(sec("stats")&&u){
    const params = [
      `username=${u}`,
      `theme=${s.theme}`,
      s.statShowIcons!==false?"show_icons=true":"",
      s.statHideBorder!==false?"hide_border=true":"",
      s.statCountPrivate!==false?"count_private=true":"",
      s.statAllCommits!==false?"include_all_commits=true":"",
      "rank_icon=github",
    ].filter(Boolean).join("&");
    const langParams = [
      `username=${u}`,
      `theme=${s.theme}`,
      s.statHideBorder!==false?"hide_border=true":"",
      `langs_count=${s.langsCount||8}`,
      `layout=${s.langsLayout||"compact"}`,
    ].filter(Boolean).join("&");
    const base = `https://github-readme-stats.vercel.app/api?${params}`;
    const langs = `https://github-readme-stats.vercel.app/api/top-langs/?${langParams}`;
    out.push(`${D()}\n## ${T.stats}\n\n<div align="center">\n`);
    if(s.statsLayout==="side"){
      out.push(`<picture><source media="(prefers-color-scheme:dark)" srcset="${base}"/><source media="(prefers-color-scheme:light)" srcset="${base.replace("theme="+s.theme,"theme=default")}"/><img height="180em" src="${base}" alt="stats"/></picture>`);
      out.push(`<picture><source media="(prefers-color-scheme:dark)" srcset="${langs}"/><source media="(prefers-color-scheme:light)" srcset="${langs.replace("theme="+s.theme,"theme=default")}"/><img height="180em" src="${langs}" alt="langs"/></picture>`);
    } else {
      out.push(`<picture><source media="(prefers-color-scheme:dark)" srcset="${base}"/><source media="(prefers-color-scheme:light)" srcset="${base.replace("theme="+s.theme,"theme=default")}"/><img src="${base}" alt="stats"/></picture>\n<br/>`);
      out.push(`<picture><source media="(prefers-color-scheme:dark)" srcset="${langs}"/><source media="(prefers-color-scheme:light)" srcset="${langs.replace("theme="+s.theme,"theme=default")}"/><img src="${langs}" alt="langs"/></picture>`);
    }
    out.push(`\n</div>\n`);
  }

  // ── STREAK
  if(sec("streak")&&u){
    const su=`https://streak-stats.demolab.com?user=${u}&theme=${s.theme}&hide_border=true`;
    out.push(`${D()}\n## ${T.streak}\n\n<div align="center">\n<picture><source media="(prefers-color-scheme:dark)" srcset="${su}"/><source media="(prefers-color-scheme:light)" srcset="${su.replace("theme="+s.theme,"theme=default")}"/><img src="${su}" alt="streak"/></picture>\n</div>\n`);
  }

  // ── SUMMARY
  if(sec("summary")&&u){
    const sb=`https://github-profile-summary-cards.vercel.app/api/cards`;
    out.push(`${D()}\n## ${T.summary}\n\n<div align="center">\n<img src="${sb}/profile-details?username=${u}&theme=tokyonight" width="100%" alt="summary"/>\n<img src="${sb}/repos-per-language?username=${u}&theme=tokyonight" height="160em" alt="repos"/>\n<img src="${sb}/most-commit-language?username=${u}&theme=tokyonight" height="160em" alt="commits"/>\n<img src="${sb}/stats?username=${u}&theme=tokyonight" height="160em" alt="stats"/>\n<img src="${sb}/productive-time?username=${u}&theme=tokyonight&utcOffset=${s.utcOffset||0}" height="160em" alt="time"/>\n</div>\n`);
  }

  // ── ACTIVITY GRAPH
  if(sec("graph")&&u){
    const gd=`https://github-readme-activity-graph.vercel.app/graph?username=${u}&bg_color=1a1b27&color=ffffff&line=${pv}&point=${ac}&area=true&area_color=${pv}&hide_border=true&custom_title=${enc("Contribution Graph")}`;
    const gl=gd.replace("bg_color=1a1b27","bg_color=ffffff").replace("color=ffffff","color=333333");
    out.push(`${D()}\n## ${T.graph}\n\n<div align="center">\n<picture><source media="(prefers-color-scheme:dark)" srcset="${gd}"/><source media="(prefers-color-scheme:light)" srcset="${gl}"/><img src="${gd}" width="100%" alt="graph"/></picture>\n</div>\n`);
  }

  // ── SNAKE
  if(sec("snake")&&u){
    const raw=`https://raw.githubusercontent.com/${u}/${u}/output`;
    const snakePal = s.snakeColor==="github-dark" ? "github-dark"
      : s.snakeColor==="custom" ? `github-dark&color_snake=${(cleanHex(s.snakeCustomColor)||"9146ff")}`
      : "github";
    out.push(`${D()}\n## ${T.snake}\n\n<div align="center">\n<picture><source media="(prefers-color-scheme:dark)" srcset="${raw}/github-snake-dark.svg"/><source media="(prefers-color-scheme:light)" srcset="${raw}/github-snake.svg"/><img src="${raw}/github-snake.svg" alt="snake"/></picture>\n\n> 💡 Add \`snake.yml\` to \`.github/workflows/\` → Actions tab → Run workflow.\n</div>\n`);
  }

  // ── TROPHIES
  if(sec("trophies")&&u){
    const troph = s.trophyTheme||s.theme;
    const tp=`https://github-profile-trophy-fork-two.vercel.app/?username=${u}&theme=${troph}&no-frame=${s.trophyNoFrame!==false}&no-bg=${s.trophyNoBg!==false}&margin-w=8&column=${s.trophyColumns||4}&rank=SSS,SS,S,AAA,AA,A,B,C`;
    out.push(`${D()}\n## ${T.trophies}\n\n<div align="center">\n<img src="${tp}" alt="trophies"/>\n</div>\n`);
  }

  // ── PROJECTS
  if(sec("projects")&&s.projects.filter(p=>p.name).length){
    out.push(`${D()}\n## ${T.projects}\n\n<div align="center">\n\n| 🚀 Project | 🔧 Stack | 📌 Status | 🔗 Link |\n|:---|:---|:---|:---|\n`);
    s.projects.filter(p=>p.name).forEach(p=>{
      out.push(`| **${p.name}** | ${p.stack||"—"} | ${p.status} | ${p.link?`[View →](${p.link})`:"Coming soon"} |`);
    });
    out.push(`\n</div>\n`);
  }

  // ── PINNED
  if(sec("pinned")&&s.pinnedRepos&&s.pinnedRepos.filter(r=>r.name).length){
    out.push(`${D()}\n## ${T.pinned}\n\n<div align="center">\n\n| 📦 Repo | 📝 About | ⭐ Stars | 🔧 Language |\n|:---|:---|:---:|:---|\n`);
    s.pinnedRepos.filter(r=>r.name).forEach(r=>{
      out.push(`| **${r.link?`[${r.name}](${r.link})`:r.name}** | ${r.desc||"—"} | ${r.stars||"—"} | ${r.lang||"—"} |`);
    });
    out.push(`\n</div>\n`);
  }

  // ── GOALS
  if(sec("goals")&&s.goals.filter(g=>g&&g.trim()).length){
    out.push(`${D()}\n## ${T.goals}\n\n`);
    s.goals.filter(g=>g&&g.trim()).forEach(g=>out.push(`- ${g}\n`));
  }

  // ── FUN FACTS
  if(sec("funfacts")&&s.funFacts.filter(f=>f&&f.trim()).length){
    out.push(`${D()}\n## ${T.funfacts}\n\n`);
    s.funFacts.filter(f=>f&&f.trim()).forEach(f=>out.push(`- ${f}\n`));
  }

  // ── QUOTE
  if(sec("quote")){
    out.push(`${D()}\n## ${T.quote}\n\n<div align="center">\n\n![Quote](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=tokyonight)\n\n</div>\n`);
  }

  // ── WAKATIME
  if(sec("wakatime")&&s.wakatimeUser&&s.wakatimeUser.trim()){
    const wkParams = `username=${s.wakatimeUser.trim()}&theme=${s.theme}&hide_border=true&layout=compact${s.showWakatimeLangs===false?"&hide_title=true":""}`;
    out.push(`${D()}\n## ${T.wakatime}\n\n<div align="center">\n\n[![WakaTime](https://github-readme-stats.vercel.app/api/wakatime?${wkParams})](https://wakatime.com/@${s.wakatimeUser.trim()})\n\n</div>\n`);
  }

  // ── SPOTIFY
  if(sec("spotify")&&s.spotifyUrl&&s.spotifyUrl.trim()){
    out.push(`${D()}\n## ${T.spotify}\n\n<div align="center">\n\n[![Spotify](${s.spotifyUrl.trim()})](https://open.spotify.com)\n\n</div>\n`);
  }

  // ── SUPPORT
  if(sec("support")){
    const active=SUPPORT_PLATFORMS.filter(p=>s.supportLinks[p.id]&&s.supportLinks[p.id].trim());
    if(active.length){
      out.push(`${D()}\n## ${T.support}\n\n<div align="center">\n\n*If you found my work useful — consider fuelling the next build!*\n\n`);
      active.forEach(p=>out.push(`[![${p.label}](https://img.shields.io/badge/${badgeEnc(p.label)}-${p.color}?style=${bs}&logo=${p.logo}&logoColor=white)](${p.prefix}${s.supportLinks[p.id].trim()})\n`));
      out.push(`\n</div>\n`);
    }
  }

  // ── FOOTER
  if(sec("footer")){
    out.push(`${D()}\n<div align="center">\n<img src="https://capsule-render.vercel.app/api?type=waving&color=${gradR}&height=130&section=footer" width="100%" alt="footer"/>\n\n**Thanks for visiting — follow, fork, or reach out. Let's build something exceptional together.**\n</div>`);
  }

  return out.join("\n");
}

// ─── DESIGN SYSTEM ────────────────────────────────────────────────────────────
const DARK = {
  bg:"#05070a",surface:"#0d1117",card:"#111827",elevated:"#161b22",
  border:"#1f2937",border2:"#374151",
  text:"#f9fafb",muted:"#6b7280",dim:"#374151",
};
const LIGHT = {
  bg:"#f0f4f8",surface:"#ffffff",card:"#f8fafc",elevated:"#ffffff",
  border:"#e2e8f0",border2:"#cbd5e1",
  text:"#0f172a",muted:"#64748b",dim:"#cbd5e1",
};

function useColors(appTheme,accentColor){
  const base = appTheme==="light" ? LIGHT : DARK;
  const acc = accentColor||"#7c3aed";
  return {...base,
    purple:acc,purpleLight:acc+"cc",purpleDim:acc+"22",
    purpleGlow:`rgba(${parseInt(acc.slice(1,3),16)},${parseInt(acc.slice(3,5),16)},${parseInt(acc.slice(5,7),16)},0.4)`,
  };
}

// ─── ATOMS ───────────────────────────────────────────────────────────────────
function PInput({value,onChange,placeholder,icon,warn,mono,style={}}){
  const [foc,setFoc]=useState(false);
  const C=useColors();
  return <div style={{position:"relative",width:"100%"}}>
    {icon&&<span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",fontSize:15,pointerEvents:"none",zIndex:1}}>{icon}</span>}
    <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{width:"100%",background:"inherit",border:`1.5px solid ${warn?"#f59e0b":foc?"#7c3aed":"#374151"}`,
        borderRadius:9,padding:icon?"9px 12px 9px 36px":"9px 13px",color:"inherit",fontSize:13,
        outline:"none",fontFamily:mono?"'JetBrains Mono',monospace":"inherit",
        transition:"border-color .2s, box-shadow .2s",
        boxShadow:foc?"0 0 0 3px rgba(124,58,237,.12)":"none",...style}}
      onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}/>
    {warn&&<div style={{fontSize:10,color:"#f59e0b",marginTop:3}}>⚠ {warn}</div>}
  </div>;
}

function Field({label,hint,required,children}){
  return <div style={{display:"flex",flexDirection:"column",gap:6}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <label style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",opacity:.7}}>
        {label}{required&&<span style={{color:"#ef4444",marginLeft:2}}>✦</span>}
      </label>
      {hint&&<span style={{fontSize:10,opacity:.5,fontStyle:"italic"}}>{hint}</span>}
    </div>
    {children}
  </div>;
}

function Chip({label,active,onClick,color,small}){
  return <div onClick={onClick} style={{
    padding:small?"3px 8px":"5px 12px",borderRadius:20,fontSize:small?11:12.5,
    cursor:"pointer",userSelect:"none",transition:"all .15s",fontWeight:500,
    background:active?(color||"#7c3aed")+"22":"transparent",
    border:`1.5px solid ${active?(color||"#7c3aed")+"aa":"#374151"}`,
    color:active?(color||"#a78bfa"):"#6b7280",
    boxShadow:active?`0 0 10px ${(color||"#7c3aed")}33`:"none",
  }}>{label}</div>;
}

function GSwitch({checked,onChange,label}){
  return <label style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer",userSelect:"none"}}>
    <div onClick={()=>onChange(!checked)} style={{
      width:38,height:20,borderRadius:10,position:"relative",
      background:checked?"#7c3aed":"#374151",flexShrink:0,transition:"background .2s",
      boxShadow:checked?"0 0 12px rgba(124,58,237,.4)":"none",
    }}>
      <div style={{position:"absolute",top:2,left:checked?20:2,width:16,height:16,
        borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 2px 4px rgba(0,0,0,.3)"}}/>
    </div>
    {label&&<span style={{fontSize:13}}>{label}</span>}
  </label>;
}

function Glass({children,glow,style={}}){
  return <div style={{
    background:"linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,.01))",
    border:"1px solid rgba(255,255,255,.07)",borderRadius:14,
    backdropFilter:"blur(8px)",padding:18,
    boxShadow:glow?"0 0 28px rgba(124,58,237,.15),0 8px 32px rgba(0,0,0,.4)":"0 4px 20px rgba(0,0,0,.3)",
    ...style
  }}>{children}</div>;
}

function Icon3D({src,size=48,float}){
  return <img src={src} width={size} height={size} alt="" loading="lazy"
    style={{objectFit:"contain",filter:"drop-shadow(0 6px 14px rgba(0,0,0,.5))",
      animation:float?"float 3s ease-in-out infinite":"none"}}
    onError={e=>{e.target.style.display="none"}}/>;
}

function EmojiPicker({onSelect}){
  const [open,setOpen]=useState(false);
  const [tab,setTab]=useState("Roles");
  const ref=useRef();
  useEffect(()=>{
    const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);
  },[]);
  return <div ref={ref} style={{position:"relative",display:"inline-block"}}>
    <button onClick={()=>setOpen(!open)} style={{
      background:"#1f2937",border:"1px solid #374151",borderRadius:7,
      padding:"5px 10px",fontSize:13,cursor:"pointer",color:"#9ca3af"
    }}>😊 Emoji</button>
    {open&&<div style={{
      position:"absolute",top:"calc(100% + 6px)",left:0,zIndex:200,
      background:"#111827",border:"1px solid #1f2937",borderRadius:12,
      padding:12,width:280,boxShadow:"0 16px 48px rgba(0,0,0,.6)"
    }}>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>
        {Object.keys(EMOJI_PACKS).map(t=>(
          <div key={t} onClick={()=>setTab(t)} style={{
            padding:"2px 8px",borderRadius:10,fontSize:11,cursor:"pointer",
            background:tab===t?"#7c3aed":"#1f2937",color:tab===t?"#fff":"#6b7280"
          }}>{t}</div>
        ))}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {EMOJI_PACKS[tab].map(e=>(
          <div key={e} onClick={()=>{onSelect(e);setOpen(false);}} style={{
            width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:18,cursor:"pointer",borderRadius:6,transition:"background .1s"
          }} onMouseEnter={el=>el.target.style.background="#1f2937"} onMouseLeave={el=>el.target.style.background="transparent"}>{e}</div>
        ))}
      </div>
    </div>}
  </div>;
}

function ColorInput({value,onChange,label}){
  return <div>
    {label&&<div style={{fontSize:10.5,opacity:.6,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:700}}>{label}</div>}
    <div style={{display:"flex",gap:7,alignItems:"center"}}>
      <input type="color" value={value||"#7c3aed"} onChange={e=>onChange(e.target.value)}
        style={{width:36,height:34,borderRadius:8,cursor:"pointer",border:"1px solid #374151",flexShrink:0}}/>
      <PInput value={value||""} onChange={onChange} placeholder="#7c3aed" mono style={{flex:1,fontSize:12}}/>
    </div>
  </div>;
}

function SectionCard({title,icon,iconSrc,children,defaultOpen=false}){
  const [open,setOpen]=useState(defaultOpen);
  return <div style={{borderRadius:12,overflow:"hidden",border:"1px solid rgba(255,255,255,.06)",marginBottom:12}}>
    <div onClick={()=>setOpen(!open)} style={{
      display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"12px 16px",cursor:"pointer",userSelect:"none",
      background:open?"rgba(124,58,237,.1)":"rgba(255,255,255,.02)",
      borderBottom:open?"1px solid rgba(255,255,255,.06)":"none",
    }}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        {iconSrc&&<Icon3D src={iconSrc} size={22}/>}
        {icon&&<span style={{fontSize:16}}>{icon}</span>}
        <span style={{fontSize:13,fontWeight:700}}>{title}</span>
      </div>
      <span style={{fontSize:10,opacity:.5,fontWeight:700}}>{open?"▲":"▼"}</span>
    </div>
    {open&&<div style={{padding:"14px 16px",display:"flex",flexDirection:"column",gap:12,background:"rgba(255,255,255,.01)"}}>{children}</div>}
  </div>;
}

function StepDot({step,idx,current,onClick}){
  const done=current>idx, active=current===idx;
  return <div onClick={done||active?()=>onClick(idx):undefined} style={{
    display:"flex",flexDirection:"column",alignItems:"center",gap:4,
    cursor:done||active?"pointer":"default",opacity:done||active?1:.35,transition:"opacity .2s"
  }}>
    <div style={{
      width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",
      background:done?"#059669":active?"#7c3aed":"#1f2937",
      border:`2px solid ${done?"#059669":active?"#a78bfa":"#374151"}`,
      boxShadow:active?"0 0 18px rgba(124,58,237,.5)":done?"0 0 12px rgba(5,150,105,.4)":"none",
      transition:"all .3s",fontSize:14,
    }}>
      {done?"✓":<Icon3D src={step.icon} size={22}/>}
    </div>
    <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",opacity:.7,whiteSpace:"nowrap"}}>{step.label}</span>
  </div>;
}

// ─── STEP PAGES ───────────────────────────────────────────────────────────────

function Hero({iconSrc,title,subtitle,color="#a78bfa"}){
  return <div style={{textAlign:"center",paddingBottom:24}}>
    <Icon3D src={iconSrc} size={64} float/>
    <h2 style={{fontSize:24,fontWeight:900,letterSpacing:"-0.04em",marginTop:10,
      background:`linear-gradient(135deg,${color},#fff)`,
      WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{title}</h2>
    <p style={{fontSize:13.5,opacity:.55,marginTop:4}}>{subtitle}</p>
  </div>;
}

function StepIdentity({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Hero iconSrc={I.user} title="Your Identity" subtitle="The foundation of your GitHub presence — every word counts." color="#a78bfa"/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <div style={{gridColumn:"1/-1"}}>
        <Field label="GitHub Username" required hint="or paste full GitHub URL">
          <PInput value={s.username} onChange={v=>upd("username",v)} placeholder="e.g. torvalds — or paste https://github.com/you" icon="⚡"/>
        </Field>
      </div>
      <Field label="Display Name">
        <PInput value={s.displayName} onChange={v=>upd("displayName",v)} placeholder="Ada Lovelace" icon="✦"/>
      </Field>
      <Field label="Location" hint="optional">
        <PInput value={s.location} onChange={v=>upd("location",v)} placeholder="London, UK 🇬🇧" icon="📍"/>
      </Field>
      <div style={{gridColumn:"1/-1"}}>
        <Field label="Tagline" hint="shown in animated banner">
          <PInput value={s.tagline} onChange={v=>upd("tagline",v)} placeholder="Full-Stack Engineer · Open Source Builder · Creator" icon="✍️"/>
        </Field>
      </div>
      <div style={{gridColumn:"1/-1"}}>
        <Field label="Professional Role">
          <PInput value={s.role} onChange={v=>upd("role",v)} placeholder="Senior Software Engineer & Open Source Maintainer" icon="🚀"/>
        </Field>
      </div>
      <Field label="Building" hint="what are you shipping?">
        <PInput value={s.building} onChange={v=>upd("building",v)} placeholder="a tool that 1M devs will use" icon="🔭"/>
      </Field>
      <Field label="Learning">
        <PInput value={s.learning} onChange={v=>upd("learning",v)} placeholder="Rust, WebAssembly, and patience" icon="🌱"/>
      </Field>
      <div style={{gridColumn:"1/-1"}}>
        <Field label="Open to Collaborate On">
          <PInput value={s.collab} onChange={v=>upd("collab",v)} placeholder="ambitious open-source projects that solve real problems" icon="🤝"/>
        </Field>
      </div>
      <div style={{gridColumn:"1/-1"}}>
        <Field label="Custom About Line" hint="extra row in your Who Am I table">
          <PInput value={s.customAbout||""} onChange={v=>upd("customAbout",v)} placeholder="Ask me about distributed systems or coffee recommendations ☕"/>
        </Field>
      </div>
    </div>

    {/* Who Am I emoji customizer */}
    <SectionCard title="Customize Who Am I Emojis" icon="😊" defaultOpen={false}>
      {Object.entries(s.whoamiEmojis||INIT.whoamiEmojis).map(([k,emoji])=>(
        <div key={k} style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:11,opacity:.6,width:70,textTransform:"capitalize"}}>{k}</span>
          <div style={{width:34,height:34,borderRadius:8,background:"#1f2937",border:"1px solid #374151",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{emoji}</div>
          <EmojiPicker onSelect={e=>upd("whoamiEmojis",{...s.whoamiEmojis,[k]:e})}/>
        </div>
      ))}
    </SectionCard>
  </div>;
}

function StepStyle({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Hero iconSrc={I.brush} title="Visual Style" subtitle="The aesthetic that makes visitors stay. Own every pixel." color="#f472b6"/>

    <SectionCard title="🎨 Color Theme" defaultOpen={true}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
        {THEMES.map(t=>(
          <div key={t.id} onClick={()=>upd("theme",t.id)} style={{
            background:t.bg,border:`2px solid ${s.theme===t.id?t.primary:"#374151"}`,
            borderRadius:10,padding:"8px 5px",cursor:"pointer",textAlign:"center",
            boxShadow:s.theme===t.id?`0 0 14px ${t.primary}55`:"none",transition:"all .2s"
          }}>
            <div style={{display:"flex",justifyContent:"center",gap:3,marginBottom:4}}>
              {[t.bg,t.primary,t.accent].map((c,i)=><div key={i} style={{width:9,height:9,borderRadius:"50%",background:c,border:"1px solid rgba(255,255,255,.15)"}}/>)}
            </div>
            <div style={{fontSize:10,fontWeight:700,color:s.theme===t.id?t.primary:"#6b7280"}}>{t.label}</div>
          </div>
        ))}
      </div>
    </SectionCard>

    <SectionCard title="🖼️ Banner Design" defaultOpen={true}>
      <Field label="Header Shape">
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {HEADER_STYLES.map(h=><Chip key={h.id} label={h.label} active={s.headerStyle===h.id} onClick={()=>upd("headerStyle",h.id)}/>)}
        </div>
      </Field>
      <Field label="Banner Height">
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {BANNER_HEIGHTS.map(h=><Chip key={h.id} label={h.label} active={s.headerHeight===h.id} onClick={()=>upd("headerHeight",h.id)}/>)}
        </div>
      </Field>
      <Field label="Name Font Size">
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {BANNER_FONT_SIZES.map(h=><Chip key={h.id} label={h.label} active={s.headerFontSize===h.id} onClick={()=>upd("headerFontSize",h.id)}/>)}
        </div>
      </Field>
      <Field label="Text Alignment">
        <div style={{display:"flex",gap:6}}>
          {["left","center","right"].map(a=><Chip key={a} label={a.charAt(0).toUpperCase()+a.slice(1)} active={s.bannerTextAlign===a} onClick={()=>upd("bannerTextAlign",a)}/>)}
        </div>
      </Field>
      <Field label="Animation">
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {["fadeIn","scaleIn","blink","twinkling","blinking"].map(a=><Chip key={a} label={a} active={s.headerAnimation===a} onClick={()=>upd("headerAnimation",a)}/>)}
        </div>
      </Field>
    </SectionCard>

    <SectionCard title="🌈 Gradient Colors" defaultOpen={true}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <ColorInput label="Start Color" value={s.headerColor1} onChange={v=>upd("headerColor1",v)}/>
        <ColorInput label="End Color" value={s.headerColor2} onChange={v=>upd("headerColor2",v)}/>
      </div>
      <GSwitch checked={!!s.useThreeColorGradient} onChange={v=>upd("useThreeColorGradient",v)} label="Use 3-color gradient (Start → Mid → End)"/>
      {s.useThreeColorGradient&&<ColorInput label="Mid Color" value={s.headerColor3||"#6d28d9"} onChange={v=>upd("headerColor3",v)}/>}
      {/* Live preview */}
      <div style={{
        height:60,borderRadius:12,overflow:"hidden",
        background:s.useThreeColorGradient&&cleanHex(s.headerColor3)
          ?`linear-gradient(135deg,${s.headerColor1},${s.headerColor3},${s.headerColor2})`
          :`linear-gradient(135deg,${s.headerColor1},${s.headerColor2})`,
        display:"flex",alignItems:"center",justifyContent:s.bannerTextAlign==="left"?"flex-start":s.bannerTextAlign==="right"?"flex-end":"center",
        padding:"0 20px",boxShadow:"0 4px 20px rgba(0,0,0,.5)"
      }}>
        <div>
          <div style={{color:"#fff",fontWeight:900,fontSize:16}}>{s.displayName||s.username||"Your Name"}</div>
          <div style={{color:"rgba(255,255,255,.7)",fontSize:10}}>{s.tagline||"Developer · Creator · Builder"}</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <ColorInput label="Name Text Color" value={`#${s.headerTextColor||"ffffff"}`} onChange={v=>upd("headerTextColor",v.replace("#",""))}/>
        <ColorInput label="Tagline Color" value={`#${s.headerDescColor||"dddddd"}`} onChange={v=>upd("headerDescColor",v.replace("#",""))}/>
      </div>
    </SectionCard>

    <SectionCard title="🏷️ Badge & Divider Style">
      <Field label="All Badges Style">
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {["for-the-badge","flat","flat-square","plastic"].map(b=><Chip key={b} label={b} active={s.badgeStyle===b} onClick={()=>upd("badgeStyle",b)}/>)}
        </div>
      </Field>
      <Field label="Divider Between Sections">
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {DIVIDER_STYLES.map(d=><Chip key={d.id} label={d.label} active={s.dividerStyle===d.id} onClick={()=>upd("dividerStyle",d.id)}/>)}
        </div>
      </Field>
    </SectionCard>

    <SectionCard title="🖥️ App UI Theme">
      <Field label="Builder Interface Mode">
        <div style={{display:"flex",gap:8}}>
          <Chip label="🌙 Dark" active={s.appTheme!=="light"} onClick={()=>upd("appTheme","dark")}/>
          <Chip label="☀️ Light" active={s.appTheme==="light"} onClick={()=>upd("appTheme","light")}/>
        </div>
      </Field>
      <ColorInput label="Accent Color (buttons, highlights)" value={s.accentColor||"#7c3aed"} onChange={v=>upd("accentColor",v)}/>
    </SectionCard>
  </div>;
}

function StepText({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Hero iconSrc={I.text} title="Text & Typography" subtitle="Control every font, size, and section title in your README." color="#fbbf24"/>

    <SectionCard title="⌨️ Typing SVG Font & Size" defaultOpen={true}>
      <Field label="Font Family">
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {README_FONTS.map(f=><Chip key={f.id} label={f.label} active={s.readmeFont===f.id} onClick={()=>upd("readmeFont",f.id)}/>)}
        </div>
      </Field>
      <Field label="Font Size">
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {TYPING_SIZES.map(f=><Chip key={f.id} label={f.label} active={s.typingFontSize===f.id} onClick={()=>upd("typingFontSize",f.id)}/>)}
        </div>
      </Field>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Field label="SVG Width" hint="500px recommended">
          <PInput value={s.typingWidth||"500"} onChange={v=>upd("typingWidth",v)} placeholder="500"/>
        </Field>
        <Field label="Typing Speed (ms)" hint="3500 = comfortable">
          <PInput value={s.typingDuration||"3500"} onChange={v=>upd("typingDuration",v)} placeholder="3500"/>
        </Field>
      </div>
      <Field label="Pause Between Lines (ms)" hint="1200 = natural pause">
        <PInput value={s.typingPause||"1200"} onChange={v=>upd("typingPause",v)} placeholder="1200"/>
      </Field>
      <ColorInput label="Custom Text Color (leave blank to use theme color)" value={s.typingColor||""} onChange={v=>upd("typingColor",v)}/>
    </SectionCard>

    <SectionCard title="✏️ Custom Section Titles" defaultOpen={true}>
      <div style={{fontSize:11.5,opacity:.55,marginBottom:4}}>Rename any section heading — emojis included. Make them your own.</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {Object.entries(s.customSectionTitles||INIT.customSectionTitles).map(([k,v])=>(
          <div key={k} style={{display:"grid",gridTemplateColumns:"90px 1fr",gap:8,alignItems:"center"}}>
            <span style={{fontSize:10.5,opacity:.5,textTransform:"capitalize",fontWeight:600}}>{k}</span>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <PInput value={v} onChange={val=>upd("customSectionTitles",{...s.customSectionTitles,[k]:val})} placeholder={`Section title`}/>
              <EmojiPicker onSelect={e=>upd("customSectionTitles",{...s.customSectionTitles,[k]:e+" "+v.replace(/^\S+\s/,"")})}/>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>

    <SectionCard title="📊 Skills Icon Settings">
      <Field label="Icons Per Row">
        <div style={{display:"flex",gap:6}}>
          {["4","6","8","10","12"].map(n=><Chip key={n} label={n} active={s.skillIconsPerLine===n} onClick={()=>upd("skillIconsPerLine",n)}/>)}
        </div>
      </Field>
      <Field label="Icon Theme">
        <div style={{display:"flex",gap:6}}>
          <Chip label="Light (colored)" active={s.skillIconsTheme!=="dark"} onClick={()=>upd("skillIconsTheme","light")}/>
          <Chip label="Dark" active={s.skillIconsTheme==="dark"} onClick={()=>upd("skillIconsTheme","dark")}/>
        </div>
      </Field>
    </SectionCard>
  </div>;
}

function StepTyping({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Hero iconSrc={I.keyboard} title="Typing Animation Lines" subtitle="These rotate live on your profile. Write lines people screenshot." color="#34d399"/>
    {[0,1,2,3].map(i=>{
      const val=s.typingLines[i]||"";
      const over=val.length>55;
      return <Field key={i} label={`Line ${i+1}`} hint={val?`${val.length}/55`:undefined}>
        <PInput value={val} warn={over?"Over 55 chars — may overflow the SVG":undefined}
          onChange={v=>{const l=[...s.typingLines];l[i]=v;upd("typingLines",l);}}
          placeholder={["Building the web, one commit at a time 🚀","Full-stack developer + community builder","Always shipping, never stopping ⚡","If it can be built, it will be built."][i]}
          icon={["⚡","🚀","✨","🔥"][i]}/>
      </Field>;
    })}
    <Glass>
      <div style={{fontSize:12,fontWeight:700,color:"#a78bfa",marginBottom:8}}>✦ Lines that stop the scroll</div>
      {[
        ["Building","products that outlive the sprint they were born in"],
        ["Turning","coffee into commits since whenever I started"],
        ["Ask me","anything — I have opinions and I'm not afraid to share them"],
        ["I ship","then I iterate. Perfectionism ships nothing."],
      ].map(([b,r],i)=>(
        <div key={i} style={{fontSize:12,opacity:.7,marginBottom:4}}>
          <span style={{fontWeight:700,opacity:1}}>{b}</span> {r}
        </div>
      ))}
    </Glass>
  </div>;
}

function StepSocials({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Hero iconSrc={I.globe} title="Your Platforms" subtitle="Only filled links appear as badges. Quality beats quantity." color="#34d399"/>
    <SectionCard title="🌐 Social Links" defaultOpen={true}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {SOCIALS.map(p=>{
          const val=s.socials[p.id]||"";
          return <Field key={p.id} label={p.label}>
            <PInput value={val} warn={val&&!val.startsWith("http")?"Must start with https://":undefined}
              onChange={v=>upd("socials",{...s.socials,[p.id]:v})}
              placeholder={`https://...`}/>
          </Field>;
        })}
      </div>
    </SectionCard>
    <SectionCard title="📊 Counters & Badge Options">
      <Field label="Social Badge Style">
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {["for-the-badge","flat","flat-square","plastic"].map(b=><Chip key={b} label={b} active={s.socialBadgeStyle===b} onClick={()=>upd("socialBadgeStyle",b)}/>)}
        </div>
      </Field>
      <GSwitch checked={s.showProfileViews!==false} onChange={v=>upd("showProfileViews",v)} label="Show profile views counter"/>
      <GSwitch checked={s.showFollowers!==false} onChange={v=>upd("showFollowers",v)} label="Show follower count badge"/>
      {(s.showProfileViews!==false||s.showFollowers!==false)&&(
        <Field label="Counter Badge Style">
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {PROFILE_VIEWS_STYLES.map(p=><Chip key={p.id} label={p.label} active={s.profileViewsStyle===p.id} onClick={()=>upd("profileViewsStyle",p.id)}/>)}
          </div>
        </Field>
      )}
    </SectionCard>
  </div>;
}

function StepSkills({s,upd}){
  const [search,setSearch]=useState("");
  const [tab,setTab]=useState("Languages");
  const visible=search?Object.values(SKILL_GROUPS).flat().filter(sk=>sk.toLowerCase().includes(search.toLowerCase())):(SKILL_GROUPS[tab]||[]);
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <Hero iconSrc={I.tool} title="Your Tech Arsenal" subtitle="Pick what you actually use. Precision over padding." color="#60a5fa"/>
    <div style={{display:"flex",gap:8,alignItems:"center"}}>
      <PInput value={search} onChange={setSearch} placeholder="Search 140+ technologies — rust, supabase, flutter..." icon="🔍" style={{flex:1}}/>
      <div style={{background:"rgba(124,58,237,.2)",border:"1.5px solid #7c3aed",borderRadius:9,
        padding:"8px 12px",fontSize:12,fontWeight:800,color:"#a78bfa",whiteSpace:"nowrap"}}>
        {s.skills.length}<span style={{opacity:.5,fontWeight:400}}>/60</span>
      </div>
    </div>
    {!search&&(
      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
        {Object.keys(SKILL_GROUPS).map(g=><Chip key={g} label={g} small active={tab===g} onClick={()=>setTab(g)}/>)}
      </div>
    )}
    <div style={{display:"flex",flexWrap:"wrap",gap:5,maxHeight:210,overflowY:"auto",padding:2}}>
      {visible.map(sk=>{
        const on=s.skills.includes(sk);
        return <div key={sk} onClick={()=>{
          if(on)upd("skills",s.skills.filter(x=>x!==sk));
          else if(s.skills.length<60)upd("skills",[...s.skills,sk]);
        }} style={{
          display:"flex",alignItems:"center",gap:5,padding:"4px 9px",borderRadius:9,cursor:"pointer",
          background:on?"rgba(124,58,237,.25)":"rgba(255,255,255,.03)",
          border:`1.5px solid ${on?"#7c3aed":"rgba(255,255,255,.08)"}`,
          color:on?"#a78bfa":"#6b7280",fontSize:11.5,userSelect:"none",transition:"all .1s",fontWeight:500,
        }}>
          <img src={`https://skillicons.dev/icons?i=${sk}`} width={14} height={14}
            style={{borderRadius:2}} onError={e=>{e.target.style.display="none"}}/>
          {sk}
        </div>;
      })}
    </div>
    {s.skills.length>0&&(
      <Glass style={{padding:10}}>
        <div style={{fontSize:10,opacity:.5,marginBottom:6,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"}}>Selected — click to remove</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {s.skills.map(sk=>(
            <div key={sk} onClick={()=>upd("skills",s.skills.filter(x=>x!==sk))} style={{
              display:"flex",alignItems:"center",gap:4,background:"#7c3aed",
              borderRadius:7,padding:"3px 8px",color:"#fff",fontSize:11,cursor:"pointer",fontWeight:600
            }}>
              <img src={`https://skillicons.dev/icons?i=${sk}`} width={12} height={12} onError={e=>{e.target.style.display="none"}}/>
              {sk} <span style={{opacity:.6}}>×</span>
            </div>
          ))}
        </div>
      </Glass>
    )}
  </div>;
}

function StepWidgets({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <Hero iconSrc={I.chart} title="Stats & Widgets" subtitle="Configure every data widget that appears on your profile." color="#c084fc"/>

    <SectionCard title="📊 GitHub Stats Cards" defaultOpen={true}>
      <Field label="Layout">
        <div style={{display:"flex",gap:6}}>
          <Chip label="Side by Side" active={s.statsLayout==="side"} onClick={()=>upd("statsLayout","side")}/>
          <Chip label="Stacked" active={s.statsLayout==="stacked"} onClick={()=>upd("statsLayout","stacked")}/>
        </div>
      </Field>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <GSwitch checked={s.statShowIcons!==false} onChange={v=>upd("statShowIcons",v)} label="Show icons"/>
        <GSwitch checked={s.statHideBorder!==false} onChange={v=>upd("statHideBorder",v)} label="Hide border"/>
        <GSwitch checked={s.statCountPrivate!==false} onChange={v=>upd("statCountPrivate",v)} label="Count private"/>
        <GSwitch checked={s.statAllCommits!==false} onChange={v=>upd("statAllCommits",v)} label="All commits"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Field label="Languages Count">
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {["5","6","8","10","12"].map(n=><Chip key={n} label={n} small active={s.langsCount===n} onClick={()=>upd("langsCount",n)}/>)}
          </div>
        </Field>
        <Field label="Languages Layout">
          <div style={{display:"flex",gap:5}}>
            <Chip label="Compact" small active={s.langsLayout==="compact"} onClick={()=>upd("langsLayout","compact")}/>
            <Chip label="Normal" small active={s.langsLayout==="normal"} onClick={()=>upd("langsLayout","normal")}/>
          </div>
        </Field>
      </div>
    </SectionCard>

    <SectionCard title="🏆 Trophy Configuration">
      <Field label="Trophy Theme">
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          {TROPHY_THEMES.map(t=><Chip key={t} label={t} small active={s.trophyTheme===t} onClick={()=>upd("trophyTheme",t)}/>)}
        </div>
      </Field>
      <Field label="Columns: {s.trophyColumns||4}">
        <input type="range" min={1} max={6} value={s.trophyColumns||4} onChange={e=>upd("trophyColumns",String(e.target.value))}
          style={{accentColor:"#7c3aed",width:"100%"}}/>
        <div style={{display:"flex",gap:4,marginTop:6}}>
          {Array.from({length:+s.trophyColumns||4}).map((_,i)=>(
            <div key={i} style={{flex:1,height:22,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",
              borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>🏆</div>
          ))}
        </div>
      </Field>
      <div style={{display:"flex",gap:10}}>
        <GSwitch checked={s.trophyNoFrame!==false} onChange={v=>upd("trophyNoFrame",v)} label="No frame"/>
        <GSwitch checked={s.trophyNoBg!==false} onChange={v=>upd("trophyNoBg",v)} label="No background"/>
      </div>
    </SectionCard>

    <SectionCard title="🐍 Snake Color">
      <Field label="Snake Palette">
        <div style={{display:"flex",gap:6}}>
          {SNAKE_COLORS.map(c=>(
            <div key={c.id} onClick={()=>upd("snakeColor",c.id)} style={{
              display:"flex",alignItems:"center",gap:6,padding:"5px 10px",borderRadius:8,cursor:"pointer",
              border:`1.5px solid ${s.snakeColor===c.id?"#7c3aed":"#374151"}`,
              background:s.snakeColor===c.id?"rgba(124,58,237,.15)":"transparent"
            }}>
              <div style={{width:12,height:12,borderRadius:"50%",background:c.preview}}/>
              <span style={{fontSize:12}}>{c.label}</span>
            </div>
          ))}
        </div>
      </Field>
      {s.snakeColor==="custom"&&<ColorInput label="Custom Snake Color" value={s.snakeCustomColor||"#9146ff"} onChange={v=>upd("snakeCustomColor",v)}/>}
    </SectionCard>

    <SectionCard title="⏱️ WakaTime">
      <Field label="WakaTime Username" hint="free at wakatime.com">
        <PInput value={s.wakatimeUser||""} onChange={v=>upd("wakatimeUser",v)} placeholder="your-wakatime-handle" icon="⏱️"/>
      </Field>
      <GSwitch checked={s.showWakatimeLangs!==false} onChange={v=>upd("showWakatimeLangs",v)} label="Show language breakdown"/>
    </SectionCard>

    <SectionCard title="🎵 Spotify Now Playing">
      <div style={{fontSize:12,opacity:.6,marginBottom:6}}>Deploy <a href="https://github.com/novatorem/novatorem" target="_blank" rel="noreferrer" style={{color:"#a78bfa"}}>Novatorem</a> to get your card URL.</div>
      <Field label="Card Image URL">
        <PInput value={s.spotifyUrl||""} onChange={v=>upd("spotifyUrl",v)} placeholder="https://novatorem-xxx.vercel.app/api/spotify" icon="🎵"/>
      </Field>
    </SectionCard>

    <SectionCard title="🌍 Timezone">
      <Field label="UTC Offset" hint="Nepal 5.75 · London 0 · New York -5 · Tokyo 9">
        <PInput value={s.utcOffset||"0"} onChange={v=>upd("utcOffset",v)} placeholder="0"/>
      </Field>
    </SectionCard>
  </div>;
}

function StepProjects({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <Hero iconSrc={I.target} title="Projects & Repos" subtitle="Show what you've built. Real work beats any description." color="#fb923c"/>

    <SectionCard title="🎯 Projects Table" defaultOpen={true}>
      {s.projects.map((p,i)=>(
        <Glass key={i} style={{padding:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:24,height:24,borderRadius:7,background:"rgba(124,58,237,.3)",border:"1px solid #7c3aed",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#a78bfa"}}>{i+1}</div>
              <span style={{fontSize:12.5,fontWeight:700}}>Project {i+1}</span>
            </div>
            {s.projects.length>1&&<button onClick={()=>upd("projects",s.projects.filter((_,j)=>j!==i))}
              style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",
                color:"#f87171",borderRadius:7,padding:"3px 10px",fontSize:11,cursor:"pointer"}}>Remove</button>}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <Field label="Project Name"><PInput value={p.name} onChange={v=>{const ps=[...s.projects];ps[i]={...ps[i],name:v};upd("projects",ps);}} placeholder="ReadMeCraft" icon="📦"/></Field>
              <Field label="Tech Stack"><PInput value={p.stack} onChange={v=>{const ps=[...s.projects];ps[i]={...ps[i],stack:v};upd("projects",ps);}} placeholder="React · TS · Vercel" icon="🔧"/></Field>
            </div>
            <Field label="Status">
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {["🟢 Live","🟡 In Progress","🔵 Planning","🔴 Paused","✅ Completed"].map(st=>(
                  <Chip key={st} label={st} small active={p.status===st} onClick={()=>{const ps=[...s.projects];ps[i]={...ps[i],status:st};upd("projects",ps);}}/>
                ))}
              </div>
            </Field>
            <Field label="Link (optional)"><PInput value={p.link} onChange={v=>{const ps=[...s.projects];ps[i]={...ps[i],link:v};upd("projects",ps);}} placeholder="https://github.com/..." icon="🔗"/></Field>
          </div>
        </Glass>
      ))}
      <button onClick={()=>upd("projects",[...s.projects,{name:"",stack:"",status:"🔵 Planning",link:""}])}
        onMouseEnter={e=>{e.currentTarget.style.borderColor="#7c3aed";e.currentTarget.style.color="#a78bfa";}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.08)";e.currentTarget.style.color="#6b7280";}}
        style={{background:"transparent",border:"2px dashed rgba(255,255,255,.08)",color:"#6b7280",
          borderRadius:10,padding:12,fontSize:13,fontWeight:600,cursor:"pointer",transition:"all .2s"}}>
        + Add Another Project
      </button>
    </SectionCard>

    <SectionCard title="📌 Pinned Repositories">
      {s.pinnedRepos.map((r,i)=>(
        <Glass key={i} style={{padding:12}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <span style={{fontSize:12,fontWeight:700,color:"#a78bfa"}}>Repo {i+1}</span>
            <button onClick={()=>upd("pinnedRepos",s.pinnedRepos.filter((_,j)=>j!==i))}
              style={{background:"none",border:"none",color:"#f87171",cursor:"pointer",fontSize:11}}>Remove</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <Field label="Repo Name"><PInput value={r.name} onChange={v=>{const rs=[...s.pinnedRepos];rs[i]={...rs[i],name:v};upd("pinnedRepos",rs);}} placeholder="my-awesome-repo"/></Field>
            <Field label="Description"><PInput value={r.desc} onChange={v=>{const rs=[...s.pinnedRepos];rs[i]={...rs[i],desc:v};upd("pinnedRepos",rs);}} placeholder="Short description"/></Field>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
              <Field label="Stars"><PInput value={r.stars} onChange={v=>{const rs=[...s.pinnedRepos];rs[i]={...rs[i],stars:v};upd("pinnedRepos",rs);}} placeholder="42"/></Field>
              <Field label="Language"><PInput value={r.lang} onChange={v=>{const rs=[...s.pinnedRepos];rs[i]={...rs[i],lang:v};upd("pinnedRepos",rs);}} placeholder="TypeScript"/></Field>
              <Field label="Link"><PInput value={r.link} onChange={v=>{const rs=[...s.pinnedRepos];rs[i]={...rs[i],link:v};upd("pinnedRepos",rs);}} placeholder="https://..."/></Field>
            </div>
          </div>
        </Glass>
      ))}
      <button onClick={()=>upd("pinnedRepos",[...s.pinnedRepos,{name:"",desc:"",stars:"",lang:"",link:""}])}
        style={{background:"transparent",border:"2px dashed rgba(255,255,255,.08)",color:"#6b7280",
          borderRadius:10,padding:10,fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Add Pinned Repo</button>
    </SectionCard>
  </div>;
}

function StepExtras({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <Hero iconSrc={I.idea} title="Personality & Goals" subtitle="This is what people remember. Be specific, be real, be you." color="#22d3ee"/>
    <SectionCard title="💡 Fun Facts" defaultOpen={true}>
      {s.funFacts.map((f,i)=>(
        <div key={i} style={{display:"flex",gap:7}}>
          <EmojiPicker onSelect={e=>{ const fs=[...s.funFacts];fs[i]=e+" "+(fs[i]||"").replace(/^\S+\s?/,"");upd("funFacts",fs); }}/>
          <PInput value={f} onChange={v=>{const fs=[...s.funFacts];fs[i]=v;upd("funFacts",fs);}} placeholder={["I've reviewed code at 3am and found it beautiful","My rubber duck has opinions","I type faster than I think — chaos ensues","I commit before I test. Twice."][i%4]} style={{flex:1}}/>
          {s.funFacts.length>1&&<button onClick={()=>upd("funFacts",s.funFacts.filter((_,j)=>j!==i))}
            style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",color:"#f87171",borderRadius:8,padding:"0 10px",cursor:"pointer",fontSize:13}}>✕</button>}
        </div>
      ))}
      <button onClick={()=>upd("funFacts",[...s.funFacts,""])}
        style={{background:"transparent",border:"1px dashed rgba(255,255,255,.1)",color:"#6b7280",borderRadius:8,padding:9,fontSize:12,cursor:"pointer"}}>+ Add fun fact</button>
    </SectionCard>
    <SectionCard title="🌱 Goals">
      {s.goals.map((g,i)=>(
        <div key={i} style={{display:"flex",gap:7}}>
          <EmojiPicker onSelect={e=>{ const gs=[...s.goals];gs[i]=e+" "+(gs[i]||"").replace(/^\S+\s?/,"");upd("goals",gs); }}/>
          <PInput value={g} onChange={v=>{const gs=[...s.goals];gs[i]=v;upd("goals",gs);}} placeholder={["Reach 1,000 GitHub stars this year","Ship my first SaaS and hit $1 MRR","Speak at a developer conference","Build the tool I always wished existed"][i%4]} style={{flex:1}}/>
          {s.goals.length>1&&<button onClick={()=>upd("goals",s.goals.filter((_,j)=>j!==i))}
            style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",color:"#f87171",borderRadius:8,padding:"0 10px",cursor:"pointer",fontSize:13}}>✕</button>}
        </div>
      ))}
      <button onClick={()=>upd("goals",[...s.goals,""])}
        style={{background:"transparent",border:"1px dashed rgba(255,255,255,.1)",color:"#6b7280",borderRadius:8,padding:9,fontSize:12,cursor:"pointer"}}>+ Add goal</button>
    </SectionCard>
  </div>;
}

function StepSupport({s,upd}){
  return <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <Hero iconSrc={I.heart} title="Support Links" subtitle="Optional — let people who love your work fuel the next build." color="#fb7185"/>
    {SUPPORT_PLATFORMS.map(p=>(
      <Glass key={p.id} style={{padding:14}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{width:34,height:34,borderRadius:9,background:`#${p.color}22`,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,
            border:`1px solid #${p.color}44`}}>{p.emoji}</div>
          <div>
            <div style={{fontSize:13,fontWeight:700}}>{p.label}</div>
            <div style={{fontSize:10.5,opacity:.5,fontFamily:"monospace"}}>{p.prefix}yourusername</div>
          </div>
        </div>
        <PInput value={s.supportLinks[p.id]||""}
          onChange={v=>upd("supportLinks",{...s.supportLinks,[p.id]:v})}
          placeholder="yourusername — leave blank to hide this"/>
      </Glass>
    ))}
  </div>;
}

function StepSections({s,upd}){
  const enabled=SECTION_LIST.filter(sec=>s.sections[sec.id]).length;
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <Hero iconSrc={I.list} title="Sections" subtitle="Every section you enable is a reason for visitors to stay." color="#86efac"/>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
      background:"rgba(255,255,255,.03)",borderRadius:9,padding:"9px 14px",border:"1px solid rgba(255,255,255,.06)"}}>
      <span style={{fontSize:12.5}}><span style={{fontWeight:800,color:"#a78bfa"}}>{enabled}</span><span style={{opacity:.5}}> of {SECTION_LIST.length} sections active</span></span>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>{ const all={}; SECTION_LIST.forEach(s=>{ all[s.id]=!s.locked?true:true; }); upd("sections",all); }}
          style={{background:"rgba(124,58,237,.2)",border:"1px solid #7c3aed",color:"#a78bfa",borderRadius:7,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>All On</button>
        <button onClick={()=>{ const min={}; SECTION_LIST.forEach(s=>{ min[s.id]=s.locked?true:false; }); upd("sections",min); }}
          style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"#6b7280",borderRadius:7,padding:"4px 10px",fontSize:11,cursor:"pointer"}}>Minimum</button>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
      {SECTION_LIST.map(sec=>{
        const on=!!s.sections[sec.id];
        return <div key={sec.id} style={{
          display:"flex",alignItems:"center",justifyContent:"space-between",
          background:on?"rgba(124,58,237,.12)":"rgba(255,255,255,.02)",
          border:`1.5px solid ${on?"#7c3aed":"rgba(255,255,255,.06)"}`,
          borderRadius:9,padding:"9px 11px",transition:"all .18s",
          boxShadow:on?"0 0 10px rgba(124,58,237,.2)":"none",
        }}>
          <span style={{fontSize:12,color:on?"#f9fafb":"#6b7280",fontWeight:on?600:400}}>
            {sec.icon} {sec.label}
          </span>
          {sec.locked
            ?<span style={{fontSize:9,color:"#4b5563",fontWeight:700,letterSpacing:"0.05em"}}>ALWAYS</span>
            :<GSwitch checked={on} onChange={v=>upd("sections",{...s.sections,[sec.id]:v})} label=""/>
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
  const isDark=s.appTheme!=="light";
  const C=isDark?DARK:LIGHT;

  const copy=()=>navigator.clipboard.writeText(readme).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500);});
  const dl=()=>{
    const a=document.createElement("a");
    a.href=URL.createObjectURL(new Blob([readme],{type:"text/markdown"}));
    a.download="README.md";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),200);
  };

  const hl=readme.split("\n").map((line,i)=>{
    let col="#c9d1d9",fw="normal";
    if(/^## /.test(line)){col="#7aa2f7";fw="700";}
    else if(/^# /.test(line)){col="#bb9af7";fw="800";}
    else if(/^\!\[/.test(line)||/^\[!\[/.test(line))col="#a9fef7";
    else if(/^---/.test(line)||/^<hr/.test(line))col="#30363d";
    else if(/^>/.test(line))col="#9ece6a";
    else if(/^- /.test(line))col="#c0caf5";
    else if(/^\|/.test(line))col="#cba6f7";
    else if(/^</.test(line))col="#f7768e";
    else if(/^<!--/.test(line))col="#4d5566";
    return <div key={i} style={{color:col,fontWeight:fw,minHeight:19,lineHeight:1.85}}>{line||"\u00a0"}</div>;
  });

  return <div style={{minHeight:"100vh",background:C.bg,color:C.text,display:"flex",flexDirection:"column",fontFamily:"'Inter',system-ui,sans-serif"}}>
    <div style={{background:C.elevated,borderBottom:`1px solid ${C.border}`,padding:"0 20px",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:56}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={onEdit} style={{background:"transparent",border:`1px solid ${C.border2}`,color:C.muted,
            borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>← Edit</button>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Icon3D src={I.rocket} size={26} float/>
            <div>
              <div style={{fontSize:14,fontWeight:800}}>README ready <span style={{color:theme.primary}}>for {s.displayName||cleanUser(s.username)||"your profile"}</span></div>
              <div style={{fontSize:11,color:C.muted}}>{readme.split("\n").length} lines · {(readme.length/1024).toFixed(1)}KB · {SECTION_LIST.filter(sec=>s.sections[sec.id]).length} sections</div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={copy} style={{
            background:copied?"#059669":"transparent",border:`1.5px solid ${copied?"#059669":C.border2}`,
            color:copied?"#fff":C.text,borderRadius:9,padding:"8px 18px",fontSize:13,fontWeight:700,cursor:"pointer",transition:"all .2s"
          }}>{copied?"✓ Copied!":"⎘ Copy README"}</button>
          <button onClick={dl} style={{
            background:`linear-gradient(135deg,#7c3aed,#a855f7)`,color:"#fff",border:"none",
            borderRadius:9,padding:"8px 20px",fontSize:13,fontWeight:800,cursor:"pointer",
            boxShadow:"0 4px 18px rgba(124,58,237,.35)"
          }}>↓ Download .md</button>
        </div>
      </div>
    </div>

    <div style={{background:"#0a1a0d",borderBottom:"1px solid #064e3b",padding:"10px 20px",flexShrink:0}}>
      <div style={{fontSize:11,fontWeight:700,color:"#34d399",marginBottom:6,textTransform:"uppercase",letterSpacing:".05em"}}>✦ Publish your README in 4 steps</div>
      <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
        {[["1","Create repo","Name it exactly your GitHub username — must be public"],
          ["2","Open README","Tick 'Add a README file' when creating, or edit the existing one"],
          ["3","Paste & save","Replace the content with this file and commit"],
          ["4","Done ✨","Your profile updates within seconds"],
        ].map(([n,b,d])=>(
          <div key={n} style={{display:"flex",gap:7,fontSize:11.5}}>
            <div style={{width:18,height:18,borderRadius:"50%",background:"#059669",color:"#fff",
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,flexShrink:0,marginTop:1}}>{n}</div>
            <div><span style={{color:"#a7f3d0",fontWeight:700}}>{b} — </span><span style={{color:"#6b7280"}}>{d}</span></div>
          </div>
        ))}
      </div>
    </div>

    <div style={{background:C.elevated,borderBottom:`1px solid ${C.border}`,padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:42,flexShrink:0}}>
      <div style={{display:"flex",gap:0}}>
        {[["highlighted","✦ Highlighted"],["raw","Raw Markdown"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setTab(id)} style={{
            background:"none",border:"none",borderBottom:`2px solid ${tab===id?"#7c3aed":"transparent"}`,
            color:tab===id?"#a78bfa":C.muted,padding:"0 14px",height:"100%",fontSize:12.5,fontWeight:tab===id?700:400,cursor:"pointer"
          }}>{lbl}</button>
        ))}
      </div>
      <button onClick={copy} style={{background:"rgba(124,58,237,.2)",border:"1px solid #7c3aed",color:"#a78bfa",borderRadius:7,padding:"4px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>⎘ Copy</button>
    </div>

    <div style={{flex:1,overflowY:"auto",padding:"18px 22px",background:"#0d1117",
      fontFamily:"'JetBrains Mono','Fira Code',monospace",fontSize:12,lineHeight:1,color:"#c9d1d9"}}>
      {tab==="raw"?readme:hl}
    </div>

    <div style={{background:C.elevated,borderTop:`1px solid ${C.border}`,padding:"12px 20px",
      display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <Icon3D src={I.gem} size={22}/>
        <span style={{fontSize:11.5,color:C.muted}}>Built with <span style={{color:"#a78bfa",fontWeight:700}}>ReadMeCraft Pro</span></span>
      </div>
      <div style={{display:"flex",gap:7}}>
        <button onClick={copy} style={{background:copied?"#059669":C.card,border:`1px solid ${C.border2}`,color:C.text,borderRadius:8,padding:"8px 16px",fontSize:12,fontWeight:700,cursor:"pointer"}}>{copied?"✓":"⎘"} Copy</button>
        <button onClick={dl} style={{background:"linear-gradient(135deg,#7c3aed,#a855f7)",border:"none",color:"#fff",borderRadius:8,padding:"8px 20px",fontSize:12,fontWeight:800,cursor:"pointer",boxShadow:"0 0 18px rgba(124,58,237,.3)"}}>↓ Download README.md</button>
      </div>
    </div>
  </div>;
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App(){
  const [s,setS]=useState(()=>{
    try{const p=JSON.parse(localStorage.getItem("rmc_v5")||"null");
      if(p)return{...INIT,...p,sections:{...INIT.sections,...p.sections},
        customSectionTitles:{...INIT.customSectionTitles,...(p.customSectionTitles||{})},
        whoamiEmojis:{...INIT.whoamiEmojis,...(p.whoamiEmojis||{})},
      };}catch(e){}
    return INIT;
  });
  const [step,setStep]=useState(0);
  const [showResult,setShowResult]=useState(false);
  const upd=(k,v)=>setS(prev=>({...prev,[k]:v}));
  useEffect(()=>{try{localStorage.setItem("rmc_v5",JSON.stringify(s));}catch(e){}}, [s]);
  const readme=useMemo(()=>buildReadme(s),[s]);
  const isDark=s.appTheme!=="light";
  const C=isDark?DARK:LIGHT;
  const acc=s.accentColor||"#7c3aed";

  const PAGES=[
    <StepIdentity s={s} upd={upd}/>,
    <StepStyle s={s} upd={upd}/>,
    <StepText s={s} upd={upd}/>,
    <StepTyping s={s} upd={upd}/>,
    <StepSocials s={s} upd={upd}/>,
    <StepSkills s={s} upd={upd}/>,
    <StepWidgets s={s} upd={upd}/>,
    <StepProjects s={s} upd={upd}/>,
    <StepExtras s={s} upd={upd}/>,
    <StepSupport s={s} upd={upd}/>,
    <StepSections s={s} upd={upd}/>,
  ];

  const canProceed = step===0 ? !!cleanUser(s.username) : true;
  const pct = Math.round(((step+1)/STEPS.length)*100);

  if(showResult) return <ResultScreen readme={readme} s={s} onEdit={()=>setShowResult(false)}/>;

  return <div style={{minHeight:"100vh",background:C.bg,color:C.text,display:"flex",flexDirection:"column",
    fontFamily:"'Inter',system-ui,sans-serif",transition:"background .3s,color .3s"}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}
      input,textarea,button,select{font-family:inherit}
      input::placeholder,textarea::placeholder{color:#4b5563}
      input[type=color]{-webkit-appearance:none;padding:0;border:none;border-radius:8px;overflow:hidden;cursor:pointer}
      input[type=color]::-webkit-color-swatch-wrapper{padding:0}
      input[type=color]::-webkit-color-swatch{border:none}
      input[type=range]{accent-color:${acc};cursor:pointer;width:100%}
      ::-webkit-scrollbar{width:4px;height:4px}
      ::-webkit-scrollbar-track{background:transparent}
      ::-webkit-scrollbar-thumb{background:#374151;border-radius:4px}
      a{color:#a78bfa;text-decoration:none}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
      @keyframes slidein{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      .page{animation:slidein .35s ease both}
    `}</style>

    {/* HEADER */}
    <header style={{background:isDark?"rgba(13,17,23,.95)":"rgba(248,250,252,.95)",backdropFilter:"blur(12px)",
      borderBottom:`1px solid ${C.border}`,padding:"0 20px",flexShrink:0,position:"sticky",top:0,zIndex:100}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:52}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:30,height:30,borderRadius:8,background:`linear-gradient(135deg,${acc},#a855f7)`,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:900,
            boxShadow:`0 0 16px ${acc}66`}}>✦</div>
          <span style={{fontWeight:900,fontSize:16,letterSpacing:"-0.04em"}}>ReadMe<span style={{color:acc}}>Craft</span></span>
          <span style={{fontSize:9,fontWeight:700,background:`${acc}22`,border:`1px solid ${acc}55`,
            color:acc,borderRadius:5,padding:"2px 7px",letterSpacing:"0.08em"}}>PRO</span>
        </div>
        <div style={{display:"flex",gap:7,alignItems:"center"}}>
          <button onClick={()=>upd("appTheme",isDark?"light":"dark")} style={{
            background:"transparent",border:`1px solid ${C.border2}`,color:C.muted,
            borderRadius:8,padding:"5px 10px",fontSize:13,cursor:"pointer"
          }}>{isDark?"☀️":"🌙"}</button>
          <button onClick={()=>setShowResult(true)} style={{
            background:"transparent",border:`1px solid ${C.border2}`,color:C.muted,
            borderRadius:8,padding:"6px 13px",fontSize:11,fontWeight:600,cursor:"pointer"
          }}>Preview →</button>
          <button onClick={()=>{if(window.confirm("Reset everything?"))setS(INIT);}} style={{
            background:"none",border:"none",color:C.muted,fontSize:11,cursor:"pointer"
          }}>Reset</button>
        </div>
      </div>
    </header>

    {/* PROGRESS BAR */}
    <div style={{height:3,background:C.border,flexShrink:0}}>
      <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${acc},#a855f7)`,
        transition:"width .4s ease",boxShadow:`0 0 8px ${acc}88`}}/>
    </div>

    {/* STEP DOTS */}
    <div style={{background:isDark?"rgba(13,17,23,.8)":"rgba(248,250,252,.9)",backdropFilter:"blur(8px)",
      borderBottom:`1px solid ${C.border}`,padding:"10px 20px",
      display:"flex",gap:5,alignItems:"flex-start",overflowX:"auto",flexShrink:0,scrollbarWidth:"none"}}>
      {STEPS.map((st,i)=><StepDot key={st.id} step={st} idx={i} current={step} onClick={setStep}/>)}
    </div>

    {/* CONTENT */}
    <div style={{flex:1,overflowY:"auto",display:"flex",justifyContent:"center",padding:"28px 20px 120px"}}>
      <div style={{width:"100%",maxWidth:700}} className="page" key={step}>
        {PAGES[step]}
      </div>
    </div>

    {/* FOOTER NAV */}
    <div style={{
      position:"fixed",bottom:0,left:0,right:0,
      background:isDark?"rgba(5,7,10,.96)":"rgba(248,250,252,.96)",
      backdropFilter:"blur(16px)",borderTop:`1px solid ${C.border}`,
      padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",zIndex:100
    }}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {step>0&&<button onClick={()=>setStep(s=>s-1)} style={{
          background:"transparent",border:`1px solid ${C.border2}`,color:C.muted,
          borderRadius:10,padding:"9px 20px",fontSize:13,fontWeight:600,cursor:"pointer"
        }}>← Back</button>}
        <span style={{fontSize:10.5,color:"#374151",display:"flex",alignItems:"center",gap:4}}>
          <span style={{color:"#059669",fontSize:7}}>●</span> Auto-saved
        </span>
      </div>
      <span style={{fontSize:11,color:C.muted,position:"absolute",left:"50%",transform:"translateX(-50%)"}}>
        Step <span style={{color:C.text,fontWeight:700}}>{step+1}</span> / {STEPS.length}
      </span>
      <div>
        {step<STEPS.length-1?(
          <button onClick={()=>{if(canProceed)setStep(s=>s+1);}} style={{
            background:canProceed?`linear-gradient(135deg,${acc},#a855f7)`:"#1f2937",
            border:"none",color:canProceed?"#fff":"#4b5563",borderRadius:10,
            padding:"10px 28px",fontSize:13,fontWeight:800,cursor:canProceed?"pointer":"not-allowed",
            boxShadow:canProceed?`0 4px 18px ${acc}55`:"none",transition:"all .2s"
          }}>{step===0&&!canProceed?"Enter username first →":"Continue →"}</button>
        ):(
          <button onClick={()=>setShowResult(true)} style={{
            background:`linear-gradient(135deg,${acc},#a855f7,#ec4899)`,border:"none",color:"#fff",
            borderRadius:10,padding:"10px 28px",fontSize:13,fontWeight:800,cursor:"pointer",
            boxShadow:`0 4px 22px ${acc}66`,display:"flex",alignItems:"center",gap:7
          }}>🚀 Generate My README</button>
        )}
      </div>
    </div>
  </div>;
}
