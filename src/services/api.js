import axios from 'axios';

const api = axios.create({
  baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
});

export const fetchCampers = async (page = 1, limit = 4, params = {}) => {
  const { data } = await api.get('/campers', {
    params: { page, limit, ...params },
  });

  // Бекенд може віддати або масив, або { total, items }
  if (Array.isArray(data)) {
    return { items: data, total: null }; // total невідомий
  }
  const items = Array.isArray(data?.items) ? data.items : [];
  const total = typeof data?.total === 'number' ? data.total : items.length;
  return { items, total };
};

export const fetchCamperById = async id => {
  const { data } = await api.get(`/campers/${id}`);
  return data;
};

export default api;
