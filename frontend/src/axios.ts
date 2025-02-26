import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const apiURL = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
  }
});

export default apiURL;
