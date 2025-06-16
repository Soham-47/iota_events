# IOTA Events

An event management system built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account or local MongoDB instance

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd iota_events
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   NODE_ENV=development
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Deployment

### Heroku

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Login to your Heroku account:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
4. Set up MongoDB Atlas and get your connection string
5. Set environment variables on Heroku:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   heroku config:set NODE_ENV=production
   ```
6. Deploy your code:
   ```bash
   git push heroku main
   ```

## Environment Variables

- `PORT` - The port the app will run on (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Application environment (development/production)

## Project Structure

```
.
├── public/             # Static files (CSS, JS, images)
├── views/              # EJS templates
├── app.js              # Main application file
├── package.json        # Project metadata and dependencies
└── README.md           # This file
```

## License

ISC
