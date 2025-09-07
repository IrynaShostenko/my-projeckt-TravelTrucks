import StarIcon from "../icons/StarIcon.jsx";
import s from "./Reviews.module.css";

export default function Reviews({ reviews = [] }) {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return <div className={s.empty}>No reviews yet</div>;
  }

  return (
    <ul className={s.list}>
      {reviews.map((r, i) => {
        const value = Number(r.reviewer_rating ?? 0);
        const full = Math.floor(value);
        const hasHalf = value - full >= 0.5;

        return (
          <li key={i} className={s.item}>
            <div className={s.avatar}>{(r.reviewer_name || "U").slice(0, 1)}</div>
            <div className={s.body}>
              <div className={s.row}>
                <span className={s.name}>{r.reviewer_name || "User"}</span>
                <span className={s.stars}>
                  {Array.from({ length: 5 }, (_, idx) => (
                    <StarIcon
                      key={idx}
                      size={16}
                      filled={idx < full}
                      half={hasHalf && idx === full}
                    />
                  ))}
                </span>
              </div>
              <p className={s.text}>{r.comment}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
