import * as React from "react"
import { useRef, useState } from "react"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { contactSchema } from "../lib/validation"

type FormTranslations = {
  title: string
  subtitle: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  phoneLabel: string
  phonePlaceholder: string
  serviceLabel: string
  messageLabel: string
  messagePlaceholder: string
  sendText: string
  sendingText: string
  successTitle: string
  successText: string
  newRequestText: string
  errorText: string
  privacyText: string
  serviceOptions: {
    residential: string
    commercial: string
    deep: string
    other: string
  }
}

interface Props {
  t: FormTranslations
  /** Optional override; otherwise reads from PUBLIC_TURNSTILE_SITE_KEY */
  turnstileSiteKey?: string
}

// Test key from Cloudflare's docs: always passes. Replace via env in prod.
const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA"

type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "service" | "message", string>
>

export function ContactForm({ t, turnstileSiteKey }: Props) {
  const siteKey =
    turnstileSiteKey ||
    (typeof window !== "undefined"
      ? (import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as string | undefined)
      : undefined) ||
    TURNSTILE_TEST_SITE_KEY

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [turnstileToken, setTurnstileToken] = useState<string>("")
  const turnstileRef = useRef<TurnstileInstance>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFieldErrors({})
    setErrorMessage("")
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
      honeypot: String(formData.get("company_website") ?? ""),
      turnstileToken,
    }

    // Client-side validation for fast UX feedback. Server also re-validates.
    const parsed = contactSchema.safeParse(payload)
    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors
      setFieldErrors({
        name: flattened.name?.[0],
        email: flattened.email?.[0],
        phone: flattened.phone?.[0],
        service: flattened.service?.[0],
        message: flattened.message?.[0],
      })
      if (!turnstileToken) {
        setErrorMessage(t.errorText)
      }
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        console.error("Contact API error:", res.status, data)
        setSubmitStatus("error")
        setErrorMessage(t.errorText)
        // Reset Turnstile so user can try again with a fresh token
        turnstileRef.current?.reset()
        setTurnstileToken("")
        return
      }

      setSubmitStatus("success")
      form.reset()
      turnstileRef.current?.reset()
      setTurnstileToken("")
    } catch (err) {
      console.error("Network error submitting form:", err)
      setSubmitStatus("error")
      setErrorMessage(t.errorText)
      turnstileRef.current?.reset()
      setTurnstileToken("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full bg-transparent">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h3>
        <p className="text-gray-600 text-sm">{t.subtitle}</p>
      </div>

      {submitStatus === "success" ? (
        <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h4 className="font-bold text-lg mb-2">{t.successTitle}</h4>
          <p>{t.successText}</p>
          <Button
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 h-auto text-base"
            onClick={() => setSubmitStatus("idle")}
          >
            {t.newRequestText}
          </Button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Honeypot — invisible to humans, bots fill it and get rejected. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <label htmlFor="company_website">Company website (leave blank)</label>
            <input
              id="company_website"
              name="company_website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">{t.nameLabel}</Label>
            <Input
              id="name"
              name="name"
              placeholder={t.namePlaceholder}
              required
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.name)}
            />
            {fieldErrors.name && (
              <p className="text-sm text-red-600">{fieldErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t.emailLabel}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t.emailPlaceholder}
              required
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.email)}
            />
            {fieldErrors.email && (
              <p className="text-sm text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t.phoneLabel}</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder={t.phonePlaceholder}
              required
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.phone)}
            />
            {fieldErrors.phone && (
              <p className="text-sm text-red-600">{fieldErrors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">{t.serviceLabel}</Label>
            <Select name="service" required defaultValue="residencial" disabled={isSubmitting}>
              <SelectTrigger id="service">
                <SelectValue placeholder={t.serviceLabel}>
                  {(value: string) => {
                    const labels: Record<string, string> = {
                      residencial: t.serviceOptions.residential,
                      comercial: t.serviceOptions.commercial,
                      profunda: t.serviceOptions.deep,
                      otro: t.serviceOptions.other,
                    }
                    return labels[value] ?? t.serviceLabel
                  }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residencial">{t.serviceOptions.residential}</SelectItem>
                <SelectItem value="comercial">{t.serviceOptions.commercial}</SelectItem>
                <SelectItem value="profunda">{t.serviceOptions.deep}</SelectItem>
                <SelectItem value="otro">{t.serviceOptions.other}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t.messageLabel}</Label>
            <Textarea
              id="message"
              name="message"
              placeholder={t.messagePlaceholder}
              className="resize-none"
              rows={3}
              disabled={isSubmitting}
              aria-invalid={Boolean(fieldErrors.message)}
            />
            {fieldErrors.message && (
              <p className="text-sm text-red-600">{fieldErrors.message}</p>
            )}
          </div>

          {/* Turnstile widget. Renders invisibly unless a challenge is needed. */}
          <div className="flex justify-center">
            <Turnstile
              ref={turnstileRef}
              siteKey={siteKey}
              options={{ theme: "light", size: "flexible" }}
              onSuccess={(token) => setTurnstileToken(token)}
              onError={() => setTurnstileToken("")}
              onExpire={() => setTurnstileToken("")}
            />
          </div>

          {submitStatus === "error" && errorMessage && (
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{errorMessage}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 h-auto hover:-translate-y-1 hover:shadow-lg transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 text-base"
            disabled={isSubmitting || !turnstileToken}
          >
            {isSubmitting ? t.sendingText : t.sendText}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {t.privacyText}
          </p>
        </form>
      )}
    </div>
  )
}
