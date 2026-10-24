// Real footage for scripts/verify-edit-live.mjs: sets of Wikimedia Commons clips, each under the licence listed (CC0 /
// CC BY / CC BY-SA / public domain: credit the author when a cut made from them is shared). Not in the repository;
// fetched once into a folder and reused.
//   node scripts/lib/fetch-footage.mjs [set] [dir]     (default city, into artifacts/footage/<set>)
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const FOOTAGE = [
  {
    name: "madrid-street",
    title: "Calle Preciados Madrid.ogv",
    url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c5/Calle_Preciados_Madrid.ogv/Calle_Preciados_Madrid.ogv.480p.vp9.webm",
    license: "CC BY-SA 3.0",
    author: "OsvaldoGago",
    page: "https://commons.wikimedia.org/wiki/File:Calle_Preciados_Madrid.ogv"
  },
  {
    name: "ljubljana-market",
    title: "Christmas market in Ljubljana - part 2; accordion.webm",
    url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Christmas_market_in_Ljubljana_-_part_2%3B_accordion.webm/Christmas_market_in_Ljubljana_-_part_2%3B_accordion.webm.480p.vp9.webm",
    license: "CC BY 3.0",
    author: "barbara.grilc; Sound recording: Dušan Oblak, Video recording",
    page: "https://commons.wikimedia.org/wiki/File:Christmas_market_in_Ljubljana_-_part_2;_accordion.webm"
  },
  {
    name: "seattle-viaduct",
    title: "Alaskan Way Viaduct timelapse.webm",
    url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/78/Alaskan_Way_Viaduct_timelapse.webm/Alaskan_Way_Viaduct_timelapse.webm.480p.vp9.webm",
    license: "CC BY 3.0",
    author: "jonknee",
    page: "https://commons.wikimedia.org/wiki/File:Alaskan_Way_Viaduct_timelapse.webm"
  },
  {
    name: "iceland-waves",
    title: "Ocean waves at Lækjavik beach, Iceland.webm",
    url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/9b/Ocean_waves_at_L%C3%A6kjavik_beach%2C_Iceland.webm/Ocean_waves_at_L%C3%A6kjavik_beach%2C_Iceland.webm.480p.vp9.webm",
    license: "CC BY 3.0",
    author: "Alexander Grebenkov",
    page: "https://commons.wikimedia.org/wiki/File:Ocean_waves_at_L%C3%A6kjavik_beach,_Iceland.webm"
  },
  {
    name: "mexico-zocalo",
    title: "Timelapse Plaza de la Constitución (Zócalo) Ciudad de México, 2023.webm",
    url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3d/Timelapse_Plaza_de_la_Constituci%C3%B3n_%28Z%C3%B3calo%29_Ciudad_de_M%C3%A9xico%2C_2023.webm/Timelapse_Plaza_de_la_Constituci%C3%B3n_%28Z%C3%B3calo%29_Ciudad_de_M%C3%A9xico%2C_2023.webm.480p.vp9.webm",
    license: "CC BY-SA 4.0",
    author: "ProtoplasmaKid",
    page: "https://commons.wikimedia.org/wiki/File:Timelapse_Plaza_de_la_Constituci%C3%B3n_(Z%C3%B3calo)_Ciudad_de_M%C3%A9xico,_2023.webm"
  },
  {
    name: "haifa-train",
    title: "Train arriving at Carmelit Downtown Station.webm",
    url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/52/Train_arriving_at_Carmelit_Downtown_Station.webm/Train_arriving_at_Carmelit_Downtown_Station.webm.480p.vp9.webm",
    license: "CC BY-SA 4.0",
    author: "User:Deinocheirus",
    page: "https://commons.wikimedia.org/wiki/File:Train_arriving_at_Carmelit_Downtown_Station.webm"
  },
  {
    name: "aveiro-station",
    title: "Aveiro station azulejos.webm",
    url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/ba/Aveiro_station_azulejos.webm/Aveiro_station_azulejos.webm.480p.vp9.webm",
    license: "CC0",
    author: "MdeVicente",
    page: "https://commons.wikimedia.org/wiki/File:Aveiro_station_azulejos.webm"
  }
];

// The themed sets: [name, Commons file, which file ("480p" / "1080p" VP9 transcode, or "orig" for a portrait original,
// whose transcodes are no taller than wide ones), licence, author]. Commons keeps a file under the md5 of its name, so
// the address follows from the name. Portrait projects get footage at least 1080 px on its short side once cropped.
const C = "https://upload.wikimedia.org/wikipedia/commons";
function commons([name, title, pick, license, author]) {
  const f = title.replace(/ /g, "_"), h = createHash("md5").update(f).digest("hex"), e = encodeURIComponent(f);
  const url = pick === "orig" ? `${C}/${h[0]}/${h.slice(0, 2)}/${e}` : `${C}/transcoded/${h[0]}/${h.slice(0, 2)}/${e}/${e}.${pick}.vp9.webm`;
  return { name, title, url, license, author, page: `https://commons.wikimedia.org/wiki/File:${e}` };
}
export const SETS = { city: FOOTAGE, ...Object.fromEntries(Object.entries({
  nature: [
    ["flamingo", "Flamingo at St. Marks National Wildlife Refuge.webm", "480p", "CC BY-SA 4.0", "James Leon Young"],
    ["roe-deer", "Roe deer in Birmenstorf.webm", "480p", "CC BY-SA 4.0", "Scarabinol"],
    ["egret", "Little Egret-1000756, Dingle Peninsula, Co. Kerry, Ireland.webm", "480p", "CC BY-SA 4.0", "Maoileann"],
    ["geese", "Geese-1280396, Dingle Peninsula, Co. Kerry, Ireland.webm", "480p", "CC BY-SA 4.0", "Maoileann"],
    ["waterfall", "Kaneyamanotaki Waterfall Movie.webm", "480p", "CC BY-SA 4.0", "Osumi Akari"],
    ["moose", "Moose at Seedskadee National Wildlife Refuge (44827612214).webm", "480p", "public domain", "USFWS Mountain Prairie"],
    ["monkey", "Willowbank Wildlife Reserve Video Monkey 01.ogv", "480p", "CC BY-SA 4.0", "Superchilum"],
  ],
  food: [
    ["squilla", "Cooking Squilla mantis with tomato sauce.webm", "orig", "CC BY-SA 4.0", "Horcrux"],
    ["meat-prep", "Meat prepping.webm", "orig", "CC BY-SA 4.0", "Umar2z"],
    ["matzah", "Baking matzah.webm", "orig", "CC BY-SA 4.0", "Yosef Ben Melamed"],
    ["hand-noodles", "Shangjing making of noodles.webm", "orig", "CC BY-SA 4.0", "Shangjingcun"],
    ["soba", "Cutting and prep soba noodles - Tokyo 2019 9 23.webm", "1080p", "CC BY-SA 4.0", "Nesnad"],
    ["sassermaet", "Sassermaet frying.webm", "1080p", "CC BY 4.0", "WhirlieWheeter"],
  ],
  sports: [
    ["skate-park", "Day of the Town (2017-09-09) - Skateboarding - 0096.webm", "480p", "CC BY-SA 4.0", "Zelio007"],
    ["skate-town", "Day of the Town (2017-09-09) - Skateboarding - 0022.webm", "480p", "CC BY-SA 4.0", "Zelio007"],
    ["surf", "Surfing-1012624, Dingle Peninsula, Co. Kerry, Ireland.webm", "480p", "CC BY-SA 4.0", "Maoileann"],
    ["kitesurf", "Kite surfing at Viganj 163559 1.webm", "480p", "CC BY-SA 4.0", "Quahadi"],
    ["dunk", "Dunk in Serie A Basket.ogg", "480p", "CC BY-SA 4.0", "Francesco Canu"],
    ["football", "Latvia-Gibraltar football 2026-03-31.webm", "480p", "CC0", "Mārtiņš Bruņenieks"],
    ["cycling", "Zottegem - Grote Prijs Stad Zottegem, 19 augustus 2014 (C19A).ogv", "480p", "CC BY-SA 3.0", "Jérémy-Günther-Heinz Jähnick"],
    ["turf-football", "Turf Football Matches Held at Bali Arcade in Chittagong.webm", "orig", "CC BY-SA 4.0", "Owais Al Qarni"],
  ],
  festival: [
    ["lanterns", "Nagasaki lantern festival - 2023 1 28.webm", "480p", "CC BY-SA 4.0", "Nesnad"],
    ["lion-dance", "Danses del Lleó i del Drac.webm", "480p", "CC BY-SA 4.0", "Francesc Fort"],
    ["fireworks", "Close-up fireworks during Lunar New Year celebration in Zhongshan, China, 2026.webm", "480p", "CC BY 4.0", "JaydenChao"],
    ["shishimai", "Shishimai - Japanese Lion Dance - Hachijoji matsuri - 2015 8 8.webm", "480p", "CC BY-SA 4.0", "Nesnad"],
    ["carnival", "Desfile del Carnaval de Mazatlán, 13 de febrero de 2024 18.webm", "480p", "CC BY-SA 4.0", "DogeGamer2015MZT"],
    ["sky-lanterns", "Releasing sky lanterns at the CAD Khomloy Sky Lantern Festival.webm", "orig", "CC BY 4.0", "ManoiCMU"],
  ],
  travel: [
    ["nathu-la", "Mountain Landscape near Nathu La Pass, Sikkim.webm", "orig", "CC BY-SA 4.0", "Rajani Gairshail"],
    ["tsongmo-lake", "Tsongmo Lake, Sikkim, 2026.webm", "orig", "CC BY-SA 4.0", "Rajani Gairshail"],
    ["syratu-falls", "Cascade de Syratu.webm", "orig", "CC BY 4.0", "Arie m den toom"],
    ["rye-beach", "RyeTownBeach.webm", "orig", "CC BY-SA 4.0", "GaoKyle"],
    ["backwaters", "Maradu Backwaters.webm", "orig", "CC0", "SarthakSingh2904"],
    ["shimla-sunset", "A sunset in Shimla hills.webm", "orig", "CC BY-SA 4.0", "Mbatman99"],
    ["delaneys-falls", "Delaneys Falls.webm", "1080p", "CC0", "Psypherium"],
  ]
}).map(([k, v]) => [k, v.map(commons)])) };

export async function fetchFootage(dir, set = FOOTAGE) {
  mkdirSync(dir, { recursive: true });
  for (const f of set) {
    const file = join(dir, `${f.name}.webm`);
    if (existsSync(file)) continue;
    const r = await fetch(f.url, { headers: { "User-Agent": "ForsionVideoStudio-verify/1.0 (https://forsion.net)" } });
    if (!r.ok) throw new Error(`${f.name}: ${r.status} ${f.url}`);
    writeFileSync(`${file}.part`, Buffer.from(await r.arrayBuffer())); renameSync(`${file}.part`, file); // runs side by side never read half a file
  }
  writeFileSync(join(dir, "CREDITS.md"), set.map(f => `- ${f.name}.webm — ${f.title}, ${f.author}, ${f.license}, ${f.page}`).join("\n") + "\n");
  return dir;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const repo = resolve(dirname(fileURLToPath(import.meta.url)), "../.."), name = process.argv[2] || "city";
  if (!SETS[name]) throw new Error(`no footage set ${name} (${Object.keys(SETS).join(", ")})`);
  console.log(await fetchFootage(resolve(process.argv[3] || join(repo, `artifacts/footage/${name}`)), SETS[name]));
}
