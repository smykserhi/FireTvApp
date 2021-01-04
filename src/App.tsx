import React from 'react';
import { Switch, Route} from "react-router-dom";
import Home from "./componets/Home"
import LogIn from "./componets/LogIn"
import Upcoming from "./componets/Upcoming"
import MyList from "./componets/MyList"
import NotFound from "./componets/NotFound"
import * as ROUTIES from "./constants"


const  App: React.FC=() =>{    
  return (
    <div>      
      <Switch>        
        <Route exact path={ROUTIES.HOME}> <Home/></Route>
        <Route path={ROUTIES.LOGIN}> <LogIn /></Route>
        <Route path={ROUTIES.UPCOMING}> < Upcoming/></Route>
        <Route path={ROUTIES.MYLIST}> <MyList /></Route>
        <Route > <NotFound /></Route>       
      </Switch>
    </div>
  )
}

export default App;
