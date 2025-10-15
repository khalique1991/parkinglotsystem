# Parking Frontend (Vite + React + Tailwind)

## Quick start

1. Ensure Node.js (>=18) and npm are installed.
2. In project root:
   ```bash
   npm install
   npm run dev
   ```
3. Tailwind should be configured. If you need to initialize Tailwind after npm install:
   ```bash
   npx tailwindcss init -p
   ```
   (We already include config files.)

## Features included
- React + Vite starter
- Tailwind CSS integration
- React Router setup
- Zustand basic auth store
- Axios API layer (api.js)
- Sample pages and components

## Connect to backend
Edit `src/services/api.js` to change the `baseURL` to your backend API.

