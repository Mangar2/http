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
import { Agent, IncomingHttpHeaders, request as httpRequest } from 'http';
import { request as httpsRequest } from 'https';
export type ServiceType = typeof httpRequest | typeof httpsRequest;
export interface Response {
    statusCode: number;
    headers: IncomingHttpHeaders;
    payload: string;
    runtime: number;
}
export type SendOptions = {
    path: string;
    method: string;
    payload?: unknown;
    headers?: IncomingHttpHeaders;
    type?: string;
};
/**
 * @private
 * @description
 * Class simplifying access to the node http service for http clients
 * @param {string} host host name or ip address
 * @param {string|number} port port number
 * @example
 * const client = new HttpClient('myhost', 10000);
 * client.send('info/getdata/1', 'GET', {}, {'Content-Type': 'text/plain'})
 */
export declare class Client {
    private host;
    private port;
    private requests;
    private nextRequestId;
    private _agent;
    constructor(host: string, port: number | string);
    /**
     * @type Agent
     * Agent for http/https connections
     */
    set agent(agent: Agent | undefined);
    get agent(): Agent | undefined;
    /**
     * Sets host name and port number
     * @param {string} host host name
     * @param {string|number} port port number
     */
    setConnection(host: string, port: number | string): void;
    /**
     * Calculate the length of a string in bytes, handling utf8-characters
     * @private
     * @param {string} s string to calculate its length for
     * @returns {number}
     */
    private _calculateStringLengthInBytes;
    /**
     * Sends data. Adds a content-type element to the header and stringifies the body based on the type
     * @param {SendOptions} sendOptions All information required for sending.
     * @param {ServiceType} service Http(s) service to use for sending data.
     * @returns {Promise<Response>} Promise; resolve = {statusCode, headers, payload}.
     */
    sendv2(sendOptions: SendOptions, service: ServiceType): Promise<Response>;
    /**
     * Sends a request to a specified path using the given method, payload, headers, and service.
     * @param {string} path The path to send the request to.
     * @param {string} method The Http method to use for the request.
     * @param {any} payload The payload to send with the request.
     * @param {IncomingHttpHeaders} headers The headers to send with the request.
     * @param {ServiceType} service The service to use for sending the request (Http or HttpS).
     * @returns {Promise<Response>} The response from the request.
     */
    send(path: string, method: string, payload: unknown, headers: IncomingHttpHeaders, service: ServiceType): Promise<Response>;
    /**
     * Aborts all open requests
     * @returns promise, resolved once all connections are closed
     */
    close(): Promise<void>;
}
