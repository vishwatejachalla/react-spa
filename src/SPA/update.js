import React from 'react';
import axios from 'axios';
import Display from './display';

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
        // this.receiveIdAndEdit = this.receiveIdAndEdit.bind(this)
        this.getNameUpdate = this.getNameUpdate.bind(this)
        this.getLocationUpdate = this.getLocationUpdate.bind(this)
        this.updateFriend = this.updateFriend.bind(this)
        // this.getFriendWithId = this.getFriendWithId.bind(this)
        <Display ></Display>
            console.log("Get friend with ID: " + this.new);
            axios.get('http://localhost:3001/data/' +this.new )
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
    // receiveIdAndEdit = function (receivedID) {
    //     console.log("Edit with ID: " + receivedID);
    //     //get the friend detail for receivedId
    //     this.getFriendWithId(receivedID)

    // }

    // getFriendWithId = function () {
    //     console.log("Get friend with ID: " + this.props.updateid);
    //     axios.get('http://localhost:3001/data/' + this.props.updateid)
    //         .then(res => {
    //             console.log(res);
    //             console.log(res.data);
    //             this.setState({
    //                 updatename: res.data.name,
    //                 updatelocation: res.data.location,
    //                 updateid: res.data.id
    //             })
    //         }, err => {
    //             console.log(err);
    //         })
    // }
    
    updateFriend = function () {
        console.log("Update Friend With ID: " + this.state.updateid);

        if (!(this.state.updatename === '') && !(this.state.updatelocation === '')) {
            var updatefriendJson = {
                "name": this.state.updatename,
                "location": this.state.updatelocation,
            }

            axios.put('http://localhost:3001/data/' + this.state.updateid, updatefriendJson)
                .then(res => {
                    console.log("Friend Updated!");
                    this.setState({
                        updatename: '',
                        updatelocation: '',
                        updateid: 0
                    })
                    console.log(res);
                    console.log(res.data);
                }, err => {
                    console.log(err);
                })
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
                
                <legend>Update Friend</legend>
                         Id:         <input type="text"
                    value={this.state.updateid}
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