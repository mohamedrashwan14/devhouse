'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { ArrowRight, MessageCircle, Search, ClipboardList, Paintbrush, Rocket, HeartHandshake } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

export default function HomePage() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#17b6a7]/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            {...fadeUp(0)}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Modern Websites for Clinics That{' '}
            <span className="text-[#17b6a7]">Actually Bring in Patients</span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.15)}
            className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            We build fast, professional websites for clinics and medical practices in Egypt — with online booking, WhatsApp integration, and Google-ready SEO. Delivered in 2 weeks.
          </motion.p>
          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold rounded-md text-white bg-[#17b6a7] hover:bg-[#14a090] transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#17b6a7]/30"
            >
              Get a Free Website Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold rounded-md text-white border border-white/30 hover:border-white/60 hover:bg-white/5 transition duration-300 ease-in-out"
            >
              See Our Work
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — The Problem */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            {...fadeUp(0)}
            className="text-3xl sm:text-4xl font-bold mb-6"
          >
            Is your clinic losing patients to a{' '}
            <span className="text-[#17b6a7]">bad website?</span>
          </motion.h2>
          <motion.p
            {...fadeUp(0.15)}
            className="text-lg text-gray-300 leading-relaxed"
          >
            Most clinics in Egypt still rely on outdated websites, a Facebook page, or nothing at all. Meanwhile, patients are searching Google right now for a clinic like yours — and choosing the one that looks more professional online.
          </motion.p>
        </div>
      </section>

      {/* SECTION 3 — What You Get */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            {...fadeUp(0)}
            className="text-3xl sm:text-4xl font-bold text-center mb-14"
          >
            What You Get
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Paintbrush,
                title: 'Designed to Convert',
                description: 'A clean, modern site that turns visitors into booked appointments. Mobile-first, fast, and built around your patients.',
                delay: 0,
              },
              {
                icon: MessageCircle,
                title: 'Online Booking & WhatsApp',
                description: 'Patients book directly from your site or message you on WhatsApp in one tap. No more missed calls.',
                delay: 0.1,
              },
              {
                icon: Search,
                title: 'Found on Google',
                description: 'We optimize your site so you show up when patients in your area search for your specialty.',
                delay: 0.2,
              },
            ].map(({ icon: Icon, title, description, delay }) => (
              <motion.div
                key={title}
                {...fadeUp(delay)}
                className="bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col gap-4"
              >
                <Icon className="h-10 w-10 text-[#17b6a7]" />
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-gray-300 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            {...fadeUp(0)}
            className="text-3xl sm:text-4xl font-bold text-center mb-14"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                icon: ClipboardList,
                title: 'Free Audit',
                description: "We review your current online presence and tell you exactly what\u2019s costing you patients.",
                delay: 0,
              },
              {
                step: '2',
                icon: Paintbrush,
                title: 'Design',
                description: "We design your new site around your clinic\u2019s brand and your patients\u2019 needs.",
                delay: 0.1,
              },
              {
                step: '3',
                icon: Rocket,
                title: 'Build & Launch',
                description: 'Live in 2 weeks. You approve every step.',
                delay: 0.2,
              },
              {
                step: '4',
                icon: HeartHandshake,
                title: 'Support',
                description: 'We stay with you for updates, content, and growth.',
                delay: 0.3,
              },
            ].map(({ step, icon: Icon, title, description, delay }) => (
              <motion.div
                key={step}
                {...fadeUp(delay)}
                className="flex flex-col items-start gap-4"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#17b6a7]/20 border border-[#17b6a7]/40 text-[#17b6a7] font-bold text-lg">
                  {step}
                </div>
                <Icon className="h-7 w-7 text-[#17b6a7]" />
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-gray-300 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            {...fadeUp(0)}
            className="text-3xl sm:text-4xl font-bold mb-5"
          >
            Ready to stop losing patients to a bad website?
          </motion.h2>
          <motion.p
            {...fadeUp(0.15)}
            className="text-lg text-gray-300 mb-10"
          >
            Book a free 15-minute call. We&apos;ll audit your current site live and show you exactly what to fix — whether you hire us or not.
          </motion.p>
          <motion.div {...fadeUp(0.3)}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-md text-white bg-[#17b6a7] hover:bg-[#14a090] transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#17b6a7]/30"
            >
              Book My Free Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
