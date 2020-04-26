import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Resizable, ResizableBox } from 'react-resizable';
import ChatModule from '../Container/ChatModule'
import ShareSpace from './ShareSpace'
import '../../css/resizableBox.css'
import '../../css/room.css'


export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: 1,
            windowWidth: 0,
            windowHeight: 0
        }
    }

    componentDidMount() {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        })
    }

    // ResizableBox에 초기 사이즈(width, height)는 숫자만 받음 => %값으로 줄 수 없음.
    // 따라서, window 창 크기를 계산해서 직접 %를 계산해서 줘야 할듯.
    render() {
        return (
            <div>
                <h2>Room '{this.props.mode}'</h2>
                <Grid divided>
                    <ResizableBox
                        width={this.state.windowWidth * 0.4}
                        height={this.state.windowHeight * 0.8}
                        minConstraints={[300, 800]}
                        maxConstraints={[900, 800]}
                        resizeHandles={['e']}
                    >
                        <ShareSpace></ShareSpace>

                    </ResizableBox>

                    <Grid.Column>
                        <ChatModule></ChatModule>
                    </Grid.Column>
                </Grid>
            </div >
        )
    }
}