"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CopyEmail } from "@/components/pages/CopyEmail";
import { magazine, site } from "@/content/site";

const topics = [
  { id: "general", label: "General question" },
  { id: "giving", label: "Question about giving" },
  { id: "partner", label: "Partnership" },
  { id: "volunteer", label: "Volunteer opportunities" },
  { id: "prayer", label: "Prayer request" },
  { id: "magazine", label: "Subscribe to GOD SPEED Magazine" },
] as const;

type FieldName = "name" | "email" | "subject" | "address" | "message";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * There is no form backend, so a valid message opens the visitor's email app with a pre-filled
 * message to the team. The form never reports a message as delivered: the visitor still presses
 * Send in their own app. Swap handleSubmit for an API route when a real service exists.
 */
export function ContactForm() {
  const [topic, setTopic] = useState<string>("general");
  const [subject, setSubject] = useState("");
  const subjectEdited = useRef(false);
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const choose = (id: string) => {
      const t = topics.find((x) => x.id === id);
      if (!t) return;
      setTopic(t.id);
      if (!subjectEdited.current) setSubject(t.id === "general" ? "" : t.label);
    };
    const fromUrl = new URLSearchParams(window.location.search).get("topic");
    if (fromUrl) choose(fromUrl);
    // Topic shortcuts elsewhere on the page select a topic without a navigation.
    const onPick = (e: Event) => choose((e as CustomEvent<string>).detail);
    window.addEventListener("contact-topic", onPick);
    return () => window.removeEventListener("contact-topic", onPick);
  }, []);

  const chooseTopic = (id: string) => window.dispatchEvent(new CustomEvent("contact-topic", { detail: id }));

  const validate = (data: FormData): Errors => {
    const v = (k: FieldName) => String(data.get(k) ?? "").trim();
    const next: Errors = {};
    if (!v("name")) next.name = "Please enter your full name.";
    if (!v("email")) next.email = "Please enter your email address.";
    else if (!EMAIL.test(v("email"))) next.email = "That email address doesn’t look complete — for example, name@example.com.";
    if (topic === "magazine" && !v("address")) next.address = "Please add the street address where the magazine should be mailed.";
    if (topic !== "magazine" && !v("message")) next.message = topic === "prayer" ? "Please share how we can pray for you." : "Please write a short message.";
    return next;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const found = validate(data);
    setErrors(found);
    const first = (Object.keys(found) as FieldName[])[0];
    if (first) {
      setOpened(false);
      document.getElementById(first)?.focus();
      return;
    }
    const label = topics.find((t) => t.id === topic)?.label ?? "Message";
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      topic === "magazine" ? `Mailing address: ${data.get("address") ?? ""}` : "",
      "",
      String(data.get("message") ?? ""),
    ]
      .filter(Boolean)
      .join("\n");
    const title = subject.trim() || label;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${title} — kingdomracing.net`)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  // Typing in a field clears its error.
  const clearError = (name: string) => {
    if (!(name in errors)) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name as FieldName];
      return next;
    });
  };

  const field = (invalid: boolean) =>
    `peer w-full border-0 border-b bg-transparent pb-3 pt-7 text-lg text-[var(--fg)] outline-none transition-colors placeholder:text-transparent focus:border-red ${invalid ? "border-red" : "border-line"}`;
  const label =
    "micro pointer-events-none absolute left-0 top-7 text-mute transition-all duration-300 peer-focus:top-0 peer-focus:text-red peer-[:not(:placeholder-shown)]:top-0";
  const describe = (name: FieldName) => (errors[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {});
  const errorText = (name: FieldName) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-2 text-sm text-red">
        {errors[name]}
      </p>
    ) : null;
  const count = Object.keys(errors).length;

  return (
    <form noValidate onSubmit={handleSubmit} onInput={(e) => clearError((e.target as HTMLInputElement).name)} className="space-y-8" aria-label="Contact Kingdom Racing">
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <div className="relative">
          <input id="name" name="name" required autoComplete="name" placeholder="Full name" className={field(!!errors.name)} {...describe("name")} />
          <label htmlFor="name" className={label}>Full name</label>
          {errorText("name")}
        </div>
        <div className="relative">
          <input id="email" name="email" type="email" inputMode="email" required autoComplete="email" placeholder="Email address" className={field(!!errors.email)} {...describe("email")} />
          <label htmlFor="email" className={label}>Email address</label>
          {errorText("email")}
        </div>
        <div className="relative">
          <label htmlFor="topic" className="micro block text-mute">
            I’d like to…
          </label>
          <select
            id="topic"
            name="topic"
            value={topic}
            onChange={(e) => chooseTopic(e.target.value)}
            className="mt-3 min-h-11 w-full cursor-pointer appearance-none rounded-none border-0 border-b border-line bg-transparent pb-3 pr-8 text-lg text-[var(--fg)] outline-none transition-colors focus:border-red"
          >
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute bottom-4 right-0 size-4 text-mute" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="relative">
          <input
            id="subject"
            name="subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => {
              subjectEdited.current = e.target.value !== "";
              setSubject(e.target.value);
            }}
            className={field(false)}
          />
          <label htmlFor="subject" className={label}>Subject</label>
        </div>
        {topic === "magazine" ? (
          <div className="relative sm:col-span-2">
            <input id="address" name="address" required autoComplete="street-address" placeholder="Street address" className={field(!!errors.address)} {...describe("address")} />
            <label htmlFor="address" className={label}>Mailing address</label>
            {errorText("address")}
          </div>
        ) : null}
      </div>

      {topic === "magazine" ? (
        <p className="-mt-2 text-sm leading-relaxed text-mute">
          {magazine.byEmail} {magazine.privacy} Prefer a web form?{" "}
          <a href={magazine.signupUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:text-red">
            Use Kingdom Racing’s official sign-up
          </a>
          .
        </p>
      ) : null}

      <div className="relative">
        <textarea
          id="message"
          name="message"
          rows={4}
          required={topic !== "magazine"}
          placeholder="Message"
          className={`${field(!!errors.message)} resize-none`}
          {...describe("message")}
        />
        <label htmlFor="message" className={label}>{topic === "prayer" ? "How can we pray for you?" : topic === "magazine" ? "Message (optional)" : "Message"}</label>
        {errorText("message")}
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group relative inline-flex min-h-[3.5rem] w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-ink px-8 text-sm font-medium text-paper transition-colors hover:text-white sm:w-auto"
        >
          <span className="absolute inset-0 -translate-x-[101%] bg-red transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-0" />
          <span className="relative">Send message</span>
          <span className="relative" aria-hidden>→</span>
        </button>
        <p className="text-sm text-mute sm:max-w-[16rem] sm:text-right">Opens your email app, addressed to {site.email}.</p>
      </div>

      <div aria-live="polite" role="status">
        {count > 0 ? (
          <p className="rounded-[4px] border border-red/40 bg-red/5 px-5 py-4 text-sm text-red">
            Please check the {count === 1 ? "highlighted field" : `${count} highlighted fields`} above.
          </p>
        ) : opened ? (
          <div className="rounded-[4px] border border-line px-5 py-5 text-sm leading-relaxed">
            <p className="font-medium">Your email app should now be open with your message ready.</p>
            <p className="mt-1 text-mute">It reaches the team only after you press Send there.</p>
            <p className="mt-4 text-mute">Nothing opened? Write to us directly:</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center text-base underline decoration-line underline-offset-4 hover:text-red">
                {site.email}
              </a>
              <CopyEmail />
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}
