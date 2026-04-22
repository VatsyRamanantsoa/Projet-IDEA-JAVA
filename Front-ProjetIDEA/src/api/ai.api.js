import api from '../api/axios'; // ou '../api/axios'

export const generateIdea = async (data) => {
  const response = await api.post('/ai/generate', data);
  return response.data;
};
