import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/campersSlice.js";
import { selectFavorites } from "../../redux/selectors.js";
import { getCoverImage, FALLBACK_IMG } from "../../utils/image.js";
import formatPrice from "../../utils/formatPrice.js";
import HeartIcon from "../icons/HeartIcon.jsx";
import StarIcon from "../icons/StarIcon.jsx";
import s from "./CamperCard.module.css";

function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites) || [];

  const idStr = String(camper.id);
  const isFav = favorites.includes(idStr);

  const cover = getCoverImage(camper);
  const onImgError = (e) => {
    e.currentTarget.src = FALLBACK_IMG;
    e.currentTarget.onerror = null;      
  };

  function onFavClick(e) {
    e.preventDefault();     
    e.stopPropagation();
    dispatch(toggleFavorite(idStr));
  }

  const badges = [];
  if (camper.transmission === "automatic") badges.push("Automatic");
  if (camper.AC) badges.push("AC");
  if (camper.kitchen) badges.push("Kitchen");
  if (camper.bathroom) badges.push("Bathroom");
  if (camper.radio) badges.push("Radio");
  if (camper.refrigerator) badges.push("Refrigerator");
  if (camper.microwave) badges.push("Microwave");
  if (camper.gas) badges.push("Gas");
  if (camper.water) badges.push("Water");
  if (camper.engine) badges.push(cap(camper.engine));

  return (
    <article className={s.card}>
  <div className={s.thumb}>
    <img
      className={s.photo}
      src={cover || FALLBACK_IMG}
      onError={onImgError}
      alt={camper.name}
      loading="lazy"
    />
  </div>

      <div className={s.body}>
        <div className={s.head}>
          <h3 className={s.title}>{camper.name}</h3>

          <div className={s.priceWrap}>
            <div className={s.price}>€{formatPrice(camper.price)}</div>
            <button
              type="button"
              className={s.favBtn}
              onClick={onFavClick}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={isFav}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <HeartIcon filled={isFav} size={22} />
            </button>
          </div>
        </div>

        <p className={s.meta}>
          <span className={s.rating}>
            <StarIcon filled size={16} />
            {camper.rating} ({camper.reviews?.length || 0} Reviews)
          </span>
          <span className={s.dot}>•</span>
          <span className={s.location}>{camper.location}</span>
        </p>

        <p className={s.desc}>{camper.description}</p>

        {badges.length > 0 && (
          <div className={s.tags}>
            {badges.map((b) => (
              <span key={b} className={s.tag}>{b}</span>
            ))}
          </div>
        )}

        <div className={s.actions}>
          <Link
            className={s.more}
            to={`/catalog/${camper.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Show more
          </Link>
        </div>
      </div>
    </article>
  );
}

function cap(x) {
  const s = String(x || "");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default CamperCard;