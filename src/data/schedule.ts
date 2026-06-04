import type { ClubId } from "./clubs";
import type { DisciplineId } from "./disciplines";

export interface ScheduleEntry {
  clubId: ClubId;
  time: string; // "HH:mm"
  disciplineId: DisciplineId;
}

// Transcribed from assets/Ersatzturnfest Zeitplan pro Verein V2.pdf.
// The "18:00 Turnermenü" row in the source PDF is participant-internal
// and is intentionally omitted here (see CLAUDE.md).
export const schedule: readonly ScheduleEntry[] = [
  // TV Zeiningen
  { clubId: "tvz", time: "12:24", disciplineId: "SB" },
  { clubId: "tvz", time: "13:18", disciplineId: "STS" },
  { clubId: "tvz", time: "14:18", disciplineId: "PS80" },
  { clubId: "tvz", time: "14:48", disciplineId: "WE" },
  { clubId: "tvz", time: "15:30", disciplineId: "FTA1" },
  { clubId: "tvz", time: "16:18", disciplineId: "FTA2" },
  { clubId: "tvz", time: "16:42", disciplineId: "FTU1" },
  { clubId: "tvz", time: "17:12", disciplineId: "FTU2" },

  // MR Zeiningen
  { clubId: "mrz", time: "12:12", disciplineId: "SB" },
  { clubId: "mrz", time: "13:06", disciplineId: "STS" },
  { clubId: "mrz", time: "13:48", disciplineId: "KUG" },
  { clubId: "mrz", time: "14:30", disciplineId: "PS80" },
  { clubId: "mrz", time: "16:00", disciplineId: "FF2A" },
  { clubId: "mrz", time: "16:42", disciplineId: "FF2B" },

  // FR Zeiningen
  { clubId: "frz", time: "12:36", disciplineId: "SB" },
  { clubId: "frz", time: "13:30", disciplineId: "STS" },
  { clubId: "frz", time: "16:06", disciplineId: "FF2A" },
  { clubId: "frz", time: "16:36", disciplineId: "FF2B" },

  // STV Wegenstetten
  { clubId: "stvw", time: "12:24", disciplineId: "STH" },
  { clubId: "stvw", time: "13:00", disciplineId: "WU" },
  { clubId: "stvw", time: "14:18", disciplineId: "PS80" },
  { clubId: "stvw", time: "15:00", disciplineId: "WE" },
  { clubId: "stvw", time: "15:36", disciplineId: "FTA1" },
  { clubId: "stvw", time: "16:24", disciplineId: "FTA2" },
  { clubId: "stvw", time: "16:54", disciplineId: "FTU1" },
  { clubId: "stvw", time: "17:18", disciplineId: "FTU2" },

  // FR/MR Wegenstetten
  { clubId: "frmrw", time: "14:18", disciplineId: "FF3A" },
  { clubId: "frmrw", time: "14:30", disciplineId: "FF3B" },
  { clubId: "frmrw", time: "15:12", disciplineId: "FF1A" },
  { clubId: "frmrw", time: "15:36", disciplineId: "FF1B" },
  { clubId: "frmrw", time: "16:12", disciplineId: "FF2A" },
  { clubId: "frmrw", time: "16:30", disciplineId: "FF2B" },

  // TV Hellikon Damen
  { clubId: "tvhd", time: "12:00", disciplineId: "SB" },
  { clubId: "tvhd", time: "13:12", disciplineId: "STS" },
  { clubId: "tvhd", time: "14:00", disciplineId: "KUG" },
  { clubId: "tvhd", time: "15:00", disciplineId: "WE" },
  { clubId: "tvhd", time: "15:54", disciplineId: "FTA1" },
  { clubId: "tvhd", time: "16:30", disciplineId: "FTA2" },

  // TV Hellikon Herren
  { clubId: "tvhh", time: "12:00", disciplineId: "SB" },
  { clubId: "tvhh", time: "12:42", disciplineId: "STH" },
  { clubId: "tvhh", time: "13:24", disciplineId: "STS" },
  { clubId: "tvhh", time: "14:00", disciplineId: "KUG" },
  { clubId: "tvhh", time: "15:18", disciplineId: "FTA1" },
  { clubId: "tvhh", time: "16:12", disciplineId: "FTA2" },

  // MR Hellikon
  { clubId: "mrh", time: "12:00", disciplineId: "STH" },
  { clubId: "mrh", time: "12:48", disciplineId: "SB" },
  { clubId: "mrh", time: "13:54", disciplineId: "KUG" },
  { clubId: "mrh", time: "15:18", disciplineId: "FF1A" },
  { clubId: "mrh", time: "15:42", disciplineId: "FF1B" },
  { clubId: "mrh", time: "16:18", disciplineId: "FF2A" },
  { clubId: "mrh", time: "16:48", disciplineId: "FF2B" },
];

export function entriesForClub(clubId: ClubId): ScheduleEntry[] {
  return schedule.filter((e) => e.clubId === clubId);
}
