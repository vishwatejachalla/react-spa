import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Add from "../add";
import Display from "../display";
import Update from "../update";

class Menu extends React.Component {

    render() {
        return (
            <span>
                <Switch>
                    <Route exact path="/" component={Display}></Route>
                    <Route path="/add" component={Add}></Route>
                    <Route path="/update" component={Update}></Route>
                </Switch>
                <ul>
                    <li><Link to="/">Display</Link></li>
                    <li><Link to="/add">Add</Link></li>
                    <li><Link to="/update">Update</Link></li>
                    {/* <li><a href="/display">Display</a></li>
                    <li><a href="/add">Add</a></li>
                    <li><a href="/update">Update</a></li> */}
                </ul>
            </span>
        );
    }
}

export default Menu;