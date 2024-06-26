/**
 * @license
 * This software is licensed under the GNU LESSER GENERAL PUBLIC LICENSE Version 3. It is furnished
 * "as is", without any support, and with no warranty, express or implied, as to its usefulness for
 * any purpose.
 *
 * @author Volker Böhm
 * @copyright Copyright (c) 2020 Volker Böhm
 */
import { shutdown, Types } from '@mangar2/utils';
import { HttpServer } from './index.js';
/**
 * EchoServer class that echoes back requests.
 */
export class EchoServer {
    /**
     * Constructs an EchoServer instance.
     * @param {number} port The port number for the server.
     */
    constructor(port) {
        this._server = new HttpServer(port);
        this._running = false;
        this.inputs = [];
    }
    /**
     * Gets the port number of the server.
     * @return {number | undefined} The port number.
     */
    get port() {
        var _a, _b;
        return (_b = (_a = this._server) === null || _a === void 0 ? void 0 : _a.address) === null || _b === void 0 ? void 0 : _b.port;
    }
    /**
     * Checks, if the server is running
     * @return {boolean} True, if the server is running
     */
    get running() {
        return this._running;
    }
    /**
     * Handles echoing of requests.
     * @param {string} method The Http method of the request.
     * @param {string} payload The payload of the request.
     * @param {RequestHeaders} headers The headers of the request.
     * @param {string} path The path of the request.
     * @param {ServerResponse} res The response object.
     */
    async echo({ method, payload, headers, params, path, res }) {
        if (!Types.isString(payload)) {
            res.writeHead(500, {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            });
            res.end('Invalid payload type');
            return;
        }
        const input = {
            method,
            payload,
            headers,
            param: params.toString(),
            path
        };
        this.inputs.push(input);
        const result = {
            statusCode: 200,
            body: JSON.stringify(input)
        };
        res.writeHead(result.statusCode, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        });
        res.end(result.body);
    }
    /**
     * Starts the EchoServer.
     */
    run() {
        this._running = true;
        shutdown(async () => {
            await this._server.close();
            process.exit(0);
        });
        this._server.on(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], async (params) => {
            this.echo(params);
        });
        this._server.on('listen', () => {
            console.log('listening');
        });
        this._server.on('closed', () => {
            console.log('server closed');
        });
        this._server.listen();
    }
    async stop() {
        this._running = false;
        await this._server.close();
    }
}
//# sourceMappingURL=echo-server.js.map