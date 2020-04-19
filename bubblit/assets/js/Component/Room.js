import React, { Component } from 'react'
import { Divider, Input, Button } from 'semantic-ui-react'
import ChatModule from './ChatModule'

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: 1,
            chatData: '',
        }
    }

    chatRenderer() {
        var i = 0;
        var content = [];
        while (i < this.props.chatDB.length) {
            content.push(
                <p>
                    {this.props.chatDB[i]}
                </p>
            )
            i += 1;
        }
        return content
    }

    render() {
        return (
            <div>
                <h2>Room '{this.props.mode}'</h2>
                <ChatModule
                    chatDB={this.props.chatDB}
                    onClick={this.props.onClick}
                ></ChatModule>
            </div >
        )
    }
}