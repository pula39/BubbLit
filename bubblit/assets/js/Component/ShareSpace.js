import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import Cat from '../../static/images/cat.jpg'
import Youtubepanel from './ShareSpaceComponent/youtube'
import Docspanel from './ShareSpaceComponent/googledocs'

export default class ShareSpace extends Component {
    render() {
        const panes = [
            { menuItem: 'Youtube', render: () => <Tab.Pane><Youtubepanel /></Tab.Pane> },
            { menuItem: 'Docs', render: () => <Tab.Pane><Docspanel /></Tab.Pane> },
            { menuItem: 'Log', render: () => <Tab.Pane>ChatLog</Tab.Pane> },
            { menuItem: 'IMG', render: () => <Tab.Pane><img src={Cat} alt="이미지"></img></Tab.Pane> },
        ]

        return (
            <div className="sharespace-tab">
                <Tab
                    menu={{ color: 'blue', attatched: false, tabular: false }}
                    panes={panes}
                />
            </div>
        )
    }
}