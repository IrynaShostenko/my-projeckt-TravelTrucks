import { useMemo, useState } from "react";
import s from "./BookingForm.module.css";
import { toast } from "react-toastify";

function BookingForm({ camperName }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    date: "",
    comment: "",
  });
  const [touched, setTouched] = useState({});
  const [isSending, setIsSending] = useState(false); // йде відправка
  const [wasSent, setWasSent] = useState(false);     // успішно відправлено

  const minDate = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const errors = validate(values, minDate);

  function onChange(e) {
    const { name, value } = e.target;
    setValues(p => ({ ...p, [name]: value }));
    setWasSent(false); // ховаємо повідомлення після будь-якої правки
  }

  function onBlur(e) {
    const { name } = e.target;
    setTouched(p => ({ ...p, [name]: true }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const nextErrors = validate(values, minDate);
    if (Object.keys(nextErrors).length) {
      setTouched({ name: true, email: true, date: true });
      toast.error("Заповни обовʼязкові поля");
      return;
    }

    try {
      setIsSending(true);
      setWasSent(false);

      // імітація запиту, щоб показати "Sending..."
      await new Promise(r => setTimeout(r, 700));

      toast.success(`Booking request sent for "${camperName}" ✅`);

      setValues({ name: "", email: "", date: "", comment: "" });
      setTouched({});
      setWasSent(true);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Щось пішло не так. Спробуй ще раз."
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className={s.box}>
      <h3 className={s.title}>Book your campervan now</h3>
      <p className={s.sub}>Stay connected! We are always ready to help you.</p>

      <form onSubmit={onSubmit} className={s.form} noValidate>
        <div className={s.field}>
          <input
            className={cn(s.input, touched.name && errors.name && s.invalid)}
            name="name"
            type="text"
            placeholder="Name*"
            value={values.name}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={!!(touched.name && errors.name)}
            autoComplete="name"
          />
          {touched.name && errors.name && <span className={s.err}>{errors.name}</span>}
        </div>

        <div className={s.field}>
          <input
            className={cn(s.input, touched.email && errors.email && s.invalid)}
            name="email"
            type="email"
            placeholder="Email*"
            value={values.email}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={!!(touched.email && errors.email)}
            autoComplete="email"
          />
          {touched.email && errors.email && <span className={s.err}>{errors.email}</span>}
        </div>

        <div className={s.field}>
          <input
            className={cn(s.input, touched.date && errors.date && s.invalid)}
            name="date"
            type="date"
            min={minDate}
            value={values.date}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={!!(touched.date && errors.date)}
          />
          {touched.date && errors.date && <span className={s.err}>{errors.date}</span>}
        </div>

        <div className={s.field}>
          <textarea
            className={s.textarea}
            name="comment"
            placeholder="Comment"
            value={values.comment}
            onChange={onChange}
            onBlur={onBlur}
            maxLength={300}
          />
        </div>

        <button type="submit" className={s.primary} disabled={isSending}>
          {isSending ? "Sending..." : "Send"}
        </button>

        {wasSent && (
          <div className={s.success} aria-live="polite">
            We received your request. We'll contact you soon.
          </div>
        )}
      </form>
    </div>
  );
}

function validate(v, minDate) {
  const e = {};
  if (!v.name.trim() || v.name.trim().length < 2) e.name = "Enter your name (min 2 chars)";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email";
  if (!v.date) e.date = "Select a date";
  if (v.date && v.date < minDate) e.date = "Date cannot be in the past";
  return e;
}

function cn(...list) {
  return list.filter(Boolean).join(" ");
}

export default BookingForm;