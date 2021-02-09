"use strict";
/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// Express Imports
const express_1 = __importDefault(require("express"));
// HTTP Imports
const http_1 = require("http");
// Apollo Imports
const apollo_server_1 = require("./utils/apollo-server");
// Prisma Imports
const context_1 = require("./utils/context");
// GraphQL Schema & Resolvers Imports
const schema_1 = __importDefault(require("./schema"));
const resolvers_1 = __importDefault(require("./resolvers"));
// Accessories Imports
const cors_1 = __importDefault(require("cors"));
// Dotenv Import
const dotenv = __importStar(require("dotenv"));
// Initialize Dotenv
dotenv.config();
// Initialize express application
const app = express_1.default();
// Set cors options and enable cors
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
};
app.use(cors_1.default(corsOptions));
// Create an Apollo Server
const server = apollo_server_1.createApolloServer(schema_1.default, resolvers_1.default, context_1.createContext());
server.applyMiddleware({ app, path: '/graphql' });
// Create HTTP server and add subscriptions to it
const httpServer = http_1.createServer(app);
server.installSubscriptionHandlers(httpServer);
// Listen to HTTP
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : process.env.API_PORT;
httpServer.listen({ port: PORT }, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
});
