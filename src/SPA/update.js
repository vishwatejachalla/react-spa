import React from 'react';
import axios from 'axios';
 import { Redirect } from 'react-router-dom';
import Display from "./display";
import { Switch, Route, Link } from "react-router-dom";
// import Display from './display';

class Update extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            name: '',
            location: '',
            updatename: '',
            updatelocation: '',
            updateid: 0
        }
        this.getNameUpdate = this.getNameUpdate.bind(this)
        this.getLocationUpdate = this.getLocationUpdate.bind(this)
        this.updateFriend = this.updateFriend.bind(this)
    }
    componentWillMount() {
        console.log("Get friend with ID: " + this.props.match.params.id);
        axios.get('http://localhost:3001/data/' + this.props.match.params.id)
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({
                    updatename: res.data.name,
                    updatelocation: res.data.location,
                    updateid: res.data.id
                })
            }, err => {
                console.log(err);
            })

    }
    updateFriend = function () {
        console.log("Update Friend With ID: " + this.state.updateid);
        var redirect = true;
        if (!(this.state.updatename === '') && !(this.state.updatelocation === '')) {
            var updatefriendJson = {
                "name": this.state.updatename,
                "location": this.state.updatelocation,
            }
            axios.put('http://localhost:3001/data/' + this.props.match.params.id, updatefriendJson)
                .then(res => {
                    console.log("Friend Updated!");
                    this.setState({
                        updatename: '',
                    });
                    this.setState({ updatelocation: '' });
                    this.setState({ updateid: 0 });
                    console.log(res);
                    console.log(res.data);

                }, err => {
                    console.log(err);
                })
        }
        console.log("Hi"+redirect)
        if (redirect) {
            console.log("Hiiiiiiiii......")
            return <Redirect to="/add"/>
            
        }
    }

    getNameUpdate = function (e) {
        this.setState({ updatename: e.target.value })
    }

    getLocationUpdate = function (e) {
        this.setState({ updatelocation: e.target.value })
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Display}></Route>
                </Switch>
                <legend>Update Friend</legend>
                         Id:         <input type="text"
                    value={this.props.match.params.id}
                    readOnly />
                <br />
                         Name:       <input type="text"
                    value={this.state.updatename}
                    onChange={this.getNameUpdate} />
                <br />
                         Location:   <input type="text"
                    value={this.state.updatelocation}
                    onChange={this.getLocationUpdate} />
                <br />
                <button onClick={this.updateFriend}>Update</button>

            </div>
        );
    }
}

export default Update;