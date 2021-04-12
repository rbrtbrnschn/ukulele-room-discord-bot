import axios from "axios";
import cheerio from "cheerio";

export interface SongsDto {
  title: String;
  image: String;
  href: String;
  artist: String;
}
export interface ChordsDto {
  chord: String;
}
export class UketabsScraper {
  constructor() {}
  async scrapeSong(url: string): Promise<SongsDto[] | void> {
    const AxiosInstance = axios.create();

    return AxiosInstance.get(url)
      .then((res) => res.data)
      .then((html) => {
        const $ = cheerio.load(html);
        const searchResults: cheerio.Cheerio = $("ul.archivelist");
        const songs = searchResults["0"].children;
        const amountSongs = songs.length;

        if (!amountSongs) return console.log("No songs found");

        const $1 = cheerio.load(searchResults.html());
        const _aTagWithImageResults = $1("li a img");

        const songsDto = _aTagWithImageResults.toArray().map((e, i) => {
          // console.log(
          //   e.parent.prev.prev.prev.prev["children"][0].data
          //     ?.split("\n")[1]
          //     ?.trim()
          // );
          if (e["name"] !== "img") return null;
          const { href, title } = e["parent"]["attribs"];
          const image = e["attribs"].src;
          const artist = e.parent.prev.prev.prev.prev["children"][0].data
            ?.split("\n")[1]
            ?.trim();
          return { title, href, image, artist };
        });
        return songsDto;
      })
      .catch((err) => []);
  }

  scrapeChords(url) {
    const AxiosInstance = axios.create();
    return AxiosInstance.get(url)
      .then((res) => res.data)
      .then((html) => {
        const $ = cheerio.load(html);
        const searchResults: cheerio.Cheerio = $(
          "div.chordsinthissong > div.cits-c-b > img"
        );

        const chords = searchResults.toArray().map((e) => {
          if (e.type !== "tag") return null;
          return { chord: e.attribs["alt"] };
        });
        return chords;
      });
  }

  scrapeLyrics(url) {
    const AxiosInstance = axios.create();
    return AxiosInstance.get(url)
      .then((res) => res.data)
      .then((html) => {
        const $ = cheerio.load(html);
        const searchResults: cheerio.Cheerio = $("#ukutabs-song");
        const tbd = searchResults
          .children()
          .toArray()
          .map((e) => {
            return e.prev?.data || null;
          })
          .filter((e) => e !== null);
        return tbd.join(" ");
      });
  }
}

const uketabs = new UketabsScraper();
// uketabs
//   .scrape(
//     "https://ukutabs.com/?s=somewhere+over+the+rainbow+what+a+wonderfull+world"
//   )
//   .then(console.log);

// uketabs
//   .scrapeChords("https://ukutabs.com/n/nirvana/the-man-who-sold-the-world/")
//   .then(console.log);

// uketabs
//   .scrapeLyrics("https://ukutabs.com/n/nirvana/the-man-who-sold-the-world/")
//   .then(console.log);
