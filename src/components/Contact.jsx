import { useState } from "react";
import { PROFILE } from "../data/content";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "./Icons";

// Formspree form id (the part after /f/ in the endpoint). Set VITE_FORMSPREE_ID at build time.
// Without it the form is not rendered and the section shows direct contact links only.
const FORM_ID = import.meta.env.VITE_FORMSPREE_ID;
const ENDPOINT = FORM_ID ? `https://formspree.io/f/${FORM_ID}` : null;

const EMPTY = { name: "", email: "", subject: "", message: "", _gotcha: "" };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Please write at least a sentence.";
  return e;
}

function Form() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`c-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setValues(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <Check width={28} height={28} />
        <h3>Message sent.</h3>
        <p>Thanks for reaching out. I&rsquo;ll reply to the email address you provided.</p>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus("idle")}>
          Send another
        </button>
      </div>
    );
  }

  const field = (k, label, props = {}, Tag = "input") => (
    <div className={"field" + (errors[k] ? " has-error" : "")}>
      <label htmlFor={`c-${k}`}>{label}</label>
      <Tag
        id={`c-${k}`}
        name={k}
        value={values[k]}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `c-${k}-err` : undefined}
        {...props}
      />
      {errors[k] && (
        <span id={`c-${k}-err`} className="field__err">
          {errors[k]}
        </span>
      )}
    </div>
  );

  return (
    <form className="form" onSubmit={submit} noValidate>
      {field("name", "Name", { type: "text", autoComplete: "name", maxLength: 100 })}
      {field("email", "Email", { type: "email", autoComplete: "email", inputMode: "email", maxLength: 200 })}
      {field("subject", "Subject (optional)", { type: "text", maxLength: 150 })}
      {field("message", "Message", { rows: 6, maxLength: 4000 }, "textarea")}
      {/* honeypot: hidden from people, filled by bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="c-_gotcha">Leave this empty</label>
        <input id="c-_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" value={values._gotcha} onChange={set("_gotcha")} />
      </div>
      <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"} <ArrowUpRight />
      </button>
      {status === "error" && (
        <p className="form__error" role="alert">
          Something went wrong and your message was not sent. Please try again, or email me directly at{" "}
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>.
        </p>
      )}
    </form>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: the mailto link still works */
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="wrap">
        <header className="section__head" data-reveal>
          <p className="eyebrow">06 — Contact</p>
          <h2>
            Let&rsquo;s build something <em>worth reading.</em>
          </h2>
        </header>
        <div className={"contact__grid" + (ENDPOINT ? "" : " contact__grid--solo")}>
          <div className="contact__links" data-reveal>
            <p className="contact__lead">
              Open to internships, research collaborations and interesting problems across AI, security and software.
            </p>
            <div className="mailrow">
              <a className="mail" href={`mailto:${PROFILE.email}`}>
                <Mail /> <span>{PROFILE.email}</span>
              </a>
              <button type="button" className="icon-btn" onClick={copy} aria-label="Copy email address">
                {copied ? <Check /> : <Copy />}
                <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <ul className="social">
              <li>
                <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin /> LinkedIn <ArrowUpRight />
                </a>
              </li>
              <li>
                <a href={PROFILE.links.github} target="_blank" rel="noreferrer">
                  <Github /> GitHub <ArrowUpRight />
                </a>
              </li>
            </ul>
          </div>
          {ENDPOINT && (
            <div className="contact__form" data-reveal>
              <Form />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
