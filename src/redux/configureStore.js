import {createStore, combineReducers, applyMiddleware} from 'redux';

import { Auth } from './auth';

import {Users} from './users';
import {Notices} from './notice';
import {Comments} from './comments';
import {Groups} from './groups';
import {GroupChat} from './groupchat';


import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            users: Users,
            notices: Notices,
            comments: Comments,
            groups: Groups,
            groupchat: GroupChat,
            auth: Auth,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}