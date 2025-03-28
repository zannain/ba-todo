import mongoose from 'mongoose';
import { config } from 'dotenv';
import Todo from '../models/Todo';

// Load environment variables
config();

const todos = [
  {
    title: 'Decipher Dr Handwriting',
    description: 'Turn cryptic prescriptions into readable text for all',
    completed: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Waiting Room Tetris',
    description: 'Optimize schedules to dodge the 3 PM patient pile-up',
    completed: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Self-Clean Stethoscope',
    description: 'Invent a stethoscope that sanitizes itself on the go',
    completed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Train AI to Say "Hmm"',
    description: 'Add doctor-like "Hmm" to chatbot for bedside charm',
    completed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Conquer Insurance Maze',
    description: 'Map 70,000+ ICD-10 codes before coffee gets cold',
    completed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Stop Self-Diagnosis',
    description: 'Redirect WebMD fans to real doctor appointments',
    completed: false,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Clear Medical Bills',
    description: 'Make "Explanation of Benefits" actually make sense',
    completed: false,
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Edible Patient Gowns',
    description: 'Craft gowns patients can eat when cafeteria shuts',
    completed: false,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  },
  {
    title: '2-Min Patient Visit',
    description: 'Master speed-diagnosing without missing a beat',
    completed: true,
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Hide Snacks from Nurses',
    description: 'Stash the good treats away from the break room crew',
    completed: false,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Silence Beeping Machines',
    description: 'Mute the hospital alarm orchestra for sanity’s sake',
    completed: false,
    createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'New Waiting Room Mags',
    description: 'Swap old Golf Digests for fresh reading material',
    completed: false,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Decode HIPAA Fast',
    description: 'Become a privacy law expert by end of day',
    completed: false,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Fix EMR Auto-Fill',
    description: 'Stop "pregnant" suggestions for 80-year-old guys',
    completed: false,
    createdAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'No-Coffee Shift Test',
    description: 'Survive a day in healthcare without caffeine',
    completed: false,
    createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'No Googling Sign',
    description: 'Post "Don’t Google Symptoms" in every exam room',
    completed: true,
    createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Perfect Glove Snap',
    description: 'Add flair to procedures with a dramatic snap',
    completed: false,
    createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Rename Sick Days',
    description: 'Call them "Research Days" for flu-like excuses',
    completed: false,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Teleport Wheelchair',
    description: 'Beam patients to radiology, skip the halls',
    completed: false,
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Squirrel Therapy Pets',
    description: 'Train squirrels as budget-friendly therapy pals',
    completed: false,
    createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Find Missing Pens',
    description: 'Solve the mystery of vanishing good pens',
    completed: false,
    createdAt: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Therapeutic Muzak',
    description: 'Make elevator tunes calm stressed patients',
    completed: false,
    createdAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000)
  },
  {
    title: '"You’re Fine" Button',
    description: 'Add a reassurance button for nervous patients',
    completed: false,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Outrun Billing Dept',
    description: 'Submit claims before the "friendly" reminder',
    completed: true,
    createdAt: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Make Kale Lovable',
    description: 'Turn "eat healthy" into a patient favorite',
    completed: false,
    createdAt: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000)
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