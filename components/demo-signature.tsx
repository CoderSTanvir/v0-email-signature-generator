"use client"

import { Mail, Phone, Globe, Building2 } from "lucide-react"

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

export function DemoSignature() {
  const data = {
    name: "Shahriar Tanvir",
    title: "Student",
    company: "Daffodil International University (DIU)",
    email: "262-35-351@diu.edu.bd",
    phone: "",
    website: "",
    accent: "#3b82f6",
    image: "",
    linkedin: "https://www.linkedin.com/in/shahriar-tanvir-3353a7402/",
    github: "https://github.com/CoderSTanvir",
    twitter: "",
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
  ]
    .filter((s) => s.href)
    .map((s) => ({ ...s, href: withProtocol(s.href) }))

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">Demo Signature</h3>
        <p className="text-sm text-muted-foreground">Example with your information</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
        <div className="flex items-start gap-5">
          <div
            className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-xl font-semibold text-white shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${data.accent}, #3b82f6)`,
              boxShadow: `0 8px 30px ${data.accent}55`,
            }}
            aria-hidden="true"
          >
            {initials(data.name)}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xl font-semibold text-white">{data.name}</p>
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
    </div>
  )
}
