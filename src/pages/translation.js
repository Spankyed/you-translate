import { h } from 'hyperapp'
import translate from '../utils/translate'

export default {
  state: {
    player: null,
    captions: [],
    translations: [],
    loading: false
  },
  actions: {
    load: (evt) => state => ({ loading: !state.loading }),
    setPlayer: (player) => state => ({ player: player }),
    setCaptions: (captions) => state => ({ captions: captions }),
    setTranslations: (translations) => state => ({ translations: translations })
  },
  view: (state, actions) => ({match}) => {

    //window.scrollTo(0, 0)

    let video_id = match.params.video_id
    let lang_id = match.params.lang_id

    function init() {

      actions.load()

      let translations =  translate(video_id, lang_id, actions.setCaptions)

      translations.then(function(resp) {
        actions.setTranslations(resp.data.translations)
        //console.log(resp.data.translations[0].translatedText)
      })

      //console.log('trans',translation)

      if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
        window.onYouTubeIframeAPIReady = loadPlayer
      } else {
        loadPlayer();
      }
      function loadPlayer () {

        let player = new YT.Player('video-trans', {
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
            //player.mute();
        }
        //console.log(actions)
        setTimeout(_=>{actions.load()}, 1500)
        
        actions.setPlayer(player)
        //console.log('player',state, actions)
        }
    }

    const seek = (translation, index, state) => (e) => {
      let time = state.captions[index].start
      console.log('time',state,time)
      state.player.seekTo(parseFloat(time));
    }

    return (  
      <div class="container w-full mx-auto pt-24 md:pt-32 justify-center">

          {
            state.loading ?
            (
              <section class="yt-translation py-2 flex justify-center flex-wrap">
                <div>
                  <span><i class="fas fa-spinner fa-spin fa-10x text-red-600"></i></span>
                  <div><h1 class="inline-block pt-10">T R A N S L A T I N G . . .</h1></div>       
                </div>
              </section>

            ) :
            (
              <section class="yt-translation py-2 flex justify-center flex-wrap">
                <div id="video-trans" oncreate= {init} class="flex bg-grey-700"></div>

                <div class="flex-1 max-w-3xl rounded shadow-lg overflow-y-scroll" style="height: 480px;">
                  <h1 class="text-center font-serif text-center p-5">Translated Closed Captions</h1>
                  <div class="border-b-2 m-0"></div>
                  <div id="captions" class="py-1">

                  </div>
                  {
                    state.translations.map((translation, index) => (
                      <p class="px-4 py-1 hover:bg-yellow-300 cursor-pointer" onclick={seek(translation, index, state)}>{translation.translatedText}</p>
                    ))

                  }

                </div>
              </section>

            )
          }
      </div>
    )  
  }
  
}


function onYouTubeIframeAPIReady () { var player ;   
  player = new YT.Player( 'player' , {     videoId : 'M7lc1UVf-VE' ,    
 playerVars : { 'autoplay' : 1 , 'controls' : 0 }})
 player.seekTo(newTime);
}