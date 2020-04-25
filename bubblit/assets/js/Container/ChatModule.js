import ChatModule from '../Component/ChatModule'
import { connect } from 'react-redux'

function mapReduxStateToReactProps(state) {
    return {
        channel: state.channel,
        userName: state.userName
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