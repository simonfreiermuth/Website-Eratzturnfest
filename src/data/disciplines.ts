export type DisciplineCategory =
  | "Leichtathletik"
  | "Fachtest"
  | "Fit + Fun"
  | "Geräteturnen";

export interface Discipline {
  name: string;
  category: DisciplineCategory;
}

// Authoritative spelling — see CLAUDE.md.
// FTA = Fachtest Allround (not "Allgemein"); SSB = Schulstufenbarren.
export const disciplines = {
  SB: { name: "Schleuderball", category: "Leichtathletik" },
  STS: { name: "Steinstossen", category: "Leichtathletik" },
  KUG: { name: "Kugelstossen", category: "Leichtathletik" },
  STH: { name: "Steinheben", category: "Leichtathletik" },
  WU: { name: "Wurf", category: "Leichtathletik" },
  PS80: { name: "Pendelstafette 80 m", category: "Leichtathletik" },
  WE: { name: "Weitsprung", category: "Leichtathletik" },
  FTA1: { name: "Fachtest Allround 1", category: "Fachtest" },
  FTA2: { name: "Fachtest Allround 2", category: "Fachtest" },
  FTU1: { name: "Fachtest Unihockey 1", category: "Fachtest" },
  FTU2: { name: "Fachtest Unihockey 2", category: "Fachtest" },
  FF1A: { name: "Fit + Fun 1A", category: "Fit + Fun" },
  FF1B: { name: "Fit + Fun 1B", category: "Fit + Fun" },
  FF2A: { name: "Fit + Fun 2A", category: "Fit + Fun" },
  FF2B: { name: "Fit + Fun 2B", category: "Fit + Fun" },
  FF3A: { name: "Fit + Fun 3A", category: "Fit + Fun" },
  FF3B: { name: "Fit + Fun 3B", category: "Fit + Fun" },
  SSB: { name: "Schulstufenbarren", category: "Geräteturnen" },
} as const satisfies Record<string, Discipline>;

export type DisciplineId = keyof typeof disciplines;
