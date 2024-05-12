<!-- This file is generated by jsmddoc version 0.1 -->

# Abstract

Provides simple http/https client and server classes

## Contents

- [Meta](#Meta)
- [Global Functions](#Global-functions)
  - [echo](#echo)
  - [run](#run)
- [Class HttpClient](#Class-HttpClient)
  - [Parameters](#HttpClient-Parameters)
  - [Members](#HttpClient-Members)
  - [Methods](#HttpClient-Methods)
    - [close](#close)
    - [getRequest](#getRequest)
    - [post](#post)
    - [put](#put)
    - [send](#send)
    - [sendv2](#sendv2)
    - [setConnection](#setConnection)
- [Class HttpSClient](#Class-HttpSClient)
  - [Parameters](#HttpSClient-Parameters)
  - [Methods](#HttpSClient-Methods)
    - [close](#close)
    - [getRequest](#getRequest)
    - [post](#post)
    - [put](#put)
    - [send](#send)
    - [sendv2](#sendv2)
- [Class HttpSServer](#Class-HttpSServer)
  - [Parameters](#HttpSServer-Parameters)
  - [Members](#HttpSServer-Members)
  - [Methods](#HttpSServer-Methods)
    - [close](#close)
    - [listen](#listen)
    - [on](#on)
- [Class HttpServer](#Class-HttpServer)
  - [Parameters](#HttpServer-Parameters)
  - [Members](#HttpServer-Members)
  - [Methods](#HttpServer-Methods)
    - [close](#close)
    - [listen](#listen)
    - [on](#on)

## Meta

| | |
| --- | --- |
| **File** | httpservice.js |
| **Abstract** | Provides simple http/https client and server classes |
| **Author** | Volker Böhm |
| **Copyright** | Copyright ( c ) 2020 Volker Böhm |
| **License** | This software is licensed under the GNU LESSER GENERAL PUBLIC LICENSE Version 3 . It is furnished "as is" , without any support , and with no warranty , express or implied , as to its usefulness for any purpose . |

## Callback definitions

### HttpGetCallback

Callback for Http ( S ) GET requests

#### HttpGetCallback Parameters

| Name | Type | Description |
| ---------- | ------------ | ----------------- |
| `params` | `URLSearchParams` | Search parameter of the GET URL | |
| `headers` | `Object` | headers | |
| `path` | `string` | path name ( without search parameters ) | |
| `res` | `Object` | http ( s ) res structure | |

### HttpCallback

Callback for Http ( S ) put , post , patch , delete , listen , or closed requests

#### HttpCallback Parameters

| Name | Type | Description |
| ---------- | ------------ | ----------------- |
| `payload` | `string` | http payload ( maybe stringified JSON ) | |
| `headers` | `Object` | headers | |
| `path` | `string` | path name ( without search parameters ) | |
| `res` | `Object` | http ( s ) res structure | |

## Global functions

### echo

`async echo (method, header, payload, path, res)`

Handles a post request

#### echo Parameters

| Name | Type | Description |
| ---------- | ------------ | ----------------- |
| `method` | `string` | method name | |
| `header` | `object` | header of the sender | |
| `payload` | `string` | object payload | |
| `path` | `string` | path of the request | |
| `res` | `object` | result object | |

### run

`run ()`

Starts the server

## Class HttpClient

`new HttpClient(host, port, type)`

Class simplifying access to the node http service for http clients

### Example

```javascript
const client = new HttpClient('myhost', 10000);
client.sendv2({ path: 'info/getdata/1', method: 'GET' })
client.post({ path: 'postdata/1', payload={info: 'hello world')}, type='json' })
client.get('info/getdata/1')
```

### HttpClient Parameters

| Name | Type | Attribute | Default | Description |
| ---------- | ------------ | ------------ | ------------ | ----------------- |
| `host` | `string` |  |  | host name or ip address | |
| `port` | `string, number` |  |  | port number | |
| `type` | `string` | optional | 'http' | either 'http' or 'https' for http/https clients | |

### HttpClient Members

| Name | Type | description |
| ------------ | ------------ | ------------ |
| `agent` | `` | @description |

### HttpClient Methods

#### close

`close () => {promise}`

Aborts all open requests

##### close returns

| Type | Description |
| ---- | ----------- |
| `promise` | , resolved once all connections are closed |

#### getRequest

`getRequest (path, headers) => {Promise<{statusCode, headers, payload}`

Sends a get request

##### getRequest Parameters

| Name | Type | Attribute | Default | Description |
| ---------- | ------------ | ------------ | ------------ | ----------------- |
| `path` | `string` |  |  | http path | |
| `headers` | `object` | optional | { } | header to send | |

##### getRequest returns

| Type | Description |
| ---- | ----------- |
| `Promise<{statusCode, headers, payload` | > } Promise; resolve = { statusCode , headers , payload } |

#### post

`post (sendOptions, type) => {Promise<{statusCode, headers, payload}`

Sends a post request

##### post Parameters

| Name | Type | Attribute | Description |
| ---------- | ------------ | ------------ | ----------------- |
| `sendOptions` | `object` |  | all information required for sending | |
| `type` | `string` | optional | type of the payload data : html , text , json , form , xml | |

#### sendOptions properties

| Name | Type | Attribute | Default | Description |
| ---------- | ------------ | ------------ | ------------ | ----------------- |
| `path` | `string` |  |  | http path | |
| `payload` | `object` | optional |  | payload to send | |
| `headers` | `object` | optional | { } | header to send | |

##### post returns

| Type | Description |
| ---- | ----------- |
| `Promise<{statusCode, headers, payload` | > } Promise; resolve = { statusCode , headers , payload } |

#### put

`put (sendOptions, type) => {Promise<{statusCode, headers, payload}`

Sends a put request

##### put Parameters

| Name | Type | Attribute | Description |
| ---------- | ------------ | ------------ | ----------------- |
| `sendOptions` | `object` |  | all information required for sending | |
| `type` | `string` | optional | type of the payload data : html , text , json , form , xml | |

#### sendOptions properties

| Name | Type | Attribute | Default | Description |
| ---------- | ------------ | ------------ | ------------ | ----------------- |
| `path` | `string` |  |  | http path | |
| `payload` | `object` | optional |  | payload to send | |
| `headers` | `object` | optional | { } | header to send | |

##### put returns

| Type | Description |
| ---- | ----------- |
| `Promise<{statusCode, headers, payload` | > } Promise; resolve = { statusCode , headers , payload } |

#### send

`send (path, method, payload, headers) => {Promise<{statusCode, headers, payload}`

Sends data . A payload of type "object" is automatically stringified , a string is not

##### send Parameters

| Name | Type | Attribute | Default | Description |
| ---------- | ------------ | ------------ | ------------ | ----------------- |
| `path` | `string` |  |  | http path | |
| `method` | `string` |  |  | http send method PUT , GET , . . . | |
| `payload` | `string, object` |  |  | payload to send | |
| `headers` | `object` | optional | { } | header to send | |

##### send returns

| Type | Description |
| ---- | ----------- |
| `Promise<{statusCode, headers, payload` | > } Promise; resolve = { statusCode , headers , payload } |

#### sendv2

`sendv2 (sendOptions, type) => {Promise<{statusCode, headers, payload}`

Sends data . Adds a content-type element to the header and stringifies the boy based on the type

##### sendv2 Parameters

| Name | Type | Attribute | Description |
| ---------- | ------------ | ------------ | ----------------- |
| `sendOptions` | `object` |  | all information required for sending | |
| `type` | `string` | optional | type of the payload data : html , text , json , form , xml | |

#### sendOptions properties

| Name | Type | Attribute | Default | Description |
| ---------- | ------------ | ------------ | ------------ | ----------------- |
| `path` | `string` |  |  | http path | |
| `method` | `string` |  |  | http send method PUT , GET , . . . | |
| `payload` | `object` | optional |  | payload to send | |
| `headers` | `object` | optional | { } | header to send | |

##### sendv2 returns

| Type | Description |
| ---- | ----------- |
| `Promise<{statusCode, headers, payload` | > } Promise; resolve = { statusCode , headers , payload } |

#### setConnection

`setConnection (host, port)`

Sets host name and port number

##### setConnection Parameters

| Name | Type | Description |
| ---------- | ------------ | ----------------- |
| `host` | `string` | host name | |
| `port` | `string` | port number | |

## Class HttpSClient

`new HttpSClient(host, port)`

Class simplifying access to the node http service for http clients

### Example

```javascript
client.sendv2({ path: 'info/getdata/1', method: 'GET' })
client.post({ path: 'postdata/1', payload={info: 'hello world')}, type='json' })
client.get('info/getdata/1')
```

### HttpSClient Parameters

| Name | Type | Description |
| ---------- | ------------ | ----------------- |
| `host` | `string` | host name or ip address | |
| `port` | `string, number` | port number | |

### HttpSClient Methods

#### close

`close () => {promise}`

Aborts all open requests

##### close returns

| Type | Description |
| ---- | ----------- |
| `promise` | resolved once all connections are closed |

#### getRequest

`getRequest (path, headers) => {Promise<{statusCode, headers, payload}`

Sends a get request

##### getRequest Parameters

| Name | Type | Attribute | Default | Description |
| ---------- | ------------ | ------------ | ------------ | ----------------- |
| `path` | `string` |  |  | http path | |
| `headers` | `object` | optional | { } | header to send | |

##### getRequest returns

| Type | Description |
| ---- | ----------- |
| `Promise<{statusCode, headers, payload` | > } Promise; resolve = { statusCode , headers , payload } |

#### post

`post (sendOptions, type) => {Promise<{statusCode, headers, payload}`

Sends a post request

##### post Parameters

| Name | Type | Attribute | Description |
| ---------- | ------------ | ------------ | ----------------- |
| `sendOptions` | `object` |  | all information required for sending | |
| `type` | `string` | optional | type of the payload data : html , text , json , form , xml | |

#### sendOptions properties

| Name | Type | Attribute | Default | Description |
| ---------- | ------------ | ------------ | ------------ | ----------------- |
| `path` | `string` |  |  | http path | |
| `payload` | `object` | optional |  | payload to send | |
| `headers` | `object` | optional | { } | header to send | |

##### post returns

| Type | Description |
| ---- | ----------- |
| `Promise<{statusCode, headers, payload` | > } Promise; resolve = { statusCode , headers , payload } |

#### put

`put (sendOptions, type) => {Promise<{statusCode, headers, payload}`

Sends a put request

##### put Parameters

| Name | Type | Attribute | Description |
| ---------- | ------------ | ------------ | ----------------- |
| `sendOptions` | `object` |  | all information required for sending | |
| `type` | `string` | optional | type of the payload data : html , text , json , form , xml | |

#### sendOptions properties

| Name | Type | Attribute | Default | Description |
| ---------- | ------------ | ------------ | ------------ | ----------------- |
| `path` | `string` |  |  | http path | |
| `payload` | `object` | optional |  | payload to send | |
| `headers` | `object` | optional | { } | header to send | |

##### put returns

| Type | Description |
| ---- | ----------- |
| `Promise<{statusCode, headers, payload` | > } Promise; resolve = { statusCode , headers , payload } |

#### send

`send (path, method, payload, headers) => {Promise<{statusCode, headers, payload}`

Sends data . A payload of type "object" is automatically stringified , a string is not

##### send Parameters

| Name | Type | Attribute | Default | Description |
| ---------- | ------------ | ------------ | ------------ | ----------------- |
| `path` | `string` |  |  | http path | |
| `method` | `string` |  |  | http send method PUT , GET , . . . | |
| `payload` | `string, object` |  |  | payload to send | |
| `headers` | `object` | optional | { } | header to send | |

##### send returns

| Type | Description |
| ---- | ----------- |
| `Promise<{statusCode, headers, payload` | > } Promise; resolve = { statusCode , headers , payload } |

#### sendv2

`sendv2 (sendOptions, type) => {Promise<{statusCode, headers, payload}`

Sends data . Adds a content-type element to the header and stringifies the boy based on the type

##### sendv2 Parameters

| Name | Type | Attribute | Description |
| ---------- | ------------ | ------------ | ----------------- |
| `sendOptions` | `object` |  | all information required for sending | |
| `type` | `string` | optional | type of the payload data : html , text , json , form , xml | |

#### sendOptions properties

| Name | Type | Attribute | Default | Description |
| ---------- | ------------ | ------------ | ------------ | ----------------- |
| `path` | `string` |  |  | http path | |
| `method` | `string` |  |  | http send method PUT , GET , . . . | |
| `payload` | `object` | optional |  | payload to send | |
| `headers` | `object` | optional | { } | header to send | |

##### sendv2 returns

| Type | Description |
| ---- | ----------- |
| `Promise<{statusCode, headers, payload` | > } Promise; resolve = { statusCode , headers , payload } |

## Class HttpSServer

`new HttpSServer(port)`

Creates a http server listening to a certain port for simplifying access to the node http service Register your callbacks according to the http functions you need .

### Example

```javascript
const server = new HttpSServer(10000)
server.on('GET', (URLSearchParam, headers, path, res) => console.log(path))
const httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}
server.listen(httpsOptions)
server.close()
```

### HttpSServer Parameters

| Name | Type | Description |
| ---------- | ------------ | ----------------- |
| `port` | `number` | port to listen to | |

### HttpSServer Members

| Name | Type | description |
| ------------ | ------------ | ------------ |
| `address` | `@type` | Gets the address of the server , once listen has been called If listen has not been called yet , undefined is returned |

### HttpSServer Methods

#### close

`close () => {promise}`

Stops the server from accepting new connections and closes existing connections . Calls the callback "close" , once the server is closed .

##### close returns

| Type | Description |
| ---- | ----------- |
| `promise` | resolved , once the connection is closed |

#### listen

`listen (options)`

Creates a https server listening

##### listen Parameters

| Name | Type | Description |
| ---------- | ------------ | ----------------- |
| `options` | `Object` | additional options | |

#### on

`on (event, callback)`

Sets a callback

##### on Parameters

| Name | Type | Description |
| ---------- | ------------ | ----------------- |
| `event` | `string` | RESTful http verb ( POST , GET , PUT , PATCH , DELETE , OPTIONS ) and 'listen' ( called once listening ) and 'closed' ( called once closed ) | |
| `callback` | `HttpGetCallback, HttpCallback` | ( payload , headers , path , res ) where payload is the http payload , headers the http headers , res the result structure and path is is the http path as string | |

## Class HttpServer

`new HttpServer(port)`

Creates a http server listening to a certain port for simplifying access to the node http service Register your callbacks according to the http functions you need .

### Example

```javascript
const server = new HttpServer(10000)
server.on('GET', (URLSearchParam, headers, path, res) => console.log(path))
server.listen()
server.close()
```

### HttpServer Parameters

| Name | Type | Description |
| ---------- | ------------ | ----------------- |
| `port` | `number` | port to listen to | |

### HttpServer Members

| Name | Type | description |
| ------------ | ------------ | ------------ |
| `address` | `@type` | Gets the address of the server , once listen has been called If listen has not been called yet , undefined is returned |

### HttpServer Methods

#### close

`close () => {promise}`

Stops the server from accepting new connections and closes existing connections . Calls the callback "close" , once the server is closed .

##### close returns

| Type | Description |
| ---- | ----------- |
| `promise` | resolved , once the connection is closed |

#### listen

`listen ()`

Creates a http server listening

#### on

`on (event, callback)`

Sets a callback

##### on Parameters

| Name | Type | Description |
| ---------- | ------------ | ----------------- |
| `event` | `string` | RESTful http verb ( POST , GET , PUT , PATCH , DELETE , OPTIONS ) and 'listen' ( called once listening ) and 'closed' ( called once closed ) | |
| `callback` | `HttpGetCallback, HttpCallback` | ( payload , headers , path , res ) where payload is the http payload , headers the http headers , res the result structure and path is is the http path as string | |