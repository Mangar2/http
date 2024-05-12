/**
 * @license
 * This software is licensed under the GNU LESSER GENERAL PUBLIC LICENSE Version 3. It is furnished
 * "as is", without any support, and with no warranty, express or implied, as to its usefulness for
 * any purpose.
 *
 * @author Volker Böhm
 * @copyright Copyright (c) 2020 Volker Böhm
 */

'use strict';

import { HttpClient, EchoServer } from '../dist/index.js';
import { TestRun, getDirectory } from '@mangar2/utils';

const VERBOSE = false;
const DEBUG = false;

const testRun = new TestRun(VERBOSE, DEBUG);
const echoServer = new EchoServer(0);
echoServer.run();

testRun.on('prepare', async (testcase) => {
    const client = new HttpClient('localhost', echoServer.port, testcase.type);
    return client;
});

const run = async (test, testObject) => {
    const client = testObject;
    const { path, method, payload, headers } = test.options;
    const callResult = await client.sendv2({ path, method, payload, headers });
    let callPayload;
    if (callResult.headers['content-type'] === 'application/json') {
        callPayload = JSON.parse(callResult.payload);
        if (test.options.type === 'json') {
            callPayload.payload = JSON.parse(callPayload.payload);
        }
    } else {
        callPayload = callResult.payload;
    }
    return callPayload;
};

testRun.on('run', run);

testRun.on('break', async (test, testObject) => {
    return run(test, testObject);
});

testRun.on('cleanup', async () => {
    echoServer.stop();
});

export default async () => testRun.asyncRun(['test-http-cases'], getDirectory(import.meta.url), 6, 'js');
