import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Room from "./Room";
import JoinRoom from './JoinRoom'


function Starting() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/cliconference" exact component={JoinRoom} />
        <Route path="/cliconference/clijoin/:roomID" component={Room} />
      </Switch>
    </BrowserRouter>
  );
}

export default Starting;
