import { Router } from 'express';
import { Activity } from '../models/Activity.js';
const router = Router();
router.get('/', async (_request, response) => {
    const leaderboard = await Activity.aggregate([
        { $group: { _id: '$userId', points: { $sum: '$points' }, activities: { $sum: 1 } } },
        { $sort: { points: -1 } },
        { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
        { $project: { _id: 0, userId: '$_id', name: '$user.name', username: '$user.username', points: 1, activities: 1 } },
    ]);
    response.json(leaderboard);
});
export default router;
