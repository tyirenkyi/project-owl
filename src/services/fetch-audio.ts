import axios from 'axios';


const { REACT_APP_SERVER } = process.env;

const axiosInstance = axios.create({
  baseURL: REACT_APP_SERVER,
  headers: {
    "accept": "*/*",
  }
})

const fetchAudioList = async(pageNumber: number = 1, pageSize: number = 2, issue?: string, status?: string) => {
  let requestUrl = `/api/audio?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  if(issue)
    requestUrl += `&issue=${issue}`;
  if(status)
    requestUrl += `&status=${status}`;
  
  try {
    const{ data } = await axiosInstance.get(requestUrl);
    return data;
  } catch (error) {
    throw error;
  }
}


const paginationFetch = async(params: string) => {
  try {
    const { data } =  await axiosInstance.get(`/api/audio${params}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export {
  fetchAudioList,
  paginationFetch
}