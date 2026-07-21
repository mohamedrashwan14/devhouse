export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} DevHouse. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <a href="mailto:contact@devhouse.dev" className="hover:text-white transition-colors">
            contact@devhouse.dev
          </a>
          <a href="tel:+201143584929" className="hover:text-white transition-colors">
            +201143584929
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/devhouse.eg/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          <a href="https://www.linkedin.com/company/devhouse-eg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://x.com/devhouse_eg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X</a>
        </div>
      </div>
    </footer>
  )
}
