import React, { Component } from 'react'
import { Divider, Input, Button, Icon, Form, Segment } from 'semantic-ui-react'
import { Rnd } from "react-rnd"
import { Scrollbars, scrollToBottom } from 'react-custom-scrollbars';
import ChatBox from './ChatBox'
import '../../css/chatModule.css'
import { Link } from 'react-router-dom';
import { Presence } from "phoenix"

const DEF_CHATBOX_POS = { x: [0, 450, 0, 450, 0, 450], y: [0, 0, 300, 300, 600, 600] }
const INPUTSPACE_RELATIVE_POS = { x: 0, y: 0.8 };

export default class ChatModule extends Component {
    constructor(props) {
        super(props);
        console.log("chatmodule width, height", window.innerWidth, window.innerHeight)
        this.state = {
            x: DEF_CHATBOX_POS.x,
            y: DEF_CHATBOX_POS.y,
            inputMessage: '',
            inputspacePosX: window.innerWidth * INPUTSPACE_RELATIVE_POS.x,
            inputspacePosY: window.innerHeight * INPUTSPACE_RELATIVE_POS.y,
            presences: {}
        }

        // 뒤로가기 됐을때를 대비해, 강제로 enterRoom 다시 실행시킴
        // [TODO] 두 과정을 하나로 통합시켜야 함. 하나의 일이 두 과정으로 분리되어 서로 다른 곳에서 실행되고 있어서 이렇게 할 수밖에 없다...
        // Join을 사용하지 않은 상태에서 방에 입장할 때에 구조적 문제 발생 -> 추후 
        let channelinit = async () => {
            await this.props.enterRoom(this.props.current_room_id)
            await this.channelInitializer();
        }

        channelinit()

        this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this)
        this.chatInput = React.createRef()
    }

    channelInitializer() {
        this.props.channel.join()
            .receive('ok', this.onReceiveOk.bind(this))
            .receive('error', response => { console.log('Unable to join', response) });
    }

    onReceiveOk(response) {
        console.log('joined successfully at ' + response)
        this.props.channel.on('room_after_join', payload => {
            this.props.setHistory(payload);
            this.props.initializeRoomHistory(payload);
        })
        this.props.channel.on('user_join', payload => {
            console.log('user_join', payload);
            this.props.userJoin(payload.user_id, payload.user_name);
        })
        this.props.channel.on("new_msg", payload => {
            let user_id = payload['user_id'];
            let msg = payload['body'];

            this.props.addMessage(payload['user_id'], payload['body']);
        })
        this.props.channel.on("presence_state", state => {
            this.state.presences = Presence.syncState(this.state.presences, state)
            console.log("presence_state", this.state.presences)
        })
        this.props.channel.on("presence_diff", diff => {
            this.state.presences = Presence.syncDiff(this.state.presences, diff)
            console.log("presence_diff", this.state.presences)
        })

        // [TODO] Presence 관련 코드들 Room.js로 옮겨주세요... ShareSpace에서도 필요할듯.
    }

    chatboxRenderer() {
        var myName = document.getElementById('current-username').innerHTML

        var message = [];

        for (var i = 0; i < this.props.roomInfo.room_users.length; i++) {
            let user_id = this.props.roomInfo.room_users[i];
            let user_info = this.props.roomInfo.users[user_id];
            let user_bubble_history = this.props.roomInfo.bubble_history[user_id]
            user_bubble_history = user_bubble_history == undefined ? [] : user_bubble_history

            message.push(
                <ChatBox
                    isOnline={user_id in this.state.presences}
                    is_my_box={myName == user_info.name}
                    key={i} name={user_info.name} temp={i}
                    contents={user_bubble_history}></ChatBox>
            )
        }

        return message
    }

    sendChat() {
        if (this.state.inputMessage == '') {
            return;
        }

        this.props.sendChat(this.props.channel, this.state.inputMessage);
        this.setState({
            ...this.state,
            inputMessage: ''
        })
    }

    handleInputMessage(event) {
        this.setState({
            ...this.state,
            inputMessage: event.target.value
        })
    }
    /*
    엔터키 입력시에 자동으로 채팅창으로 가도록 eventhandler를 추가함.
    다른 페이지 갈 때(채팅창이 화면에서 사라질 때) 엔터키를 입력받는 handler를 제거함.  */

    componentDidMount() {
        document.addEventListener('keydown', this.handleEnterKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEnterKeyPress);
        this.props.exitRoom(this.props.channel)
    }


    handleEnterKeyPress(e) {
        // e.keycode는 deprecated되었음.
        if (e.key === "Enter") {
            this.chatInput.current.focus()
        }
    }

    render() {
        /*
        Enter 키로 상호작용하려면 ref를 추가해야 함. 그런데, Form.Input은 functional한 컴포넌트라 ref를 추가할수 없음.
        따라서, Form.Input을 Form과 input으로 분리함.
        @참고 : https://stackoverflow.com/questions/53420516/react-ref-binding-results-in-typeerror-cannot-read-property-focus-of-null
     
        채팅 입력창 위치의 경우, 해당 div 안에서만 최초 위치 설정이 가능함. 따라서 div 설정을 먼저 해야 제대로 옮길 수 있을 거고, 현재는 구석에 뒀음.
        */
        return (
            <div>
                {this.chatboxRenderer()}
                <div>
                    <Rnd enableResizing="False"
                        size={{ width: '400', height: '30' }}
                        bounds='window'
                        position={{ x: this.state.inputspacePosX, y: this.state.inputspacePosY }}
                        onDragStop={(e, d) => {
                            this.setState({ inputspacePosX: d.x, inputspacePosY: d.y });
                        }}>
                        <Form onSubmit={function (e, data) { this.sendChat() }.bind(this)}>
                            <Form.Group>
                                <Form.Field>
                                    <input
                                        ref={this.chatInput}
                                        placeholder='drag here to move inputspace!!'
                                        value={this.state.inputMessage}
                                        onChange={this.handleInputMessage.bind(this)}
                                    />
                                    <Button color='grey' type='submit'>Chat</Button>
                                    <Link to="/"><Button secondary>Exit Room</Button></Link>
                                </Form.Field>
                            </Form.Group>

                        </Form>
                    </Rnd>
                </div>
            </div >
        )
    }
}