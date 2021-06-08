import axios from 'axios';

const { REACT_APP_SERVER } = process.env;

const axiosInstance = axios.create({
  baseURL: REACT_APP_SERVER,
  headers: {
    "accept": "*/*",
    "content-type": "multipart/form-data"
  }
})

const uploadAudio = async(form: FormData) => {
  try {
    return await axiosInstance.post('/api/audio', form);
  } catch (error) {
    throw error;
  }
}

export {
  uploadAudio
}