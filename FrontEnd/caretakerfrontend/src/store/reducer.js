const initialState = {
    IsLoggedIn: sessionStorage.getItem("userid") !== null,
    Username: sessionStorage.getItem("uname") === null ? "" : sessionStorage.getItem("uname"),
    Role: sessionStorage.getItem("role") === null ? "" : sessionStorage.getItem("role")
}
console.log()
const reducer = (state = initialState, action) => {//{type:"", payload:{}}
    switch (action.type) {
        case 'IsLoggedIn':
            return {//{{isll,user,role},isll,user,role}
                ...state,
                IsLoggedIn: true,
                Username: sessionStorage.getItem("uname"),
                Role: sessionStorage.getItem("role")
            }
        case 'LogOut':
            sessionStorage.clear()
            return { ...state, IsLoggedIn: false, Username: '', Role: '' }
        default:
            return state
    }
}

export default reducer;