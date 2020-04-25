import ChatModule from '../Component/ChatModule'
import { connect } from 'react-redux'

function mapReduxStateToReactProps(state) {
    return {
        channel: state.channel,
        userName: state.userName,
        contents: state.contents,
        participants: state.participants,
    }
}

function mapReduxDispatchToReactProps(dispatch) {
    return {
        sendChanges: function (changes) {
            dispatch({ type: 'CHAT', contents: changes.contents, participants: changes.participants })
        },
        exitRoom: function (channel) {
            //channel.push('new_msg', { body: '테스트 메세지임니담' });
            channel.leave().receive('ok', () => alert('left channel'));
            dispatch({ type: 'EXIT' })
        },
        chattest: function (channel) {
            channel.push('new_msg', { body: '테스트메세지2입니당' });
        }
    }
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(ChatModule);