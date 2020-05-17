import Room from '../Component/Room'
import { connect } from 'react-redux'

function mapReduxStateToReactProps(state) {
    return {
        chatRoom: state.chatRoom,
        chatDB: state.chatDB,
        roomTitle: state.roomTitle
    }
}

function mapReduxDispatchToReactProps(dispatch) {
    return {
        exitRoom: function () {
            dispatch({ type: 'EXIT' });
        }
    }
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(Room);