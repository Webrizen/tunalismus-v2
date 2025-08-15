export default function Footer() {
  return (
    <footer className="bg-[var(--color-warm-gray)] text-gray-700 py-5">
      <div className="container mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        
        {/* Branding */}
        <div className="text-[var(--color-muted-green)] font-semibold text-lg">
          &copy; {new Date().getFullYear()} Tunalismus. All rights reserved.
        </div>
        
        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-6 text-sm">
          <a href="/privacy" className="hover:text-[var(--color-dusty-rose)] transition">Privacy Policy</a>
          <a href="/terms-and-conditions" className="hover:text-[var(--color-dusty-rose)] transition">Terms and Conditions</a>
          <a href="/refund" className="hover:text-[var(--color-dusty-rose)] transition">Refund Policy</a>
        </nav>

        {/* Social Icons - placeholder */}
        <div className="flex space-x-6 text-gray-600">
          <a href="https://instagram.com/tunalismus" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-soft-blue)] transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zM12 7a5 5 0 100 10 5 5 0 000-10zm5.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
            </svg>
          </a>
          <a href="https://linkedin.com/company/tunalismus" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-soft-blue)] transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M4.98 3.5A2.5 2.5 0 002.5 6v12a2.5 2.5 0 002.48 2.5h12.99A2.5 2.5 0 0020 18V6a2.5 2.5 0 00-2.49-2.5H5zM8 10v6H6v-6h2zm-1-1a1 1 0 110-2 1 1 0 010 2zm7 7h-2v-3c0-.8-.6-1-1-1s-1 .2-1 1v3h-2v-6h2v1c.4-.5 1-1 2-1 1.5 0 2 1 2 2v4z" />
            </svg>
          </a>
          <a href="https://twitter.com/tunalismus" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-soft-blue)] transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M8 19c7.547 0 11.675-6.155 11.675-11.49 0-.175 0-.349-.012-.522A8.18 8.18 0 0022 5.92a8.27 8.27 0 01-2.356.63 4.104 4.104 0 001.804-2.27 8.193 8.193 0 01-2.605.986 4.098 4.098 0 00-6.985 3.745A11.623 11.623 0 013 4.778a4.094 4.094 0 001.27 5.45 4.073 4.073 0 01-1.857-.507v.05a4.094 4.094 0 003.292 4.012 4.09 4.09 0 01-1.853.07 4.102 4.102 0 003.828 2.786A8.23 8.23 0 012 18.407a11.616 11.616 0 006.29 1.847" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
