import Lobby from '../Component/Lobby'
import { connect } from 'react-redux'

function mapReduxStateToReactProps(state) {
    return {
        lobby: state.lobby
    }
}

function mapReduxDispatchToReactProps(dispatch) {
    return {
        onClick: function (title) {
            dispatch({ type: 'ENTER_CHAT', title: title })
        }
    }
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(Lobby);