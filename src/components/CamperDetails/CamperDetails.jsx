// src/components/CamperDetails/CamperDetails.jsx
import s from "./CamperDetails.module.css";

export default function CamperDetails({ camper }) {
  if (!camper) return null;

  const badges = [];
  if (camper.transmission === "automatic") badges.push("Automatic");
  if (camper.AC) badges.push("AC");
  if (camper.kitchen) badges.push("Kitchen");
  if (camper.bathroom) badges.push("Bathroom");
  if (camper.TV) badges.push("TV");
  if (camper.radio) badges.push("Radio");
  if (camper.refrigerator) badges.push("Refrigerator");
  if (camper.microwave) badges.push("Microwave");
  if (camper.gas) badges.push("Gas");
  if (camper.water) badges.push("Water");
  if (camper.engine) badges.push(cap(camper.engine));

  return (
    <section className={s.wrap}>
      {badges.length > 0 && (
        <div className={s.tags}>
          {badges.map((b) => (
            <span key={b} className={s.tag}>{b}</span>
          ))}
        </div>
      )}

      <div className={s.box}>
        <h3 className={s.boxTitle}>Vehicle details</h3>
        <ul className={s.table}>
          <li><span>Form</span><span>{cap(camper.form) || "—"}</span></li>
          <li><span>Length</span><span>{camper.length || "—"}</span></li>
          <li><span>Width</span><span>{camper.width || "—"}</span></li>
          <li><span>Height</span><span>{camper.height || "—"}</span></li>
          <li><span>Tank</span><span>{camper.tank || "—"}</span></li>
          <li><span>Consumption</span><span>{camper.consumption || "—"}</span></li>
        </ul>
      </div>
    </section>
  );
}

function cap(x) {
  const s = String(x || "");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
