import { h, app } from 'hyperapp'
import { location, Route,  Switch} from "@hyperapp/router"

import Home from './pages/home'
import Translation from './pages/translation'

import './style.css'

const state = {
  home: Home.state,
  translation: Translation.state,
  location: location.state // router module
}

const actions = {
  home: Home.actions,
  translation: Translation.actions,
  location: location.actions // router module
}

const view = (state, actions) => {

  const index = {
    home: Home.view(state.home, actions.home),
    translation: Translation.view(state.translation, actions.translation)
  };
  
  return (
    <div>
      <Switch>    
        <Route path="/" render={ index.home } />   
        <Route path="/translate/:video_id/:lang_id" render={ index.translation } />       
      </Switch>
    </div>

  )
}
app(state, actions, view, document.body)

/**   TODO
 *  move API_KEY to proxy server!
 *  detect original captions language instead of defaulting to english
 *  check if target language == source language
 *  animate error/validation alerts
 *  decode translations to allow 'quotes' and other symbols
 *  disable autoscroll for mobile/small viewports
 *  fix video seek timing issues
 *  combine &q= params in get URL 
 *  send multiple get requests to google for longer videos to avoid 413 network error
 *  resize favicon bigger
 *  ensure correct error messages sent
 */