"use client"

import { useRef } from "react"
import type { SignatureData } from "@/lib/signature-types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Upload, X } from "lucide-react"

function BrandIcon({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        backgroundColor: "currentColor",
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

const accents: { label: string; value: string; swatch: string }[] = [
  { label: "Violet", value: "#a855f7", swatch: "bg-[#a855f7]" },
  { label: "Blue", value: "#3b82f6", swatch: "bg-[#3b82f6]" },
  { label: "Cyan", value: "#22d3ee", swatch: "bg-[#22d3ee]" },
  { label: "Pink", value: "#ec4899", swatch: "bg-[#ec4899]" },
]

type Props = {
  data: SignatureData
  onChange: (next: SignatureData) => void
}

export function SignatureForm({ data, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function set<K extends keyof SignatureData>(key: K, value: SignatureData[K]) {
    onChange({ ...data, [key]: value })
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => set("image", typeof reader.result === "string" ? reader.result : "")
    reader.readAsDataURL(file)
  }

  const fields: { key: keyof SignatureData; label: string; placeholder: string; type?: string }[] = [
    { key: "name", label: "Full name", placeholder: "Ada Lovelace" },
    { key: "title", label: "Job title", placeholder: "Lead Engineer" },
    { key: "company", label: "Company", placeholder: "Analytical Engines Inc." },
    { key: "email", label: "Email", placeholder: "ada@engines.com", type: "email" },
    { key: "phone", label: "Phone", placeholder: "+1 (555) 012-3456", type: "tel" },
    { key: "website", label: "Website", placeholder: "engines.com", type: "url" },
  ]

  const socials: { key: keyof SignatureData; label: string; placeholder: string; src: string }[] = [
    { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/ada", src: "/icons/linkedin.svg" },
    { key: "github", label: "GitHub", placeholder: "github.com/ada", src: "/icons/github.svg" },
    { key: "twitter", label: "Twitter / X", placeholder: "x.com/ada", src: "/icons/x.svg" },
    { key: "facebook", label: "Facebook", placeholder: "facebook.com/ada", src: "/icons/facebook.svg" },
    { key: "youtube", label: "YouTube", placeholder: "youtube.com/@ada", src: "/icons/youtube.svg" },
    { key: "reddit", label: "Reddit", placeholder: "reddit.com/user/ada", src: "/icons/reddit.svg" },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Your details</h2>
        <p className="text-sm text-muted-foreground">Fill in the fields and watch the preview update live.</p>
      </div>

      <div className="space-y-3">
        <Label className="text-xs font-medium text-muted-foreground">Profile image</Label>
        <div className="flex items-center gap-4">
          <div
            className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
            style={{ boxShadow: data.image ? `0 8px 30px ${data.accent}33` : undefined }}
          >
            {data.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.image || "/placeholder.svg"} alt="Profile preview" className="size-full object-cover" />
            ) : (
              <Upload className="size-5 text-muted-foreground" aria-hidden="true" />
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/10"
            >
              <Upload className="size-3.5" />
              {data.image ? "Change image" : "Upload image"}
            </button>
            {data.image && (
              <button
                type="button"
                onClick={() => set("image", "")}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-3.5" />
                Remove
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="sr-only"
            aria-label="Upload profile image"
          />
        </div>
      </div>

      <Separator className="bg-border" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.key} className="flex flex-col gap-2">
            <Label htmlFor={f.key} className="text-xs font-medium text-muted-foreground">
              {f.label}
            </Label>
            <Input
              id={f.key}
              type={f.type ?? "text"}
              placeholder={f.placeholder}
              value={data[f.key]}
              onChange={(e) => set(f.key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <Separator className="bg-border" />

      <div className="space-y-3">
        <Label className="text-xs font-medium text-muted-foreground">Social links (optional)</Label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {socials.map((s) => {
            return (
              <div key={s.key} className="flex flex-col gap-2">
                <Label htmlFor={s.key} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <BrandIcon src={s.src} className="size-3.5" />
                  {s.label}
                </Label>
                <Input
                  id={s.key}
                  type="url"
                  placeholder={s.placeholder}
                  value={data[s.key]}
                  onChange={(e) => set(s.key, e.target.value)}
                />
              </div>
            )
          })}
        </div>
      </div>

      <Separator className="bg-border" />

      <div className="space-y-3">
        <Label className="text-xs font-medium text-muted-foreground">Accent color</Label>
        <div className="flex flex-wrap gap-2">
          {accents.map((a) => {
            const active = data.accent === a.value
            return (
              <button
                key={a.value}
                type="button"
                onClick={() => set("accent", a.value)}
                aria-pressed={active}
                aria-label={a.label}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  active
                    ? "border-foreground/40 bg-foreground/10 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={`size-3 rounded-full ${a.swatch}`} aria-hidden="true" />
                {a.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
