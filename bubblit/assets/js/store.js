import { createStore } from 'redux'

export default createStore(function (state, action) {
    if (state === undefined) {
        state = {
            mode: 'lobby',
            lobby: {
                roomList: [
                    { id: 0, title: '1st Room', host: 'kynel', isPrivate: true, limit: 10, current: 6 },
                    { id: 1, title: '2st Room', host: 'REA', isPrivate: false, limit: 12, current: 2 },
                    { id: 2, title: '3st Room', host: 'Ano', isPrivate: true, limit: 3, current: 3 },
                    { id: 3, title: '4st Room', host: 'kynel', isPrivate: false, limit: 2, current: 2 },
                    { id: 4, title: '5st Room', host: 'REA', isPrivate: false, limit: 3, current: 1 },
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
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
