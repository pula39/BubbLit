import { createStore } from 'redux'
import socket from './Component/socket'

addParticipants(changes, user_id) {
    // participants는 늘리지 않고, room_after_join와 user_join으로만 추가된다.
    // 이 로직은 추후 `방에서 나가기` 기능이 추가될 때 전면적으로 갈아엎어야 한다.
    // 근본적으로 addMessageInChanges에서 Content를 직접 가져오면 안되고 addMessageInChanges는 History만을 갱신한 다음에
    // 그 History에 무언가가 새로 추가될 때, 현재 있는 Participants1 면 그 ChatBox에 추가해주는식으로 분리를 해야할 것이다...
    let notInChanges = (changes.hasOwnProperty('participants') && (changes['participants'].includes(user_id)) == false);
    if (notInChanges) {
        console.log("new participants", user_id, "added for", changes.participants)
        changes.participants = changes.participants.concat(user_id)
    }
}

function GetRoomById(roomList, roomId) {
    var findLambda = (room) => {
        return room.id == roomId
    };

    return roomList.find(findLambda);
}

function addMessageInChanges(changes, user_id, msg) {
    let find_user_id = (element) => {
        return element == user_id
    }

    if (msg == null) {
        return;
    }
    let user_idx = changes.participants.findIndex(find_user_id)
    let modified_contents = changes.contents;

    if (modified_contents[user_idx] == undefined) {
        console.log("ignore no participants msg", user_id, msg)
        return;
    }
    changes.contents[user_idx] = modified_contents[user_idx].concat(msg)

    return changes;
}

const default_socket = socket;

const init_state = {
    // 초기화할때 소켓을 생성만 해둠, 밑에 ENTER_CHAT 이벤트때 전달받은 세부 정보로 소켓을 connect함
    socket: default_socket,
    // 채널은 아래의 'ENTER_CHAT' dispatch때 생성해줌
    channel: '',
    roomTitle: '',
    userName: 'kynel',

    // { id: 0, title: '1st Room', host: 'kynel', isPrivate: 'O', limit: 10, current: 6 },
    roomList: [],
    current_room_id: 0,
    users: '',
    //ChatModule
    history: {},
    contents: [[], [], [], [], [], []],
    participants: [],

    //리팩토링 완료되면 밑의 history 사용
    roomInfo: {
        bubble_history: [],
        tab_action_history: [],
        room_users: [],
        users: [],
    },
}

//리팩토링 이후 삭제
const room_init_state = {
    current_room_id: 0,
    history: {},

    //
    contents: [[], [], [], [], [], []],
    participants: []
}

export default createStore(function (state, action) {
    if (state === undefined) {
        return { ...init_state };
    }
    if (action.type === 'ENTER_CHAT') {
        // 아래 코드에서 socket을 연결시키고, 방에 들어감과 동시에 channel에 접속시켜준다.
        // socket component 에서도 connect 하는데,,, 두번 해주는거같음. 방 전환할때 꼭 필요한지 확인 필요.
        state = { ...state, ...room_init_state }

        state.socket.connect();
        var room = GetRoomById(state.roomList, action.room_id)
        return {
            ...state,
            current_room_id: action.room_id,
            roomTitle: room.title,
            users: action.users,
            channel: state.socket.channel('room:' + room.id, { nickname: state.userName })
        }
    }
    if (action.type === 'CHAT') {
        return { ...state, contents: action.contents, participants: action.participants, users: action.users }
    }
    if (action.type === 'REFRESH_ROOM_LIST') {
        //channel 구독해지 및 state 초기화
        return { ...state, roomList: action.room_list }
    }
    if (action.type === 'EXIT') {
        //channel 구독해지 및 state 초기화
        return { ...state, contents: [[], [], [], [], []], participants: [] }
    }
    if (action.type === 'SET_HISTORY') {
        //history 값을 변경
        return { ...state, history: action.history }
    }
    if (action.type === 'INSERT_HISTORY') {
        //history 값을 업데이트
        console.log('action.history:', atcion.history);
        return { ...state, history: action.history }
    }

    if (action.type === 'SET_USER_NAME') {
        return { ...state, userName: action.userName }
    }

    // 리팩토링됨
    if (action.type === 'ADD_MESSAGE') {
        let changes = {
            'contents': { ...this.state.contents },
        };
        addMessageInChanges(changes, action.user_id, action.body);
        return { ...state, contents: changes.contents, participants: changes.participants, users: changes.users }
    }
    if (action.type === 'INITIALIZE_ROOM_INFO') {
        let modifiedRoomInfo = {};
        contents = {};
        action.bubble_history.foreach(element => {
            let user_id = element.user_id

            if (user_id in contents === false) {
                contents[user_id] = [];
            }

            contents[user_id].push(element);
        })

        modifiedRoomInfo.bubble_history = contents;
        modifiedRoomInfo.tab_action_history = action.tab_action_history;
        modifiedRoomInfo.room_users = action.room_users;
        modifiedRoomInfo.users = action.users;

        return { ...state, roomInfo: modifiedRoomInfo }
    }

}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
