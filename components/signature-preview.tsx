"use client"

import { useState } from "react"
import type { SignatureData } from "@/lib/signature-types"
import { Mail, Phone, Globe, Building2, Check, Copy } from "lucide-react"

function BrandIcon({ src, className, color }: { src: string; className?: string; color: string }) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        display: "inline-block",
      }}
    />
  )
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase()
}

function withProtocol(url: string) {
  if (!url) return ""
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function buildSignatureHtml(data: SignatureData) {
  const accent = data.accent
  const name = escapeHtml(data.name || "Your Name")
  const titleCompany = [data.title, data.company].filter(Boolean).map(escapeHtml).join(" &middot; ")

  const contactRows = [
    data.email && { label: escapeHtml(data.email), href: `mailto:${data.email}` },
    data.phone && { label: escapeHtml(data.phone), href: `tel:${data.phone.replace(/[^\d+]/g, "")}` },
    data.website && { label: escapeHtml(data.website), href: withProtocol(data.website) },
  ].filter(Boolean) as { label: string; href: string }[]

  const socials = [
    data.linkedin && { label: "LinkedIn", href: withProtocol(data.linkedin) },
    data.github && { label: "GitHub", href: withProtocol(data.github) },
    data.twitter && { label: "Twitter", href: withProtocol(data.twitter) },
    data.facebook && { label: "Facebook", href: withProtocol(data.facebook) },
    data.youtube && { label: "YouTube", href: withProtocol(data.youtube) },
    data.reddit && { label: "Reddit", href: withProtocol(data.reddit) },
  ].filter(Boolean) as { label: string; href: string }[]

  const avatar = data.image
    ? `<img src="${data.image}" width="64" height="64" alt="${name}" style="display:block;width:64px;height:64px;border-radius:14px;object-fit:cover;" />`
    : `<div style="width:64px;height:64px;border-radius:14px;background:linear-gradient(135deg, ${accent}, #3b82f6);color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;line-height:64px;text-align:center;">${escapeHtml(
        initials(data.name),
      )}</div>`

  const contactHtml = contactRows
    .map(
      (r) =>
        `<div style="margin:2px 0;"><a href="${r.href}" style="color:#444444;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:13px;">${r.label}</a></div>`,
    )
    .join("")

  const socialHtml = socials.length
    ? `<div style="margin-top:8px;">${socials
        .map(
          (s) =>
            `<a href="${s.href}" style="color:${accent};text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;margin-right:12px;">${s.label}</a>`,
        )
        .join("")}</div>`
    : ""

  return `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;"><tr><td style="vertical-align:top;padding-right:18px;">${avatar}</td><td style="vertical-align:top;border-left:2px solid ${accent};padding-left:18px;"><div style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;color:#111111;">${name}</div>${
    titleCompany
      ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:${accent};margin-top:2px;">${titleCompany}</div>`
      : ""
  }<div style="margin-top:8px;">${contactHtml}</div>${socialHtml}</td></tr></table>`
}

function buildSignatureText(data: SignatureData) {
  return [
    data.name,
    [data.title, data.company].filter(Boolean).join(" · "),
    data.email,
    data.phone,
    data.website,
    data.linkedin,
    data.github,
    data.twitter,
    data.facebook,
    data.youtube,
    data.reddit,
  ]
    .filter(Boolean)
    .join("\n")
}

export function SignaturePreview({ data }: { data: SignatureData }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    const html = buildSignatureHtml(data)
    const text = buildSignatureText(data)
    try {
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([text], { type: "text/plain" }),
          }),
        ])
      } else {
        await navigator.clipboard.writeText(text)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard unavailable
    }
  }

  const rows: { icon: typeof Mail; value: string }[] = [
    { icon: Building2, value: data.company },
    { icon: Mail, value: data.email },
    { icon: Phone, value: data.phone },
    { icon: Globe, value: data.website },
  ].filter((r) => r.value)

  const socialLinks: { src: string; label: string; href: string }[] = [
    { src: "/icons/linkedin.svg", label: "LinkedIn", href: data.linkedin },
    { src: "/icons/github.svg", label: "GitHub", href: data.github },
    { src: "/icons/x.svg", label: "Twitter", href: data.twitter },
    { src: "/icons/facebook.svg", label: "Facebook", href: data.facebook },
    { src: "/icons/youtube.svg", label: "YouTube", href: data.youtube },
    { src: "/icons/reddit.svg", label: "Reddit", href: data.reddit },
  ]
    .filter((s) => s.href)
    .map((s) => ({ ...s, href: withProtocol(s.href) }))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Live preview</h2>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/10"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
        <div className="flex items-start gap-5">
          <div
            className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-xl font-semibold text-white shadow-lg"
            style={{
              background: data.image ? undefined : `linear-gradient(135deg, ${data.accent}, #3b82f6)`,
              boxShadow: `0 8px 30px ${data.accent}55`,
            }}
            aria-hidden="true"
          >
            {data.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.image || "/placeholder.svg"} alt="" className="size-full object-cover" />
            ) : (
              initials(data.name)
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xl font-semibold text-white">{data.name || "Your Name"}</p>
            {data.title && (
              <p className="mt-0.5 text-sm font-medium" style={{ color: data.accent }}>
                {data.title}
              </p>
            )}

            {socialLinks.length > 0 && (
              <div className="mt-2 flex items-center gap-2">
                {socialLinks.map((s) => {
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex size-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:bg-white/[0.08]"
                    >
                      <BrandIcon src={s.src} className="size-3.5" color={data.accent} />
                    </a>
                  )
                })}
              </div>
            )}

            <div
              className="my-4 h-px w-full"
              style={{ background: `linear-gradient(90deg, ${data.accent}66, transparent)` }}
            />

            <ul className="space-y-2">
              {rows.map((r, i) => {
                const Icon = r.icon
                return (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-neutral-300">
                    <Icon className="size-4 shrink-0" style={{ color: data.accent }} />
                    <span className="truncate">{r.value}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        This is how your signature will appear in emails.
      </p>
    </div>
  )
}


