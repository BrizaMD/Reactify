import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './components/Home';
import MusicPlayer from './components/musicPlayer/MusicPlayer';
import NavBar from './components/navBar/NavBar.js';
import Footer from './components/footer/Footer.js';
import BandDetail from './components/bandDetail/BandDetail';
import EventsList from './components/Event/EventsList';

import './custom.css'
import TrackList from "./components/trackList/TrackList";
/* ToDo:
 * 1, Don't send setState down to child
 * 2, refactor Route
 * 3, refactor useHistory
 * 4, create moduls folder
 * 
 * components 
 * good that we have separate folder for them with css
 * should use index.js to export
 * bandDetail folder should have bandDetail component as exported (same name)
 * /components
    /bandDetail
    index.js
    /bandDetail
       index.js

    import bandDetail from './bandDetail'
    export default bandDetail

    import { bandDetail } from './components/bandDetail'
    
    next to components folder: moduls folder
        moduls: the js files in moduls will be rendered via Router - we see what needs to be rendered in top level
        components: general components, not rendered via Router
        use capital letter if: top level component
        
        Player and Playercontrols can be in models as well, not just top level ones, 
            so subcomponents can be in models if they are not used in somewhere else just in their parent
        footer, navber etc can remain in components
        components in moduls are independent
        
        folder name of modul - capital letter, they are used in Routes
        
        React lazy loader - Give Route lazy loaded component
            components will be loaded in the background
            if the component is big and user will not see first just later - it helps performance*/
function App() {
    return (
        <Router>
            <NavBar/>
            <Switch>
                <Route path="/" exact>
                    <Home/>
                </Route>

                <Route path="/player" exact>
                    <MusicPlayer/>
                </Route>
                <Route path='/search-band' exact>
                    <BandDetail/>
                </Route>

                <Route path="/events" exact>
                    <EventsList/>
                </Route>
                {/*same route as in track using component*/}
                <Route path="/track/:track" component={TrackList}/>
  
            </Switch>
            <Footer/>
        </Router>
    );
}

export default App;