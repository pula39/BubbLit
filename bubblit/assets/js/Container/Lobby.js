import Lobby from '../Component/Lobby'
import { connect } from 'react-redux'

function mapReduxStateToReactProps(state) {
    return {
        roomList: state.roomList,
        userName: state.userName,
        userId: state.userId,
        current_room_id: state.current_room_id,
        host: state.roomInfo.host_user,
    }
}

function mapReduxDispatchToReactProps(dispatch) {
    return {
        setRoomID: function (room_id) {
            dispatch({ type: 'SET_ROOM_ID', room_id: room_id })
        },
        setRoomIDWithRoomCode: function (room_id, room_password) {
            dispatch({ type: 'SET_ROOM_ID', room_id: room_id, room_password: room_password })
        },
        refreshRoomList: function (room_list) {
            dispatch({ type: 'REFRESH_ROOM_LIST', room_list: room_list })
        },
        setUserData: function (userName, userId) {
            dispatch({ type: 'SET_USER_DATA', userName: userName, userId: userId })
        }
    }
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(Lobby);