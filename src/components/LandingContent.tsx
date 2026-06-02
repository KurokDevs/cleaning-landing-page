import * as React from "react"
import { LanguageProvider, useTranslation } from "../i18n/LanguageContext"
import { LanguageToggle } from "./LanguageToggle"
import { ContactForm } from "./ContactForm"
import { FAQAccordion } from "./FAQAccordion"
import { BeforeAfterSlider } from "./BeforeAfterSlider"
import { Logo } from "./Logo"

function PageContent() {
  const t = useTranslation()

  return (
    <>
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Logo size="h-10 w-10" textSize="text-2xl" variant="dark" />
          <nav className="hidden md:flex items-center gap-6">
            <a href="#servicios" className="text-gray-600 hover:text-blue-600 font-medium">{t.nav.services}</a>
            <a href="#nosotros" className="text-gray-600 hover:text-blue-600 font-medium">{t.nav.about}</a>
            <a href="#contacto" className="text-gray-600 hover:text-blue-600 font-medium">{t.nav.contact}</a>
            <LanguageToggle />
          </nav>
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <LanguageToggle />
            </div>
            <a
              href="#contacto"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 active:scale-95"
            >
              {t.nav.quote}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-blue-50 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              {t.hero.titleStart} <span className="text-blue-600">{t.hero.titleHighlight}</span>,<br /> {t.hero.titleEnd}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contacto"
                className="bg-blue-600 text-white text-center px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                {t.hero.cta}
              </a>
              <a
                href="#servicios"
                className="bg-white text-blue-600 text-center px-8 py-4 rounded-xl font-bold text-lg border border-blue-100 hover:bg-blue-50 hover:-translate-y-1 hover:shadow-md transition-all duration-300 active:scale-95"
              >
                {t.hero.seeServices}
              </a>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"></div>
              </div>
              <p>{t.hero.clients}</p>
            </div>
          </div>
          <div className="relative h-64 sm:h-80 lg:h-full min-h-[400px] flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full border border-gray-100 transform rotate-2 hover:rotate-0 transition duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">✓</div>
                <div>
                  <p className="font-bold text-gray-900">{t.hero.completedLabel}</p>
                  <p className="text-sm text-gray-500">{t.hero.timeAgo}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic mb-2">{t.hero.reviewText}</p>
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-yellow-400">★★★★★</span>
                <a href="#resenas" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">{t.hero.viewReviews}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.services.title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.services.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.services.cards.map((card, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-6">
                  {['🏠', '🏢', '✨'][i]}
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="nosotros" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <img src="/assets/sala.jpg" alt={t.about.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t.about.title}</h2>
              <p className="text-lg text-gray-600 mb-6">{t.about.paragraph1}</p>
              <p className="text-lg text-gray-600 mb-8">{t.about.paragraph2}</p>
              <div className="space-y-6">
                {t.about.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">✓</div>
                    <div>
                      <h4 className="font-bold text-gray-900">{f.title}</h4>
                      <p className="text-sm text-gray-500">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results (Before/After) Section */}
      <section id="resultados" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.results.title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.results.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{t.results.livingRoom}</h3>
              <BeforeAfterSlider
                beforeImage="/assets/messed.jpg"
                afterImage="/assets/cleanned.png"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{t.results.kitchen}</h3>
              <BeforeAfterSlider
                beforeImage="/assets/cocinasucia.webp"
                afterImage="/assets/cocinalimpia.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="resenas" className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.testimonials.title}</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">{t.testimonials.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.cards.map((card, i) => (
              <div key={i} className="bg-white text-gray-900 rounded-2xl p-8 shadow-xl hover:-translate-y-2 transition-transform duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg">{card.initials}</div>
                  <div>
                    <h4 className="font-bold text-lg">{card.name}</h4>
                    <div className="text-yellow-400 text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.faq.title}</h2>
            <p className="text-lg text-gray-600">{t.faq.subtitle}</p>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="bg-blue-600 p-10 text-white flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-4">{t.contact.title}</h3>
                  <p className="text-blue-100 mb-8">{t.contact.subtitle}</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span>📞</span>
                      <span>{t.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>✉️</span>
                      <span>{t.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>📍</span>
                      <span>{t.contact.address}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <Logo size="h-10 w-10" textSize="text-2xl" variant="light" className="mb-4" />
              <p className="text-gray-400 mb-6 leading-relaxed">{t.footer.description}</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">{t.footer.quickLinks}</h3>
              <ul className="space-y-3">
                {[t.footer.links[0], t.footer.links[1], t.footer.links[2], t.footer.links[3], t.footer.links[4]].map((link, i) => (
                  <li key={i}>
                    <a
                      href={['#servicios', '#nosotros', '#resenas', '#faq', '#contacto'][i]}
                      className="hover:text-blue-500 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">{t.footer.contact}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-blue-500">📍</span>
                  <span className="leading-relaxed">{t.contact.address}<br /><span className="text-sm text-gray-400">{t.footer.coverage}</span></span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-500">📞</span>
                  <span>{t.contact.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-500">✉️</span>
                  <a href={`mailto:${t.contact.email}`} className="hover:text-blue-500 transition-colors">{t.contact.email}</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">{t.footer.hours}</h3>
              <ul className="space-y-3">
                <li className="flex justify-between border-b border-gray-800 pb-2">
                  <span>{t.footer.monFri}</span>
                  <span className="text-white">8:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-gray-800 pb-2">
                  <span>{t.footer.sat}</span>
                  <span className="text-white">9:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span>{t.footer.sun}</span>
                  <span className="text-blue-500 font-medium text-sm bg-blue-500/10 px-2 py-1 rounded">{t.footer.closed}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Neat &amp; Co. {t.footer.copyright}</p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* SMS Floating Button (Mobile Only) */}
      <a
        href="sms:+1234567890?body=Hi!%20I'm%20interested%20in%20your%20cleaning%20services.%20Could%20I%20get%20a%20quote?"
        className="md:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 hover:scale-110 hover:-translate-y-2 transition-all duration-300 group flex items-center justify-center"
        aria-label="Send us a text message"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          <path d="M8 12h.01"></path>
          <path d="M12 12h.01"></path>
          <path d="M16 12h.01"></path>
        </svg>
      </a>
    </>
  )
}

export function LandingContent() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  )
}
