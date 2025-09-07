import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchCampers as apiFetchCampers,
  fetchCamperById as apiFetchCamperById,
} from '../services/api.js';

const LS_KEY = 'tt_favorites';
function readFavs() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch {
    return [];
  }
}
function writeFavs(favs) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(favs));
  } catch (err) {
    console.error('Error saving favorites to localStorage:', err);
  }
}

export const loadCampers = createAsyncThunk(
  'campers/loadCampers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { limit, filters } = getState().campers;
      const { items, total } = await apiFetchCampers(1, limit, filters);
      return { items, total, page: 1 };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const loadMoreCampers = createAsyncThunk(
  'campers/loadMoreCampers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { page, limit, filters } = getState().campers;
      const next = page + 1;
      const { items, total } = await apiFetchCampers(next, limit, filters);
      return { items, total, page: next };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const loadCamperById = createAsyncThunk(
  'campers/loadCamperById',
  async (id, { rejectWithValue }) => {
    try {
      return await apiFetchCamperById(id);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    list: [],
    page: 1,
    limit: 4,
    total: 0,
    hasMore: true,

    loading: false,
    error: null,
    filters: {},
    favorites: readFavs(),
    current: null,
  },
  reducers: {
    setFilters(s, { payload }) {
      s.filters = payload || {};
    },
    resetList(s) {
      s.list = [];
      s.page = 1;
      s.total = 0;
      s.hasMore = true;
    },
    toggleFavorite(s, { payload: id }) {
      const i = s.favorites.indexOf(id);
      if (i === -1) s.favorites.push(id);
      else s.favorites.splice(i, 1);
      writeFavs(s.favorites);
    },
    clearCurrent(s) {
      s.current = null;
    },
  },
  extraReducers: b => {
    b.addCase(loadCampers.pending, s => {
      s.loading = true;
      s.error = null;
    })
      .addCase(loadCampers.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.list = Array.isArray(payload?.items) ? payload.items : [];
        s.page = payload?.page ?? 1;
        s.total =
          typeof payload?.total === 'number' ? payload.total : s.list.length;
        s.hasMore = s.total
          ? s.list.length < s.total
          : s.list.length === s.limit;
      })
      .addCase(loadCampers.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload;
      })

      .addCase(loadMoreCampers.pending, s => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loadMoreCampers.fulfilled, (s, { payload }) => {
        s.loading = false;
        const arr = Array.isArray(payload?.items) ? payload.items : [];
        s.page = payload?.page ?? s.page;
        if (typeof payload?.total === 'number') s.total = payload.total;
        s.list = [...s.list, ...arr];
        s.hasMore = s.total ? s.list.length < s.total : arr.length === s.limit;
      })
      .addCase(loadMoreCampers.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload;
      })

      .addCase(loadCamperById.pending, s => {
        s.loading = true;
        s.error = null;
        s.current = null;
      })
      .addCase(loadCamperById.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.current = payload;
      })
      .addCase(loadCamperById.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload;
      });
  },
});

export const { setFilters, resetList, toggleFavorite, clearCurrent } =
  campersSlice.actions;
export default campersSlice.reducer;
