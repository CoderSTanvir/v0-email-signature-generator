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

function getSocialIcon(label: string): string {
  const icons: Record<string, string> = {
    LinkedIn: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.824 0-9.744h3.554v1.378c.43-.664 1.195-1.61 2.905-1.61 2.121 0 3.714 1.388 3.714 4.373v5.603zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.706 0-.951.77-1.706 1.956-1.706 1.187 0 1.915.755 1.937 1.706 0 .948-.75 1.706-1.978 1.706zm1.581 11.597H3.694V9.558h3.224v10.894zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>',
    GitHub: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
    Twitter: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M23.953 4.57a10 10 0 002.856-3.915 10 10 0 01-2.866.98 4.96 4.96 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
    Facebook: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    YouTube: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    Reddit: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.53l-.823-3.808c-.038-.196.166-.335.35-.287l2.588.547a1.25 1.25 0 0 1 1.25-1.25c.687 0 1.25.562 1.25 1.25s-.563 1.25-1.25 1.25zm2.204 5.41c.065 0 .13.009.195.027a.75.75 0 1 0-.195-.027zm-4.413 0c.066 0 .13.009.196.027a.75.75 0 1 0-.196-.027zm7.221 1.27c0 .746-.607 1.354-1.354 1.354-.748 0-1.355-.608-1.355-1.354 0-.747.607-1.354 1.355-1.354.747 0 1.354.607 1.354 1.354zm-4.604 0c0 .746-.607 1.354-1.354 1.354-.747 0-1.354-.608-1.354-1.354 0-.747.607-1.354 1.354-1.354.747 0 1.354.607 1.354 1.354zm3.738 4.565a.75.75 0 1 0-1.06-1.061l-1.06 1.06-1.06-1.06a.75.75 0 1 0-1.06 1.06l1.06 1.06-1.06 1.061a.75.75 0 1 0 1.06 1.06l1.06-1.06 1.06 1.06a.75.75 0 1 0 1.06-1.06l-1.06-1.06 1.06-1.061z"/></svg>',
  }
  return icons[label] || ''
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
    : `<div style="width:64px;height:64px;border-radius:14px;background:linear-gradient(135deg, ${accent}, #3b82f6);color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;display:flex;align-items:center;justify-content:center;">${initials(
        data.name,
      )}</div>`

  const contactHtml = contactRows
    .map(
      (r) =>
        `<div style="margin:2px 0;"><a href="${r.href}" style="color:#444444;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:13px;">${r.label}</a></div>`,
    )
    .join("")

  const socialHtml = socials.length
    ? `<div style="margin-top:8px;display:flex;gap:8px;">${socials
        .map((s) => {
          const icon = getSocialIcon(s.label)
          return `<a href="${s.href}" style="color:${accent};text-decoration:none;display:inline-flex;align-items:center;justify-content:center;" title="${s.label}">${icon}</a>`
        })
        .join("")}</div>`
    : ""

  return `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;background-color:#f5f5f5;padding:16px;border-radius:12px;"><tr><td style="vertical-align:top;padding-right:18px;background-color:#f5f5f5;">${avatar}</td><td style="vertical-align:top;background-color:#f5f5f5;"><div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:#1a1a1a;">${name}</div>${
    titleCompany
      ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:${accent};margin-top:2px;">${titleCompany}</div>`
      : ""
  }<div style="margin-top:8px;background-color:#f5f5f5;">${contactHtml}</div>${socialHtml}</td></tr></table>`
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
