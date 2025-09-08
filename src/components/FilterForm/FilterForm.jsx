import { useMemo, useState } from "react";
import s from "./FilterForm.module.css";
import SvgIcon from "../icons/SvgIcon";

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
      <div className={s.grouplocation}>
        <label className={s.labellocation} for="input_location">Location</label>
        <div className={s.locWrap}>
          <SvgIcon name="icon-location" className={s.inputIcon} aria-hidden />
        <input
          className={s.inputlocation}
          id="input_location"
          type="text"
          placeholder="City"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
      <div className={s.title}>Filters</div>

      <div className={s.groupequipment}>
        <div className={s.labelequipment}>Vehicle equipment</div>
        <div className={s.badges}>
          {[
            ["automatic", "Automatic", "icon-diagram"],
            ["AC", "AC", "icon-wind"],
            ["kitchen", "Kitchen", "icon-cup-hot"],
            ["water", "Water", "icon-water"],
            ["bathroom", "Bathroom", "icon-shower"],
            ["TV", "TV", "icon-tv"],
            ["radio", "Radio", "icon-radio"],
            ["refrigerator", "Refrigerator", "icon-fridge"],
            ["microwave", "Microwave", "icon-microwave"],
            ["gas", "Gas", "icon-gas"],
            ["petrol", "Petrol", "icon-petrol"],
          ].map(([key, label, icon]) => (
            <label key={key} className={s.badge}>
              <input
                type="checkbox"
                className={s.hiddenInput}
                checked={!!equip[key]}
                onChange={() => toggleEquip(key)}
              />
              <span className={s.tile}>
                <SvgIcon name={icon} className={s.icon32} aria-hidden />
                <span className={s.tileText}>{label}</span>
              </span>
            </label>
          ))}
        </div>
      </div>


  <div className={s.group}>
  <div className={s.label}>Vehicle type</div>

  <div className={s.chips}>
    {[
      { key: "panelTruck",      label: "Van",              icon: "icon-grid-1" },
      { key: "fullyIntegrated", label: "Fully Integrated", icon: "icon-grid-2" },
      { key: "alcove",          label: "Alcove",           icon: "icon-grid-3" },
    ].map(({ key, label, icon }) => {
      const active = vehicleType === key;
      return (
        <button
          type="button"
          key={key}
          onClick={() => setVehicleType(v => (v === key ? "" : key))}
          className={`${s.chip} ${active ? s.chipActive : ""}`}
          aria-pressed={active}
        >
          <SvgIcon name={icon} className={s.icon32} aria-hidden />
          <span className={s.tileText}>{label}</span>
        </button>
      );
    })}
  </div>
</div>

<div className={s.actions}>
  <button type="submit" className={s.primary}>Search</button>
</div>
    </form>
  );
}