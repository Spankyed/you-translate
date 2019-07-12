import { h } from 'hyperapp'
import { location } from "@hyperapp/router"

const Button = ({ lang_list, drop, toggle, filter, validate }) => {

  const submit = (lang) => (e) => {
    e.preventDefault();

    let form = document.getElementById("translate-form")
    
    let url = form.elements["url"].value;

    let parsedUrl = parseUrl(url)

    //form.validate();
    if (parsedUrl.valid){     
      window.location.pathname = `translate/${parsedUrl.video_id}/${lang.val}`; // location.go
    } else {
      validate(url) // set validUrl = false
    }
  }

  return (
    <div class="relative w-40">
        <button class="shadow-md bg-green-600 p-3 text-white w-full" type="button" onclick={toggle}>
          <span class="float-left">Languages</span>

          <svg class="h-4 float-right fill-current text-white" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" enable-background="new 0 0 129 129">
            {
              drop ?
              (
                <g transform="scale(1,-1) translate(0,-130)">
                  <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"></path>
                </g>
              ) :
              (
                <g>
                  <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"></path>
                </g>
              )
            } 
          </svg>
        </button>

        <div class={`${drop ? '' : 'hidden'} shadow-md relative pin-t pin-l`}>
          <input oninput={filter} class="px-4 text-center border-b-1 h-8 w-full" placeholder="Filter.." aria-label="Languages Filter"/>
          <ul class="lang-list list-reset overflow-y-auto">
            {
              lang_list.map((lang)=>(
                <li onclick={submit(lang)} value={lang.val}>
                  <p class="p-2 px-3 text-center block text-black hover:bg-gray-300 cursor-pointer">
                    {lang.text}
                  </p>
                </li> 
              ))
            }

          </ul>
        </div>
    </div>
  )
}

export default {
  state: {
    validUrl: true,
    languages: [ { "val": "af", "text": "Afrikaans" }, { "val": "sq", "text": "Albanian" }, { "val": "am", "text": "Amharic" }, { "val": "ar", "text": "Arabic" }, { "val": "hy", "text": "Armenian" }, { "val": "az", "text": "Azeerbaijani" }, { "val": "eu", "text": "Basque" }, { "val": "be", "text": "Belarusian" }, { "val": "bn", "text": "Bengali" }, { "val": "bs", "text": "Bosnian" }, { "val": "bg", "text": "Bulgarian" }, { "val": "ca", "text": "Catalan" }, { "val": "ceb", "text": "Cebuano" }, { "val": "ny", "text": "Chichewa" }, { "val": "zh", "text": "Chinese (Simplified)" }, { "val": "zh-TW", "text": "Chinese (Traditional)" }, { "val": "co", "text": "Corsican" }, { "val": "hr", "text": "Croatian" }, { "val": "cs", "text": "Czech" }, { "val": "da", "text": "Danish" }, { "val": "nl", "text": "Dutch" }, { "val": "en", "text": "English" }, { "val": "eo", "text": "Esperanto" }, { "val": "et", "text": "Estonian" }, { "val": "tl", "text": "Filipino" }, { "val": "fi", "text": "Finnish" }, { "val": "fr", "text": "French" }, { "val": "fy", "text": "Frisian" }, { "val": "gl", "text": "Galician" }, { "val": "ka", "text": "Georgian" }, { "val": "de", "text": "German" }, { "val": "el", "text": "Greek" }, { "val": "gu", "text": "Gujarati" }, { "val": "ht", "text": "Haitian Creole" }, { "val": "ha", "text": "Hausa" }, { "val": "haw", "text": "Hawaiian" }, { "val": "iw", "text": "Hebrew" }, { "val": "hi", "text": "Hindi" }, { "val": "hmn", "text": "Hmong" }, { "val": "hu", "text": "Hungarian" }, { "val": "is", "text": "Icelandic" }, { "val": "ig", "text": "Igbo" }, { "val": "id", "text": "Indonesian" }, { "val": "ga", "text": "Irish" }, { "val": "it", "text": "Italian" }, { "val": "ja", "text": "Japanese" }, { "val": "jw", "text": "Javanese" }, { "val": "kn", "text": "Kannada" }, { "val": "kk", "text": "Kazakh" }, { "val": "km", "text": "Khmer" }, { "val": "ko", "text": "Korean" }, { "val": "ku", "text": "Kurdish" }, { "val": "ky", "text": "Kyrgyz" }, { "val": "lo", "text": "Lao" }, { "val": "la", "text": "Latin" }, { "val": "lv", "text": "Latvian" }, { "val": "lt", "text": "Lithuanian" }, { "val": "lb", "text": "Luxembourgish" }, { "val": "mk", "text": "Macedonian" }, { "val": "mg", "text": "Malagasy" }, { "val": "ms", "text": "Malay" }, { "val": "ml", "text": "Malayalam" }, { "val": "mt", "text": "Maltese" }, { "val": "mi", "text": "Maori" }, { "val": "mr", "text": "Marathi" }, { "val": "mn", "text": "Mongolian" }, { "val": "my", "text": "Burmese" }, { "val": "ne", "text": "Nepali" }, { "val": "no", "text": "Norwegian" }, { "val": "ps", "text": "Pashto" }, { "val": "fa", "text": "Persian" }, { "val": "pl", "text": "Polish" }, { "val": "pt", "text": "Portuguese" }, { "val": "ma", "text": "Punjabi" }, { "val": "ro", "text": "Romanian" }, { "val": "ru", "text": "Russian" }, { "val": "sm", "text": "Samoan" }, { "val": "gd", "text": "Scots Gaelic" }, { "val": "sr", "text": "Serbian" }, { "val": "st", "text": "Sesotho" }, { "val": "sn", "text": "Shona" }, { "val": "sd", "text": "Sindhi" }, { "val": "si", "text": "Sinhala" }, { "val": "sk", "text": "Slovak" }, { "val": "sl", "text": "Slovenian" }, { "val": "so", "text": "Somali" }, { "val": "es", "text": "Spanish" }, { "val": "su", "text": "Sundanese" }, { "val": "sw", "text": "Swahili" }, { "val": "sv", "text": "Swedish" }, { "val": "tg", "text": "Tajik" }, { "val": "ta", "text": "Tamil" }, { "val": "te", "text": "Telugu" }, { "val": "th", "text": "Thai" }, { "val": "tr", "text": "Turkish" }, { "val": "uk", "text": "Ukrainian" }, { "val": "ur", "text": "Urdu" }, { "val": "uz", "text": "Uzbek" }, { "val": "vi", "text": "Vietnamese" }, { "val": "cy", "text": "Welsh" }, { "val": "xh", "text": "Xhosa" }, { "val": "yi", "text": "Yiddish" }, { "val": "yo", "text": "Yoruba" }, { "val": "zu", "text": "Zulu" } ],
    lang_list: [ { "val": "af", "text": "Afrikaans" }, { "val": "sq", "text": "Albanian" }, { "val": "am", "text": "Amharic" }, { "val": "ar", "text": "Arabic" }, { "val": "hy", "text": "Armenian" }, { "val": "az", "text": "Azeerbaijani" }, { "val": "eu", "text": "Basque" }, { "val": "be", "text": "Belarusian" }, { "val": "bn", "text": "Bengali" }, { "val": "bs", "text": "Bosnian" }, { "val": "bg", "text": "Bulgarian" }, { "val": "ca", "text": "Catalan" }, { "val": "ceb", "text": "Cebuano" }, { "val": "ny", "text": "Chichewa" }, { "val": "zh", "text": "Chinese (Simplified)" }, { "val": "zh-TW", "text": "Chinese (Traditional)" }, { "val": "co", "text": "Corsican" }, { "val": "hr", "text": "Croatian" }, { "val": "cs", "text": "Czech" }, { "val": "da", "text": "Danish" }, { "val": "nl", "text": "Dutch" }, { "val": "en", "text": "English" }, { "val": "eo", "text": "Esperanto" }, { "val": "et", "text": "Estonian" }, { "val": "tl", "text": "Filipino" }, { "val": "fi", "text": "Finnish" }, { "val": "fr", "text": "French" }, { "val": "fy", "text": "Frisian" }, { "val": "gl", "text": "Galician" }, { "val": "ka", "text": "Georgian" }, { "val": "de", "text": "German" }, { "val": "el", "text": "Greek" }, { "val": "gu", "text": "Gujarati" }, { "val": "ht", "text": "Haitian Creole" }, { "val": "ha", "text": "Hausa" }, { "val": "haw", "text": "Hawaiian" }, { "val": "iw", "text": "Hebrew" }, { "val": "hi", "text": "Hindi" }, { "val": "hmn", "text": "Hmong" }, { "val": "hu", "text": "Hungarian" }, { "val": "is", "text": "Icelandic" }, { "val": "ig", "text": "Igbo" }, { "val": "id", "text": "Indonesian" }, { "val": "ga", "text": "Irish" }, { "val": "it", "text": "Italian" }, { "val": "ja", "text": "Japanese" }, { "val": "jw", "text": "Javanese" }, { "val": "kn", "text": "Kannada" }, { "val": "kk", "text": "Kazakh" }, { "val": "km", "text": "Khmer" }, { "val": "ko", "text": "Korean" }, { "val": "ku", "text": "Kurdish" }, { "val": "ky", "text": "Kyrgyz" }, { "val": "lo", "text": "Lao" }, { "val": "la", "text": "Latin" }, { "val": "lv", "text": "Latvian" }, { "val": "lt", "text": "Lithuanian" }, { "val": "lb", "text": "Luxembourgish" }, { "val": "mk", "text": "Macedonian" }, { "val": "mg", "text": "Malagasy" }, { "val": "ms", "text": "Malay" }, { "val": "ml", "text": "Malayalam" }, { "val": "mt", "text": "Maltese" }, { "val": "mi", "text": "Maori" }, { "val": "mr", "text": "Marathi" }, { "val": "mn", "text": "Mongolian" }, { "val": "my", "text": "Burmese" }, { "val": "ne", "text": "Nepali" }, { "val": "no", "text": "Norwegian" }, { "val": "ps", "text": "Pashto" }, { "val": "fa", "text": "Persian" }, { "val": "pl", "text": "Polish" }, { "val": "pt", "text": "Portuguese" }, { "val": "ma", "text": "Punjabi" }, { "val": "ro", "text": "Romanian" }, { "val": "ru", "text": "Russian" }, { "val": "sm", "text": "Samoan" }, { "val": "gd", "text": "Scots Gaelic" }, { "val": "sr", "text": "Serbian" }, { "val": "st", "text": "Sesotho" }, { "val": "sn", "text": "Shona" }, { "val": "sd", "text": "Sindhi" }, { "val": "si", "text": "Sinhala" }, { "val": "sk", "text": "Slovak" }, { "val": "sl", "text": "Slovenian" }, { "val": "so", "text": "Somali" }, { "val": "es", "text": "Spanish" }, { "val": "su", "text": "Sundanese" }, { "val": "sw", "text": "Swahili" }, { "val": "sv", "text": "Swedish" }, { "val": "tg", "text": "Tajik" }, { "val": "ta", "text": "Tamil" }, { "val": "te", "text": "Telugu" }, { "val": "th", "text": "Thai" }, { "val": "tr", "text": "Turkish" }, { "val": "uk", "text": "Ukrainian" }, { "val": "ur", "text": "Urdu" }, { "val": "uz", "text": "Uzbek" }, { "val": "vi", "text": "Vietnamese" }, { "val": "cy", "text": "Welsh" }, { "val": "xh", "text": "Xhosa" }, { "val": "yi", "text": "Yiddish" }, { "val": "yo", "text": "Yoruba" }, { "val": "zu", "text": "Zulu" } ],
    dropdown: false
  },
  actions: {
    validate: (url) => state => ({validUrl: parseUrl(url).valid}),
    toggle: (evt) => state => ({ dropdown: !state.dropdown }),
    filter: (evt) => state => ({ lang_list: state.languages.filter(lang => lang.text.toLowerCase().startsWith(evt.target.value.toLowerCase()))})
  },
  view: (state, actions) => ({match}) => {

    return (  
      <div class="container mx-auto">
        <section class=" leading-tight pt-2 md:pt-4 lg:pt-20 px-4">
          <div class="yt-vid py-2 sm:w-5/6 sm:mx-auto">
            <header class="bg-cyan-300">
              <div class="container">
                  <div class="text-center" style="">
                      <h1 class="inline yt-text-black text-5xl">You </h1>
                      <h1 class="inline yt-bg-red text-gray-100 font-black text-5xl px-3 rounded-lg">Translate</h1>
                      <h2 class="italic text-center mt-5">Translate YouTube Closed Captions</h2>
                  </div>
              </div>
            </header>   
          </div>
          <form action="" id="translate-form" class="w-full mx-auto max-w-3xl pt-6 md:pt-12" onsubmit={ _ => {return false} }>
            <h2 class="font-light text-center px-2" style="font-family:'Segoe UI';">Enter a video URL and select a language</h2>
            <div class="flex py-2 justify-center">
              <span class="w-4/6 pr-2">          
                <input onchange={(e)=> actions.validate(e.target.value)} name="url" class="shadow-md h-10 appearance-none bg-transparent border-2 w-full text-gray-700 mr-3 py-2 px-10 leading-tight focus:outline-none" type="text" placeholder="Video URL" aria-label="Video URL"></input>
                <p class={`${state.validUrl && 'hidden'} ml-5 mt-2 text-xs text-red-500`}>Enter a valid URL (i.e. https://www.youtube.com/watch?v=t580RMh0iTA)</p>
              </span>
              <Button langs={state.languages} lang_list={state.lang_list} filter={actions.filter} drop={state.dropdown} toggle={actions.toggle} validate={actions.validate}></Button>
            </div>     
          </form>
        </section>
      </div>
    )  
  }
  
}

function parseUrl(url){
  let parse = { valid: false }
  if (url.length > 10){
    if(url.includes('youtube')){
      parse.valid = true
      parse.video_id = url.split("v=")[1];
    }
    else if(url.includes('youtu.be')){
      parse.valid = true
      parse.video_id = url.split("be/")[1];
    }
  }
  return parse
}