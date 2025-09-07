import { useMemo, useState } from "react";
import s from "./FilterForm.module.css";

export default function FilterForm({ onApply }) {
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState(""); // '', 'van', 'fullyIntegrated', 'alcove'
  const [equip, setEquip] = useState({
    automatic: false,
    AC: false,
    kitchen: false,
    bathroom: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
    petrol: false,
  });

  function toggleEquip(key) {
    setEquip(p => ({ ...p, [key]: !p[key] }));
  }

  const filters = useMemo(() => {
    const f = {};
    if (location.trim()) f.location = location.trim();
    if (vehicleType) f.form = vehicleType;
    if (equip.AC) f.AC = true;
    if (equip.kitchen) f.kitchen = true;
    if (equip.bathroom) f.bathroom = true;
    if (equip.radio) f.radio = true;
    if (equip.refrigerator) f.refrigerator = true;
    if (equip.microwave) f.microwave = true;
    if (equip.gas) f.gas = true;
    if (equip.water) f.water = true;
    if (equip.automatic) f.transmission = "automatic";
    if (equip.petrol) f.engine = "petrol";
    return f;
  }, [location, vehicleType, equip]);

  function handleSubmit(e) {
    e.preventDefault();
    onApply?.(filters);
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.group}>
        <label className={s.label}>Location</label>
        <input
          className={s.input}
          type="text"
          placeholder="Kyiv, Ukraine"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className={s.group}>
        <div className={s.label}>Vehicle type</div>
        <div className={s.chips}>
          {[
            { key: "panelTruck", label: "Van" },
            { key: "fullyIntegrated", label: "Fully Integrated" },
            { key: "alcove", label: "Alcove" },
          ].map(opt => (
            <button
              type="button"
              key={opt.key}
              onClick={() =>
                setVehicleType(v => (v === opt.key ? "" : opt.key))
              }
              className={
                vehicleType === opt.key ? `${s.chip} ${s.chipActive}` : s.chip
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className={s.group}>
        <div className={s.label}>Equipment</div>
        <div className={s.badges}>
          {[
            ["automatic", "Automatic"],
            ["AC", "AC"],
            ["kitchen", "Kitchen"],
            ["bathroom", "Bathroom"],
            ["radio", "Radio"],
            ["refrigerator", "Refrigerator"],
            ["microwave", "Microwave"],
            ["gas", "Gas"],
            ["water", "Water"],
            ["petrol", "Petrol"],
          ].map(([key, label]) => (
            <label key={key} className={s.badge}>
              <input
                type="checkbox"
                checked={!!equip[key]}
                onChange={() => toggleEquip(key)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className={s.actions}>
        <button type="submit" className={s.primary}>
          Search
        </button>
      </div>
    </form>
  );
}