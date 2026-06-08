export type SignatureData = {
  name: string
  title: string
  company: string
  email: string
  phone: string
  website: string
  accent: string
}

export const defaultSignature: SignatureData = {
  name: "Ada Lovelace",
  title: "Lead Engineer",
  company: "Analytical Engines Inc.",
  email: "ada@engines.com",
  phone: "+1 (555) 012-3456",
  website: "engines.com",
  accent: "#a855f7",
}
