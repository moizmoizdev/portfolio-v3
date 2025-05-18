# Portfolio Backend - Database

This branch contains the database models and connection configuration for the portfolio API.

## Database Structure

### Models

#### Education
- institution (String, required)
- degree (String, required)
- fieldOfStudy (String, required)
- startDate (Date, required)
- endDate (Date)
- current (Boolean, default: false)
- description (String)
- createdAt (Date, default: now)

#### Skill
- name (String, required, unique)
- proficiency (String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], required)
- category (String, enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Other'], required)
- icon (String)
- featured (Boolean, default: false)
- createdAt (Date, default: now)

#### Project
- title (String, required)
- description (String, required)
- technologies (Array of Strings, required)
- imageUrl (String)
- githubUrl (String)
- liveUrl (String)
- featured (Boolean, default: false)
- startDate (Date)
- endDate (Date)
- createdAt (Date, default: now)

#### Experience
- company (String, required)
- position (String, required)
- location (String)
- description (String, required)
- responsibilities (Array of Strings)
- startDate (Date, required)
- endDate (Date)
- current (Boolean, default: false)
- createdAt (Date, default: now)

## Setup

1. Install dependencies:
```
npm install
```

2. Set up environment variables in `.env`:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
```

3. Start the server:
```
npm run dev
``` 