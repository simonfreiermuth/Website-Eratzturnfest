import type { ClubId } from "./clubs";

// Final ranking — transcribed from assets/Rangliste.pdf.
// `note` is the average grade; `einsaetze` is the number of participating
// gymnasts (Einsätze Tu/Ti).
export interface RankingRow {
  rank: number;
  clubId: ClubId;
  note: number;
  einsaetze: number;
}

export const ranking: readonly RankingRow[] = [
  { rank: 1, clubId: "mrh", note: 9.37, einsaetze: 29 },
  { rank: 2, clubId: "mrz", note: 9.07, einsaetze: 34 },
  { rank: 3, clubId: "tvhh", note: 8.82, einsaetze: 22 },
  { rank: 4, clubId: "tvz", note: 8.39, einsaetze: 39 },
  { rank: 5, clubId: "stvw", note: 8.35, einsaetze: 37 },
  { rank: 6, clubId: "tvhd", note: 8.04, einsaetze: 22 },
  { rank: 7, clubId: "frz", note: 7.89, einsaetze: 20 },
  { rank: 8, clubId: "frmrw", note: 7.53, einsaetze: 12 },
];
