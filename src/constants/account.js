import { managerBaseURL } from './common';

export const ACCOUNT_GET_IN_PROGRESS = 'ACCOUNT_GET_IN_PROGRESS';
export const ACCOUNT_GET_SUCCESS = 'ACCOUNT_GET_SUCCESS';
export const ACCOUNT_GET_ERROR = 'ACCOUNT_GET_ERROR';

export const accountGetURL = (address) => {
    const baseURL = managerBaseURL();
    return `${baseURL}/accounts/${address}`;
};

export const ACCOUNT_PASSWORD_SET = 'ACCOUNT_PASSWORD_SET';
export const ACCOUNT_PASSWORD_VISIBLE_SET = 'ACCOUNT_PASSWORD_VISIBLE_SET';
