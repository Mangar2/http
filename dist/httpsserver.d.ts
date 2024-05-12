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
import https from 'https';
import { HttpCallback, HookCallback } from './server.js';
import { AddressInfo } from 'net';
/**
 * Represents an HttpS server for handling Http requests securely.
 */
export declare class HttpsServer {
    private _server;
    private _options;
    /**
     * Initializes a new instance of the HttpSServer.
     * @param {number} port The port on which the server will listen.
     * @param {string} key The SSL key for HttpS.
     * @param {string} cert The SSL certificate for HttpS.
     */
    constructor(port: number, key: string, cert: string);
    /**
     * Gets the address information of the server.
     * @returns {AddressInfo | undefined} Address information or undefined if server is not started.
     */
    get address(): AddressInfo | undefined;
    /**
     * Registers an event callback for the server.
     * @param event The name of the events (e.g., 'GET', 'POST').
     * @param callback The callback function to handle the event.
     */
    on(event: string | string[], callback: HttpCallback | HookCallback): void;
    /**
     * Starts the HttpS server to listen for requests.
     * @param {https.ServerOptions} options The HttpS server options.
     */
    listen(options?: https.ServerOptions): void;
    /**
     * Stops the server from accepting new connections and closes existing ones.
     * @returns {Promise<void>} A promise that resolves when the server is closed.
     */
    close(): Promise<void>;
}
