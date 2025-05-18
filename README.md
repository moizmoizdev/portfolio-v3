# Portfolio Application

This is a full-stack portfolio application with a React frontend and a Node.js/Express/MongoDB backend.

## Backend API

The backend provides RESTful API endpoints for managing portfolio content:

### Models & Data Structure

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

### Backend Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```
NODE_ENV=development
PORT=5001
MONGO_URI=your_mongodb_connection_string
```

3. Seed the database (optional):
```bash
npm run seed
```

4. Start the server:
```bash
npm run dev
```

### API Endpoints

The API exposes the following endpoints:

| Resource | GET | POST | PUT | DELETE |
|----------|-----|------|-----|--------|
| /api/education | Get all education entries | Create new education | - | - |
| /api/education/:id | Get education by ID | - | Update education | Delete education |
| /api/skills | Get all skills | Create new skill | - | - |
| /api/skills/:id | Get skill by ID | - | Update skill | Delete skill |
| /api/projects | Get all projects | Create new project | - | - |
| /api/projects/:id | Get project by ID | - | Update project | Delete project |
| /api/experience | Get all experience entries | Create new experience | - | - |
| /api/experience/:id | Get experience by ID | - | Update experience | Delete experience |

## Frontend Integration

The React frontend is designed to consume the backend API endpoints.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### How the Frontend Uses the Backend

The frontend integrates with the backend API using Axios for HTTP requests:

#### Data Fetching Example
```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function EducationSection() {
  const [educationItems, setEducationItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/education');
        setEducationItems(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching education:', error);
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  // Component rendering...
}
```

#### Data Creation/Update Example
```jsx
const createEducation = async (educationData) => {
  try {
    const response = await axios.post('http://localhost:5001/api/education', educationData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating education:', error);
    throw error;
  }
};
```

## Technologies Used

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- Cors
- Dotenv

### Frontend
- React
- React Router
- Material UI
- Axios
- CSS

```
