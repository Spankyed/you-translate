import { h, app } from 'hyperapp'
import { location, Route,  Switch} from "@hyperapp/router"

import Home from './pages/home'
import Translation from './pages/translation'

//import actions from './actions'
//import state from './state'
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
