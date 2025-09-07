const root = s => s.campers;

export const selectCampers = s => root(s).list;
export const selectPage = s => root(s).page;
export const selectLimit = s => root(s).limit;
export const selectLoading = s => root(s).loading;
export const selectError = s => root(s).error;
export const selectFilters = s => root(s).filters;
export const selectFavorites = s => root(s).favorites;
export const selectCurrent = s => root(s).current;
export const selectHasMore = s => root(s).hasMore;
export const selectTotal = s => root(s).total;
export const selectCurrentCamper = s => root(s).current;
