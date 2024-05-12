export default [
    {
        description: 'first',
        type: 'http',
        tests: [
            {
                description: 'GET',
                options: {
                    path: '/hello/world?a=b&b=c',
                    method: 'GET',
                    payload: '',
                    headers: { yes: 'no', connection: 'close' }
                },
                expected: {
                    method: 'GET',
                    path: '/hello/world',
                    headers: { yes: 'no', 'content-length': '0', connection: 'close' },
                    param: 'a=b&b=c'
                }
            },
            {
                description: 'PASTE',
                options: {
                    path: '/hello/world',
                    method: 'POST',
                    payload: {
                        a: 'abcdefghijklmnopqrstuvwxyzäüöß',
                        b: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        c: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        d: 'dabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        e: 'eabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        f: 'fabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        g: 'gabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        h: 'habcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        i: 'habcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'
                    },
                    headers: { yes: 'no', connection: 'keep-alive' },
                    type: 'json'
                },
                expected: {
                    method: 'POST',
                    path: '/hello/world',
                    headers: { yes: 'no', 'content-length': '1274', connection: 'keep-alive' },
                    payload: {
                        a: 'abcdefghijklmnopqrstuvwxyzäüöß',
                        b: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        c: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        d: 'dabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        e: 'eabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        f: 'fabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        g: 'gabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        h: 'habcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
                        i: 'habcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'
                    }
                }
            },
            {
                description: 'PUT',
                options: {
                    path: '/hello',
                    method: 'PUT',
                    payload: 'öüäß'
                },
                expected: {
                    method: 'PUT',
                    path: '/hello',
                    headers: { 'content-length': '8' },
                    payload: 'öüäß'
                }
            },
            {
                description: 'PATCH',
                options: {
                    path: '/hello',
                    method: 'PATCH',
                    payload: 'a=b&a=c&d=e',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' }
                },
                expected: {
                    method: 'PATCH',
                    path: '/hello',
                    headers: { 'content-type': 'application/x-www-form-urlencoded', 'content-length': '11' },
                    payload: 'a=b&a=c&d=e'
                }
            },
            {
                description: 'OPTIONS',
                options: {
                    path: '/hello',
                    method: 'OPTIONS',
                    payload: 'a=b&a=c&d=e',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' }
                },
                expected: {
                    method: 'OPTIONS',
                    path: '/hello',
                    headers: { 'content-type': 'application/x-www-form-urlencoded', 'content-length': '11' },
                    payload: 'a=b&a=c&d=e'

                }
            },
            {
                description: 'UNKNOWN',
                options: {
                    path: '/hello',
                    method: 'TRACE',
                    payload: 'a=b&a=c&d=e',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' }
                },
                expected: 'unknown method trace'
            }
        ]
    }
];
