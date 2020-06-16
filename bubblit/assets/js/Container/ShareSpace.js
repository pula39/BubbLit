import ShareSpace from '../Component/ShareSpace'
import { connect } from 'react-redux'

function mapReduxStateToReactProps(state) {
    return {
        current_room_id: state.current_room_id,
        channel: state.channel,
        users: state.users,
        roomInfo: state.roomInfo,
        userId: state.userId
    }
}

function mapReduxDispatchToReactProps(dispatch) {
    return {

    }
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(ShareSpace);