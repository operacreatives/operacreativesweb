"use client";

import { useState } from "react";
import { validateContact, type ContactErrors, type ContactValues } from "@/lib/contact";

const initialValues: ContactValues = { name: "", email: "", company: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof ContactValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSubmitted(true);
  };

  return (
    <form id="project-form" className="contact-form" onSubmit={submit} noValidate>
      <div className="contact-form__intro">
        <p className="section-kicker">Project enquiry</p>
        <h2>What are we making?</h2>
        <p className="form-note">Demonstration only. This form validates locally and does not send or store your message.</p>
      </div>
      <label>
        <span>Name</span>
        <input
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <small id="name-error">{errors.name}</small>}
      </label>
      <label>
        <span>Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <small id="email-error">{errors.email}</small>}
      </label>
      <label>
        <span>Company <em>Optional</em></span>
        <input
          name="company"
          autoComplete="organization"
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
        />
      </label>
      <label className="contact-form__message">
        <span>Tell us about it</span>
        <textarea
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <small id="message-error">{errors.message}</small>}
      </label>
      <button type="submit" className="button-solid">
        Preview enquiry
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {submitted ? "Looks good. Demo mode is active, so nothing was sent." : ""}
      </p>
    </form>
  );
}
