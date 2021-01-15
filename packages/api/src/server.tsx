/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Express Imports
import express from 'express';

// Accessories Imports
import cors from 'cors';

// Dotenv Import
import * as dotenv from 'dotenv';

// Initialize Dotenv
dotenv.config();

// Initialize express application
const app = express();

// Set cors options and enable cors
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

// Listen to HTTP
const PORT = process.env.PORT ?? process.env.API_PORT;
app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT as string}`);
});
