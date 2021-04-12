import axios from "axios";
import { parseStringPromise } from "xml2js";
const { UKULELE_CHORDS_API_KEY } = require("../../config.json");
export interface ChordDto {
  chord: String;
  type: String;
}
export class ChordApi {
  private base: String;
  constructor() {
    this.base = `https://ukulele-chords.com/get?ak=${UKULELE_CHORDS_API_KEY}`;
  }
  forChord(chordDto: ChordDto) {
    const AxiosInstance = axios.create();
    const url = this.base + "&r=" + chordDto.chord + "&typ=" + chordDto.type;
    return AxiosInstance.get(url)
      .then((res) => res.data)
      .then(parseStringPromise)
      .then((js) => js.uc.chord);
  }
}

// const chordApi = new ChordApi();
// chordApi.forChord({ chord: "G", type: "major" });
