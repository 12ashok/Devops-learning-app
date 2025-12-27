const axios = require('axios');

// 1. Setup your credentials
const JENKINS_URL = 'http://<your-ec2-ip>:8080';
const USER = 'admin';
const API_TOKEN = 'your_copied_api_token';
const JOB_NAME = 'User-Lab-Pipeline';

// 2. Function to trigger the build
async function triggerUserLab(userEmail) {
  try {
    // Basic Auth header: base64('user:token')
    const auth = Buffer.from(`${USER}:${API_TOKEN}`).toString('base64');
    
    // If your job has parameters (like user email), use 'buildWithParameters'
    const url = `${JENKINS_URL}/job/${JOB_NAME}/buildWithParameters?USER_ID=${userEmail}`;

    const response = await axios.post(url, {}, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    if (response.status === 201) {
      console.log('Lab successfully triggered for:', userEmail);
    }
  } catch (error) {
    console.error('Failed to trigger Jenkins:', error.response?.status || error.message);
  }
}

triggerUserLab('student@example.com');