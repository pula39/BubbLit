import React, { Component } from 'react';
import { Button, Comment, Form, Header, Dropdown, Grid } from 'semantic-ui-react'
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
        let showtype = this.state.showByType
        if (this.props.history == undefined ||
            this.props.roomInfo.users === undefined
        ) {
            return [];
        }

        this.props.history.forEach(function (item, index, array) {
            if ((item.type.indexOf(showtype) == -1) && (showtype != 'all'))
                return true

            contents.push(
                <div key={index}>
                    <p>{item.user_id} {item.type} {item.param}</p>
                </div>
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