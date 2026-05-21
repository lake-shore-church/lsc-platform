import fs from "fs";
import path from "path";

const webDir = path.join(process.cwd(), "apps/web/messages");
const mobileDir = path.join(process.cwd(), "apps/mobile/messages");
const en = JSON.parse(fs.readFileSync(path.join(webDir, "en.json"), "utf8"));

function deepMerge(target, source) {
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      target[k] = target[k] ?? {};
      deepMerge(target[k], v);
    } else {
      target[k] = v;
    }
  }
  return target;
}

const hi = JSON.parse(JSON.stringify(en));
deepMerge(hi, {
  _meta: "Hindi (हिन्दी). Keys match en.json.",
  nav: {
    watch: "देखें",
    sermons: "उपदेश",
    live: "लाइव स्ट्रीम",
    podcast: "पॉडकास्ट",
    connect: "जुड़ें",
    visit: "आने की योजना बनाएं",
    groups: "छोटे समूह",
    prayer: "प्रार्थना",
    grow: "बढ़ें",
    blog: "ब्लॉग",
    resources: "संसाधन",
    beliefs: "विश्वास",
    give: "दान",
    about_giving: "दान के बारे में",
    about: "हमारे बारे में",
    about_us: "हम कौन हैं",
    pastor: "पास्टर ब्रायन",
    contact: "संपर्क",
    service_times: "रविवार {time} · वेस्ट लूप, शिकागो",
    menu: "मेनू",
    close: "बंद करें",
  },
  home: {
    hero_h1: "परमेश्वर ने यीशु को मृतकों में से जिलाए।",
    hero_h2: "जो उसका अनुसरण करते हैं, उन सब के लिए आशा है।",
    tagline: "साथ मिलकर प्रामाणिक ईसाई जीवन",
    join_sunday: "रविवार को जुड़ें",
    watch_sermon: "उपदेश देखें",
    plan_visit: "अपनी यात्रा की योजना बनाएं →",
    contact_us: "हमसे संपर्क करें",
  },
  worship: { title: "आराधना", body: "परमेश्वर ने आपके जीवन को अपनी महिमा और आनंद के लिए योजनाबद्ध किया।" },
  grow: { title: "बढ़ें", body: "परमेश्वर ने आपको यीशु मसीह का समर्पित शिष्य बनने के लिए बनाया।" },
  serve: { title: "सेवा", body: "परमेश्वर ने आपको अपनी कलीसिया और हमारे शहर में सेवा के लिए दान दिए।" },
  language: { choose: "भाषा", title_multilingual: "भाषा / Language / 语言 / Français" },
  about: {
    page_title: "लेक शोर चर्च के बारे में",
    page_desc: "साथ मिलकर प्रामाणिक ईसाई जीवन",
    meta_desc: "शिकागो वेस्ट लूप में लेक शोर चर्च।",
    intro_1: "लेक शोर चर्च शिकागो के वेस्ट लूप में इकट्ठा होने वाले विश्वासियों का समुदाय है।",
    intro_2: "हम हर रविवार सुबह 10:00 बजे Merit School of Music में मिलते हैं।",
    pillars_heading: "हमारे स्तंभ",
    pastor_heading: "पास्टर ब्रायन",
    book_link: "Amazon पर पुस्तक प्राप्त करें →",
  },
  beliefs: {
    page_title: "हम क्या मानते हैं",
    page_desc: "भ्रम के संसार में शास्त्र से सत्य।",
    belief_1: "हम मानते हैं कि बाइबिल परमेश्वर का प्रेरित, निर्दोष वचन है।",
    belief_4: "परमेश्वर ने यीशु को मृतकों में से जिलाए। जो उसका अनुसरण करते हैं उनके लिए आशा है।",
  },
  events: {
    page_title: "कार्यक्रम",
    list: "सूची",
    calendar: "कैलेंडर",
    all_ministries: "सभी मंत्रालय",
    rsvp: "RSVP",
    add_calendar: "कैलेंडर में जोड़ें",
    no_events: "कोई आगामी कार्यक्रम नहीं।",
  },
  contact: { page_title: "संपर्क करें", phone: "फ़ोन:", email: "ईमेल:", address: "पता:" },
  sermons: { page_title: "उपदेश", search: "खोजें", all_series: "सभी श्रृंखलाएँ", all_speakers: "सभी वक्ता" },
  resources: { page_title: "संसाधन", public: "सार्वजनिक" },
});

const fr = JSON.parse(JSON.stringify(en));
deepMerge(fr, {
  _meta: "French (français). Keys match en.json.",
  nav: {
    watch: "Regarder",
    sermons: "Sermons",
    live: "Direct",
    podcast: "Podcast",
    connect: "Se connecter",
    visit: "Planifier une visite",
    groups: "Petits groupes",
    prayer: "Prière",
    grow: "Grandir",
    blog: "Blog",
    resources: "Ressources",
    beliefs: "Croyances",
    give: "Donner",
    about_giving: "À propos des dons",
    about: "À propos",
    about_us: "Qui sommes-nous",
    pastor: "Pasteur Brian",
    contact: "Contact",
    service_times: "Dimanches {time} · West Loop, Chicago",
    menu: "Menu",
    close: "Fermer",
  },
  home: {
    hero_h1: "Dieu a ressuscité Jésus d'entre les morts.",
    hero_h2: "Il y a de l'espoir pour tous ceux qui le suivent.",
    tagline: "Le christianisme authentique ensemble",
    join_sunday: "Rejoignez-nous dimanche",
    watch_sermon: "Écouter un sermon",
    plan_visit: "Planifier votre visite →",
    contact_us: "Nous contacter",
  },
  worship: { title: "Adoration", body: "Dieu a planifié votre vie pour Sa gloire et Son plaisir." },
  grow: { title: "Grandir", body: "Dieu vous a créé pour devenir un disciple dévoué de Jésus-Christ." },
  serve: { title: "Servir", body: "Dieu vous a donné des dons pour Le servir dans Son Église et notre ville." },
  language: { choose: "Langue", title_multilingual: "Langue / Language / 中文 / हिन्दी" },
  about: {
    page_title: "À propos de Lake Shore Church",
    page_desc: "Le christianisme authentique ensemble",
    meta_desc: "Lake Shore Church dans le West Loop de Chicago.",
    pillars_heading: "Nos piliers",
    pastor_heading: "Pasteur Brian",
    book_link: "Obtenir le livre sur Amazon →",
  },
  beliefs: {
    page_title: "Ce que nous croyons",
    page_desc: "La vérité inerrante des Écritures.",
    belief_4: "Dieu a ressuscité Jésus. Il y a de l'espoir pour tous ceux qui le suivent.",
  },
  events: {
    page_title: "Événements",
    list: "Liste",
    calendar: "Calendrier",
    all_ministries: "Tous les ministères",
    rsvp: "RSVP",
    add_calendar: "Ajouter au calendrier",
    no_events: "Aucun événement à venir.",
  },
  contact: { page_title: "Contactez-nous", phone: "Téléphone :", email: "E-mail :", address: "Adresse :" },
  sermons: { page_title: "Sermons", search: "Rechercher", all_series: "Toutes les séries", all_speakers: "Tous les orateurs" },
  resources: { page_title: "Ressources", public: "Public" },
});

for (const [loc, data] of [
  ["hi", hi],
  ["fr", fr],
]) {
  const json = JSON.stringify(data, null, 2) + "\n";
  fs.writeFileSync(path.join(webDir, `${loc}.json`), json);
  fs.writeFileSync(path.join(mobileDir, `${loc}.json`), json);
}

const nagWeb = path.join(webDir, "nag.json");
const nagMobile = path.join(mobileDir, "nag.json");
if (fs.existsSync(nagWeb)) fs.unlinkSync(nagWeb);
if (fs.existsSync(nagMobile)) fs.unlinkSync(nagMobile);

console.log("Created hi.json and fr.json; removed nag.json");
