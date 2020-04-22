import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import Cat from '../../static/images/cat.jpg'
import YoutubePanel from './ShareSpaceComponent/youtube'
import DocsPanel from './ShareSpaceComponent/googledocs'
import ImagePanel from './ShareSpaceComponent/shareimage'
import './../../css/shareSpace.css'

export default class ShareSpace extends Component {
    render() {
        const panes = [
            { menuItem: 'Youtube', render: () => <Tab.Pane className="sharespace-tab"><YoutubePanel /></Tab.Pane> },
            { menuItem: 'Docs', render: () => <Tab.Pane className="sharespace-tab"><DocsPanel /></Tab.Pane> },
            { menuItem: 'Log', render: () => <Tab.Pane className="sharespace-tab">ChatLog</Tab.Pane> },
            { menuItem: 'IMG', render: () => <Tab.Pane className="sharespace-tab"><ImagePanel /></Tab.Pane> },
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