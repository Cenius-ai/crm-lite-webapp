# Installation Guide

## 1. Prerequisites

- **Node.js 20** or later
- **npm** (bundled with Node.js)

Verify installation:

```bash
node --version
npm --version
```

## 2. Get the Code

Obtain the project files (e.g., clone the repository or download the source archive).

## 3. Install Dependencies

Run the following command in the project root:

```bash
npm install
```

## 4. Run the Development Server

Start the Angular development server:

```bash
npm run start
```

The application will be available at `http://localhost:4200`.

## 5. Build for Production

To create a production build, run:

```bash
npm run build
```

The output will be placed in the `dist/` directory.

## 6. Troubleshooting

- **Port already in use**: If port 4200 is occupied, stop the process using it or modify the `start` script in `package.json`.
- **Node version mismatch**: Make sure you are using Node.js 20 or later. Use `nvm` to manage multiple versions if needed.
- **Dependency installation errors**: Delete `node_modules` and `package-lock.json`, then run `npm install` again.