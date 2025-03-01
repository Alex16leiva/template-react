export class utilsValidator {
    static isWhiteSpace = str => {
        return !str || /^\s*$/.test(str);
    };

    static isNullOrEmpty = text => {
        return (
            text === undefined ||
            text === null ||
            text === '' ||
            utilsValidator.isWhiteSpace(text)
        );
    };

    static isUndefined = obj => {
        return (typeof (obj) === 'undefined');
    }

    static isNull = obj => {
        return obj === null;
    }
}