"use client"

import { useState } from "react"
import type { SignatureData } from "@/lib/signature-types"
import { Mail, Phone, Globe, Building2, Check, Copy } from "lucide-react"

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase()
}

export function SignaturePreview({ data }: { data: SignatureData }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    const lines = [
      data.name,
      [data.title, data.company].filter(Boolean).join(" · "),
      data.email,
      data.phone,
      data.website,
    ]
      .filter(Boolean)
      .join("\n")
    try {
      await navigator.clipboard.writeText(lines)
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
