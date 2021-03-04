import React from 'react';
import { Switch, Route,Redirect } from "react-router-dom";
//import Home from "./componets/Home"
import LogIn from "./componets/LogIn"
import Pages from "./componets/Pages"
import Video from "./componets/Video"
import MyList from "./componets/MyList"
import Search from "./componets/Search"
import Settings from "./componets/Settings"
import NotFound from "./componets/NotFound"
import * as ROUTIES from "./constants"
import styled from 'styled-components';
import {colors } from "./constants"

const AppBox = styled.div`
  background-color: ${colors.bgPrimary};
  color: ${colors.textPrimary}
`
 
const App: React.FC = () => {
  return (
    <AppBox>
      <Switch>
        <Redirect exact from={ROUTIES.ROOT} to={`${ROUTIES.PAGES}/${ROUTIES.HOME}`} />
        <Route path={`${ROUTIES.PAGES}/:id?`}> <Pages /></Route>
        <Route path={ROUTIES.LOGIN}> <LogIn /></Route>
        <Route path={`${ROUTIES.VIDEO}/:id`}> < Video /></Route>
        <Route path={ROUTIES.MYLIST}> <MyList /></Route>
        <Route path={ROUTIES.SEARCH}> <Search /></Route>
        <Route path={ROUTIES.SETTINGS}> <Settings /></Route>
        <Route > <NotFound /></Route>
      </Switch>
    </AppBox>
  )
}

export default App;
