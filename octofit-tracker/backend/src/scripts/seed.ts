import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Ava Martinez', email: 'ava@example.com', username: 'ava_moves', points: 320 },
      { name: 'Noah Williams', email: 'noah@example.com', username: 'noah_runs', points: 275 },
      { name: 'Mia Chen', email: 'mia@example.com', username: 'mia_lifts', points: 210 },
    ]);

    const teams = await Team.create([
      { name: 'Summit Striders', description: 'Consistent progress, one workout at a time.', members: [users[0]._id, users[1]._id] },
      { name: 'Core Command', description: 'Strength and mobility for every level.', members: [users[2]._id] },
    ]);

    await User.findByIdAndUpdate(users[0]._id, { teamId: teams[0]._id });
    await User.findByIdAndUpdate(users[1]._id, { teamId: teams[0]._id });
    await User.findByIdAndUpdate(users[2]._id, { teamId: teams[1]._id });

    await Activity.create([
      { userId: users[0]._id, type: 'Run', durationMinutes: 38, distanceKm: 6.2, points: 140, performedAt: new Date('2026-09-20') },
      { userId: users[0]._id, type: 'Strength', durationMinutes: 45, points: 180, performedAt: new Date('2026-09-22') },
      { userId: users[1]._id, type: 'Cycle', durationMinutes: 52, distanceKm: 18.5, points: 160, performedAt: new Date('2026-09-21') },
      { userId: users[1]._id, type: 'Yoga', durationMinutes: 35, points: 115, performedAt: new Date('2026-09-23') },
      { userId: users[2]._id, type: 'Strength', durationMinutes: 42, points: 125, performedAt: new Date('2026-09-22') },
      { userId: users[2]._id, type: 'Walk', durationMinutes: 30, distanceKm: 2.8, points: 85, performedAt: new Date('2026-09-23') },
    ]);

    await Leaderboard.create([
      { userId: users[0]._id, points: 320, activities: 2, rank: 1 },
      { userId: users[1]._id, points: 275, activities: 2, rank: 2 },
      { userId: users[2]._id, points: 210, activities: 2, rank: 3 },
    ]);

    await Workout.create([
      { title: 'Steady State Run', description: 'A comfortable aerobic run with a relaxed finish.', activityType: 'Run', difficulty: 'beginner', durationMinutes: 30 },
      { title: 'Full Body Foundation', description: 'Build strength with controlled, compound movements.', activityType: 'Strength', difficulty: 'intermediate', durationMinutes: 40 },
      { title: 'Reset and Restore', description: 'Ease tension with a focused mobility and breath session.', activityType: 'Yoga', difficulty: 'beginner', durationMinutes: 25 },
    ]);

    console.log('Database seeding complete: users, teams, activities, leaderboard, and workouts populated');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
