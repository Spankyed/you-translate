
import he from 'he'
import axios from 'axios'
import { find } from 'lodash'
import striptags from 'striptags'

// https://console.developers.google.com/apis/credentials
const apiKey = '';

export default async function (videoId, target){
  let data;

  let {data: {data: {translations}}} = await getCaptions({videoId: videoId, lang: 'en'}).then(timedText => {
    data = {
      captions: timedText,
      source: 'en',
      target: target
    }

    let captions = timedText.map((caption)=>{
      return caption.text
    })

    let url = "https://www.googleapis.com/language/translate/v2/";
    url += "?key=" + apiKey;
    url += captions.map((caption) => "&q=" + encodeURI(caption)).join("")
    url += "&target=" + data.target;
    url += "&source=" + data.source;

    return axios.get(url)
  
  });
  /*
  if (!translations.includes('translationsText'))
    throw new Error(`Could not get translations for video: ${videoId}`);
  */
  data.translations = translations

  console.log('Recieved captions & translations ', translations)

  return data
}

async function getCaptions({videoId, lang = 'en'}) {
  // `https://cors-anywhere.herokuapp.com/https://youtube.com/get_video_info?video_id=${videoId}`

  const { data } = await axios.get(`https://intense-river-58574.herokuapp.com/https://youtube.com/get_video_info?video_id=${videoId}`)
  
  const decodedData = decodeURIComponent(data);

  // * ensure we have access to captions data
  if (!decodedData.includes('captionTracks'))
    throw new Error(`Could not find captions for video: ${videoId}`);

  const regex = /({"captionTracks":.*isTranslatable":(true|false)}])/;
  const [match] = regex.exec(decodedData);
  const { captionTracks } = JSON.parse(`${match}}`);
  
  const captions =
    find(captionTracks, { vssId: `.${lang}`}) 
    ||
    find(captionTracks, { vssId: `a.${lang}`}) 
    ||
    find(captionTracks, ({ vssId }) => vssId && vssId.match(`.${lang}`));

  // * ensure we have found the correct captions language
  if (!captions || (captions && !captions.baseUrl))
    throw new Error(`Could not find ${lang} captions for ${videoId}`);

  const { data: transcript } = await axios.get(captions.baseUrl);
  const lines = transcript
    .replace('<?xml version="1.0" encoding="utf-8" ?><transcript>', '')
    .replace('</transcript>', '')
    .split('</text>')
    .filter(line => line && line.trim())
    .map(line => {
      const startRegex = /start="([\d.]+)"/;
      const durRegex = /dur="([\d.]+)"/;

      const [, start] = startRegex.exec(line);
      const [, dur] = durRegex.exec(line);

      const htmlText = line
        .replace(/<text.+>/, '')
        .replace(/&amp;/gi, '&')
        .replace(/<\/?[^>]+(>|$)/g, '');

      const decodedText = he.decode(htmlText);
      const text = striptags(decodedText);

      return {
        start,
        dur,
        text,
      };
    });

  return lines;
}