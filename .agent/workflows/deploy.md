---
description: How to deploy the RS Promoters website
---

// turbo-all
1. Prepare Backend for Production
   - Ensure `server/index.js` uses `process.env.MONGODB_URI`
   - Ensure CORS allows the production frontend URL
   - Add a `health` check route to `server/index.js`

2. Prepare Frontend for Production
   - Extract API URL to `client/.env.production`
   - Update all `axios` calls to use `import.meta.env.VITE_API_URL`

3. Database Setup
   - Create a MongoDB Atlas cluster
   - Get the connection URI

4. Deploy Backend
   - Host on Render or Railway
   - Add `MONGODB_URI` environment variable

5. Deploy Frontend
   - Host on Vercel
   - Add `VITE_API_URL` environment variable pointing to the Backend URL
