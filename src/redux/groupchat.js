import * as ActionTypes from './ActionTypes';

export const GroupChat = (state = { isLoading: true,
    errMess: null,
    groupchat:[]}, action) => {

    switch (action.type) {
        case ActionTypes.ADD_GROUPCHAT:
            return {...state, isLoading: false, errMess: null, groupchat: action.payload};

        case ActionTypes.GROUPCHAT_LOADING:
            return {...state, isLoading: true, errMess: null, groupchat: []};

        case ActionTypes.GROUPCHAT_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
          return state;
      }
};