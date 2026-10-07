import { createTranslator } from "next-intl";

import { formatShortDate, fromIsoDate } from "@/lib/date";
import { type Locale, LOCALE_LABELS } from "@/lib/types/i18n";
import type { ContactFormDataType } from "@/types/contact.type";

import contactMessages from "@/i18n/messages/sr/contact.json";

// Obaveštenje stiže vlasniku, pa je kostur (labele, nazivi usluga) uvek na srpskom, bez obzira
// na jezik sajta; tekst koji je posetilac uneo ide u originalu, bez prevođenja (odluka vlasnika).
const t = createTranslator({
  locale: "sr",
  messages: { contact: contactMessages },
  namespace: "contact",
});

type ContactEmailType = {
  subject: string;
  html: string;
  text: string;
};

type EmailRowType = {
  label: string;
  value: string;
};

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Unos posetioca nikad ne ulazi u HTML neobrađen. */
export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);

/** Novi redovi i višestruki razmaci iz unosa ne smeju da razbiju naslov emaila. */
const singleLine = (value: string) => value.replace(/\s+/g, " ").trim();

const serviceLabel = ({ service }: ContactFormDataType) =>
  service ? t(`form.services.${service}`) : t("email.notProvided");

function buildRows(data: ContactFormDataType, locale: Locale): EmailRowType[] {
  const orEmpty = (value: string) => value || t("email.notProvided");

  return [
    { label: t("form.fields.name.label"), value: data.name },
    { label: t("form.fields.email.label"), value: data.email },
    { label: t("form.fields.phone.label"), value: orEmpty(data.phone) },
    { label: t("form.fields.service.label"), value: serviceLabel(data) },
    {
      label: t("form.fields.date.label"),
      value: data.date ? formatShortDate(fromIsoDate(data.date), "sr") : t("email.notProvided"),
    },
    { label: t("form.fields.location.label"), value: orEmpty(data.location) },
    { label: t("email.siteLanguage"), value: LOCALE_LABELS[locale] },
  ];
}

// Email klijenti ne čitaju CSS klase ni tokene — stilovi su inline, sa vrednostima iz palete.
function renderHtml(rows: EmailRowType[], message: string, replyHint: string): string {
  const rowsHtml = rows
    .map(
      ({ label, value }) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6E685C;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;vertical-align:top">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `<!doctype html><html lang="sr"><body style="margin:0;padding:24px;background:#FAF8F4;font-family:Arial,Helvetica,sans-serif;color:#26241F"><div style="max-width:600px;margin:0 auto;padding:24px;background:#FFFFFF;border:1px solid #E6E0D3;border-radius:12px"><h1 style="margin:0 0 16px;font-size:20px">${escapeHtml(t("email.heading"))}</h1><table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px">${rowsHtml}</table><h2 style="margin:24px 0 8px;font-size:16px">${escapeHtml(t("form.fields.message.label"))}</h2><p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</p><p style="margin:24px 0 0;font-size:13px;color:#6E685C">${escapeHtml(replyHint)}</p></div></body></html>`;
}

/** Subject, HTML telo i plain-text fallback za upit sa kontakt forme (poglavlje 12). */
export function buildContactEmail(data: ContactFormDataType, locale: Locale): ContactEmailType {
  const rows = buildRows(data, locale);
  const replyHint = t("email.replyHint", { email: data.email });

  const text = [
    t("email.heading"),
    "",
    ...rows.map(({ label, value }) => `${label}: ${value}`),
    "",
    `${t("form.fields.message.label")}:`,
    data.message,
    "",
    replyHint,
  ].join("\n");

  return {
    subject: singleLine(
      t("email.subject", { service: serviceLabel(data), name: singleLine(data.name) })
    ),
    html: renderHtml(rows, data.message, replyHint),
    text,
  };
}
