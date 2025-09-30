import React, { useEffect, useMemo, useState } from 'react'
import { listenToUpdates, listenToHelp, listenToImportantLinks } from '../lib/firebase'

const Announcements = () => {
  const [activeTab, setActiveTab] = useState('latest')
  const [updates, setUpdates] = useState([])
  const [help, setHelp] = useState(null)
  const [loading, setLoading] = useState(true)
  const [links, setLinks] = useState([])

  // Local quick services remain static
  const quickServices = [
    { name: 'Online Admissions', icon: '🎓', link: '#admissions' },
    { name: 'Student Portal', icon: '👨‍🎓', link: '#portal' },
    { name: 'College Affiliation', icon: '🏫', link: '#affiliation' },
    { name: 'Examination Results', icon: '📊', link: '#results' },
    { name: 'Scholarship Portal', icon: '💰', link: '#scholarships' },
    { name: 'Grievance Redressal', icon: '📝', link: '#grievance' }
  ]

  useEffect(() => {
    const items = []
    // Subscribe to help info changes
    const offHelp = listenToHelp((data) => setHelp(data))
    // Subscribe to important links
    const offLinks = listenToImportantLinks((arr) => setLinks(arr))

    // Subscribe to updates (existing + new)
    const off = listenToUpdates((item) => {
      items.push(item)
      // Sort by createdAt desc (may be null if not yet set)
      items.sort((a, b) => ((b.createdAt || 0) - (a.createdAt || 0)))
      setUpdates([...items])
      setLoading(false)
    })

    return () => {
      try { if (typeof off === 'function') off() } catch {}
      try { if (typeof offHelp === 'function') offHelp() } catch {}
      try { if (typeof offLinks === 'function') offLinks() } catch {}
    }
  }, [])

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const toCategory = (type) => {
    if (type === 'admissions') return 'Admissions'
    if (type === 'examinations') return 'Examinations'
    if (type === 'policy') return 'Policy'
    if (type === 'link') return 'Important Link'
    return 'General'
  }

  const toPriority = (type) => {
    if (type === 'admissions' || type === 'examinations') return 'high'
    if (type === 'policy') return 'medium'
    return 'low'
  }

  const formatted = useMemo(() => updates.map(u => ({
    id: u.id,
    title: u.title || 'Untitled',
    date: u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '',
    category: toCategory(u.type),
    priority: toPriority(u.type),
    description: u.description || '',
    url: u.url || null,
    fileURL: u.fileURL || null,
  })), [updates])

  const filteredAnnouncements = useMemo(() => {
    if (activeTab === 'latest') return formatted
    if (activeTab === 'admissions') return formatted.filter(a => a.category === 'Admissions')
    if (activeTab === 'exams') return formatted.filter(a => a.category === 'Examinations')
    if (activeTab === 'policy') return formatted.filter(a => a.category === 'Policy')
    return formatted
  }, [formatted, activeTab])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Announcements Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gov-blue">Latest Announcements</h2>
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
                {loading && (
                  <div className="text-sm text-gray-500">Loading announcements…</div>
                )}
                {!loading && filteredAnnouncements.length === 0 && (
                  <div className="text-sm text-gray-500">No announcements yet.</div>
                )}
                {filteredAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
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
                    {announcement.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {announcement.description}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-3">
                      {announcement.url && (
                        <a
                          className="text-xs text-gov-orange hover:underline"
                          href={announcement.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read More →
                        </a>
                      )}
                      {announcement.fileURL && (
                        <a
                          className="text-xs text-blue-600 hover:underline"
                          href={announcement.fileURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download Attachment
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Quick Services + Help Sidebar */}
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

            {/* Important Links (Admin-managed) */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gov-blue mb-4">Important Links</h3>
              {links.length === 0 ? (
                <div className="text-sm text-gray-500">No links available.</div>
              ) : (
                <ul className="space-y-3">
                  {links.map((l) => (
                    <li key={l.id}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-gray-700 hover:text-gov-blue">
                        <span className="w-2 h-2 bg-gov-orange rounded-full mr-3"></span>
                        {l.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Help Information from Admin */}
            <div className="bg-gradient-to-br from-gov-blue to-blue-600 text-white rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3">Need Help?</h3>
              {help ? (
                <div className="space-y-2 text-sm">
                  <p>📞 Helpline: {help.helpline}</p>
                  <p>⏰ {help.hours}</p>
                  <p>✉️ {help.email}</p>
                </div>
              ) : (
                <div className="space-y-2 text-sm opacity-80">
                  <p>📞 Helpline: 1800-XXX-XXXX</p>
                  <p>⏰ Mon-Fri: 9:00 AM - 6:00 PM</p>
                  <p>✉️ support@dhepune.gov.in</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Announcements
