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
import { ServerResponse } from 'http';
type URLSearchParams = {
    toString: () => string;
};
/**
 * EchoServer class that echoes back requests.
 */
export declare class EchoServer {
    private _server;
    private _running;
    inputs: Array<{
        method: string;
        path: string;
        headers: object;
        param?: string;
        payload?: string;
    }>;
    /**
     * Constructs an EchoServer instance.
     * @param {number} port The port number for the server.
     */
    constructor(port: number);
    /**
     * Gets the port number of the server.
     * @return {number | undefined} The port number.
     */
    get port(): number | undefined;
    /**
     * Checks, if the server is running
     * @return {boolean} True, if the server is running
     */
    get running(): boolean;
    /**
     * Handles echoing of requests.
     * @param {string} method The Http method of the request.
     * @param {string} payload The payload of the request.
     * @param {RequestHeaders} headers The headers of the request.
     * @param {string} path The path of the request.
     * @param {ServerResponse} res The response object.
     */
    echo(method: string, payload: unknown, headers: object, params: URLSearchParams, path: string, res: ServerResponse): Promise<void>;
    /**
     * Starts the EchoServer.
     */
    run(): void;
    stop(): Promise<void>;
}
export {};
