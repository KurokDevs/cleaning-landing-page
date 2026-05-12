import * as React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { supabase } from "../lib/supabase"
import { useTranslation } from "../i18n/LanguageContext"
import { useLanguage } from "../i18n/LanguageContext"

export function ContactForm() {
  const t = useTranslation()
  const { lang } = useLanguage()

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
    const service = formData.get("service") as string
    const message = formData.get("message") as string

    try {
      const { error } = await supabase
        .from('contact_requests')
        .insert([{ name, email, service, message }])

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
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.form.title}</h3>
        <p className="text-gray-600 text-sm">{t.form.subtitle}</p>
      </div>
      
      {submitStatus === 'success' ? (
        <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h4 className="font-bold text-lg mb-2">{t.form.successTitle}</h4>
          <p>{t.form.successText}</p>
          <Button 
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 h-auto text-base" 
            onClick={() => setSubmitStatus('idle')}
          >
            {t.form.newRequestText}
          </Button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">{t.form.nameLabel}</Label>
            <Input id="name" name="name" placeholder={t.form.namePlaceholder} required disabled={isSubmitting} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">{t.form.emailLabel}</Label>
            <Input id="email" name="email" type="email" placeholder={t.form.emailPlaceholder} required disabled={isSubmitting} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="service">{t.form.serviceLabel}</Label>
            <Select name="service" required defaultValue="residencial" disabled={isSubmitting}>
              <SelectTrigger id="service">
                <SelectValue placeholder={t.form.serviceLabel} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residencial">
                  {lang === 'en' ? 'Residential Cleaning' : 'Limpieza Residencial'}
                </SelectItem>
                <SelectItem value="comercial">
                  {lang === 'en' ? 'Commercial Cleaning' : 'Limpieza Comercial'}
                </SelectItem>
                <SelectItem value="profunda">
                  {lang === 'en' ? 'Deep Cleaning' : 'Limpieza Profunda'}
                </SelectItem>
                <SelectItem value="otro">
                  {lang === 'en' ? 'Other' : 'Otro'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t.form.messageLabel}</Label>
            <Textarea 
              id="message" 
              name="message" 
              placeholder={t.form.messagePlaceholder} 
              className="resize-none"
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          
          {submitStatus === 'error' && (
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{t.form.errorText}</p>
          )}

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 h-auto hover:-translate-y-1 hover:shadow-lg transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? t.form.sendingText : t.form.sendText}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {t.form.privacyText}
          </p>
        </form>
      )}
    </div>
  )
}
