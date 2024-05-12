/**
 * @license
 * This software is licensed under the GNU LESSER GENERAL PUBLIC LICENSE Version 3. It is furnished
 * "as is", without any support, and with no warranty, express or implied, as to its usefulness for
 * any purpose.
 *
 * @author Volker Böhm
 * @copyright Copyright (c) 2020 Volker Böhm
 */
/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import * as http from 'http';
import * as https from 'https';
type ServerResponse = http.ServerResponse;
interface ServerOptions {
}
export type HttpCallbackParams = {
    method: string;
    payload: string;
    headers: http.IncomingHttpHeaders;
    params: URLSearchParams;
    path: string;
    res: ServerResponse;
};
export type HttpCallback = ({ method, payload, headers, params, path, res }: HttpCallbackParams) => void | Promise<void>;
export type HookCallback = () => void | Promise<void>;
/**
 * @private
 * @description
 * Creates a http/https server listening to a certain port for
 * simplifying access to the node http(s) service
 * Register your callbacks according to the http(s) functions you need.
 * @param {number} port port to listen to
 */
export declare class Server {
    private port;
    private sockets;
    private nextSocketId;
    server: http.Server | https.Server | undefined;
    private callbacks;
    constructor(port: number);
    /**
     * Sets a callback
     * @param {string} event RESTful http verb (POST, GET, PUT, PATCH, DELETE) and 'listen' (called once listening) and 'closed' (called once closed)
     * @param {HttpGetCallback|HttpCallback} callback(payload, headers, path, res)
     * where payload is the http payload, headers the http headers, res the result structure and path is
     * is the http path as string
     */
    on(event: string | string[], callback: HttpCallback | HookCallback): void;
    /**
     * @private
     * @description
     * Handles an error situation
     * @param {string|Error} err error message
     * @param {res} object http result structure
     */
    private onError;
    /**
     * dispatches a http request
     * @param {string} method name of the method
     * @param {Object} req request information
     * @param {Object} res http result structure
     * @param {Array} url parsed URI
     * @param {Object} body body data
     */
    private dispatch;
    /**
     * Handles incoming Http requests and dispatches them.
     * @param {http.IncomingMessage} request The incoming Http request.
     * @param {http.ServerResponse} response The server response object.
     */
    private requestHandler;
    /**
     * Creates a http server listening
     * @param {boolean} [useHttpS] true, if we use https
     * @param {Object} options additional options
     */
    listen(useHttpS?: boolean, options?: ServerOptions): void;
    /**
     * Stops the server from accepting new connections and closes existing connections.
     * Calls the callback "close", once the server is closed.
     * @returns {promise} resolved, once the connection is closed
     */
    close(): Promise<void>;
}
export {};
