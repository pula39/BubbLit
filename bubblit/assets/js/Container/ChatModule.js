import ChatModule from '../Component/ChatModule'
import { connect } from 'react-redux'

function mapReduxStateToReactProps(state) {
    return {
        channel: state.channel,
        userName: state.userName
        userName: state.userName,
        contents: state.contents,
        participants: state.participants,
    }
}

function mapReduxDispatchToReactProps(dispatch) {
    return {
        exitRoom: function () {
            dispatch({ type: 'EXIT' })
        }
    }
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(ChatModule);