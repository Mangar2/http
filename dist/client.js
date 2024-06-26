/**
 * @license
 * This software is licensed under the GNU LESSER GENERAL PUBLIC LICENSE Version 3. It is furnished
 * "as is", without any support, and with no warranty, express or implied, as to its usefulness for
 * any purpose.
 *
 * @author Volker Böhm
 * @copyright Copyright (c) 2020 Volker Böhm
 */
function isRecordStringString(value) {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    return Object.keys(value).every(key => typeof key === 'string' && typeof value[key] === 'string');
}
function isURLSearchParams(value) {
    return value instanceof URLSearchParams;
}
// Funktion zur sicheren Verwendung von URLSearchParams
function createURLSearchParams(input) {
    if (typeof input === 'string' || isRecordStringString(input) || isURLSearchParams(input)) {
        return new URLSearchParams(input);
    }
    else {
        throw new Error('Invalid input for URLSearchParams');
    }
}
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
export class Client {
    constructor(host, port) {
        this.host = '';
        this.port = 0;
        this.setConnection(host, port);
        this.requests = {};
        this.nextRequestId = 0;
        this._agent = undefined;
    }
    /**
     * @type Agent
     * Agent for http/https connections
     */
    set agent(agent) { this._agent = agent; }
    get agent() { return this._agent; }
    /**
     * Sets host name and port number
     * @param {string} host host name
     * @param {string|number} port port number
     */
    setConnection(host, port) {
        if (host === undefined) {
            throw new Error('No host specified');
        }
        if (port === undefined) {
            throw new Error('No port specified');
        }
        this.host = host;
        this.port = typeof port === 'string' ? parseInt(port, 10) : port;
    }
    /**
     * Calculate the length of a string in bytes, handling utf8-characters
     * @private
     * @param {string} s string to calculate its length for
     * @returns {number}
     */
    _calculateStringLengthInBytes(s) {
        const encoder = new TextEncoder();
        const encoded = encoder.encode(s);
        return encoded.length;
    }
    /**
     * Sends data. Adds a content-type element to the header and stringifies the body based on the type
     * @param {SendOptions} sendOptions All information required for sending.
     * @param {ServiceType} service Http(s) service to use for sending data.
     * @returns {Promise<Response>} Promise; resolve = {statusCode, headers, payload}.
     */
    sendv2(sendOptions, service) {
        let { path, method, payload, headers = {}, type } = sendOptions;
        if (!headers) {
            headers = {};
        }
        if (payload && type) {
            switch (type.toLowerCase()) {
                case 'html':
                    headers['Content-Type'] = 'text/html';
                    break;
                case 'text':
                    headers['Content-Type'] = 'text/plain';
                    break;
                case 'xml':
                    headers['Content-Type'] = 'application/xml';
                    break;
                case 'form':
                    payload = createURLSearchParams(payload).toString();
                    headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    break;
                case 'json':
                    payload = JSON.stringify(payload);
                    headers['Content-Type'] = 'application/json';
                    break;
            }
        }
        return this.send(path, method, payload, headers, service);
    }
    /**
     * Sends a request to a specified path using the given method, payload, headers, and service.
     * @param {string} path The path to send the request to.
     * @param {string} method The Http method to use for the request.
     * @param {any} payload The payload to send with the request.
     * @param {IncomingHttpHeaders} headers The headers to send with the request.
     * @param {ServiceType} service The service to use for sending the request (Http or HttpS).
     * @returns {Promise<Response>} The response from the request.
     */
    send(path, method, payload, headers, service) {
        const stringPayload = typeof payload === 'string' ? payload : JSON.stringify(payload);
        headers = headers || {};
        headers['content-length'] = String(this._calculateStringLengthInBytes(stringPayload));
        let startTime = 0;
        const options = {
            host: this.host,
            port: this.port,
            path,
            method,
            headers,
            agent: this.agent
        };
        const result = new Promise((resolve, reject) => {
            const requestId = this.nextRequestId++;
            const request = service(options, res => {
                let resultPayload = '';
                res.setEncoding('utf8');
                res.on('data', (chunk) => { resultPayload += chunk; });
                res.on('end', () => {
                    const runtime = Date.now() - startTime;
                    if (!res.statusCode) {
                        reject(new Error('Missing status code in Http result'));
                    }
                    else {
                        resolve({
                            statusCode: res.statusCode,
                            headers: res.headers,
                            payload: resultPayload,
                            runtime
                        });
                    }
                    delete this.requests[requestId];
                });
            });
            this.requests[requestId] = request;
            request.write(stringPayload);
            startTime = Date.now();
            request.end();
            request.on('error', (err) => {
                if (this.requests[requestId] !== undefined) {
                    delete this.requests[requestId];
                }
                reject(err);
            });
        });
        return result;
    }
    /**
     * Aborts all open requests
     * @returns promise, resolved once all connections are closed
     */
    close() {
        const result = new Promise((resolve) => {
            for (const requestId in this.requests) {
                this.requests[requestId].destroy();
            }
            resolve();
        });
        return result;
    }
}
//# sourceMappingURL=client.js.map