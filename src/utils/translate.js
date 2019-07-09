
import he from 'he'
import axios from 'axios'
import { find } from 'lodash'
import striptags from 'striptags'

// https://console.developers.google.com/apis/credentials
const apiKey = "AIzaSyCGKUu-Y4RWferkyq3jrIaQPn9IqYm0A1k";

export default function (videoId, target, setCaptions){
  let timedText;

  let subs = getSubtitles({
    videoID: videoId, // youtube video id
    lang: 'en' // default: `en`
  }).then(captions => {
    setCaptions(captions)

    timedText = captions.map((caption)=>{
      return caption.text
    })
    //console.log(text)
    let data = {
      captions: timedText,
      source: 'en',
      target: target
    }

    return makeApiRequest(data)
  
  });

  return subs
}

async function getSubtitles({videoID, lang = 'en'}) {
  //
  // `https://cors-anywhere.herokuapp.com/https://youtube.com/get_video_info?video_id=${videoID}`
  const { data } = await axios.get(
    `https://cors-anywhere.herokuapp.com/https://youtube.com/get_video_info?video_id=${videoID}`
  );

  const decodedData = decodeURIComponent(data);
  //console.log(decodedData)
  // * ensure we have access to captions data
  if (!decodedData.includes('captionTracks'))
    throw new Error(`Could not find captions for video: ${videoID}`);

  const regex = /({"captionTracks":.*isTranslatable":(true|false)}])/;
  const [match] = regex.exec(decodedData);
  const { captionTracks } = JSON.parse(`${match}}`);

  const subtitle =
    find(captionTracks, {
      vssId: `.${lang}`,
    }) ||
    find(captionTracks, {
      vssId: `a.${lang}`,
    }) ||
    find(captionTracks, ({ vssId }) => vssId && vssId.match(`.${lang}`));

  // * ensure we have found the correct subtitle lang
  if (!subtitle || (subtitle && !subtitle.baseUrl))
    throw new Error(`Could not find ${lang} captions for ${videoID}`);

  const { data: transcript } = await axios.get(subtitle.baseUrl);
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

    console.log('lines',lines)

  return lines;
}

function makeApiRequest(data) {
  
  let url = "https://www.googleapis.com/language/translate/v2/";
  url += "?key=" + apiKey;
  url += data.captions.map((caption) => "&q=" + encodeURI(caption)).join("")
  url += "&target=" + data.target;
  url += "&source=" + data.source;

  // Return response from API
  return fetch(url, JSON.stringify(data))
}

function fetch(url, text) {
  const send = (url, message, options = {method:'GET'}) => new Promise((resolve, reject) => {
    let http = new XMLHttpRequest();  
    http.onload = () => resolve(JSON.parse(http.responseText));  
    http.onerror = () => reject(JSON.parse(http.responseText));
    http.open(options.method, url, true);  
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
      if (http.readyState === XMLHttpRequest.DONE && http.status === 200 && http.responseText) {
        //console.log(http.responseText)
      } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200) {
        console.error(http.responseText)
      }
    };
    
    http.send(message);
  });

  if (Object.getOwnPropertyNames(text).length !== 0) return send(url, text) //send request
}


/*function getLanguageNames() {
  return $.getJSON("https://api.myjson.com/bins/155kj1");
}

$(function() {
  window.makeApiRequest = makeApiRequest;
  getLanguages();

  $(document)

    .on("click", "button.translate", function() {
      data = {
        source: $(".source-lang").val(),
        target: $(".target-lang").val(),
        text: $("textarea").val()
      };

      if (data.targetLang !== null) {
        translate(data);
      } else {
        alert("Please select a target language");
      }
    })
});
*/