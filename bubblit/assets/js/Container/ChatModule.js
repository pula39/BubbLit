import ChatModule from '../Component/ChatModule'
import { connect } from 'react-redux'

function mapReduxStateToReactProps(state) {
    return {
        channel: state.channel,
        roomInfo: state.roomInfo,
    }
}

function mapReduxDispatchToReactProps(dispatch) {
    return {
        sendChat: function (channel, msg) {
            channel.push('new_msg', { body: msg });
        },
    }
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(ChatModule);