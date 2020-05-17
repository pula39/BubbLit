import { createStore } from 'redux'
import socket from './Component/socket'

function concatToRoomUsers(roomUsers, user_id) {
    let notInRoomUsers = (roomUsers.includes(user_id) == false);

    if (notInRoomUsers) {
        console.log("new room user", user_id, "added for", roomUsers)
        return roomUsers.concat(user_id)
    }

    return roomUsers
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

function addMessageInBubbleHistory(bubble_history, bubble_log) {
    let user_id = bubble_log.user_id

    if (user_id in bubble_history === false) {
        bubble_history[user_id] = [];
    }

    bubble_history[user_id] = bubble_history[user_id].concat(bubble_log);
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
        let bubble_history = state.roomInfo.bubble_history;
        // [TODO] 여기에는 시간정보가 없어서, 갱신 불가능.
        // 백엔드에서 시간 정보를 받아오지 않고, 내가 받은 시점 기준으로 시간을 넣어준다.
        let new_bubble_log = { user_id: action.user_id, content: action.body, inserted_at: "" }

        addMessageInBubbleHistory(bubble_history, new_bubble_log)

        console.log(bubble_history)
        return { ...state, roomInfo: { ...state.roomInfo, bubble_history: bubble_history } }
    }

    if (action.type === 'INITIALIZE_ROOM_INFO') {
        let modifiedRoomInfo = {};
        let init_bubble_history = {};

        action.bubble_history.forEach(element => {
            addMessageInBubbleHistory(init_bubble_history, element)
        })

        modifiedRoomInfo.bubble_history = init_bubble_history;
        modifiedRoomInfo.tab_action_history = action.tab_action_history;
        modifiedRoomInfo.room_users = action.room_users;
        modifiedRoomInfo.users = action.users;

        return { ...state, roomInfo: modifiedRoomInfo }
    }
    if (action.type === 'USER_JOIN') {
        let users = { ...state.roomInfo.users }
        users[action.user_id] = { id: action.user_id, name: action.user_name };

        let room_users = concatToRoomUsers(state.roomInfo.room_users, action.user_id)

        return {
            ...state, roomInfo: {
                ...state.roomInfo, users: users, room_users: room_users
            }
        }
    }


}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
