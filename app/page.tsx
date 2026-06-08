"use client"

import { useState } from "react"
import { SignatureForm } from "@/components/signature-form"
import { SignaturePreview } from "@/components/signature-preview"
import { DemoSignature } from "@/components/demo-signature"
import { defaultSignature, type SignatureData } from "@/lib/signature-types"

export default function Page() {
  const [data, setData] = useState<SignatureData>(defaultSignature)

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Glowing blurred background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 size-[28rem] rounded-full bg-[#a855f7] opacity-30 blur-[120px]" />
        <div className="absolute -right-24 top-20 size-[26rem] rounded-full bg-[#3b82f6] opacity-30 blur-[120px]" />
        <div className="absolute bottom-[-10rem] left-1/3 size-[30rem] rounded-full bg-[#6366f1] opacity-25 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 sm:py-16 lg:py-20">
        <header className="space-y-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-[#a855f7]" aria-hidden="true" />
            Signature Studio
          </span>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Email Signature Generator
          </h1>
          <p className="mx-auto max-w-xl text-pretty text-sm leading-relaxed text-neutral-400">
            Fill in your details on the left and copy a polished, professional signature from the live preview.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8">
            <SignatureForm data={data} onChange={setData} />
          </div>
          <div className="lg:sticky lg:top-12 space-y-8">
            <SignaturePreview data={data} />
            <DemoSignature />
          </div>
        </div>
      </div>
    </main>
  )
}
