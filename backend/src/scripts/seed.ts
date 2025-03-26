import mongoose from 'mongoose';
import { config } from 'dotenv';
import Todo from '../models/Todo';

// Load environment variables
config();

const todos = [
  {
    title: 'Complete project setup',
    description: 'Finish setting up MongoDB, Next.js, and Fastify',
    completed: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
  },
  {
    title: 'Learn TypeScript',
    description: 'Study TypeScript fundamentals and advanced types',
    completed: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    title: 'Build REST API',
    description: 'Create REST endpoints for the todo application',
    completed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  {
    title: 'Implement authentication',
    description: 'Add user authentication with JWT',
    completed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    title: 'Write unit tests',
    description: 'Create tests for backend and frontend components',
    completed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing todos
    await Todo.deleteMany({});
    console.log('Cleared existing todos');

    // Insert new todos
    const createdTodos = await Todo.insertMany(todos);
    console.log(`Added ${createdTodos.length} todos to the database`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Database seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();