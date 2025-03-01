import { toast } from "react-toastify";
import { utilsValidator } from "../Helpers/utils/utilsValidator";
import { waitControlHide, waitControlShow } from "../components/Controls/WaitControl/waitControl";
import { isNull, isUndefined } from 'lodash';

const urlBase = 'https://localhost:7013/api/';

export const getRequestUserInfo = () =>
    sessionStorage.requestUserInfo
        ? JSON.parse(sessionStorage.requestUserInfo)
        : null;

export const objectParametize = (obj, q = false, parent = '') => {
    const str = [];
    const delimiter = '&';

    Object.keys(obj).forEach(key => {
        const value = obj[key];
        const currentKey = parent ? `${parent}.${key}` : key;

        if (value !== null && typeof value === 'object') {
            if (Array.isArray(value)) {
                value.forEach(arrObject => {
                    if (typeof arrObject === 'string' || typeof arrObject === 'number') {
                        str.push(`${currentKey}=${arrObject}`);
                    } else {
                        str.push(objectParametize(arrObject, false, currentKey));
                    }
                });
            } else {
                str.push(objectParametize(value, false, currentKey));
            }
        } else if (value !== undefined) {
            str.push(`${currentKey}=${value}`);
        }
    });

    return (q ? '?' : '') + str.join(delimiter);
};

export class ApiCalls {

    static httpDelete = (
        url,
        obj,
        useWaitControl = true,
        isEvaluateMessage = true,
    ) => {
        if (useWaitControl) {
            waitControlShow();
        }
        const request = {
            ...obj,
            RequestUserInfo: getRequestUserInfo(),
        };
        return fetch(`${urlBase}${url}`, {
            method: 'DELETE',
            body: JSON.stringify(request),
            headers: {
                'Content-type': 'application/json',
                authorization: `Bearer ${sessionStorage.access_token}`,
            },
        })
            .catch(error => {
                if (useWaitControl) {
                    waitControlHide();
                }
                toast.error(error.message);
            })
            .then(response => {
                if (isUndefined(response) || isNull(response)) {
                    return response;
                }
                if (response && response.status && response.status === 404) {
                    return response;
                }
                if (response.stack || response.TypeError) {
                    return response;
                }
                return response.json();
            })
            .then(response => {
                if (useWaitControl) {
                    waitControlHide();
                }
                return isEvaluateMessage ? showValidationMessage(response) : response;
            });
    };

    static httpPut = (
        url,
        obj,
        useWaitControl = true,
        isEvaluateMessage = true,
    ) => {
        if (useWaitControl) {
            waitControlShow();
        }
        const request = {
            ...obj,
            RequestUserInfo: getRequestUserInfo(),
        };
        return fetch(`${urlBase}${url}`, {
            method: 'PUT',
            body: JSON.stringify(request),
            headers: { 'Content-type': 'application/json' },
        })
            .catch(error => {
                if (useWaitControl) {
                    waitControlHide();
                }
                toast.error(error.message);
            })
            .then(response => {
                if (isUndefined(response) || isNull(response)) {
                    return response;
                }
                if (response && response.status && response.status === 404) {
                    return response;
                }
                if (response.stack || response.TypeError) {
                    return response;
                }
                return response.json();
            })
            .then(response => {
                if (useWaitControl) {
                    waitControlHide();
                }
                return isEvaluateMessage ? showValidationMessage(response) : response;
            });
    };

    static httpGet = (
        url,
        obj,
        useWaitControl = true,
        isEvaluateMessage = true,
    ) => {
        if (useWaitControl) {
            waitControlShow();
        }
        const request = {
            ...obj,
            RequestUserInfo: getRequestUserInfo(),
        };
        let urlparam;
        if (request) {
            urlparam = `&${objectParametize(request, false)}`;
        }
        const paramUrl = `${url}?format=json${urlparam}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${sessionStorage.access_token}`,
            },
        };
        return fetch(`${urlBase}${paramUrl}`, options)
            .catch(error => {
                if (useWaitControl) {
                    waitControlHide();
                }
                toast.error(error.message);
                return error;
            })
            .then(response => {
                if (isUndefined(response) || isNull(response)) {
                    return response;
                }
                if (response && response.status && response.status === 404) {
                    return response;
                }
                if (response.stack || response.TypeError) {
                    return response;
                }
                return response.json();
            })
            .then(response => {
                if (useWaitControl) {
                    waitControlHide();
                }
                if (response && response.status && response.status === 404) {
                    toast.error(response.statusText);
                    return response;
                }
                return isEvaluateMessage ? showValidationMessage(response) : response;
            });
    };

    static httpPost = (
        url,
        obj,
        useWaitControl = true,
        isEvaluateMessage = true,
    ) => {
        if (useWaitControl) {
            waitControlShow();
        }
        const requestUserInfo = getRequestUserInfo();
        const request = {
            ...obj,
            requestUserInfo,
        };
        return fetch(`${urlBase}${url}`, {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-type': 'application/json',
                authorization: `Bearer ${sessionStorage.access_token}`,
            },
        })
            .catch(error => {
                if (useWaitControl) {
                    waitControlHide();
                }
                toast.error(error.message);
            })
            .then(response => {
                if (isUndefined(response) || isNull(response)) {
                    return response;
                }
                if (response && response.status && response.status === 404) {
                    return response;
                }
                if (response.stack || response.TypeError) {
                    return response;
                }
                return response.json();
            })
            .then(response => {
                if (useWaitControl) {
                    waitControlHide();
                }
                return isEvaluateMessage ? showValidationMessage(response) : response;
            });
    };

    static GetTokenAuthentication = (
        url,
        request,
        activeWaitControl = true,
        isEvaluateMessage = true,
    ) => {
        if (activeWaitControl) {
            waitControlShow();
        }

        const formData = new URLSearchParams();
        formData.append('grant_type', 'password');
        formData.append('usuarioId', request.userName);
        formData.append('password', request.password);

        return fetch(`${urlBase}${url}`, {
            method: 'POST',
            body: formData.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(response => {
                //TODO Validations

                if (response && response.status && response.status === 404) {
                    return response;
                }

                if (response.stack || response.TypeError) {
                    return response;
                }

                return response.json();
            }).then(response => {
                if (activeWaitControl) {
                    waitControlHide();
                }

                return isEvaluateMessage ? showValidationMessage(response) : response;
            })
    }
}

const showValidationMessage = (response) => {
    if (response) {
        if (!utilsValidator.isNullOrEmpty(response.message)) {
            toast.warn(response.message);
        }
        if (!utilsValidator.isNullOrEmpty(response.ValidationErrorMessage)) {
            toast.warn(response.ValidationErrorMessage);
        }
        if (!utilsValidator.isNullOrEmpty(response.SuccessMessage)) {
            toast.success(response.SuccessMessage);
        }
    }
    return response;
}