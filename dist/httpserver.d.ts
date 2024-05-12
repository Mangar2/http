/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
/**
 * @license
 * This software is licensed under the GNU LESSER GENERAL PUBLIC LICENSE Version 3. It is furnished
 * "as is", without any support, and with no warranty, express or implied, as to its usefulness for
 * any purpose.
 *
 * @author Volker Böhm
 * @copyright Copyright (c) 2020 Volker Böhm
 */
import http from 'http';
import { HookCallback, HttpCallback } from './server.js';
import { AddressInfo } from 'net';
export type ServerResponse = http.ServerResponse;
export type IncomingHttpHeaders = http.IncomingHttpHeaders;
/**
 * Represents an Http server for handling Http requests.
 */
export declare class HttpServer {
    private _server;
    /**
     * Initializes a new instance of the HttpServer.
     * @param {number} port The port on which the server will listen.
     */
    constructor(port: number);
    /**
     * Gets the address information of the server.
     * @returns { AddressInfo | undefined } Address information or undefined if server is not started.
     */
    get address(): AddressInfo | undefined;
    /**
     * Registers an event callback for the server.
     * @param event The name of the events (e.g., 'GET', 'POST').
     * @param callback The callback function to handle the event.
     */
    on(event: string | string[], callback: HttpCallback | HookCallback): void;
    /**
     * Starts the Http server to listen for requests.
     */
    listen(): void;
    /**
     * Stops the server from accepting new connections and closes existing ones.
     * @returns {Promise<void>} A promise that resolves when the server is closed.
     */
    close(): Promise<void>;
}
