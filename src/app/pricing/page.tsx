'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Check, ChevronDown, ArrowRight, Star } from 'lucide-react'

/* ─── animation helper ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
})

/* ─── data ─── */
interface PricingCard {
  id: string
  name: string
  price: string
  tagline: string
  features: string[]
  popular?: boolean
  cta: string
}

const plans: PricingCard[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '8,000 EGP',
    tagline: 'For businesses that need a clean, professional online presence fast.',
    features: [
      'Up to 5 pages (Home, Services, About, Gallery, Contact)',
      'Mobile-first responsive design',
      'WhatsApp booking button',
      'Google Maps integration',
      'Basic on-page SEO',
      'Contact form',
      'Delivered in 10 days',
    ],
    cta: 'Get Started',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '15,000 EGP',
    tagline: 'For businesses that want to actively grow their customer base online.',
    popular: true,
    features: [
      'Everything in Starter, plus:',
      'Up to 8 pages',
      'Online appointment booking form',
      'Google Business Profile setup & optimization',
      'Client reviews section',
      'Arabic + English bilingual content',
      '3 months free maintenance',
      'Delivered in 14 days',
    ],
    cta: 'Get Started',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '22,000 EGP',
    tagline: 'For established businesses and brands who want a full digital presence.',
    features: [
      'Everything in Growth, plus:',
      'Up to 12 pages',
      'Multiple team member profiles',
      'Blog/articles section',
      'WhatsApp chat widget with auto-greeting',
      'Custom domain + email setup',
      '6 months free maintenance',
      'Priority 48-hour support',
      'Delivered in 21 days',
    ],
    cta: 'Get Started',
  },
]

const carePlanFeatures = [
  'Up to 4 content updates per month',
  'Monthly performance report (traffic, rankings, WhatsApp clicks)',
  'Security and speed monitoring',
  'Priority WhatsApp support',
]

const faqs = [
  {
    q: 'How long until my website is live?',
    a: 'Between 10 and 21 days depending on the package you choose. We give you a clear timeline on day one and stick to it.',
  },
  {
    q: 'Do I own my website?',
    a: 'Yes, 100%. Once we deliver, the website, the code, and the domain all belong to you. No lock-in, no hidden fees.',
  },
  {
    q: 'What if I need changes after launch?',
    a: "All packages include a free maintenance period after launch. After that, our Care Plan covers ongoing updates for 1,500 EGP/month. Or you can pay per change — we'll quote each request.",
  },
  {
    q: 'Can I pay in installments?',
    a: "Yes. We typically take 50% upfront to start the project and 50% on delivery. For Premium packages we can split into 3 payments. Talk to us during your free audit call.",
  },
]

/* ─── sub-components ─── */
function FeatureItem({ text }: { text: string }) {
  const isDivider = text.startsWith('Everything in')
  return (
    <li className="flex items-start gap-2.5">
      <Check
        className={`h-4 w-4 mt-0.5 shrink-0 ${isDivider ? 'text-[#17b6a7]/60' : 'text-[#17b6a7]'}`}
      />
      <span className={`text-sm leading-relaxed ${isDivider ? 'text-gray-400 italic' : 'text-gray-300'}`}>
        {text}
      </span>
    </li>
  )
}

function PricingCardComponent({ plan, delay }: { plan: PricingCard; delay: number }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className={`relative flex flex-col h-full rounded-2xl border transition-all duration-300
        ${plan.popular
          ? 'border-[#17b6a7] bg-gray-900/90 shadow-xl shadow-[#17b6a7]/10 z-10'
          : 'border-white/10 bg-gray-900/60 hover:border-white/20'
        }`}
    >
      {/* MOST POPULAR badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#17b6a7] text-black">
            <Star className="h-3 w-3 fill-black" />
            Most Popular
          </span>
        </div>
      )}

      <div className={`p-7 flex flex-col flex-1 ${plan.popular ? 'pt-9' : ''}`}>
        {/* Plan name */}
        <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">{plan.tagline}</p>

        {/* Price */}
        <div className="mb-7">
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-extrabold tracking-tight ${plan.popular ? 'text-[#17b6a7]' : 'text-white'}`}>
              {plan.price}
            </span>
          </div>
          <span className="text-sm text-gray-500 mt-1 block">one-time</span>
        </div>

        {/* Divider */}
        <div className={`w-full h-px mb-6 ${plan.popular ? 'bg-[#17b6a7]/30' : 'bg-white/8'}`} />

        {/* Features */}
        <ul className="flex flex-col gap-3 flex-1 mb-8">
          {plan.features.map((f) => (
            <FeatureItem key={f} text={f} />
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/free-audit"
          className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg text-sm font-semibold transition duration-200
            ${plan.popular
              ? 'bg-[#17b6a7] hover:bg-[#14a090] text-white hover:shadow-lg hover:shadow-[#17b6a7]/30 hover:-translate-y-0.5'
              : 'bg-white/8 hover:bg-white/14 text-white border border-white/10 hover:border-white/20'
            }`}
        >
          {plan.cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  )
}

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/4 transition-colors duration-150"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-white pr-4">{q}</span>
        <ChevronDown
          className={`h-5 w-5 text-[#17b6a7] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-gray-300 text-sm leading-relaxed border-t border-white/8 pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── page ─── */
export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h1 {...fadeUp(0)} className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
            Pricing Built for{' '}
            <span className="text-[#17b6a7]">Egyptian Businesses</span>
          </motion.h1>
          <motion.p {...fadeUp(0.15)} className="text-lg text-gray-300 leading-relaxed">
            Clear, fixed packages. No hidden fees. Choose what fits your business — we&apos;ll deliver it in days, not months.
          </motion.p>
        </div>
      </section>

      {/* ── Pricing cards ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* extra top padding on the grid row so the popular card badge has room */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-6">
            {plans.map((plan, i) => (
              <PricingCardComponent key={plan.id} plan={plan} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Care Plan ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/40 border-y border-white/8">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#17b6a7] mb-3">
              After Launch
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">DevHouse Care Plan</h2>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-3xl font-extrabold text-[#17b6a7]">1,500 EGP</span>
              <span className="text-gray-400 text-sm">/month</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
              Keep your website growing after launch. Available with any package above.
            </p>
          </motion.div>

          <motion.ul
            {...fadeUp(0.15)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
          >
            {carePlanFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2.5 bg-white/4 border border-white/8 rounded-lg px-4 py-3">
                <Check className="h-4 w-4 text-[#17b6a7] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-300 leading-relaxed">{f}</span>
              </li>
            ))}
          </motion.ul>

          <motion.p {...fadeUp(0.25)} className="text-center text-sm text-gray-400">
            Ask us about the Care Plan during your free audit.
          </motion.p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            {...fadeUp(0)}
            className="text-3xl font-bold text-center mb-10"
          >
            Common Questions
          </motion.h2>
          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/40 border-t border-white/8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2 {...fadeUp(0)} className="text-3xl sm:text-4xl font-bold mb-4">
            Not sure which package is right for you?
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="text-lg text-gray-300 mb-10 leading-relaxed">
            Book your free audit and we&apos;ll recommend the best fit for your business — no pressure, no sales pitch.
          </motion.p>
          <motion.div {...fadeUp(0.25)}>
            <Link
              href="/free-audit"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-lg text-white bg-[#17b6a7] hover:bg-[#14a090] transition duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#17b6a7]/30"
            >
              Get My Free Audit
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
