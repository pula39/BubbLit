import Lobby from '../Component/Lobby'
import { connect } from 'react-redux'

function mapReduxStateToReactProps(state) {
    return {
        roomList: state.roomList
    }
}

function mapReduxDispatchToReactProps(dispatch) {
    return {
        enterRoom: function (title, roomlist) {
            dispatch({ type: 'ENTER_CHAT', title: title, roomlist: roomlist })
        }
    }
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(Lobby);