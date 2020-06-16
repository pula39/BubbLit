import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { Scrollbars, scrollToBottom } from 'react-custom-scrollbars';

export default class LogPanel extends Component {
    constructor(props) {
        super(props);
        this.scrollbarRef = React.createRef();
    }

    handleUpdate() {
        if (this.scrollbarRef.current === null)
            return
        else {
            this.scrollbarRef.current.scrollToBottom();
        }
    }

    componentDidMount() {
        this.handleUpdate();
    }

    componentDidUpdate(precProps, prevState) {
        this.handleUpdate();
    }

    historyRenderer() {
        let contents = [];
        if (this.props.roomInfo == undefined) {
            // console.log('roonInfo is undefined! in LogPanel.js');
            return [];
        }
        if (this.props.roomInfo.bubble_history == undefined) {
            // console.log('roonInfo.bubble_history is undefined! in LogPanel.js');
            return [];
        }
        if (this.props.roomInfo.users === undefined) {
            // console.log('roonInfo.users is undefined! in LogPanel.js');
            return [];
        }
        if (this.props.roomInfo.chat_timeline === undefined) {
            // console.log('roonInfo.chat_timeline is undefined! in LogPanel.js');
            return [];
        }
        this.props.roomInfo.chat_timeline.forEach((element, index) => {
            contents.push(
                <Comment key={index}>
                    <Comment.Content>
                        <Comment.Author as='a'>{this.props.roomInfo.users[element.user_id].name}</Comment.Author>
                        <Comment.Metadata>
                            <div>{element.inserted_at}</div>
                        </Comment.Metadata>
                        <Comment.Text>{element.content}</Comment.Text>
                    </Comment.Content>
                </Comment>
            );
        })
        return contents;
    }

    render() {
        return (
            < div >
                <Scrollbars
                    autoHide={true}
                    ref={this.scrollbarRef}
                    style={{ height: window.innerHeight * 0.8 }}
                >
                    <Comment.Group>
                        {this.historyRenderer()}
                    </Comment.Group>
                </Scrollbars>
            </div >
        );
    }
}