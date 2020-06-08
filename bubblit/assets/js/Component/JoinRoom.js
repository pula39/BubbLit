import React, { Component } from 'react'
import { Button, Form, Popup } from 'semantic-ui-react'
import { Redirect } from 'react-router';
import axios from 'axios'

class JoinRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputRoomCode: '',
            redirect: false
        }
    }

    handleInputRoomCode(event) {
        this.setState({
            inputRoomCode: event.target.value
        })
    }

    joinRoom() {
        if (this.props.setRoomIDWithRoomCode(this.state.inputRoomCode)) {
            this.setState({ redirect: true });
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/room" />;
        }

        return (
            <div>
                <Popup
                    on='click'
                    pinned
                    trigger={<Button color='orange'>초대코드로 방 입장</Button>}
                    position='bottom center'
                >
                    <Form onSubmit={function (e, data) { this.joinRoom() }.bind(this)}>
                        <Form.Input
                            size='large'
                            action={{ color: 'blue', icon: 'send' }}
                            placeholder='방의 Private Code를 입력하세요'
                            value={this.state.inputRoomCode}
                            onChange={this.handleInputRoomCode.bind(this)}
                        ></Form.Input>
                    </Form>
                    {/* <Button onClick={function (e, data) {
                    this.makeRoom();
                }.bind(this)} >Make Room</Button> */}
                </Popup>
            </div>
        );
    }
}

export default JoinRoom