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
import { HttpServer } from './httpserver.js';
import { ServerResponse } from 'http';

// Define the callback argument types if they are known
type RequestPayload = unknown; // Adjust this type according to your actual payload structure
type RequestHeaders = Record<string, string | string[] | undefined>;
type URLSearchParams = { toString: () => string }; // Simplified type for URLSearchParams

type Input = {
    method: string;
    path: string;
    headers: object;
    param?: string;
    payload?: string;
};

/**
 * EchoServer class that echoes back requests.
 */
export class EchoServer {
    private _server: HttpServer;
    private _running: boolean;
    public inputs: Array<{ method: string; path: string; headers: object; param?: string; payload?: string }>;

    /**
     * Constructs an EchoServer instance.
     * @param {number} port The port number for the server.
     */
    constructor (port: number) {
        this._server = new HttpServer(port);
        this._running = false;
        this.inputs = [];
    }

    /**
     * Gets the port number of the server.
     * @return {number | undefined} The port number.
     */
    get port (): number | undefined {
        return this._server?.address?.port;
    }

    /**
     * Checks, if the server is running
     * @return {boolean} True, if the server is running
     */
    get running (): boolean {
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
    async echo (method: string, payload: unknown, headers: object, params: URLSearchParams, path: string, res: ServerResponse): Promise<void> {
        if (!Types.isString(payload)) {
            res.writeHead(500, {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            });
            res.end('Invalid payload type');
            return;
        }
        const input: Input = {
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
    run (): void {
        this._running = true;
        shutdown(async () => {
            await this._server.close();
            process.exit(0);
        });

        this._server.on(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            async (method: string, payload: RequestPayload, headers: RequestHeaders, params: URLSearchParams, path: string, res: ServerResponse) => {
                this.echo(method, payload, headers, params, path, res);
            });

        this._server.on('listen', () => {
            console.log('listening');
        });
        this._server.on('closed', () => {
            console.log('server closed');
        });
        this._server.listen();
    }

    async stop (): Promise<void> {
        this._running = false;
        await this._server.close();
    }
}
