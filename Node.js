const axios = require('axios');

// 1. Setup your credentials
const JENKINS_URL = 'http://23.22.229.68:8080';
const USER = 'admin';
const API_TOKEN = '11499294a972aa8b8bd7b76b02eb585cbe';
const JOB_NAME = 'User-Lab-Pipeline';

async function triggerUserLab(userEmail) {
  try {
    // 1. ADD IT HERE: Sanitize the email
    // This turns "vaddeashok81@gmail.com" into "vaddeashok81-gmail-com"
    const safeId = userEmail.replace(/[@.]/g, '-');

    const auth = Buffer.from(`${USER}:${API_TOKEN}`).toString('base64');
    
    // 2. USE safeId IN THE URL:
    const url = `${JENKINS_URL}/job/${JOB_NAME}/buildWithParameters?USER_ID=${safeId}`;

    console.log(`🚀 Starting lab for sanitized ID: ${safeId}`);

    const response = await axios.post(url, {}, {
      headers: { 'Authorization': `Basic ${auth}` }
    });

    if (response.status === 201) console.log('✅ Lab Triggered!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function stopUserLab(userEmail) {
  try {
    // 1. ADD IT HERE TOO:
    const safeId = userEmail.replace(/[@.]/g, '-');

    const auth = Buffer.from(`${USER}:${API_TOKEN}`).toString('base64');
    
    // 2. USE safeId IN THE URL:
    const CLEANUP_JOB = 'Cleanup-User-Lab';
    const url = `${JENKINS_URL}/job/${CLEANUP_JOB}/buildWithParameters?USER_ID=${safeId}`;

    console.log(`🧹 Cleaning up lab for sanitized ID: ${safeId}`);

    const response = await axios.post(url, {}, {
      headers: { 'Authorization': `Basic ${auth}` }
    });

    if (response.status === 201) console.log('✅ Cleanup Sent!');
  } catch (error) {
    console.error('❌ Cleanup Error:', error.message);
  }
}

// Now you can safely call it with your real email
triggerUserLab('vaddeashok81@gmail.com');
