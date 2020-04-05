import { createStore } from 'redux'

export default createStore(function (state, action) {
    if (state === undefined) {
        state = {
            mode: 'lobby',
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
                showID: 'ALL',
                character: [
                    'https://react.semantic-ui.com/images/avatar/small/rachel.png',
                    'https://react.semantic-ui.com/images/avatar/small/lindsay.png',
                    'https://react.semantic-ui.com/images/avatar/small/matthew.png',
                    'https://react.semantic-ui.com/images/avatar/small/veronika.jpg'
                ],
                chatDB: []
            },

        }
        return state;
    }
    if (action.type === 'ENTER_CHAT') {
        console.log(action.title);
        return { ...state, mode: action.title }
    }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
