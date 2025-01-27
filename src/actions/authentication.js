import {
    AUTHENTICATION_INFO_CLEAR,
    AUTHENTICATION_INFO_SET,
    AUTHENTICATION_PASSWORD_SET,
    AUTHENTICATION_PASSWORD_VISIBLE_SET,
    AUTHENTICATION_POST_ERROR,
    AUTHENTICATION_POST_IN_PROGRESS,
    AUTHENTICATION_POST_SUBMIT,
    AUTHENTICATION_POST_SUCCESS,
    authenticationPostURL,
} from '../constants/authentication';
import { emptyFunc } from '../constants/common';
import Async from 'async';
import Axios from 'axios';

export const setAuthenticationPassword = (data) => {
    return {
        type: AUTHENTICATION_PASSWORD_SET,
        data,
    };
};

export const setAuthenticationPasswordVisible = (data) => {
    return {
        type: AUTHENTICATION_PASSWORD_VISIBLE_SET,
        data,
    };
};

export const postAuthenticationInProgress = (data) => {
    return {
        type: AUTHENTICATION_POST_IN_PROGRESS,
        data,
    };
};

export const postAuthenticationSuccess = (data) => {
    return {
        type: AUTHENTICATION_POST_SUCCESS,
        data,
    };
};

export const postAuthenticationError = (data) => {
    return {
        type: AUTHENTICATION_POST_ERROR,
        data,
    };
};

export const postAuthentication = (history, cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(postAuthenticationInProgress());
            next(null);
        }, (next) => {
            const { authentication: { password } } = getState();

            const url = authenticationPostURL();
            Axios.post(url, {
                password: password.value.trim(),
            })
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    console.error(error);

                    dispatch(postAuthenticationError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(postAuthenticationSuccess(result));
            next(null);
        }, (next) => {
            history.push('/dashboard/wallet');
            next(null);
        },
    ], cb);
};

export const setAuthenticationInfo = (data) => {
    return {
        type: AUTHENTICATION_INFO_SET,
        data,
    };
};

export const clearAuthenticationInfo = (data) => {
    return {
        type: AUTHENTICATION_INFO_CLEAR,
        data,
    };
};

export const submitAuthenticationPost = (data) => {
    return {
        type: AUTHENTICATION_POST_SUBMIT,
        data,
    };
};
