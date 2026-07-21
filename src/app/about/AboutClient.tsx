'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import StarField from '@/components/star-field'
import { Navbar } from '@/components/navbar'
import { Users, Clock, MessageCircle, Wrench } from 'lucide-react'

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "You talk to the builders",
      description: "No account managers, no middlemen. You deal directly with the developers building your site."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Delivered in days, not months",
      description: "We give you a clear timeline on day one and stick to it. Most sites are live in 2–3 weeks."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "WhatsApp-first communication",
      description: "We keep it simple. Questions, updates, feedback — all on WhatsApp, in Arabic or English."
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "We stay after launch",
      description: "You own the site, and we're still here for updates, fixes, and anything that comes up."
    }
  ]

  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden">
      <StarField />
      <Navbar />
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 py-16"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-8 text-center font-orbitron"
          variants={itemVariants}
        >
          Built in Egypt,<br />for Egyptian businesses
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-12 text-center max-w-3xl text-gray-300"
          variants={itemVariants}
        >
          We&apos;re three developers based in Egypt who got tired of watching local businesses lose customers to bad websites — or no website at all. So we started DevHouse.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl w-full"
          variants={itemVariants}
        >
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 font-orbitron">What we do</h2>
            <p className="text-gray-300">
              We design and build fast, professional websites for businesses across Egypt — restaurants, clinics, real estate companies, gyms, law firms, and more. Each site is built from scratch, tailored to the business, and delivered with full WhatsApp and booking integration.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 font-orbitron">How we work</h2>
            <p className="text-gray-300">
              We start with a free audit of your current online presence. Then we design, build, and launch your site in 2–3 weeks. You approve every step. After launch, we&apos;re still available for updates and support — no ghosting.
            </p>
          </div>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-semibold mb-8 text-center font-orbitron"
          variants={itemVariants}
        >
          How we&apos;re different
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full"
          variants={itemVariants}
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              className="bg-white/10 backdrop-blur-md p-6 rounded-lg text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-center mb-4 text-[#17b6a7]">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 font-orbitron">{value.title}</h3>
              <p className="text-sm text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-xl mt-16 text-center max-w-3xl text-gray-300"
          variants={itemVariants}
        >
          If you&apos;re a business in Egypt that needs a website — or a better one — we&apos;d love to talk. Start with a free audit, no commitment required.
        </motion.p>
      </motion.div>
    </main>
  )
}
