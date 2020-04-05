import React, { Component } from 'react'
import { Button, Grid, Divider } from 'semantic-ui-react'
import store from '../store'

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: store.getState().mode,
            lobby: store.getState().lobby,
            chatRoom: store.getState().chatRoom,
        };
        store.subscribe(function () {
            this.setState({
                mode: store.getState().mode,
                lobby: store.getState().lobby,
                chatRoom: store.getState().chatRoom,
            }.bind(this))
        });
    }

    mode() {
        if (this.state.mode === 'lobby') {
            return 'lobby!!';
        }
        else {
            return 'else!!';
        }
    }

    render() {
        var string = this.mode();
        return (
            <div>
                <h1>BubbLIT Prototype😊</h1>
                <h2>{string}</h2>
            </div>
        );
    }
}

export default Board