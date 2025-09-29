import React, { useState } from 'react'

const Announcements = () => {
  const [activeTab, setActiveTab] = useState('latest')
  
  const announcements = [
    {
      id: 1,
      title: "Regarding 55% reservation (instead of 50%) for girls in the state for higher education",
      date: "17/06/2025",
      category: "Reservation Policy",
      priority: "high",
      description: "Important notification regarding increased reservation percentage for girls in higher education institutions across Maharashtra."
    },
    {
      id: 2,
      title: "Regarding the organization of the curriculum and examination for the Departmental Post-Service and Supervisory Examination 2025",
      date: "12/06/2025",
      category: "Examinations",
      priority: "medium",
      description: "Guidelines and schedule for the upcoming departmental examinations under the Directorate of Higher Education."
    },
    {
      id: 3,
      title: "Regarding college registration for the Centralized Admission Process (CAP) for professional courses",
      date: "14/05/2025",
      category: "Admissions",
      priority: "high",
      description: "Important information about CAP registration for professional courses under the jurisdiction of the Directorate of Higher Education for the academic year 2025-26."
    },
    {
      id: 4,
      title: "Notification Regarding Admission For Art, Science and Commerce Courses Under Jammu & Kashmir Migrant Quota",
      date: "12/05/2025",
      category: "Admissions",
      priority: "medium",
      description: "Special admission notification for Jammu & Kashmir migrant students for Art, Science and Commerce courses."
    },
    {
      id: 5,
      title: "M-SET for the states of Maharashtra and Goa",
      date: "24/01/2025",
      category: "Examinations",
      priority: "medium",
      description: "Maharashtra State Eligibility Test (M-SET) notification for the states of Maharashtra and Goa."
    },
    {
      id: 6,
      title: "Bharatiya Sanvidhan Gaurav Mahostav",
      date: "12/02/2025",
      category: "Events",
      priority: "low",
      description: "Celebration of the Indian Constitution - Bharatiya Sanvidhan Gaurav Mahostav program details."
    }
  ]

  const quickServices = [
    { name: "Online Admissions", icon: "🎓", link: "#admissions" },
    { name: "Student Portal", icon: "👨‍🎓", link: "#portal" },
    { name: "College Affiliation", icon: "🏫", link: "#affiliation" },
    { name: "Examination Results", icon: "📊", link: "#results" },
    { name: "Scholarship Portal", icon: "💰", link: "#scholarships" },
    { name: "Grievance Redressal", icon: "📝", link: "#grievance" }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredAnnouncements = announcements.filter(announcement => {
    if (activeTab === 'latest') return true
    if (activeTab === 'admissions') return announcement.category === 'Admissions'
    if (activeTab === 'exams') return announcement.category === 'Examinations'
    if (activeTab === 'policy') return announcement.category === 'Reservation Policy'
    return true
  })

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Announcements Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gov-blue">
                  Latest Announcements
                </h2>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="animate-pulse w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Live Updates
                </div>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-6 border-b">
                {[
                  { key: 'latest', label: 'Latest' },
                  { key: 'admissions', label: 'Admissions' },
                  { key: 'exams', label: 'Examinations' },
                  { key: 'policy', label: 'Policy' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-colors ${
                      activeTab === tab.key
                        ? 'bg-gov-blue text-white border-b-2 border-gov-blue'
                        : 'text-gray-600 hover:text-gov-blue hover:bg-blue-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Announcements List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority.toUpperCase()}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {announcement.category}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">
                        {announcement.date}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gov-blue mb-2 leading-tight">
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {announcement.description}
                    </p>
                    <button className="text-xs text-gov-orange hover:underline mt-2">
                      Read More →
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button className="bg-gov-blue text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                  View All Announcements
                </button>
              </div>
            </div>
          </div>

          {/* Quick Services Sidebar */}
          <div className="space-y-6">
            {/* Quick Services */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gov-blue mb-4">Quick Services</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickServices.map((service, index) => (
                  <a
                    key={index}
                    href={service.link}
                    className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center group"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-gov-blue">
                      {service.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Important Links */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gov-blue mb-4">Important Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center text-sm text-gray-700 hover:text-gov-blue">
                    <span className="w-2 h-2 bg-gov-orange rounded-full mr-3"></span>
                    Ministry of Education, GoI
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-sm text-gray-700 hover:text-gov-blue">
                    <span className="w-2 h-2 bg-gov-orange rounded-full mr-3"></span>
                    UGC Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-sm text-gray-700 hover:text-gov-blue">
                    <span className="w-2 h-2 bg-gov-orange rounded-full mr-3"></span>
                    NAAC Accreditation
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-sm text-gray-700 hover:text-gov-blue">
                    <span className="w-2 h-2 bg-gov-orange rounded-full mr-3"></span>
                    RTI Information
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-sm text-gray-700 hover:text-gov-blue">
                    <span className="w-2 h-2 bg-gov-orange rounded-full mr-3"></span>
                    Public Grievances
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-gov-blue to-blue-600 text-white rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3">Need Help?</h3>
              <div className="space-y-2 text-sm">
                <p>📞 Helpline: 1800-XXX-XXXX</p>
                <p>⏰ Mon-Fri: 9:00 AM - 6:00 PM</p>
                <p>✉️ support@dhepune.gov.in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Announcements