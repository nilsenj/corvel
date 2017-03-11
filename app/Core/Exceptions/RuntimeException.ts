import {Error} from "tslint/lib/error";
import {ErrorHandlers} from "../../Concretes/ErrorHandlers";

export class RuntimeException extends ErrorHandlers{

    public constructor(message: string) {
        super(message);
    }

    /**
     * default error code to be used for raising
     * exceptions
     *
     * @return {Number}
     */
    static get defaultErrorCode() {
        return 500;
    }

    /**
     * this exception is thrown when a route action is referenced
     * inside a view but not registered within the routes file.
     *
     * @param  {String} action
     * @param  {Number} [code=500]
     *
     * @return {Object}
     */
    static missingRouteAction(action, code) {
        return new RuntimeException(`The action ${action} has not been found`);
    }

    /**
     * this exception is thrown when a route is referenced inside
     * a view but not registered within the routes file.
     *
     * @param  {String} route
     * @param  {Number} [code=500]
     *
     * @return {Object}
     */
    static missingRoute(route, code) {
        return new this(`The route ${route} has not been found`);
    }

    /**
     * this exceptions is raised when mac is invalid when
     * trying to encrypt data
     *
     * @param  {Number} [code=500]
     *
     * @return {Object}
     */
    static invalidEncryptionMac(code) {
        return new this('The MAC is invalid');
    }

    /**
     * this exception is raised when encryption payload is not valid
     *
     * @param  {Number} [code=500]
     *
     * @return {Object}
     */
    static invalidEncryptionPayload(code) {
        return new this('The payload is invalid');
    }

    /**
     * this exception is raised when expected value is
     * not a valid json object.
     *
     * @param  {Number} [code=500]
     *
     * @return {Object}
     */
    static malformedJSON(code) {
        return new this('The payload is not a json object');
    }

    /**
     * this exception is raised when an operation is attempted
     * on a file that has been deleted
     *
     * @param  {Number} [code=500]
     *
     * @return {Object}
     */
    static fileDeleted(code) {
        return new this('The file has already been deleted');
    }

    /**
     * this exception is raised when encryption class is not
     * able to decrypt a given piece of data
     *
     * @param  {Number} [code=500]
     *
     * @return {Object}
     */
    static decryptFailed(code) {
        return new this('Could not decrypt the data');
    }

    /**
     * this exception is raised when the encryption cipher is
     * not supported or app key length is not in-sync with
     * given cipher
     *
     * @param  {Number} [code=500]
     *
     * @return {Object}
     */
    static invalidEncryptionCipher(code) {
        return new this('The only supported ciphers are AES-128-CBC and AES-256-CBC with the correct key lengths');
    }

    /**
     * this exception is raised when app key is missing
     * inside config/app.js file.
     *
     * @param  {String} message
     * @param  {Number} [code=500]
     *
     * @return {Object}
     */
    static missingAppKey(message, code) {
        return new this(message);
    }

    /**
     * this exception is raised when an uknown
     * session driver is used
     *
     * @param  {String} driver
     * @param  {Number} [code=500]
     *
     * @return {Object}
     */
    static invalidSessionDriver(driver, code) {
        return new this(`Unable to locate ${driver} session driver`);
    }

    /**
     * this exception is raised when a named middleware is used
     * but not registered
     *
     * @param  {String} name
     * @param  {Number} [code=500]
     *
     * @return {Object}
     */
    static missingNamedMiddleware(name, code) {
        return new this(`${name} is not registered as a named middleware`);
    }

}

export class InvalidArgumentException extends ErrorHandlers {

    /**
     *
     * @param message
     * @param status
     * @param code
     */
    public constructor(message: string) {
        super(message);
    }

    /**
     * default error code to be used for raising
     * exceptions
     *
     * @return {Number}
     */
    static get defaultErrorCode() {
        return 500
    }

    /**
     * this exception is raised when a method parameter is
     * missing but expected to exist.
     *
     * @param  {String} message
     * @param  {Number} [code=500]
     *
     * @return {Object}
     */
    static missingParameter(message, code) {
        return new InvalidArgumentException(message)
    }

    /**
     * this exception is raised when a method parameter value
     * is invalid.
     *
     * @param  {String} message
     * @param  {Number} [code=500]
     *
     * @return {Object}
     */
    static invalidParameter(message, code) {
        return new InvalidArgumentException(message)
    }

    /**
     * this exception is raised when unable to find
     * an event with a given name
     *
     * @param  {String} event
     * @param  {String} name
     * @param  {Number} [code=500]
     *
     * @return {Object}
     */
    static missingEvent(event, name, code) {
        return new InvalidArgumentException(`Cannot find an event with ${name} name for ${event} event`)
    }

}