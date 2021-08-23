interface IScale {
  name: string;
  aliases: string[];
  formula?: string;
  example?: string;
}
export const AllScales: IScale[] = [
  {
    name: "Major",
    aliases: [],
    formula: "1 2 3 4 5 6 7",
    example: "C D E F G A B",
  },
  {
    name: "Minor",
    aliases: [],
    formula: "1 2 b3 4 5 b6 b7",
    example: "C D Eb F G Ab Bb",
  },
  {
    name: "Minor Pentatonic",
    aliases: ["minorp"],
    formula: "1 b3 4 5 b7",
    example: "C Eb F G Bb",
  },
  {
    name: "Major Pentatonic",
    aliases: ["majorp"],
    formula: "1 2 3 5 6",
    example: "C D E G A",
  },
  {
    name: "Blues",
    aliases: [],
    formula: "1 b3 4 b5 5 b7",
    example: "C Eb F Gb G Bb",
  },
  {
    name: "Harmonic Minor",
    aliases: ["minorh"],
    formula: "1 2 b3 4 5 b6 7",
    example: "C D Eb F G Ab B",
  },
  {
    name: "Melodic Minor",
    aliases: ["minorm"],
    formula: "1 2 b3 4 5 6 7",
    example: "C D Eb F G A B",
  },
  {
    name: "Ionian",
    aliases: [],
    formula: "1 2 3 4 5 6 7",
    example: "C D E F G A B",
  },
  {
    name: "Dorian",
    aliases: [],
    formula: "1 2 b3 4 5 6 b7",
    example: "C D Eb F G A Bb",
  },
  {
    name: "Phrygian",
    aliases: [],
    formula: "1 b2 b3 4 5 b6 b7",
    example: "C Db Eb F G Ab Bb",
  },
  {
    name: "Lydian",
    aliases: [],
    formula: "1 2 3 #4 5 6 7",
    example: "C D E F# G A B",
  },
  {
    name: "Mixolydian",
    aliases: [],
    formula: "1 2 3 4 5 6 b7",
    example: "C D E F G A Bb",
  },
  {
    name: "Aeolian",
    aliases: [],
    formula: "1 2 b3 4 5 b6 b7",
    example: "C D Eb F G Ab Bb",
  },
  {
    name: "Locrian",
    aliases: [],
    formula: "1 b2 b3 4 b5 b6 b7",
    example: "C Db Eb F Gb Ab Bb",
  },
  {
    name: "Whole tone",
    aliases: [],
    formula: "1 2 3 #4 #5 b7",
    example: "C D E F# G# Bb",
  },
  {
    name: "Whole-Half Diminished",
    aliases: [],
    formula: "1 2 b3 4 b5 b6 6 7",
    example: "C D Eb F Gb Ab A B",
  },
  {
    name: "Half-Whole Diminished",
    aliases: [],
    formula: "1 b2 b3 3 b5 5 6 b7",
    example: "C Db Eb E F# G A Bb",
  },
];

export const Scales = [...AllScales].slice(0, 5);
export const Modes = [...AllScales].slice(5, AllScales.length);
