import { Server } from './server.js';
/**
 * Represents an Http server for handling Http requests.
 */
export class HttpServer {
    /**
     * Initializes a new instance of the HttpServer.
     * @param {number} port The port on which the server will listen.
     */
    constructor(port) {
        this._server = new Server(port);
    }
    /**
     * Gets the address information of the server.
     * @returns { AddressInfo | undefined } Address information or undefined if server is not started.
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
     * Starts the Http server to listen for requests.
     */
    listen() {
        this._server.listen(false);
    }
    /**
     * Stops the server from accepting new connections and closes existing ones.
     * @returns {Promise<void>} A promise that resolves when the server is closed.
     */
    close() {
        return this._server.close();
    }
}
//# sourceMappingURL=httpserver.js.map