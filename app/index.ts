import * as http from "http";
import * as debug from "debug";
import "reflect-metadata";
import "es6-shim";
import "reflect-metadata";
import "./configs/constants";
const baseDirectory = __dirname;

debug("corvel:server");
const port = normalizePort(process.env.PORT || 3000); // setup port
import Core from "./Concretes/Core"; // import App
import {createConnection, useContainer} from "typeorm";
import {Container} from "typedi";

useContainer(Container);
createConnection({
    /// ....
});
Core.set("port", port);
Core.set("baseDirectory", baseDirectory);

/**
 * set up express Server
 */
const server = http.createServer(Core);
server.listen(port);

server.on("error", onError);
server.on("listening", onListening);
function normalizePort(val: number|string): number|string|boolean {
    let port: number = (typeof val === "string") ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") throw error;
    let bind = (typeof port === "string") ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    let addr = server.address();
    let bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}