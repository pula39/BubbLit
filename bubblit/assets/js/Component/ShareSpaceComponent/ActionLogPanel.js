import React, { Component } from 'react';
import { Button, Comment, Form, Header, Dropdown, Grid, List } from 'semantic-ui-react'
import { Scrollbars, scrollToBottom } from 'react-custom-scrollbars';

export default class ActionLogPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showByUser: 'all',
            showByType: 'all',
            typeOption: [
                { text: 'all', value: 'all' },
                { text: 'control', value: 'control' },
                { text: 'media', value: 'media' },
                { text: 'image', value: 'img' },
            ]
        }

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
        let roomInfo = this.props.roomInfo

        let showtype = this.state.showByType
        if (this.props.history == undefined ||
            roomInfo.users === undefined
        ) {
            return [];
        }

        this.props.history.forEach(function (item, index, array) {
            if (roomInfo.users[item.user_id] == undefined)
                return true;

            if ((item.type.indexOf(showtype) == -1) && (showtype != 'all'))
                return true
            contents.push(
                <Comment key={index}>
                    <Comment.Content>
                        <Comment.Author>{roomInfo.users[item.user_id].name}</Comment.Author>
                        <Comment.Text>{item.type}, {item.param}</Comment.Text>
                    </Comment.Content>
                </Comment>
            );
        })
        return contents.reverse();
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
        console.log(this.state);
    }


    render() {
        return (
            < div >
                <Form>
                    <Form.Field>
                        <label>Select room action type</label>
                        <Dropdown
                            selection
                            name='showByType'
                            placeholder='Choose action type'
                            options={this.state.typeOption}
                            onChange={this.handleChange}
                        >
                        </Dropdown>
                    </Form.Field>
                </Form>
                <Scrollbars
                    autoHide={true}
                    ref={this.scrollbarRef}
                    style={{ height: window.innerHeight * 0.7 }}
                >
                    <Comment.Group>
                        {this.historyRenderer()}
                    </Comment.Group>
                </Scrollbars>
            </div >
        );
    }
}