import api from '../utils/api';

const contactService = {
  // Submit contact form
  submitForm: async (formData) => {
    try {
      console.log('Submitting contact form data:', formData);
      
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from POST:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const responseData = await response.json();
      console.log('Contact form submission response:', responseData);
      
      // Return the data property if it exists, otherwise return the whole response
      return responseData.data || responseData;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }
};

export default contactService; 