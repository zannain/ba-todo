import fastify, { FastifyInstance } from 'fastify';
import { config } from 'dotenv';
// import connectDB from './config/db';
import todoRoutes from './routes/todoRoutes';
import mongooseConnector from './plugins/mongoose-connector';
// Load env variables
config();

// Create the fastify instance
const server: FastifyInstance = fastify({ logger: true });

// Register plugins
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
};

server.register(mongooseConnector)
import cors from '@fastify/cors';
server.register(cors, corsOptions);

// Register routes
server.register(todoRoutes);

// Health check route
server.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date() };
});

// Start the server
const start = async (): Promise<void> => {
  try {
    const port = parseInt(process.env.PORT || '5000', 10);
    await server.listen({ port, host: '0.0.0.0' });
    server.log.info(`Server listening on ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();