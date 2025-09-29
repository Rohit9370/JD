import React from 'react'

const QuickLinks = () => {
  const serviceCategories = [
    {
      title: "Admissions & Enrollment",
      icon: "🎓",
      color: "from-blue-500 to-blue-600",
      links: [
        { name: "Online Admission Portal", url: "#", external: true },
        { name: "CAP Registration", url: "#", external: true },
        { name: "Merit Lists", url: "#" },
        { name: "Fee Structure", url: "#" },
        { name: "Admission Guidelines", url: "#" }
      ]
    },
    {
      title: "Student Services",
      icon: "👨‍🎓",
      color: "from-green-500 to-green-600",
      links: [
        { name: "Student Login Portal", url: "#", external: true },
        { name: "Scholarship Portal", url: "#", external: true },
        { name: "Exam Results", url: "#" },
        { name: "Certificate Verification", url: "#" },
        { name: "Grievance Portal", url: "#", external: true }
      ]
    },
    {
      title: "College & Institution",
      icon: "🏫",
      color: "from-purple-500 to-purple-600",
      links: [
        { name: "College Affiliation", url: "#" },
        { name: "NAAC Accreditation", url: "#" },
        { name: "Faculty Registration", url: "#" },
        { name: "Institutional Data", url: "#" },
        { name: "Quality Assurance", url: "#" }
      ]
    },
    {
      title: "Examinations",
      icon: "📝",
      color: "from-red-500 to-red-600",
      links: [
        { name: "Exam Schedule", url: "#" },
        { name: "Hall Tickets", url: "#" },
        { name: "M-SET Registration", url: "#", external: true },
        { name: "Revaluation", url: "#" },
        { name: "Migration Certificate", url: "#" }
      ]
    },
    {
      title: "Research & Development",
      icon: "🔬",
      color: "from-indigo-500 to-indigo-600",
      links: [
        { name: "Research Guidelines", url: "#" },
        { name: "PhD Registration", url: "#" },
        { name: "Research Grants", url: "#" },
        { name: "Publication Portal", url: "#" },
        { name: "Innovation Cell", url: "#" }
      ]
    },
    {
      title: "Information & Resources",
      icon: "📚",
      color: "from-orange-500 to-orange-600",
      links: [
        { name: "Circular & Notifications", url: "#" },
        { name: "RTI Information", url: "#" },
        { name: "Downloads", url: "#" },
        { name: "Contact Directory", url: "#" },
        { name: "FAQ", url: "#" }
      ]
    }
  ]

  const importantNumbers = [
    { service: "Student Helpline", number: "1800-XXX-1234", available: "24/7" },
    { service: "Admission Queries", number: "020-XXXX-5678", available: "9 AM - 6 PM" },
    { service: "Technical Support", number: "020-XXXX-9012", available: "9 AM - 8 PM" },
    { service: "Grievance Cell", number: "1800-XXX-5678", available: "Mon-Fri" }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gov-blue mb-4">
            Quick Access Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access all essential services and resources through our comprehensive digital portal
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {serviceCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-lg font-bold">{category.title}</h3>
                </div>
              </div>

              {/* Links List */}
              <div className="p-6">
                <ul className="space-y-3">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        target={link.external ? "_blank" : "_self"}
                        rel={link.external ? "noopener noreferrer" : ""}
                        className="flex items-center justify-between text-gray-700 hover:text-gov-blue transition-colors group"
                      >
                        <span className="text-sm font-medium group-hover:underline">
                          {link.name}
                        </span>
                        <div className="flex items-center space-x-1">
                          {link.external && (
                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          )}
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-gov-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Important Contact Numbers */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gov-blue mb-2">
              Important Contact Numbers
            </h3>
            <p className="text-gray-600">Get instant help and support</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {importantNumbers.map((contact, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-2xl mb-3">📞</div>
                <h4 className="font-semibold text-gov-blue mb-2">
                  {contact.service}
                </h4>
                <p className="text-lg font-mono text-gov-orange mb-2">
                  {contact.number}
                </p>
                <p className="text-xs text-gray-500">
                  {contact.available}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile App Promotion */}
        <div className="mt-16 bg-gradient-to-r from-gov-blue to-blue-700 rounded-xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Download Our Mobile App
            </h3>
            <p className="mb-6 text-blue-100">
              Access all services on-the-go with our official mobile application. 
              Get notifications, check results, and manage your academic profile anywhere, anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gov-blue px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                <span>📱</span>
                <span>Download for Android</span>
              </button>
              <button className="bg-white text-gov-blue px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                <span>📲</span>
                <span>Download for iOS</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickLinks