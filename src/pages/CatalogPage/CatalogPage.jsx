import { useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import CamperCard from "../../components/CamperCard/CamperCard.jsx";
import FilterForm from "../../components/FilterForm/FilterForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loadCampers, loadMoreCampers, resetList, setFilters } from "../../redux/campersSlice.js";
import { selectCampers, selectLoading, selectError, selectHasMore } from "../../redux/selectors.js";
import s from "./CatalogPage.module.css";

function CatalogPage() {
  const dispatch = useDispatch();
  const rawItems = useSelector(selectCampers);
  const items = Array.isArray(rawItems) ? rawItems : [];
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const hasMore = useSelector(selectHasMore);

  useEffect(() => {
    dispatch(loadCampers());
  }, [dispatch]);

  function handleApplyFilters(filters) {
    dispatch(resetList());
    dispatch(setFilters(filters));
    dispatch(loadCampers());
  }

  function handleResetFilters() {
    dispatch(resetList());
    dispatch(setFilters({}));
    dispatch(loadCampers());
  }

  return (
    <>
      <Header />
      <div className={s.wrap}>
        <aside>
          <FilterForm onApply={handleApplyFilters} onReset={handleResetFilters} />
        </aside>

        <section className={s.list}>
          {items.map(c => <CamperCard key={c.id} camper={c} />)}

          {loading && <Loader />}

          {error && !loading && <div className={s.error}>Error: {error}</div>}

          {!loading && !error && hasMore && items.length > 0 && (
            <button className={s.loadMore} onClick={() => dispatch(loadMoreCampers())}>
              Load more
            </button>
          )}

          {!loading && !error && items.length === 0 && (
            <div className={s.empty}>Nothing found</div>
          )}
        </section>
      </div>
    </>
  );
}

export default CatalogPage;
