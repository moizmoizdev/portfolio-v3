const axios = require('axios');

// Base URL for API requests
const API_URL = 'http://localhost:5000/api';

// Education data
const educationData = [
  {
    degree: 'Bachelor in Computer Science',
    school: 'Information Technology University Lahore',
    years: '2023 - 2027',
    location: 'Lahore, Pakistan',
    about: 'Currently pursuing a degree in Computer Science with focus on software development.',
    highlights: [
      'CGPA: 3.53/4.0',
      'Been developeing interesting and innovative projects'
    ]
  },
  {
    degree: 'Intermediate (Pre-Engineering)',
    school: 'F.G Public School',
    years: '2021 - 2023',
    location: 'Pakistan',
    about: 'Completed pre-engineering program with focus on mathematics and physics.',
    highlights: [
      'Percentage: 83%',
      'Participated in science competitions',
      'Chief Prefect responsible for discipline and conduct of the school, managed dozens ns of prefects'
    ]
  },
  {
    degree: 'Matriculation (Science)',
    school: 'F.G Public School',
    years: '2019 - 2021',
    location: 'Pakistan',
    about: 'Completed matriculation with science subjects.',
    highlights: [
      'Percentage: 87.5%',
      'Top performer in Science subjects'
    ]
  }
];

// Project data
const projectData = [
  {
    title: 'CelestialChain',
    description: 'A blockchain implementation with consensus protocol and transaction processing capabilities.',
    technologies: ['OpenSSL', 'Boost', 'levelDB', 'C++'],
    githubUrl: 'https://github.com/moizmoizdev/CelestialChain',
    liveUrl: '',
    imageUrl: '' // Add image URL if available
  },
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio website showcasing my projects and skills with a modern UI design.',
    technologies: ['React', 'Material UI', 'CSS', 'Javascript'],
    githubUrl: 'https://github.com/moizmoizdev/portfolio-v2',
    liveUrl: 'https://moizmoiz.com/',
    imageUrl: '' // Add image URL if available
  }
];

// Skill data
const skillData = [
  {
    name: 'JavaScript',
    proficiency: 'Advanced',
    category: 'Frontend'
  },
  {
    name: 'React.js',
    proficiency: 'Advanced',
    category: 'Frontend'
  },
  {
    name: 'Node.js',
    proficiency: 'Intermediate',
    category: 'Backend'
  },
  {
    name: 'MongoDB',
    proficiency: 'Intermediate',
    category: 'Database'
  },
  {
    name: 'C++',
    proficiency: 'Advanced',
    category: 'Other'
  },
  {
    name: 'HTML/CSS',
    proficiency: 'Expert',
    category: 'Frontend'
  }
];

// Experience data
const experienceData = [
  {
    company: 'Open Source Contributor',
    position: 'Developer',
    location: 'Remote',
    description: 'Contributing to various open source projects, focusing on blockchain and web technologies.',
    startDate: '2023-01-01',
    endDate: null,
    current: true
  },
  {
    company: 'Student Developer',
    position: 'Project Lead',
    location: 'Lahore, Pakistan',
    description: 'Leading development teams for university projects, implementing agile methodologies.',
    startDate: '2023-09-01',
    endDate: null,
    current: true
  }
];

// API helper functions
const API = {
  // Education API functions
  education: {
    getAll: async () => {
      try {
        const response = await axios.get(`${API_URL}/education`);
        return response.data;
      } catch (error) {
        console.error('Error fetching education data:', error);
        return [];
      }
    },
    
    create: async (educationItem) => {
      try {
        const response = await axios.post(`${API_URL}/education`, educationItem);
        return response.data;
      } catch (error) {
        console.error('Error creating education item:', error);
        return null;
      }
    },
    
    update: async (id, educationItem) => {
      try {
        const response = await axios.put(`${API_URL}/education/${id}`, educationItem);
        return response.data;
      } catch (error) {
        console.error(`Error updating education item ${id}:`, error);
        return null;
      }
    },
    
    delete: async (id) => {
      try {
        const response = await axios.delete(`${API_URL}/education/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error deleting education item ${id}:`, error);
        return null;
      }
    }
  },
  
  // Project API functions
  projects: {
    getAll: async () => {
      try {
        const response = await axios.get(`${API_URL}/projects`);
        return response.data;
      } catch (error) {
        console.error('Error fetching project data:', error);
        return [];
      }
    },
    
    create: async (projectItem) => {
      try {
        const response = await axios.post(`${API_URL}/projects`, projectItem);
        return response.data;
      } catch (error) {
        console.error('Error creating project item:', error);
        return null;
      }
    },
    
    update: async (id, projectItem) => {
      try {
        const response = await axios.put(`${API_URL}/projects/${id}`, projectItem);
        return response.data;
      } catch (error) {
        console.error(`Error updating project item ${id}:`, error);
        return null;
      }
    },
    
    delete: async (id) => {
      try {
        const response = await axios.delete(`${API_URL}/projects/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error deleting project item ${id}:`, error);
        return null;
      }
    }
  },
  
  // Skills API functions
  skills: {
    getAll: async () => {
      try {
        const response = await axios.get(`${API_URL}/skills`);
        return response.data;
      } catch (error) {
        console.error('Error fetching skill data:', error);
        return [];
      }
    },
    
    create: async (skillItem) => {
      try {
        const response = await axios.post(`${API_URL}/skills`, skillItem);
        return response.data;
      } catch (error) {
        console.error('Error creating skill item:', error);
        return null;
      }
    },
    
    update: async (id, skillItem) => {
      try {
        const response = await axios.put(`${API_URL}/skills/${id}`, skillItem);
        return response.data;
      } catch (error) {
        console.error(`Error updating skill item ${id}:`, error);
        return null;
      }
    },
    
    delete: async (id) => {
      try {
        const response = await axios.delete(`${API_URL}/skills/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error deleting skill item ${id}:`, error);
        return null;
      }
    }
  },
  
  // Experience API functions
  experience: {
    getAll: async () => {
      try {
        const response = await axios.get(`${API_URL}/experience`);
        return response.data;
      } catch (error) {
        console.error('Error fetching experience data:', error);
        return [];
      }
    },
    
    create: async (experienceItem) => {
      try {
        const response = await axios.post(`${API_URL}/experience`, experienceItem);
        return response.data;
      } catch (error) {
        console.error('Error creating experience item:', error);
        return null;
      }
    },
    
    update: async (id, experienceItem) => {
      try {
        const response = await axios.put(`${API_URL}/experience/${id}`, experienceItem);
        return response.data;
      } catch (error) {
        console.error(`Error updating experience item ${id}:`, error);
        return null;
      }
    },
    
    delete: async (id) => {
      try {
        const response = await axios.delete(`${API_URL}/experience/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error deleting experience item ${id}:`, error);
        return null;
      }
    }
  }
};

// Function to seed the database with initial data
const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Seed education data
    for (const education of educationData) {
      await API.education.create(education);
    }
    console.log('Education data seeded successfully');
    
    // Seed project data
    for (const project of projectData) {
      await API.projects.create(project);
    }
    console.log('Project data seeded successfully');
    
    // Seed skill data
    for (const skill of skillData) {
      await API.skills.create(skill);
    }
    console.log('Skill data seeded successfully');
    
    // Seed experience data
    for (const experience of experienceData) {
      await API.experience.create(experience);
    }
    console.log('Experience data seeded successfully');
    
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = {
  educationData,
  projectData,
  skillData,
  experienceData,
  API,
  seedDatabase
}; 