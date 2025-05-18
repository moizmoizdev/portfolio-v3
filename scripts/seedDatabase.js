const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Education = require('../models/Education');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Experience = require('../models/Experience');

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = require('../config/db');

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

// Function to seed the database
const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();
    
    // Clear existing data
    await Education.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    
    console.log('Database cleared. Starting seed process...');
    
    // Seed education data
    await Education.insertMany(educationData);
    console.log('Education data seeded successfully');
    
    // Seed project data
    await Project.insertMany(projectData);
    console.log('Project data seeded successfully');
    
    // Seed skill data
    await Skill.insertMany(skillData);
    console.log('Skill data seeded successfully');
    
    // Seed experience data
    await Experience.insertMany(experienceData);
    console.log('Experience data seeded successfully');
    
    console.log('Database seeding completed successfully!');
    
    // Exit process
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 