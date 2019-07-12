import { h } from 'hyperapp'
import translate from '../utils/translate'

export default {
  state: {
    //player: null,
    caption: 0,
    captions: [],
    translations: [],
    loading: false,
    error: { caught: false}
  },
  actions: {
    load: (evt) => state => ({ loading: !state.loading }),
    //setPlayer: (player) => state => ({ player: player }),
    setCaption: (caption) => state => ({ caption: caption }),
    setCaptions: (captions) => state => ({ captions: captions }),
    setTranslations: (translations) => state => ({ translations: translations }),
    setError: (error) => state => ({ error: error })
  },
  view: (state, actions) => ({match}) => {

    let video_id = match.params.video_id
    let lang_id = match.params.lang_id

    const init = () => {
      actions.load()

      // MOCK DATA
      /*let translations = new Promise(function(resolve, reject) {
        resolve({
          captions:[{ "start": "242.05","dur": "4.29", "text": "more important than ever so please if"},  { "start": "244.63","dur": "3.78", "text": "you haven't already turned those"},  { "start": "246.34","dur": "4.44", "text": "notifications on to make sure you're"},  { "start": "248.41","dur": "5.13", "text": "notified the moment my video goes live"},  { "start": "250.78","dur": "5.28", "text": "making videos is what I love to do it's"},  { "start": "253.54","dur": "4.319", "text": "my dream and my passion however it does"},  { "start": "256.06","dur": "3.989", "text": "cost time and money to produce this"},  { "start": "257.859","dur": "4.501", "text": "content so if you have a dollar to spare"},  { "start": "260.049","dur": "4.741", "text": "to support me on patreon in exchange for"},  { "start": "262.36","dur": "4.77", "text": "some exclusive unseen content then you"},  { "start": "264.79","dur": "4.65", "text": "can click the patreon link below or at"},  { "start": "267.13","dur": "4.38", "text": "the end of this video please only"},  { "start": "269.44","dur": "3.93", "text": "support me if you can't afford it and"},  { "start": "271.51","dur": "4.62", "text": "make sure to follow me on instagram at"},  { "start": "273.37","dur": "4.65", "text": "insa Dean J and on Twitter at Potter"},  { "start": "276.13","dur": "3.78", "text": "folklore check out my other videos"},  { "start": "278.02","dur": "4.26", "text": "appearing on screen and please make sure"},  { "start": "279.91","dur": "4.59", "text": "most importantly to hit that subscribe"},  { "start": "282.28","dur": "5.3", "text": "button thanks again everyone and please"},  { "start": "284.5", "dur": "3.08","text": "have a great day"}],
          translations:[{ "start": "242.05","dur": "4.29", "translatedText": "more important than ever so please if"},  { "start": "244.63","dur": "3.78", "translatedText": "you haven't already turned those"},  { "start": "246.34","dur": "4.44", "translatedText": "notifications on to make sure you're"},  { "start": "248.41","dur": "5.13", "translatedText": "notified the moment my video goes live"},  { "start": "250.78","dur": "5.28", "translatedText": "making videos is what I love to do it's"},  { "start": "253.54","dur": "4.319", "translatedText": "my dream and my passion however it does"},  { "start": "256.06","dur": "3.989", "translatedText": "cost time and money to produce this"},  { "start": "257.859","dur": "4.501", "translatedText": "content so if you have a dollar to spare"},  { "start": "260.049","dur": "4.741", "translatedText": "to support me on patreon in exchange for"},  { "start": "262.36","dur": "4.77", "translatedText": "some exclusive unseen content then you"},  { "start": "264.79","dur": "4.65", "translatedText": "can click the patreon link below or at"},  { "start": "267.13","dur": "4.38", "translatedText": "the end of this video please only"},  { "start": "269.44","dur": "3.93", "translatedText": "support me if you can't afford it and"},  { "start": "271.51","dur": "4.62", "translatedText": "make sure to follow me on instagram at"},  { "start": "273.37","dur": "4.65", "translatedText": "insa Dean J and on Twitter at Potter"},  { "start": "276.13","dur": "3.78", "translatedText": "folklore check out my other videos"},  { "start": "278.02","dur": "4.26", "translatedText": "appearing on screen and please make sure"},  { "start": "279.91","dur": "4.59", "translatedText": "most importantly to hit that subscribe"},  { "start": "282.28","dur": "5.3", "translatedText": "button thanks again everyone and please"},  { "start": "284.5", "dur": "3.08","translatedText": "have a great day"}],
        
        });
      });*/

      let translations = translate(video_id, lang_id, actions.setCaptions)

      translations.then(function(resp) {
        //console.log(resp)
        actions.setCaptions(resp.captions)
        actions.setTranslations(resp.translations)
        actions.load()
        setTimeout(()=>{
          loadPlayer()
          updateScroll(resp, actions)
        }, 0)
        
      }).catch(function(error) {
        actions.setError({ caught: true, message: error.message })
        setTimeout(()=>{ window.location.pathname = '/' }, 3000)
      });   

      function loadPlayer () {
        window.player = new YT.Player('video-trans', {
          width: 854,
          height: 480,
          videoId: video_id,
          playerVars: {
            color: 'white',
            autoplay : 1 , 
            controls : 0 
          },
          events: {
            'onReady': onPlayerReady
          }

        });  
        function onPlayerReady(event) {
            player.mute();
            //actions.load()
        }
        //actions.setPlayer(player)
      }
    }

    const seek = (index, state) => (e) => {
      let time = state.captions[index].start
      player.seekTo(parseFloat(time));
    }

    return (  
      <div class="container w-full mx-auto pt-2 justify-center">
          {
            state.error.caught ?
            (
            <div class="bg-red-600 w-2/6 mx-auto text-white flex">
              <i class="fas fa-exclamation-circle inline fa-3x pl-4 flex-1 m-2"></i>
              <div class=" font-serif text-center inline flex m-auto mr-4">
                  <h1 class="font-light"> {state.error.message}</h1>  
              </div>
            </div>
            ) : ('')          
          }
          {
            state.loading ?
            (
              <section class="yt-translation my-20 px-2 flex justify-center flex-wrap">
                <div>
                  <span><i class="fas fa-spinner fa-spin fa-10x text-red-600"></i></span>
                  <div><h1 class="inline-block pt-10">T R A N S L A T I N G . . .</h1></div>       
                </div>
              </section>

            ) :
            (
              <section class="yt-translation my-20 bg-gray-200 flex justify-center flex-wrap shadow-lg">
                <div id="video-trans" oncreate= {init} class="flex px-2 bg-grey-700"></div>

                <div class="flex-1 max-w-3xl rounded overflow-y-scroll" style="height: 480px;">
                  <a href="https://translate.google.com">
                    <img src="/transby.png" class="mx-auto pt-3" style="max-height:35px;"/>
                  </a>
                  <div class="border-b-2 my-2"></div>
                  <div id="captions" class="py-1" lang="fr-x-mtfrom-en">
                  {
                    state.translations.map((translation, index) => (
                      <p id={index} onclick={seek(index, state)} class={`px-4 py-1 ${state.caption == index ? 'bg-yellow-300' : ''} hover:bg-blue-300 cursor-pointer`}>{translation.translatedText}</p>
                    ))

                  }
                  </div>

                </div>
              </section>
            )
          }
      </div>
    )  
  }
  
}

function updateScroll({captions},{setCaption}) {
  let start = 0
  let last = 0
  const update = (now) => {
      let msElapsed = now - start
     
      if (!last || now - last >= 1000) {

        if (player && player.getCurrentTime){
          
          let time = player.getCurrentTime()
          
          let index = getCaptionIndex(time, captions)
          let id = index.toString()
          let el = document.getElementById(id)
          if(el) el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
          last = now;
          //console.log(time, captions, index)
          setCaption(index)
        }      
      }
      requestAnimationFrame(update);
  }
  update(start)
}

function getCaptionIndex(time, captions) {
  let index = captions.findIndex((caption) => {
      return parseFloat(caption.start) >= time
  })
  return index
}