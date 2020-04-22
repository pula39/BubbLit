import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import Cat from '../../static/images/cat.jpg'
import Youtubepanel from './ShareSpaceComponent/youtube'
import Docspanel from './ShareSpaceComponent/googledocs'
import './../../css/shareSpace.css'

export default class ShareSpace extends Component {
    render() {
        const panes = [
            { menuItem: 'Youtube', render: () => <Tab.Pane className="sharespace-tab"><Youtubepanel /></Tab.Pane> },
            { menuItem: 'Docs', render: () => <Tab.Pane className="sharespace-tab"><Docspanel /></Tab.Pane> },
            { menuItem: 'Log', render: () => <Tab.Pane className="sharespace-tab">ChatLog</Tab.Pane> },
            { menuItem: 'IMG', render: () => <Tab.Pane className="sharespace-tab"><img src={Cat} alt="이미지"></img></Tab.Pane> },
        ]

        return (
            <div className="sharespace-div">
                <Tab className="sharespace-tab"
                    menu={{ color: 'blue', attatched: false, tabular: false }}
                    panes={panes}
                />
            </div>
        )
    }
}