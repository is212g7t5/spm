# Frontend for Learning Journey Planning System

This is the application root for the frontend system of LJPS.

## Prerequisites

- Recommended platform
    - Development: macOS Monterey (Intel)
    - Production: Linux (Ubuntu 16.04)
- Nodejs 14.x, 16.x, 18.x (v18.9.1 preferred)
    - Accompanying npm (v8.19.2 preferred)
- Running backend for data fetching **[STRONGLY RECOMMENDED]**
    - This is crucial to load any meaningful logic/data, without the backend, the application will appear as an empty shell

## Installation and Set-up

This application can be run in both `development` and `production` modes. However, they share the following set-up instructions.

### Set-up Local Directories

Clone this repository or download the files to local directory.
Open a terminal session and navigate to this application root (`.../is212g5t7-project/app`)

```bash
cd /path/to/is212g5t7-project/app
```

### Provide Environment Variables

This frontend application relies on the accompanying backend server for computation logic and data. We need to provide it the following information. Edit the backend server URL in `.env.example` using any text editor (`vi .env.example`).
    1. Replace `<>` fields with the respective information (backend server URL)
    2. Rename `.env.example` to `.env`

**Note: `.env` is automatically ignored by git`**
```bash
# Clone into a .env file
REACT_APP_API_BASE_ENDPOINT=<fill in URL>
```

### Install Dependencies

```bash
npm install
```

## Production Mode

1. Create a production build
```bash
npm run build
```

2. Install serve
```bash
npm install -g serve
```

3. Run the production build
```bash
serve -s build
```

## Development Mode

Run the application in development mode
```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
