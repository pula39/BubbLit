import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import ChatModule from './ChatModule'
import ShareSpace from './ShareSpace'

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
        // 이부분에 드래그시 크기변경로직 넣을 예정
        var i = 6;
        return (
            <div>
                <h2>Room '{this.props.mode}'</h2>
                <Grid divided>
                    <Grid.Column width={i}>
                        <ShareSpace></ShareSpace>
                    </Grid.Column>
                    <Grid.Column>
                        <ChatModule
                            chatDB={this.props.chatDB}
                            onClick={this.props.onClick}
                            exitRoom={this.props.exitRoom}
                        ></ChatModule>
                    </Grid.Column>
                </Grid>

            </div >
        )
    }
}