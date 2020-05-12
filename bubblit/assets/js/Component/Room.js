import React, { Component } from 'react'
import { Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { Rnd } from 'react-rnd'
import ChatModule from '../Container/ChatModule'
import ShareSpace from '../Container/ShareSpace'
import '../../css/room.css'


export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: 1,
            shareSpace_width: window.innerWidth * 0.5,
            shareSpace_height: 0.85,
        }
    }

    // ResizableBox에 초기 사이즈(width, height)는 숫자만 받음 => %값으로 줄 수 없음.
    // 따라서, window 창 크기를 계산해서 직접 %를 계산해서 줘야 할듯.
    // Grid가 사실상 유명무실해서 실제로 사용하기 쉽도록 사이즈 맞춤. 
    // 오른쪽에 여분의 공간 남는건 나중에 생각해보자...

    // React RND로 모듈 바꿈, minwidth, maxwidth를 현재 창 크기의 비율로 맞추고싶은데 우선 놔둠

    render() {
        return (
            <div>
                <div className='room' >
                    <Header className='room-header' as='h1' size='huge'><Icon name='rocketchat' size='huge' />Room '{this.props.roomTitle}'</Header>
                    <Grid columns={2}>
                        <Grid.Column>
                            <Rnd
                                className='tab'
                                disableDragging
                                minWidth={window.innerWidth * 0.3}
                                maxWidth={window.innerWidth * 0.6}
                                default={{
                                    x: 0,
                                    y: 0,
                                    width: window.innerWidth * 0.5,
                                    height: window.innerHeight * 0.85,
                                }}
                                height={this.state.shareSpace_height}
                            >
                                <ShareSpace></ShareSpace>

                            </Rnd>
                        </Grid.Column>
                        <Grid.Column>
                            <ChatModule></ChatModule>
                        </Grid.Column>
                    </Grid>
                </div>
            </div >
        )
    }
}