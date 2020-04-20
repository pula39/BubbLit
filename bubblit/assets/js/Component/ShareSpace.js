import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import Cat from '../../static/images/cat.jpg'

export default class ShareSpace extends Component {
    render() {
        const panes = [
            { menuItem: 'Youtube', render: () => <Tab.Pane>유튜브 공간</Tab.Pane> },
            { menuItem: 'Docs', render: () => <Tab.Pane>구글독스 들어갈 예정</Tab.Pane> },
            { menuItem: 'Log', render: () => <Tab.Pane>ChatLog</Tab.Pane> },
            { menuItem: 'IMG', render: () => <Tab.Pane><img src={Cat} alt="이미지"></img></Tab.Pane> },
        ]

        return (
            <div>
                <Tab
                    menu={{ color: 'blue', attatched: false, tabular: false }}
                    panes={panes}
                />
            </div>
        )
    }
}