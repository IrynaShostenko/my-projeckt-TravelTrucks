import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Tabs from "../../components/Tabs/Tabs.jsx";
import CamperDetails from "../../components/CamperDetails/CamperDetails.jsx";
import Reviews from "../../components/Reviews/Reviews.jsx";
import BookingForm from "../../components/BookingForm/BookingForm.jsx";
import StarIcon from "../../components/icons/StarIcon.jsx";

import { loadCamperById, clearCurrent } from "../../redux/campersSlice.js";
import {
  selectCurrentCamper,
  selectLoading,
  selectError,
} from "../../redux/selectors.js";

import formatPrice from "../../utils/formatPrice.js";
import { FALLBACK_IMG } from "../../utils/image.js";

import s from "./CamperPage.module.css";

function getGallery(camper) {
  if (!camper) return [];
  if (Array.isArray(camper.gallery)) {
    return camper.gallery
      .map((g) => g?.thumb || g?.original || g)
      .filter(Boolean);
  }
  return camper.image ? [camper.image] : [];
}

export default function CamperPage() {
  const dispatch = useDispatch();
  const camper = useSelector(selectCurrentCamper);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

useEffect(() => {
  const id = location.pathname.split("/").pop();
  dispatch(loadCamperById(id));
  return () => dispatch(clearCurrent()); // cleanup
}, [dispatch]);

  const onImgError = (e) => {
    e.currentTarget.src = FALLBACK_IMG;
    e.currentTarget.onerror = null;
  };

  return (
    <>
      <Header />
      <main className={s.wrap}>
        {loading && <Loader />}
        {error && !loading && <div className={s.error}>Error: {error}</div>}

        {!loading && !error && camper && (
          <>
            {/* title + price */}
            <div className={s.head}>
              <h1 className={s.title}>{camper.name}</h1>
              <div className={s.price}>€{formatPrice(camper.price)}</div>
            </div>

            {/* meta row: rating + reviews link + location */}
            <div className={s.meta}>
              <a className={s.reviewsLink} href="#reviews">
                <StarIcon pressed size={16} />
                <span className={s.rateText}>
                  {Number(camper.rating ?? 0).toFixed(1)}
                </span>
                <span className={s.muted}>
                  ({(camper.reviews?.length || 0)} Reviews)
                </span>
              </a>
              <span className={s.dot}>•</span>
              <span className={s.location}>
                <span className={s.pin} aria-hidden>📍</span>
                {camper.location}
              </span>
            </div>

            {/* gallery: 4 зображення */}
            {getGallery(camper).length > 0 && (
              <div className={s.gallery}>
                {getGallery(camper).slice(0, 4).map((src, i) => (
                  <div className={s.gItem} key={i}>
                    <img
                      src={src || FALLBACK_IMG}
                      onError={onImgError}
                      alt={`${camper.name} ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}

            {camper.description && (
              <p className={s.desc}>{camper.description}</p>
            )}

            {/* Tabs */}
            <Tabs
              defaultKey="Features"
              tabs={{
                Features: (
                  <div className={s.grid}>
                    <div className={s.left}>
                      <div className={s.panel}>
                        <CamperDetails camper={camper} />
                      </div>
                    </div>
                    <aside className={s.right}>
                      <BookingForm camperName={camper.name} />
                    </aside>
                  </div>
                ),
                Reviews: (
                  <div className={s.grid}>
                    <div className={s.left}>
                      <div className={s.panel} id="reviews">
                        <Reviews reviews={camper.reviews || []} />
                      </div>
                    </div>
                    <aside className={s.right}>
                      <BookingForm camperName={camper.name} />
                    </aside>
                  </div>
                ),
              }}
            />
          </>
        )}
      </main>
    </>
  );
}
