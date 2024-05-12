/**
 * @license
 * This software is licensed under the GNU LESSER GENERAL PUBLIC LICENSE Version 3. It is furnished
 * "as is", without any support, and with no warranty, express or implied, as to its usefulness for
 * any purpose.
 *
 * @author Volker Böhm
 * @copyright Copyright (c) 2020 Volker Böhm
 */
import { Server } from './server.js';
/**
 * Represents an HttpS server for handling Http requests securely.
 */
export class HttpsServer {
    /**
     * Initializes a new instance of the HttpSServer.
     * @param {number} port The port on which the server will listen.
     * @param {string} key The SSL key for HttpS.
     * @param {string} cert The SSL certificate for HttpS.
     */
    constructor(port, key, cert) {
        this._options = { key, cert };
        this._server = new Server(port);
    }
    /**
     * Gets the address information of the server.
     * @returns {AddressInfo | undefined} Address information or undefined if server is not started.
     */
    get address() {
        var _a;
        const addressInfo = (_a = this._server.server) === null || _a === void 0 ? void 0 : _a.address();
        if (typeof addressInfo === 'string' || addressInfo === null || addressInfo === undefined) {
            return undefined;
        }
        return addressInfo;
    }
    /**
     * Registers an event callback for the server.
     * @param event The name of the events (e.g., 'GET', 'POST').
     * @param callback The callback function to handle the event.
     */
    on(event, callback) {
        this._server.on(event, callback);
    }
    /**
     * Starts the HttpS server to listen for requests.
     * @param {https.ServerOptions} options The HttpS server options.
     */
    listen(options = this._options) {
        this._server.listen(true, { ...this._options, ...options });
    }
    /**
     * Stops the server from accepting new connections and closes existing ones.
     * @returns {Promise<void>} A promise that resolves when the server is closed.
     */
    close() {
        return this._server.close();
    }
}
//# sourceMappingURL=httpsserver.js.map