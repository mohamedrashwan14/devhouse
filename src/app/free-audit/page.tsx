'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
})

const SPECIALTIES = [
  'Dentist',
  'Dermatologist',
  'Pediatrician',
  'Gynecologist',
  'Physiotherapist',
  'General Practitioner',
  'Other',
]

export default function FreeAuditPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    clinicName: '',
    specialty: '',
    websiteUrl: '',
    whatsapp: '',
    frustration: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/free-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Submission failed')
      router.push('/free-audit/thank-you')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Logo-only header — no nav links */}
      <header className="flex items-center justify-center py-6 px-4 border-b border-white/10">
        <Link href="/home">
          <Image
            src="/static/Images/logoblackb2.png"
            alt="DevHouse"
            width={130}
            height={50}
            className="cursor-pointer"
          />
        </Link>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-14 sm:py-20">

        {/* Hero */}
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Free Website Audit for{' '}
            <span className="text-[#17b6a7]">Your Clinic</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            We&apos;ll review your current website (or lack of one) and send you a personalized video showing exactly what&apos;s costing you patients — and how to fix it. 100% free, no sales pitch. You get the video within 48 hours.
          </p>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          {...fadeUp(0.15)}
          className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between mb-12 bg-gray-900/60 border border-white/10 rounded-xl px-6 py-5"
        >
          {[
            '48-hour turnaround',
            'No cost, no commitment',
            'Built specifically for Egyptian clinics',
          ].map(item => (
            <div key={item} className="flex items-center gap-2.5 text-sm text-gray-200">
              <CheckCircle2 className="h-5 w-5 text-[#17b6a7] shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div {...fadeUp(0.25)}>
          <h2 className="text-2xl font-bold mb-7 text-center">Get My Free Audit</h2>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                Your name <span className="text-[#17b6a7]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full bg-gray-900/60 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#17b6a7] focus:ring-1 focus:ring-[#17b6a7] transition"
                placeholder="Dr. Ahmed Hassan"
              />
            </div>

            {/* Clinic name */}
            <div>
              <label htmlFor="clinicName" className="block text-sm font-medium text-gray-300 mb-1.5">
                Clinic name <span className="text-[#17b6a7]">*</span>
              </label>
              <input
                id="clinicName"
                name="clinicName"
                type="text"
                required
                value={form.clinicName}
                onChange={handleChange}
                className="w-full bg-gray-900/60 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#17b6a7] focus:ring-1 focus:ring-[#17b6a7] transition"
                placeholder="Nile Dental Center"
              />
            </div>

            {/* Specialty */}
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-300 mb-1.5">
                Your specialty <span className="text-[#17b6a7]">*</span>
              </label>
              <select
                id="specialty"
                name="specialty"
                required
                value={form.specialty}
                onChange={handleChange}
                className="w-full bg-gray-900/60 border border-white/15 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#17b6a7] focus:ring-1 focus:ring-[#17b6a7] transition appearance-none"
              >
                <option value="" disabled className="text-gray-500">Select your specialty</option>
                {SPECIALTIES.map(s => (
                  <option key={s} value={s} className="bg-gray-900">{s}</option>
                ))}
              </select>
            </div>

            {/* Website URL */}
            <div>
              <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-300 mb-1.5">
                Current website URL <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <input
                id="websiteUrl"
                name="websiteUrl"
                type="text"
                value={form.websiteUrl}
                onChange={handleChange}
                className="w-full bg-gray-900/60 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#17b6a7] focus:ring-1 focus:ring-[#17b6a7] transition"
                placeholder="Leave blank if you don't have one yet"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-1.5">
                WhatsApp number <span className="text-[#17b6a7]">*</span>
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="text"
                required
                value={form.whatsapp}
                onChange={handleChange}
                className="w-full bg-gray-900/60 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#17b6a7] focus:ring-1 focus:ring-[#17b6a7] transition"
                placeholder="01xxxxxxxxx"
              />
            </div>

            {/* Frustration */}
            <div>
              <label htmlFor="frustration" className="block text-sm font-medium text-gray-300 mb-1.5">
                What&apos;s your biggest frustration with your online presence right now?{' '}
                <span className="text-[#17b6a7]">*</span>
              </label>
              <textarea
                id="frustration"
                name="frustration"
                required
                rows={4}
                value={form.frustration}
                onChange={handleChange}
                className="w-full bg-gray-900/60 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#17b6a7] focus:ring-1 focus:ring-[#17b6a7] transition resize-none"
                placeholder="e.g., I have no website, my site is old, I don't get patients from Google..."
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            {/* Submit */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-lg text-white bg-[#17b6a7] hover:bg-[#14a090] disabled:opacity-60 disabled:cursor-not-allowed transition duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#17b6a7]/30"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Me My Free Audit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
              <p className="mt-3 text-sm text-gray-400">
                We&apos;ll reply on WhatsApp within 24 hours.
              </p>
            </div>

          </form>
        </motion.div>
      </div>
    </main>
  )
}
