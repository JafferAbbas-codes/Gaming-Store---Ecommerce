import React from "react";
import { Switch, Route,  withRouter, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import OurProducts from "./OurProducts";
import Mouse from "./Mouse";
import Keyboard from "./Keyboard";
import Footer from "./Footer"
import Mousepad from "./Mousepad";
import Cart from "./Cart";
import PrivateRoute from "../PrivateRoute";



function Main() {

    return (
      <BrowserRouter>
      <div>
        <Header />
        <Switch >
          <Route exact path="/" component={Home} />
          <Route exact path='/products' component={OurProducts}/>
          <Route exact path='/mouse' component={Mouse}/>
          <Route exact path='/keyboard' component={Keyboard}/>
          <Route exact path='/mousepad' component={Mousepad}/>
          <Route exact path='/cart' component={Cart}/>
        </Switch>
       <Footer/>
      </div>
      </BrowserRouter>
    );
}

export default withRouter(Main);
