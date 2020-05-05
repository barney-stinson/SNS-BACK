import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//signup
export const postSignup = (username, password, firstname, lastname, email, dateofbirth, bio,AAA,teacher) => (dispatch) => {

    const newSignup = {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        email: email,
        dateofbirth: dateofbirth,
        bio: bio,
        AAA:AAA,
        teacher:teacher
    }
    console.log('Sign Up detail ', newSignup);

    // const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        body: JSON.stringify(newSignup),
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then((response) => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {console.log('post signup successfull' + response);
                        alert("signup was successfull");})
    .catch(error => { console.log('Post Signup ', error.message);
        alert('Sign up was unsuccessfull \nError: '+ error.message); })
}
/////////////////////////////////////////////////////////////////////////

//authentication process
export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            // dispatch(fetchFavorites());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    // dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}
////////////////////////////////////////////////////////////////////////////

//for downloading Users
export const fetchUsers = () => (dispatch) => {

    dispatch(usersLoading());

    return fetch(baseUrl + 'users')
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then (response => response.json())
        .then (users => dispatch(addUsers(users)))
        .catch(error => dispatch(usersFailed(error.message)));
        
}
export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING
});

export const usersFailed = (errmess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errmess
});

export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
});

//for downloading Groups

export const fetchGroups = () => (dispatch) => {

    dispatch(usersLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'groups',{
        headers: {
            'Authorization': bearer
        },
    })
    
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then (response => response.json())
        .then (groups => dispatch(addGroups(groups)))
        .catch(error => dispatch(groupsFailed(error.message)));
        
}
export const groupsLoading = () => ({
    type: ActionTypes.GROUPS_LOADING
});

export const groupsFailed = (errmess) => ({
    type: ActionTypes.GROUPS_FAILED,
    payload: errmess
});

export const addGroups = (groups) => ({
    type: ActionTypes.ADD_GROUPS,
    payload: groups
});

//for downloading comments

export const fetchComments = () => (dispatch) => {

    dispatch(commentsLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments',{
        headers: {
            'Authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then (response => response.json())
        .then (comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
        
}
export const commentsLoading = () => ({
    type: ActionTypes.COMMENTS_LOADING
});

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

//for downloading notices

export const fetchNotices = () => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    dispatch(noticesLoading());

    return fetch(baseUrl + 'noticeBoard',{
        headers: {
            'Authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then (response => response.json())
        .then (notices => dispatch(addNotices(notices)))
        .catch(error => dispatch(noticesFailed(error.message)));
        
}
export const noticesLoading = () => ({
    type: ActionTypes.NOTICES_LOADING
});

export const noticesFailed = (errmess) => ({
    type: ActionTypes.NOTICES_FAILED,
    payload: errmess
});

export const addNotices = (noitces) => ({
    type: ActionTypes.ADD_NOTICES,
    payload: noitces
});


//for downlading groupchat

export const fetchGroupchat = () => (dispatch) => {

    dispatch(groupchatLoading());

    return fetch(baseUrl + 'groupchats')
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then (response => response.json())
        .then (groupchat => dispatch(addGroupchat(groupchat)))
        .catch(error => dispatch(groupchatFailed(error.message)));
        
}
export const groupchatLoading = () => ({
    type: ActionTypes.GROUPCHAT_LOADING
});

export const groupchatFailed = (errmess) => ({
    type: ActionTypes.GROUPCHAT_FAILED,
    payload: errmess
});

export const addGroupchat = (groupchat) => ({
    type: ActionTypes.ADD_GROUPCHAT,
    payload: groupchat
});
///////////////////////////////////////////////
