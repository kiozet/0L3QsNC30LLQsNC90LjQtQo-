import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
const USE_MOCK_DATA = true;

const mockApi = {
  async uploadFiles(formData) {
    console.log('Using mock API');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      imageUrl: '/images/result1.png',
      vessels: [
        { type: 'Пассажирское судно', confidence: 0.87, coordinates: {x: 320, y: 150} },
      ],
      processingTime: '2.4s'
    };
  }
};

const realApi = {
  async uploadFiles(formData) {
    const response = await axios.post(`${API_BASE_URL}/fileupload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    });
    return response.data;
  }
};

export const apiService = USE_MOCK_DATA ? mockApi : realApi;