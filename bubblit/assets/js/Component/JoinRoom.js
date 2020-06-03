import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
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
                <Form onSubmit={function (e, data) { this.joinRoom() }.bind(this)}>
                    <Form.Input
                        size='big'
                        action={{ icon: 'send' }}
                        placeholder='enter your room code!'
                        value={this.state.inputRoomCode}
                        onChange={this.handleInputRoomCode.bind(this)}
                    ></Form.Input>
                </Form>
                {/* <Button onClick={function (e, data) {
                    this.makeRoom();
                }.bind(this)} >Make Room</Button> */}
            </div>
        );
    }
}

export default JoinRoom