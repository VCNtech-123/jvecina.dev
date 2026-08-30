
import { forwardRef, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import api, { getErrorMessage } from "../../api/api";
import Card from "../ui/Card";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot
};

type FieldErrors = Partial<Record<keyof Omit<FormState, "website">, string>>;

const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "", website: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 2000;
const FIELD_ORDER: (keyof FieldErrors)[] = ["name", "email", "subject", "message"];

const validate = (form: FormState): FieldErrors => {
  const errors: FieldErrors = {};

  if (!form.name.trim()) errors.name = "Enter your name.";

  if (!form.email.trim()) errors.email = "Enter your email.";
  else if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = "Enter a valid email address.";

  if (!form.subject.trim()) errors.subject = "Add a subject.";

  if (!form.message.trim()) errors.message = "Write a message.";
  else if (form.message.trim().length < 10) errors.message = "Say a bit more — at least 10 characters.";
  else if (form.message.length > MESSAGE_MAX) errors.message = `Keep it under ${MESSAGE_MAX} characters.`;

  return errors;
};

// ---------------------------------------------------------------------------
// Small icons (kept local — no shared icon module exists yet in this codebase)
// ---------------------------------------------------------------------------

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5" />
    <path d="M12 16h.01" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 animate-spin motion-reduce:animate-none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// ---------------------------------------------------------------------------
// Field primitives — shared input chrome, real label/error/aria wiring
// ---------------------------------------------------------------------------

const inputClass = (hasError: boolean) =>
  [
    "mt-2 w-full rounded-lg border bg-bg/40 px-3 py-2 text-[15px] text-text placeholder:text-muted",
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
    hasError ? "border-red-400/60 focus-visible:ring-red-400/40" : "border-border",
  ].join(" ");

type TextFieldProps = {
  id: keyof FieldErrors;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id, label, value, onChange, error, type = "text", placeholder }, ref) => (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-text">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass(Boolean(error))}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  )
);
TextField.displayName = "TextField";

type TextAreaFieldProps = {
  id: keyof FieldErrors;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  maxLength: number;
};

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ id, label, value, onChange, error, placeholder, maxLength }, ref) => (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
        </label>
        <span className="text-xs text-muted">
          {value.length} / {maxLength}
        </span>
      </div>
      <textarea
        ref={ref}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={["mt-2 min-h-32 resize-y", inputClass(Boolean(error))].join(" ")}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  )
);
TextAreaField.displayName = "TextAreaField";

const StatusBanner = ({ tone, children }: { tone: "error" | "success"; children: ReactNode }) => (
  <div
    className={[
      "flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-sm",
      tone === "error" ? "border-red-400/30 bg-red-400/5 text-red-300" : "border-accent/30 bg-accent/5 text-accent",
    ].join(" ")}
  >
    {tone === "error" ? <AlertIcon /> : <CheckIcon />}
    <span>{children}</span>
  </div>
);

const ContactForm = ({ title = "Send a message" }: { title?: string }) => {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const fieldRefs = useRef<Partial<Record<keyof FieldErrors, HTMLInputElement | HTMLTextAreaElement>>>({});

  const onChange =
    (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      if (key !== "website" && fieldErrors[key]) {
        setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSuccess("");

    if (form.website.trim().length) return; // honeypot tripped — silently drop

    const errors = validate(form);
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      const firstInvalid = FIELD_ORDER.find((key) => errors[key]);
      if (firstInvalid) fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/messages", {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });

      setSuccess("Message sent — I’ll get back to you soon.");
      setForm(EMPTY_FORM);
      setFieldErrors({});
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-[17px] font-semibold tracking-tight text-text">{title}</h3>
      <p className="mt-2 text-[15px] leading-6 text-muted">Send me a message and I'll respond via email.</p>

      <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
        {/* Honeypot — hidden from sighted and assistive users, catches bots that fill every field */}
        <input
          value={form.website}
          onChange={onChange("website")}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            ref={(el) => {
              if (el) fieldRefs.current.name = el;
            }}
            id="name"
            label="Name"
            value={form.name}
            onChange={onChange("name")}
            error={fieldErrors.name}
            placeholder="Your name"
          />

          <TextField
            ref={(el) => {
              if (el) fieldRefs.current.email = el;
            }}
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={onChange("email")}
            error={fieldErrors.email}
            placeholder="you@email.com"
          />
        </div>

        <TextField
          ref={(el) => {
            if (el) fieldRefs.current.subject = el;
          }}
          id="subject"
          label="Subject"
          value={form.subject}
          onChange={onChange("subject")}
          error={fieldErrors.subject}
          placeholder="Project / opportunity / question"
        />

        <TextAreaField
          ref={(el) => {
            if (el) fieldRefs.current.message = el;
          }}
          id="message"
          label="Message"
          value={form.message}
          onChange={onChange("message")}
          error={fieldErrors.message}
          placeholder="Write your message..."
          maxLength={MESSAGE_MAX}
        />

        {/* Live region so screen reader users hear the outcome without moving focus */}
        <div aria-live="polite">
          {submitError ? <StatusBanner tone="error">{submitError}</StatusBanner> : null}
          {success ? <StatusBanner tone="success">{success}</StatusBanner> : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-primary" disabled={loading} aria-busy={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <SpinnerIcon />
                Sending...
              </span>
            ) : (
              "Send message"
            )}
          </button>

          <a className="btn-secondary" href="mailto:johnvecina640@gmail.com">
            Email instead
          </a>
        </div>
      </form>
    </Card>
  );
};

export default ContactForm;