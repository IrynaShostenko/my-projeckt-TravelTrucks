import { useState } from "react";
import s from "./Tabs.module.css";

export default function Tabs({ tabs, defaultKey }) {
  const keys = Object.keys(tabs);
  const [active, setActive] = useState(defaultKey || keys[0]);

  return (
    <div>
      <div className={s.bar}>
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            className={active === k ? `${s.tab} ${s.active}` : s.tab}
            onClick={() => setActive(k)}
          >
            {k}
          </button>
        ))}
      </div>

      {/* БЕЗ додаткової панелі: контент керує розміткою сам */}
      {tabs[active]}
    </div>
  );
}
