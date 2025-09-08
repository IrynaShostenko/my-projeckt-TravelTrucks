TravelTrucks — фронтенд

Веб-додаток для компанії TravelTrucks (оренда кемперів). Стек: Vite + React,
Redux (RTK), React Router, Axios, CSS Modules.

Демо / деплой

Vercel / Netlify — підтримуються з коробки (інструкція нижче).

API

Бекенд надано в ТЗ:

https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers

Основні ендпоінти:

GET /campers — список кемперів (підтримує query-параметри для фільтрації /
пагінації)

GET /campers/:id — деталі кемпера

Швидкий старт Вимоги

Node.js >= 18

Будь-який менеджер пакунків: npm / yarn / pnpm

1. Клонування git clone <repo-url> cd traveltrucks

2. Налаштування середовища

Створи файл .env у корені (або .env.local) і додай:

VITE_API_BASE_URL=https://66b1f8e71ca8ad33d4f5f63e.mockapi.io

За потреби можна змінити базовий URL, не торкаючись коду.

3. Встановлення залежностей npm install

# або

yarn

# або

pnpm install

4. Режим розробки npm run dev

Відкрий http://localhost:5173.

5. Білд продакшн npm run build npm run preview # локальний перегляд білду

Скрипти "scripts": { "dev": "vite", "build": "vite build", "preview": "vite
preview" }

Маршрути

/ — Домашня сторінка (банер + CTA “View now” → /catalog)

/catalog — Каталог кемперів з фільтрами та кнопкою Load more

/catalog/:id — Детальна сторінка: галерея, характеристики, відгуки, форма
бронювання

Функціонал

Фільтрація в каталозі:

Location (текст)

Vehicle equipment (AC, Automatic, Kitchen, TV, Bathroom тощо)

Vehicle type (Van, Fully Integrated, Alcove)

Обране — додавання / видалення зі збереженням між перезавантаженнями
(localStorage).

Пагінація: кнопка Load more підвантажує наступні картки з урахуванням активних
фільтрів.

Карточка кемпера: фото 292×320, бейджі характеристик, ціна €8000.00, кнопка Show
more відкриває деталі в новій вкладці.

Сторінка деталі:

Відгуки з оцінками ★

BookingForm: валідація, мінімальна дата = сьогодні, нотифікації про відправку.

Лоадери під час асинхронних запитів, обробка помилок.

Структура проєкту (скорочено) src/ assets/ icons.svg # SVG-спрайт components/
Header/ FilterForm/ CamperCard/ BookingForm/ icons/ SvgIcon.jsx # <use
href={`${spriteUrl}#icon-id`} /> pages/ HomePage/ CatalogPage/ CamperPage/
store/ # Redux slices (campers, filters, favorites) services/ api.js # axios
instance (baseURL з VITE_API_BASE_URL) styles/ main.jsx # Router + Provider

Налаштування Axios

src/services/api.js

import axios from "axios";

export const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL,
headers: { "Content-Type": "application/json" } });

SVG-іконки

Спрайт лежить у src/assets/icons.svg. Для Vite зручно імпортувати URL:

// src/components/icons/SvgIcon.jsx import spriteUrl from
"../../assets/icons.svg?url";

export default function SvgIcon({ name, className, ...rest }) { return ( <svg
className={className} aria-hidden {...rest}> <use href={`${spriteUrl}#${name}`}
/> </svg> ); }

Виклик:

<SvgIcon name="icon-wind" />
<SvgIcon name="icon-grid-1" />

Щоб керувати кольором через CSS, шляхи в спрайті мають мати
fill="currentColor"/stroke="currentColor".

Редакс

campersSlice: список, статуси завантаження, пагінація.

filtersSlice: location, vehicle type, equipment. При зміні фільтрів попередні
результати очищаються, виконується новий запит.

favoritesSlice: id обраних; синхронізація з localStorage.

Деплой Vercel

New Project → імпорт репозиторію.

Framework Preset: Vite.

Env vars: додай VITE_API_BASE_URL.

Deploy.

Netlify

New site from Git.

Build command: npm run build

Publish directory: dist

Env vars: VITE_API_BASE_URL.

Deploy.

Для SPA додай правило редиректу (Netlify): файл \_redirects у public/ з рядком
/\* /index.html 200

Траблшутинг

Помилка імпорту спрайта: перевір icons.svg?url та правильні id (icon-\*).

CORS/мережа: переконайся, що VITE_API_BASE_URL вказано без /campers наприкінці.

Порожній каталог: після зміни фільтрів відбувається скидання сторінки — натисни
Load more або очисть фільтри.

Ліцензія

MIT
