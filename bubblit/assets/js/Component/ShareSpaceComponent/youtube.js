import React, { Component } from 'react'
import './../../../css/shareSpace.css'

export default class YoutubePanel extends Component {
    render() {
        return (
            <div className="sharespace-tab">
                <iframe width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/MURPf_6r8z4"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
            </div>
        )
    }
}