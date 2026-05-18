export interface Organisation {
  id: string;
  name: string;
  logo: string; // file under public/images/clubs/
  url: string;
  invert?: boolean; // logo art is white — invert it for display on a white card
}

export const organisations: readonly Organisation[] = [
  {
    id: "stvw",
    name: "STV Wegenstetten",
    logo: "stv-wegenstetten.png",
    url: "https://www.stvwegenstetten.ch/",
  },
  {
    id: "tvz",
    name: "TV Zeiningen",
    logo: "tv-zeiningen.svg",
    url: "https://www.tvzeiningen.ch/",
    invert: true,
  },
  {
    id: "tvh",
    name: "TV Hellikon",
    logo: "tv-hellikon.png",
    url: "https://www.tvhellikon.ch/",
  },
  {
    id: "epcz",
    name: "Einbeiner-Plausch-Club Zeiningen",
    logo: "epcz.jpg",
    url: "https://www.zeiningen.ch/vereinsliste/60331",
  },
];
