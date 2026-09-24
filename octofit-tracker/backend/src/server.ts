import express from 'express';
import { connectDatabase } from './config/database.js';
import { apiPort, getApiBaseUrl } from './config/server.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const baseUrl = getApiBaseUrl();

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

connectDatabase()
  .then(() => {
    app.listen(apiPort, () => {
      console.log(`OctoFit API listening on ${baseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Unable to start OctoFit API:', error);
    process.exit(1);
  });
