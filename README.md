# Portfolio Backend API

This API provides endpoints for managing portfolio content. It uses MongoDB for data storage and Node.js/Express for the backend.

## Database Structure

### Models

#### Education
- degree (String, required)
- school (String, required)
- years (String, required)
- location (String, required)
- about (String, required)
- highlights (Array of Strings)

#### Skill
- name (String, required, unique)
- proficiency (String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], required)
- category (String, enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Other'], required)

#### Project
- title (String, required)
- description (String, required)
- technologies (Array of Strings, required)
- imageUrl (String)
- githubUrl (String)
- liveUrl (String)

#### Experience
- company (String, required)
- position (String, required)
- location (String)
- description (String, required)
- startDate (Date, required)
- endDate (Date)
- current (Boolean, default: false)

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
=======
# portfolio-v3
>>>>>>> d181b90696c955d7d65e6520967c34bea28ddd33
