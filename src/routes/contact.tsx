import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "../components/Reveal";

const SCHOOL_EMAIL = "mayflowerjnrschool.contact@gmail.com";

// Messages are delivered by FormSubmit (formsubmit.co) — a free relay that
// needs no account. The FIRST message sent from the live site triggers a
// one-time confirmation email to the address below; click the link inside it
// once and every later message arrives in the inbox automatically.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/fde6994df34e6b5a8987c42b36021a14";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mayflower Junior School, Ikenne" },
      { name: "description", content: "Reach Mayflower Junior School, Ikenne — Ogun State, Nigeria." },
      { property: "og:title", content: "Contact Mayflower Junior School" },
      { property: "og:description", content: "Reach the school office in Ikenne, Ogun State." },
    ],
  }),
  component: Contact,
});

type Status = "idle" | "sending" | "sent" | "error";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          _subject: subject || "Website enquiry",
          _template: "table",
          _captcha: "false",
          message,
        }),
      });
      if (!res.ok) throw new Error(`Send failed (${res.status})`);
      setStatus("sent");
      setName(""); setEmail(""); setSubject(""); setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <>
      <section className="section">
        <div className="container-page max-w-4xl">
          <Reveal><p className="eyebrow">Contact</p></Reveal>
          <Reveal delay={120}>
            <h1 className="serif text-5xl md:text-7xl mt-4 leading-[1.02]">
              We would love to hear from you.
            </h1>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-6 text-lg text-forest/80 leading-relaxed max-w-2xl">
              Whether you are a prospective parent, a returning Ex-May, or a friend of the school — our doors, and our office lines, are open.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
              <a
                href="#write"
                className="btn-primary w-full sm:w-auto text-center"
              >
                ✉  Contact us
              </a>
              <a
                href={`mailto:${SCHOOL_EMAIL}`}
                className="text-sm text-forest/80 hover:text-forest underline underline-offset-4 break-all"
              >
                {SCHOOL_EMAIL}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="write" className="section pt-4">
        <div className="container-page max-w-3xl">
          <Reveal>
            <form className="card-soft p-8 md:p-10 space-y-5" onSubmit={handleSubmit}>
              <p className="eyebrow">Send us a note</p>
              <h2 className="serif text-3xl">Write to the school office.</h2>
              <p className="text-sm text-forest/70">
                Fill in your details and press send — your message goes straight to the school office.
                No email app required.
              </p>

              <Field label="Your name">
                <input required value={name} onChange={e => setName(e.target.value)} className="input" placeholder="e.g. Adebayo Okonkwo" />
              </Field>
              <Field label="Your email">
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="input" placeholder="you@email.com" />
              </Field>
              <Field label="Subject">
                <input required value={subject} onChange={e => setSubject(e.target.value)} className="input" placeholder="e.g. Admissions enquiry" />
              </Field>
              <Field label="Message">
                <textarea required rows={6} value={message} onChange={e => setMessage(e.target.value)} className="input resize-none" placeholder="A few words..." />
              </Field>

              <button type="submit" className="btn-primary w-full" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              {status === "sent" && (
                <p className="text-sm text-forest bg-sage/20 border border-sage/40 rounded-lg px-3 py-2">
                  Thank you — your message has been sent to the school office. We will reply to the email you gave.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-forest bg-blossom/20 border border-blossom/40 rounded-lg px-3 py-2">
                  We couldn't send that just now. Please try again, or write directly to{" "}
                  <a className="underline break-all" href={`mailto:${SCHOOL_EMAIL}`}>{SCHOOL_EMAIL}</a>.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border);
          padding: 0.75rem 0;
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--forest);
          transition: border-color 0.4s ease;
        }
        .input:focus { outline: none; border-color: var(--forest); }
      `}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs tracking-[0.25em] uppercase text-sage">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
