import { h } from 'hyperapp'
import { location } from "@hyperapp/router"

const Button = ({ langs, drop, toggle }) => {

  const submit = (lang) => (e) => {
    e.preventDefault();

    //console.log('sel',lang)

    let form = document.getElementById("translate-form")
    //form.validate();
    name = form.elements["url"].value;

    if (name.length < 10){
      alert('Enter valid URL')
      return false
    } else {
      let video_id = name.split("v=")[1];
      window.location.pathname = `translate/${video_id}/${lang.val}`; // location.go
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
        <div class={`${drop ? '' : 'hidden'} shadow-md my-2 relative pin-t pin-l`}>
            <ul class="list-reset">
              <li class="px-2 pb-1"><input class="px-2 text-center border-2 h-8 w-full" placeholder="Filter.." aria-label="Languages Filter"></input><br/></li>
              {
                langs.map((lang)=>(
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
    video: 0,
    languages: [{val:"af", text:"Afrikaans"},{val:"es", text:"Spanish"},{val:"ru", text:"Russian"}],
    dropdown: false
  },
  actions: {
    toggle: (evt) => state => ({ dropdown: !state.dropdown }),
  },
  view: (state, actions) => ({match}) => {

    window.scrollTo(0, 0)
    //var blog = blogs.filter(blog => blog.id == match.params.blog_id )[0]

    return (  
      <div class="container mx-auto min-h-screen">
        <section class=" leading-tight py-6 px-4">
          <div class="yt-vid py-2 sm:w-5/6 sm:mx-auto">
            <header class="bg-cyan-300">
              <div class="container">
                  <div class="font-serif text-center">
                      <h1 class="inline font-serif font-black text-gray-900 text-5xl">You </h1>
                      <h1 class="inline font-serif bg-red-600 text-gray-100 font-black text-5xl px-3 rounded-lg">Translate</h1>
                      <h2 class="italic font-serif text-center mt-5">Translate YouTube Closed Captions</h2>
                  </div>
              </div>
            </header>   
          </div>
          <form action="" id="translate-form" class="w-full mx-auto max-w-3xl py-12" onsubmit={e => {return submit(); } }>
            <h2 class="font-light text-center px-2">Enter a video URL and select a language</h2>
            <div class="flex py-2 justify-center">
              <span class="w-4/6 pr-2">          
                <input name="url" class="shadow-md h-10 appearance-none bg-transparent border-2 w-full text-gray-700 mr-3 py-2 px-10 leading-tight focus:outline-none" type="text" placeholder="Video URL" aria-label="Video URL"></input>
              
              </span>
              {/* onclick */}
              <Button langs={state.languages} drop={state.dropdown} toggle={actions.toggle}></Button>
            </div>
            
          </form>
        </section>


      </div>
    )  
  }
  
}