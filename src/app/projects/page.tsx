'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { ExternalLink, ArrowRight } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

interface Project {
  name: string
  tagline: string
  industryTag: string
  featured?: boolean
  description: string
  featurePills: string[]
  siteUrl: string
  screenshotUrl: string
  urlBarText: string
}

const projects: Project[] = [
  {
    name: 'HappyDent',
    tagline: 'Professional Dental Equipment',
    industryTag: 'Medical & Dental Industry',
    featured: true,
    description:
      'A full e-commerce platform for Egypt\'s distributor of professional dental instruments. Features include a complete product catalog with EGP pricing, clinical case studies, demo booking system, warranty checker, and maintenance request flow. Built for dentists and dental practices across Egypt.',
    featurePills: ['E-Commerce', 'Demo Booking', 'Clinical Cases'],
    siteUrl: 'https://happydenteg.com',
    screenshotUrl: '/static/Images/happydent.jpg',
    urlBarText: 'happydenteg.com',
  },
  {
    name: 'Black Diamond',
    tagline: 'Construction & Real Estate',
    industryTag: 'Real Estate & Construction',
    description:
      'A premium website for a high-end construction and real estate company. Showcases their project portfolio, services, and team with a bold, professional design built to attract serious buyers and investors.',
    featurePills: ['Portfolio Showcase', 'Services', 'Lead Generation'],
    siteUrl: 'https://www.blackdiamondegy.com/',
    screenshotUrl: '/static/Images/blackDiamond.png',
    urlBarText: 'blackdiamondegy.com',
  },
]

function BrowserCard({ project, delay }: { project: Project; delay: number }) {
  const fallbackSrc = `https://s0.wp.com/mshots/v1/${encodeURIComponent(project.siteUrl)}?w=1200&h=800`
  return (
    <motion.div
      {...fadeUp(delay)}
      className={`group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl
        ${project.featured
          ? 'border-[#17b6a7]/40 hover:border-[#17b6a7]/70 hover:shadow-[#17b6a7]/15 bg-gray-900/80'
          : 'border-white/10 hover:border-white/20 hover:shadow-black/40 bg-gray-900/60'
        }`}
    >
      {/* Featured glow ring */}
      {project.featured && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#17b6a7]/8 via-transparent to-transparent pointer-events-none" />
      )}

      {/* ── Browser chrome ── */}
      <div className="relative z-10 flex items-center gap-2.5 px-4 py-3 bg-black/40 border-b border-white/8 shrink-0">
        {/* Traffic lights */}
        <span className="w-3 h-3 rounded-full bg-[#FF5F57] shrink-0" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shrink-0" />
        <span className="w-3 h-3 rounded-full bg-[#28C840] shrink-0" />
        {/* URL pill */}
        <div className="flex-1 mx-2 flex items-center justify-center bg-black/30 border border-white/10 rounded-md px-3 py-1">
          <span className="text-gray-400 text-xs truncate select-none">
            {project.urlBarText}
          </span>
        </div>
      </div>

      {/* ── Screenshot ── */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-950 shrink-0">
        <Image
          src={project.screenshotUrl}
          alt={`${project.name} website screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          unoptimized
          onError={(e) => {
            const img = e.currentTarget
            if (img.src !== fallbackSrc) img.src = fallbackSrc
          }}
        />
        {/* Hover overlay with visit button */}
        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#17b6a7] hover:bg-[#14a090] text-white text-sm font-semibold rounded-full transition-colors duration-200"
            onClick={e => e.stopPropagation()}
          >
            Visit Site <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="relative z-10 flex flex-col flex-1 p-6 gap-4">
        {/* Tags row */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Industry badge — prominent on featured */}
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
              ${project.featured
                ? 'bg-[#17b6a7]/20 text-[#17b6a7] ring-1 ring-[#17b6a7]/40'
                : 'bg-[#17b6a7]/10 text-[#17b6a7]/80 ring-1 ring-[#17b6a7]/20'
              }`}
          >
            {project.industryTag}
          </span>
          {project.featured && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-white/8 text-white/50 ring-1 ring-white/10">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <div>
          <h3 className="text-xl font-bold text-white leading-snug">
            {project.name}{' '}
            <span className="text-gray-400 font-normal">— {project.tagline}</span>
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2">
          {project.featurePills.map(pill => (
            <span
              key={pill}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/6 text-gray-300 border border-white/8"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Visit button */}
        <a
          href={project.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#17b6a7] hover:text-white transition-colors duration-200 group/link w-fit"
        >
          Visit Site
          <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            {...fadeUp(0)}
            className="text-4xl sm:text-5xl font-bold mb-5"
          >
            Our Work
          </motion.h1>
          <motion.p {...fadeUp(0.15)} className="text-lg text-gray-300">
            We build fast, modern websites for businesses across Egypt. Here&apos;s what we&apos;ve delivered.
          </motion.p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <BrowserCard key={project.name} project={project} delay={i * 0.12} />
          ))}
        </div>
      </section>

      {/* More coming soon */}
      <section className="py-20 px-4 text-center">
        <motion.div
          {...fadeUp(0)}
          className="max-w-md mx-auto flex flex-col items-center gap-6"
        >
          <p className="text-gray-400 text-base">
            More projects launching soon. Want to be next?
          </p>
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold rounded-lg text-white bg-[#17b6a7] hover:bg-[#14a090] transition duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#17b6a7]/30"
          >
            Get a Free Website Audit
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
