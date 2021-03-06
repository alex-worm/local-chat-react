export default (state, action) => {
    switch(action.type) {
        case 'IS_AUTH':
            return {
                ...state,
                isAuth: true,
                roomId: action.payload.roomId,
                userName: action.payload.userName
            }
        case 'LEAVE':
            return {
                ...state,
                isAuth: false,
                roomId: null,
                userName: null,
                users: [],
                messages: []
            }
        case 'SET_USERS':
            return {
                ...state,
               users: action.payload
            }
        case 'NEW_MESSAGE':
            return {
                ...state,
               messages: [...state.messages, action.payload]
            }
        case 'SET_DATA':
            return {
                ...state,
                users: action.payload.users,
                messages: action.payload.messages
            }
        default: return state
    }
}
