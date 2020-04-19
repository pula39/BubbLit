import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Resizable, ResizableBox } from 'react-resizable';
import ChatModule from './ChatModule'
import ShareSpace from './ShareSpace'
import '../../css/resizableBox.css'
import '../../css/room.css'


export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: 1,
            chatData: '',
        }
    }

    render() {
        return (
            <div>
                <h2>Room '{this.props.mode}'</h2>
                <Grid divided>
                    <ResizableBox
                        width={500}
                        height={800}
                        minConstraints={[300, 800]}
                        maxConstraints={[900, 800]}
                        resizeHandles={['e']}
                    >
                        <Grid.Column className='shareSpace'>
                            <ShareSpace></ShareSpace>
                        </Grid.Column>
                    </ResizableBox>

                    <Grid.Column>
                        <ChatModule
                            chatDB={this.props.chatDB}
                            onClick={this.props.onClick}
                            exitRoom={this.props.exitRoom}
                        ></ChatModule>
                    </Grid.Column>
                </Grid>

                <ResizableBox width={200} height={200}
                    minConstraints={[100, 100]} maxConstraints={[300, 300]}>
                    <span>For Test</span>
                </ResizableBox>
            </div >
        )
    }
}