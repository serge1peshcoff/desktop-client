import { COIN_DECIMALS, COIN_DENOM, emptyFunc } from '../../constants/common';
import {
    TX_DELEGATE_AMOUNT_SET,
    TX_DELEGATE_ERROR,
    TX_DELEGATE_IN_PROGRESS,
    TX_DELEGATE_MEMO_SET,
    TX_DELEGATE_MODAL_HIDE,
    TX_DELEGATE_MODAL_SHOW,
    TX_DELEGATE_SUCCESS,
    TX_DELEGATE_TO_SET,
    txDelegateURL,
} from '../../constants/transactions';
import Async from 'async';
import Axios from '../../services/axios';
import Lodash from 'lodash';

export const setTxDelegateTo = (data) => {
    return {
        type: TX_DELEGATE_TO_SET,
        data,
    };
};

export const setTxDelegateAmount = (data) => {
    return {
        type: TX_DELEGATE_AMOUNT_SET,
        data,
    };
};

export const setTxDelegateMemo = (data) => {
    return {
        type: TX_DELEGATE_MEMO_SET,
        data,
    };
};

export const txDelegateInProgress = (data) => {
    return {
        type: TX_DELEGATE_IN_PROGRESS,
        data,
    };
};

export const txDelegateSuccess = (data) => {
    return {
        type: TX_DELEGATE_SUCCESS,
        data,
    };
};

export const txDelegateError = (data) => {
    return {
        type: TX_DELEGATE_ERROR,
        data,
    };
};

export const txDelegate = (cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(txDelegateInProgress());
            next(null);
        }, (next) => {
            const {
                account: { password },
                keys: {
                    items,
                    name,
                },
                transactions: {
                    delegate: {
                        to,
                        amount,
                        memo,
                    },
                },
            } = getState();

            const item = Lodash.find(items, ['name', name]);
            const url = txDelegateURL(item.address);
            Axios.post(url, {
                to: to.value.trim(),
                amount: {
                    denom: COIN_DENOM,
                    value: amount.value * Math.pow(10, COIN_DECIMALS),
                },
                memo: memo.value.trim(),
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
                    dispatch(txDelegateError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(txDelegateSuccess(result));
            next(null);
        },
    ], cb);
};

export const showTxDelegateModal = (data) => {
    return {
        type: TX_DELEGATE_MODAL_SHOW,
        data,
    };
};

export const hideTxDelegateModal = (data) => {
    return {
        type: TX_DELEGATE_MODAL_HIDE,
        data,
    };
};
