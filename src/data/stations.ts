export interface Station {
  nr: number;
  name: string;
}

export const stations: readonly Station[] = [
  { nr: 1, name: "Kugel- / Steinstossen" },
  { nr: 2, name: "Pendelstafette" },
  { nr: 3, name: "Weitsprung" },
  { nr: 4, name: "Würfe / Fachtest / Fit + Fun" },
  { nr: 5, name: "Steinheben" },
  { nr: 6, name: "Fachtest / Fit + Fun" },
  { nr: 7, name: "Geräteturnen" },
  { nr: 8, name: "Festwirtschaft & Bar" },
];

export interface InfoMarker {
  /** Visible symbol on the badge (text). */
  symbol: string;
  /** Visual variant — drives the badge colour palette. */
  kind: "medical" | "wc" | "parking";
  /** Legend label. */
  name: string;
}

export const infoMarkers: readonly InfoMarker[] = [
  { symbol: "+", kind: "medical", name: "Sanität" },
  { symbol: "WC", kind: "wc", name: "Toiletten" },
  { symbol: "P", kind: "parking", name: "Parkplatz" },
];
