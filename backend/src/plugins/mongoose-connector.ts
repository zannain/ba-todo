import fastifyPlugin from 'fastify-plugin';
import mongoose from 'mongoose';
import { FastifyInstance } from 'fastify';

interface MongooseConnectorOptions {
  uri?: string;
}

async function mongooseConnector(
  fastify: FastifyInstance,
  options: MongooseConnectorOptions
): Promise<void> {
  const uri = options.uri || process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MongoDB URI is not defined in environment variables or plugin options');
  }

  try {
    await mongoose.connect(uri);

    // Add mongoose to Fastify instance
    fastify.decorate('mongoose', mongoose);

    // Close mongoose connection when fastify closes
    fastify.addHook('onClose', async (instance) => {
      await mongoose.connection.close();
    });

    fastify.log.info('Connected to MongoDB with Mongoose');
  } catch (error) {
    fastify.log.error('Error connecting to MongoDB with Mongoose:', error);
    throw error;
  }
}

export default fastifyPlugin(mongooseConnector);