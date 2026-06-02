import * as React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { supabase } from "../lib/supabase"

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
}

export function ContactForm({ t }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const form = e.currentTarget
    const formData = new FormData(form)

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const service = formData.get("service") as string
    const message = formData.get("message") as string

    try {
      const { error } = await supabase
        .from('contact_requests')
        .insert([{ name, email, phone, service, message }])

      if (error) throw error

      setSubmitStatus('success')
      form.reset()
    } catch (error) {
      console.error('Error al guardar:', error)
      setSubmitStatus('error')
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

      {submitStatus === 'success' ? (
        <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h4 className="font-bold text-lg mb-2">{t.successTitle}</h4>
          <p>{t.successText}</p>
          <Button
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 h-auto text-base"
            onClick={() => setSubmitStatus('idle')}
          >
            {t.newRequestText}
          </Button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">{t.nameLabel}</Label>
            <Input id="name" name="name" placeholder={t.namePlaceholder} required disabled={isSubmitting} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t.emailLabel}</Label>
            <Input id="email" name="email" type="email" placeholder={t.emailPlaceholder} required disabled={isSubmitting} />
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
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">{t.serviceLabel}</Label>
            <Select name="service" required defaultValue="residencial" disabled={isSubmitting}>
              <SelectTrigger id="service">
                <SelectValue placeholder={t.serviceLabel} />
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
            />
          </div>

          {submitStatus === 'error' && (
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{t.errorText}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 h-auto hover:-translate-y-1 hover:shadow-lg transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 text-base"
            disabled={isSubmitting}
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
