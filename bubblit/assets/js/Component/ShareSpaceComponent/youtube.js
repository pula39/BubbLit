import React, { Component } from 'react'

export default class YoutubePanel extends Component {
    render() {
        return (
            <div>
                <iframe width="560"
                    height="315"
                    src="https://www.youtube.com/embed/MURPf_6r8z4"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
            </div>
        )
    }
}