import api from '../utils/api';

const educationService = {
  // Get all education entries
  getAll: async () => {
    try {
      console.log('Fetching education data directly...');
      
      // Add a timeout to the fetch request to ensure it doesn't hang indefinitely
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      try {
        const response = await fetch('http://localhost:5001/api/education', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries([...response.headers]));
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response from GET:', errorText);
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        const responseData = await response.json();
        console.log('Raw response data:', responseData);
        
        // Check if the response has the expected structure with a data property
        if (responseData && responseData.data && Array.isArray(responseData.data)) {
          console.log('Extracted education data array:', responseData.data);
          return responseData.data;
        } else if (Array.isArray(responseData)) {
          // In case the API returns a direct array
          console.log('Response is already an array:', responseData);
          return responseData;
        } else {
          console.error('Unexpected response format:', responseData);
          throw new Error('Unexpected API response format');
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          console.error('Request timed out after 10 seconds');
          throw new Error('Request timed out. API server may be down.');
        }
        throw fetchError;
      }
    } catch (error) {
      console.error('Error fetching education data:', error);
      // Log the full error with stack trace
      console.error('Full error details:', error);
      throw error;
    }
  },
  
  // Get a specific education entry by id
  getById: async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/education/${id}`, {
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
      console.error(`Error fetching education with id ${id}:`, error);
      throw error;
    }
  },
  
  // Create a new education entry
  create: async (educationData) => {
    try {
      // Using exact format that works in Postman (direct JSON object)
      console.log('Sending exact Postman format:', educationData);
      
      // Make a direct API call without using the api instance to bypass any middleware
      const response = await fetch('http://localhost:5001/api/education', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(educationData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating education entry:', error);
      throw error;
    }
  },
  
  // Update an existing education entry
  update: async (id, educationData) => {
    try {
      // Using exact format that works in Postman (direct JSON object)
      console.log(`Sending exact Postman format for update:`, educationData);
      
      // Make a direct API call without using the api instance to bypass any middleware
      const response = await fetch(`http://localhost:5001/api/education/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(educationData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating education with id ${id}:`, error);
      throw error;
    }
  },
  
  // Delete an education entry
  delete: async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/education/${id}`, {
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
      console.error(`Error deleting education with id ${id}:`, error);
      throw error;
    }
  }
};

export default educationService;