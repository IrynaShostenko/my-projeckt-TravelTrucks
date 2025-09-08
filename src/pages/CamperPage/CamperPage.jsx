// src/pages/CamperPage/CamperPage.jsx
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Header from "../../components/Header/Header.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Tabs from "../../components/Tabs/Tabs.jsx";
import CamperDetails from "../../components/CamperDetails/CamperDetails.jsx";
import Reviews from "../../components/Reviews/Reviews.jsx";
import BookingForm from "../../components/BookingForm/BookingForm.jsx";
import StarIcon from "../../components/icons/StarIcon.jsx";
import PinIcon from "../../components/icons/PinIcon.jsx";

import { loadCamperById, clearCurrent } from "../../redux/campersSlice.js";
import {
  selectCurrentCamper,
  selectLoading,
  selectError,
} from "../../redux/selectors.js";

import formatPrice from "../../utils/formatPrice.js";
import s from "./CamperPage.module.css";

function normalizeGallery(camper) {
  if (!camper) return [];
  if (Array.isArray(camper.gallery)) {
    return camper.gallery
      .map((g) => (typeof g === "string" ? g : g?.thumb || g?.original))
      .filter(Boolean);
  }
  return camper.image ? [camper.image] : [];
}

export default function CamperPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const camper = useSelector(selectCurrentCamper);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) dispatch(loadCamperById(id));
    return () => dispatch(clearCurrent());
  }, [dispatch, id]);

  const gallerySlots = useMemo(() => {
    const imgs = normalizeGallery(camper);
    return Array.from({ length: 4 }, (_, i) => imgs[i] || null);
  }, [camper]);


  const onImgError = (e) => {
    e.currentTarget.style.display = "none";
  };

  return (
    <>
      <Header />
      <main className={s.wrap}>
        {loading && <Loader />}
        {error && !loading && <div className={s.error}>Error: {error}</div>}

        {!loading && !error && camper && (
          <>
            <div className={s.head}>
              <h1 className={s.title}>{camper.name}</h1>
            <div className={s.meta}>
              <a className={s.reviewsLink} href="#reviews">
                <StarIcon filled size={16} />
                <span className={s.rateText}>
                  {Number(camper.rating ?? 0).toFixed(1)}
                </span>
                <span className={s.muted}>
                  ({camper.reviews?.length || 0} Reviews)
                </span>
              </a>

              <span className={s.location}>
                <PinIcon className={s.pin} size={16} />
                {camper.location}
              </span>
            </div>
              <div className={s.price}>€{formatPrice(camper.price)}</div>
            </div>


            <div className={s.gallery}>
              {gallerySlots.map((src, i) => (
                <div className={`${s.gItem} ${!src ? s.gEmpty : ""}`} key={i}>
                  {src && (
                    <img
                      src={src}
                      alt={`${camper.name} ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      onError={onImgError}
                    />
                  )}
                </div>
              ))}
            </div>

            {camper.description && (
              <p className={s.desc}>{camper.description}</p>
            )}

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
