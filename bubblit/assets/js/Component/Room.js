import React, { Component } from 'react'
import { Divider, Input, Button } from 'semantic-ui-react'

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
                {this.chatRenderer()}
                <Input
                    name='ChatInput'
                    onChange={function (e) {
                        this.setState({ chatData: e.target.value })
                    }.bind(this)}
                    action={{
                        icon: 'arrow up',
                        onClick: function (e, data) {
                            this.props.onClick(this.state.chatData, this.state.userID, Date());
                            //this.setState({ chatData: '' });
                            //var input = document.getElementsByName('chatInput');
                            //input[0].value = ''; //e, data를 활용하여 초기화하는 방법이 있을것같음. 추후 수정
                        }.bind(this)
                    }}
                ></Input>
                <p></p>
                <Button onClick={function (e, data) {
                    this.props.exitRoom();
                }.bind(this)}
                >Exit Room</Button>
            </div >
        )
    }
}