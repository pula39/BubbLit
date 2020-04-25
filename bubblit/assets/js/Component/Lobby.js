import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'

export default class Lobby extends Component {

    render() {
        var content = [];
        var _props = this.props;
        var _roomList = this.props.lobby.roomList;
        var i = 0;
        while (i < _roomList.length) {
            var active = [];
            if (_roomList[i].current >= _roomList[i].limit) {
                active.push(<Button loading>Loading</Button>)
            }
            else {
                active.push(<Button action={{ index: i }} onClick={function (e, data) {
                    this.props.enterRoom(_roomList[data.action.index].title);
                }.bind(this)}>join</Button>)
            }
            content.push(
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            {_roomList[i].id + 1}
                        </Table.Cell>
                        <Table.Cell>
                            {_roomList[i].title}
                        </Table.Cell>
                        <Table.Cell>
                            {_roomList[i].host}
                        </Table.Cell>
                        <Table.Cell>
                            {_roomList[i].isPrivate}
                        </Table.Cell>
                        <Table.Cell>
                            {_roomList[i].limit}
                        </Table.Cell>
                        <Table.Cell>
                            {_roomList[i].current}
                        </Table.Cell>
                        <Table.Cell>
                            {active}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            )
            i += 1;
        }

        return (
            <div>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>id</Table.HeaderCell>
                            <Table.HeaderCell>title</Table.HeaderCell>
                            <Table.HeaderCell>host</Table.HeaderCell>
                            <Table.HeaderCell>isPrivate</Table.HeaderCell>
                            <Table.HeaderCell>limit</Table.HeaderCell>
                            <Table.HeaderCell>current</Table.HeaderCell>
                            <Table.HeaderCell>JOIN</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {content}
                </Table>
            </div>
        )

    }
}