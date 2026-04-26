# Backend Boilerplate

This backend is built with Express and MongoDB using Mongoose.

## Setup

1. Copy `.env.example` to `.env`
2. Set `MONGODB_URI` and optionally `PORT`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server in development:
   ```bash
   npm run dev
   ```

## API

- `GET /api/devotees`
- `POST /api/devotees`
- `GET /api/devotees/:id`
- `PUT /api/devotees/:id`
- `DELETE /api/devotees/:id`
