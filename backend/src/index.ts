import express from 'express';
import tasksController from './controllers/tasksController';
import { connectDB, disconnectDB } from './config/db';
import cors from 'cors';
import cron from 'node-cron';
import { runCronForRecurrentTaskGeneration } from './services/cronService';

const app = express();
const PORT = process.env.PORT || 3000;

const initializeDatabase = async () => {
  await connectDB();
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use('/api/tasks', tasksController);

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

const startServer = async () => {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}/api`);
    });
    
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('Shutting down server...');
      await disconnectDB();
      process.exit(0);
    });

  } catch (error) {
    console.error('Error while starting the server', error);
    process.exit(1);
  }
}

cron.schedule('* * * * *', () => runCronForRecurrentTaskGeneration())

startServer();