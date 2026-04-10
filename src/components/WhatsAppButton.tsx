'use client'

import { motion } from 'framer-motion'

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/201143584929"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 hover:bg-[#1ebe5d] transition-colors duration-200 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-7 h-7 fill-white"
        aria-hidden="true"
      >
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.493.655 4.833 1.797 6.858L2 30l7.347-1.774A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.826-1.597l-.418-.248-4.36 1.053 1.084-4.245-.272-.436A11.45 11.45 0 0 1 4.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.424c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.547-.172-.777.172-.23.344-.892 1.118-1.093 1.348-.2.23-.402.258-.746.086-.344-.172-1.452-.535-2.767-1.708-1.022-.913-1.712-2.04-1.912-2.384-.2-.344-.021-.53.15-.702.155-.154.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.43-.029-.603-.086-.172-.777-1.873-1.065-2.563-.28-.673-.565-.582-.777-.593l-.661-.012c-.23 0-.603.086-.918.43s-1.206 1.177-1.206 2.87 1.235 3.329 1.407 3.559c.172.23 2.43 3.71 5.887 5.205.823.355 1.465.567 1.966.726.826.263 1.578.226 2.172.137.662-.1 2.036-.832 2.323-1.635.287-.803.287-1.491.201-1.635-.086-.143-.316-.229-.66-.401z" />
      </svg>

      {/* Tooltip */}
      <span className="absolute right-16 whitespace-nowrap bg-gray-900 text-white text-sm px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10">
        Chat on WhatsApp
      </span>
    </motion.a>
  )
}
