export type ClubId =
  | "tvz"
  | "mrz"
  | "frz"
  | "stvw"
  | "frmrw"
  | "tvhd"
  | "tvhh"
  | "mrh";

export interface Club {
  id: ClubId;
  name: string;
}

export const clubs: readonly Club[] = [
  { id: "tvz", name: "TV Zeiningen" },
  { id: "mrz", name: "MR Zeiningen" },
  { id: "frz", name: "FR Zeiningen" },
  { id: "stvw", name: "STV Wegenstetten" },
  { id: "frmrw", name: "FR/MR Wegenstetten" },
  { id: "tvhd", name: "TV Hellikon Damen" },
  { id: "tvhh", name: "TV Hellikon Herren" },
  { id: "mrh", name: "MR Hellikon" },
];
