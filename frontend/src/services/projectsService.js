import api from '../utils/api';

const projectsService = {
  // Get all projects
  getAll: async () => {
    try {
      console.log('Fetching projects data directly...');
      
      const response = await fetch('http://localhost:5001/api/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from GET:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const responseData = await response.json();
      console.log('Raw projects response data:', responseData);
      
      // Check if the response has the expected structure with a data property
      if (responseData && responseData.data && Array.isArray(responseData.data)) {
        console.log('Extracted projects data array:', responseData.data);
        return responseData.data;
      } else if (Array.isArray(responseData)) {
        // In case the API returns a direct array
        console.log('Projects response is already an array:', responseData);
        return responseData;
      } else {
        console.error('Unexpected projects response format:', responseData);
        throw new Error('Unexpected API response format');
      }
    } catch (error) {
      console.error('Error fetching projects data:', error);
      throw error;
    }
  },
  
  // Get a specific project by id
  getById: async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching project with id ${id}:`, error);
      throw error;
    }
  },
  
  // Create a new project
  create: async (projectData) => {
    try {
      // Using exact format that works in Postman (direct JSON object)
      console.log('Sending exact Postman format:', projectData);
      
      // Make a direct API call without using the api instance to bypass any middleware
      const response = await fetch('http://localhost:5001/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating project entry:', error);
      throw error;
    }
  },
  
  // Update an existing project
  update: async (id, projectData) => {
    try {
      // Using exact format that works in Postman (direct JSON object)
      console.log(`Sending exact Postman format for update:`, projectData);
      
      // Make a direct API call without using the api instance to bypass any middleware
      const response = await fetch(`http://localhost:5001/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating project with id ${id}:`, error);
      throw error;
    }
  },
  
  // Delete a project
  delete: async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error deleting project with id ${id}:`, error);
      throw error;
    }
  }
};

export default projectsService;