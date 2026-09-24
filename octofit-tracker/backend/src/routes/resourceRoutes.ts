import { Router } from 'express';
import mongoose, { Model } from 'mongoose';

export function createResourceRouter(model: Model<any>) {
  const router = Router();

  router.get('/', async (_request, response) => {
    response.json(await model.find().sort({ createdAt: -1 }).exec());
  });

  router.get('/:id', async (request, response) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
      response.status(400).json({ error: 'Invalid resource id' });
      return;
    }

    const resource = await model.findById(request.params.id).exec();
    if (!resource) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.json(resource);
  });

  router.post('/', async (request, response) => {
    const resource = await model.create(request.body);
    response.status(201).json(resource);
  });

  router.patch('/:id', async (request, response) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
      response.status(400).json({ error: 'Invalid resource id' });
      return;
    }

    const resource = await model.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    }).exec();
    if (!resource) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.json(resource);
  });

  router.delete('/:id', async (request, response) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
      response.status(400).json({ error: 'Invalid resource id' });
      return;
    }

    const resource = await model.findByIdAndDelete(request.params.id).exec();
    if (!resource) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.status(204).send();
  });

  return router;
}