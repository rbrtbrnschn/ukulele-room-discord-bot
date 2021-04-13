export interface ChordProgression {
  title: string;
  chords: string[];
  tutorial?: string;
  strummingPatterns?: string[];
  createdBy: string;
}
const progressions: ChordProgression[] = [
  {
    title: "",
    chords: ["Dm", "Gm", "A", "F", "Bb", "E7", "A"],
    createdBy: "rbrtbrnschn",
  },
  {
    title: "La Bamba",
    chords: ["C", "F", "G7"],
    tutorial: "https://www.youtube.com/watch?v=jR7FAlyJvJc",
    createdBy: "rbrtbrnschn",
  },
  { title: "", chords: ["C", "G", "A", "F"], createdBy: "rbrtbrnschn" },
  {
    title: "Sweet Home Alabama",
    chords: ["D", "C", "G"],
    tutorial: "https://www.youtube.com/watch?v=54N9kFavhy4",
    createdBy: "rbrtbrnschn",
  },
  {
    title: "Hit the road jack",
    chords: ["A", "G", "F", "E7"],
    tutorial: "https://www.youtube.com/watch?v=59ctVjOHa5k",
    createdBy: "rbrtbrnschn",
  },
  {
    title: "",
    chords: ["C", "A7", "D7", "G", "C"],
    createdBy: "rbrtbrnschn",
  },
  {
    title: "",
    chords: ["C", "A7", "D7", "G", "C"],
    createdBy: "rbrtbrnschn",
  },
  {
    title: "",
    chords: ["C", "A7", "D7", "G", "C"],
    createdBy: "rbrtbrnschn",
  },
  {
    title: "",
    chords: ["C", "A7", "D7", "G", "C"],
    createdBy: "rbrtbrnschn",
  },
  {
    title: "",
    chords: ["C", "A7", "D7", "G", "C"],
    createdBy: "rbrtbrnschn",
  },
  {
    title: "",
    chords: ["C", "A7", "D7", "G", "C"],
    createdBy: "rbrtbrnschn",
  },
  {
    title: "",
    chords: ["C", "A7", "D7", "G", "C"],
    createdBy: "rbrtbrnschn",
  },
  {
    title: "",
    chords: ["C", "A7", "D7", "G", "C"],
    createdBy: "rbrtbrnschn",
  },
  {
    title: "",
    chords: ["C", "A7", "D7", "G", "C"],
    createdBy: "rbrtbrnschn",
  },
];

export function getProgressions() {
  return progressions;
}

export function addProgression(progression: ChordProgression) {
  progressions.push(progression);
  return progression;
}

export function getProgression(title: string) {
  if (!title) return null;
  const progression = progressions.find((prog) =>
    prog.title.toLowerCase().includes(title.toLowerCase())
  );
  if (!progressions) return null;
  return progression;
}
