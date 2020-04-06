import Room from '../Component/Room'
import { connect } from 'react-redux'

function mapReduxStateToReactProps(state) {
    return {
        mode: state.mode,
        chatRoom: state.chatRoom,
        chatDB: state.chatDB
    }
}

function mapReduxDispatchToReactProps(dispatch) {
    return {
        onClick: function (data, id, time) {
            console.log('clicked!!')
            dispatch({ type: 'CHAT', data: data, id: id, time: time })
        }
    }
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(Room);