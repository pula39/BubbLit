import { createStore } from 'redux'
import { Socket } from 'phoenix'
export default createStore(function (state, action) {
    if (state === undefined) {
        state = {
            // 초기화할때 소켓을 생성만 해둠, 밑에 ENTER_CHAT 이벤트때 전달받은 세부 정보로 소켓을 connect함
            socket: new Socket('/socket', { params: { token: window.userToken } }),
            channel: '',
            mode: 'lobby',
            userName: 'kynel',
            lobby: {
                roomList: [
                    { id: 0, title: '1st Room', host: 'kynel', isPrivate: 'O', limit: 10, current: 6 },
                    { id: 1, title: '2st Room', host: 'REA', isPrivate: 'X', limit: 12, current: 2 },
                    { id: 2, title: '3st Room', host: 'Ano', isPrivate: 'O', limit: 3, current: 3 },
                    { id: 3, title: '4st Room', host: 'kynel', isPrivate: 'X', limit: 2, current: 2 },
                    { id: 4, title: '5st Room', host: 'REA', isPrivate: 'X', limit: 3, current: 1 },
                ],
            },
            chatRoom: {
                chat: '',
                id: '',
                time: '',
                showID: '',
            },
        }
        return state;
    }
    if (action.type === 'ENTER_CHAT') {
        //console.log(state.socket === '');
        //if (state.socket === '') {
        //    let newSocket = new Socket('/socket', { params: { token: window.userToken } });
        //    newSocket.connect();
        //    let newChannel = newSocket.channel('test', { nickname: test });
        //    newChannel.join()
        //}
        //this.setState({ ...state, channel: state.socket.channel('test', { nickname: 'asdf' }) })

        // 아래 코드에서 socket을 연결시키고, 방에 들어감과 동시에 channel에 접속시켜준다.
        state.socket.connect();
        return { ...state, mode: action.title, channel: state.socket.channel('room:' + action.title, { nickname: state.userName }) }
    }
    if (action.type === 'CHAT') {
        return { ...state, chatDB: state.chatDB.concat(action.data) }
    }
    if (action.type === 'EXIT') {
        //channel 구독해지
        return { ...state, mode: 'lobby' }
    }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
