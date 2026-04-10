'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
})

export default function FreeAuditThankYouPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Logo-only header */}
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

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-xl w-full text-center">
          <motion.div {...fadeUp(0)}>
            <div className="text-5xl mb-6">🎉</div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-5">
              Got it! Your audit is on the way.
            </h1>
          </motion.div>

          <motion.p {...fadeUp(0.15)} className="text-lg text-gray-300 mb-4 leading-relaxed">
            We&apos;ll review your clinic&apos;s online presence and send you a personalized video on WhatsApp within 48 hours.
          </motion.p>

          <motion.p {...fadeUp(0.25)} className="text-lg text-gray-300 mb-10 leading-relaxed">
            In the meantime, want to chat now? Tap below to message us directly.
          </motion.p>

          <motion.div {...fadeUp(0.35)}>
            <a
              href="https://wa.me/201143584929?text=Hi%20DevHouse%2C%20I%20just%20requested%20a%20free%20audit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold rounded-xl text-white bg-[#25D366] hover:bg-[#1ebe5d] transition duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#25D366]/30"
            >
              {/* WhatsApp icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-6 h-6 fill-white shrink-0"
                aria-hidden="true"
              >
                <path d="M16 2C8.268 2 2 8.268 2 16c0 2.493.655 4.833 1.797 6.858L2 30l7.347-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.826-1.597l-.418-.248-4.36 1.053 1.084-4.245-.272-.436A11.45 11.45 0 0 1 4.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.424c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.547-.172-.777.172-.23.344-.892 1.118-1.093 1.348-.2.23-.402.258-.746.086-.344-.172-1.452-.535-2.767-1.708-1.022-.913-1.712-2.04-1.912-2.384-.2-.344-.021-.53.15-.702.155-.154.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.43-.029-.603-.086-.172-.777-1.873-1.065-2.563-.28-.673-.565-.582-.777-.593l-.661-.012c-.23 0-.603.086-.918.43s-1.206 1.177-1.206 2.87 1.235 3.329 1.407 3.559c.172.23 2.43 3.71 5.887 5.205.823.355 1.465.567 1.966.726.826.263 1.578.226 2.172.137.662-.1 2.036-.832 2.323-1.635.287-.803.287-1.491.201-1.635-.086-.143-.316-.229-.66-.401z" />
              </svg>
              Chat with Us on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
