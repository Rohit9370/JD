import React from 'react'

const Footer = () => {
  const quickLinks = [
    { name: "About Us", url: "#about" },
    { name: "Contact Us", url: "#contact" },
    { name: "Admissions", url: "#admissions" },
    { name: "Examinations", url: "#exams" },
    { name: "Notifications", url: "#notifications" },
    { name: "Scholarships", url: "#scholarships" }
  ]

  const importantLinks = [
    { name: "Ministry of Education", url: "https://www.education.gov.in/", external: true },
    { name: "UGC (University Grants Commission)", url: "https://www.ugc.gov.in/", external: true },
    { name: "Government of Maharashtra", url: "https://www.maharashtra.gov.in/", external: true },
    { name: "NAAC (National Assessment)", url: "https://www.naac.gov.in/", external: true },
    { name: "Digital India", url: "https://www.digitalindia.gov.in/", external: true },
    { name: "Skill India", url: "https://www.skillindia.gov.in/", external: true }
  ]

  const legalLinks = [
    { name: "RTI (Right to Information)", url: "#rti" },
    { name: "Privacy Policy", url: "#privacy" },
    { name: "Terms & Conditions", url: "#terms" },
    { name: "Website Policy", url: "#website-policy" },
    { name: "Hyperlinking Policy", url: "#hyperlinking" },
    { name: "Accessibility Statement", url: "#accessibility" }
  ]

  const contactInfo = {
    address: "Directorate of Higher Education, Government of Maharashtra, Pune - 411001",
    phone: "+91-20-2560-1234",
    fax: "+91-20-2560-5678",
    email: "directorate@dhepune.gov.in",
    helpline: "1800-XXX-XXXX (Toll Free)"
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Organization Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/assets/emblem-light.png" 
                alt="Government Emblem" 
                className="h-12 w-12"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IndoaXRlIi8+CjxzdmcgeD0iMTIiIHk9IjEyIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzFmMmUzNyI+CjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyeiIvPgo8L3N2Zz4KPC9zdmc+'
                }}
              />
              <div>
                <h3 className="text-lg font-bold">DHE Maharashtra</h3>
                <p className="text-sm text-gray-300">Excellence in Education</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Dedicated to fostering quality higher education, research excellence, and holistic development 
              of students across Maharashtra.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.162-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gov-orange">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center"
                  >
                    <span className="w-2 h-2 bg-gov-orange rounded-full mr-3"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gov-orange">Important Links</h4>
            <ul className="space-y-2">
              {importantLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : ""}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center"
                  >
                    <span className="w-2 h-2 bg-gov-orange rounded-full mr-3"></span>
                    {link.name}
                    {link.external && (
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gov-orange">Contact Us</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start">
                <svg className="w-4 h-4 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="leading-relaxed">{contactInfo.address}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364" />
                </svg>
                <span className="text-gov-orange font-semibold">{contactInfo.helpline}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Links Section */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 Directorate of Higher Education, Government of Maharashtra. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-4">
              <span>Last Updated: September 26, 2024</span>
              <span className="hidden md:inline">|</span>
              <span>Visitor Count: 1,234,567</span>
            </div>
          </div>
        </div>
      </div>

      {/* Government Compliance Notice */}
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-gray-400">
            This website is designed, developed and maintained by the Directorate of Higher Education, Government of Maharashtra. 
            Content is owned by respective departments/organizations of Government of Maharashtra.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer