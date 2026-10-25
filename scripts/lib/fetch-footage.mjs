// Real footage for scripts/verify-edit-live.mjs: seven Wikimedia Commons clips (480p VP9 transcodes, ~26 MB), each
// under the licence listed (CC0 / CC BY / CC BY-SA: credit the author when a cut made from them is shared). Not in
// the repository; fetched once into a folder and reused.
//   node scripts/lib/fetch-footage.mjs [dir]     (default artifacts/footage/city)
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
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

export async function fetchFootage(dir) {
  mkdirSync(dir, { recursive: true });
  for (const f of FOOTAGE) {
    const file = join(dir, `${f.name}.webm`);
    if (existsSync(file)) continue;
    const r = await fetch(f.url, { headers: { "User-Agent": "ForsionVideoStudio-verify/1.0 (https://forsion.net)" } });
    if (!r.ok) throw new Error(`${f.name}: ${r.status} ${f.url}`);
    writeFileSync(file, Buffer.from(await r.arrayBuffer()));
  }
  writeFileSync(join(dir, "CREDITS.md"), FOOTAGE.map(f => `- ${f.name}.webm — ${f.title}, ${f.author}, ${f.license}, ${f.page}`).join("\n") + "\n");
  return dir;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const repo = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
  console.log(await fetchFootage(resolve(process.argv[2] || join(repo, "artifacts/footage/city"))));
}
