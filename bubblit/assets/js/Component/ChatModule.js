import React, { Component } from 'react'
import { Divider, Input, Button } from 'semantic-ui-react'
import { Rnd } from "react-rnd"
import '../../css/chatModule.css'

export default class ChatModule extends Component {
    constructor(props) {
        super(props);
        this.state = {

            // 방에 나갓다 들어와도 커스텀값이 유지되도록 state로 빼봣음, store로 옮기거나, 수정예정
            width: { 'first': 400, 'second': 400, 'third': 400, 'fourth': 400, 'fifth': 400, 'sixth': 400 },
            height: { 'first': 250, 'second': 250, 'third': 250, 'fourth': 250, 'fifth': 250, 'sixth': 250 },
            x: { 'first': 0, 'second': 450, 'third': 0, 'fourth': 450, 'fifth': 0, 'sixth': 450 },
            y: { 'first': 0, 'second': 0, 'third': 300, 'fourth': 300, 'fifth': 600, 'sixth': 600 },
        }
    }

    chatboxRenderer() {
        var content = [];
        var classNames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']
        classNames.forEach(name => {
            content.push(
                <Rnd className='chatarea'
                    size={{ width: this.state.width[name], height: this.state.height[name] }}
                    minWidth='200' minHeight='200'
                    maxWidth='800' maxHeight='500'
                    position={{ x: this.state.x[name], y: this.state.y[name] }}
                    // 지금 그리드 자체에 문제가 있음
                    // resizeGrid={[10, 10]}
                    // dragGrid={[15, 15]}

                    // 아랫부분 동작 원리를 알기위해 장황한 코딩을 했으나, 추후 수정예정임돠
                    onDragStop={(e, d) => {
                        var tempx = this.state.x;
                        var tempy = this.state.y;
                        tempx[name] = d.x;
                        tempy[name] = d.y;
                        this.setState({ x: tempx, y: tempy });
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        var tempw = this.state.width;
                        var temph = this.state.height;
                        var tempx = this.state.x;
                        var tempy = this.state.y;
                        tempw[name] = ref.style.width;
                        temph[name] = ref.style.height;
                        tempx[name] = position.x;
                        tempy[name] = position.y;
                        this.setState({
                            width: tempw,
                            height: temph,
                            x: tempx,
                            y: tempy
                        });
                    }}
                >
                    <div className={name}>
                        {name} user
                    </div>
                </Rnd>
            )
        })
        return content
    }

    render() {
        let joined = this.props.channel.join();
        console.log(joined);
        joined
            .receive('ok', response => {
                console.log(response);
                console.log('joined successfully at ' + response)
            })
            .receive('error', response => { console.log('Unable to join', response) })
        this.props.channel.on('bubble_history', payload => {
            console.dir(payload.history);
        })
        this.props.channel.on("new_msg", payload => {
            console.log(payload);
            let nickname = payload['nickname'];
            let msg = payload['body'];
            console.log(msg);
            console.log(userid);
        })
        this.props.channel.push('new_msg', { body: 'testMSG', nickname: this.props.userName });

        return (
            <div>
                {this.chatboxRenderer()}
                <Rnd
                    className='input'
                    position={{ x: 0, y: 870 }}
                >
                    <p></p>
                    <Button onClick={function (e, data) {
                        this.props.exitRoom();
                    }.bind(this)}
                    >Exit Room</Button>
                </Rnd>
            </div >
        )
    }
}