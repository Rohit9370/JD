import React, { useEffect, useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('fontSize')
    return saved ? parseInt(saved, 10) : 16
  })
  const [isBw, setIsBw] = useState(() => localStorage.getItem('bwTheme') === '1')
  const [navColor, setNavColor] = useState(() => localStorage.getItem('navColor') || 'bg-blue-800')
  const [openFont, setOpenFont] = useState(false)
  const [openSitemap, setOpenSitemap] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [lang, setLang] = useState('en')

  // Close sitemap when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openSitemap && !event.target.closest('.sitemap-container')) {
        setOpenSitemap(false)
      }
    }
    
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && openSitemap) {
        setOpenSitemap(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [openSitemap])

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`
    localStorage.setItem('fontSize', String(fontSize))
  }, [fontSize])

  useEffect(() => {
    document.documentElement.classList.toggle('bw-theme', isBw)
    localStorage.setItem('bwTheme', isBw ? '1' : '0')
  }, [isBw])

  useEffect(() => {
    localStorage.setItem('navColor', navColor)
  }, [navColor])

  const sitemapLinks = [
    'Home','Desk','Secretary Desk','Director Desk','Scholarships','Central Level Schemes','Notices / Circulars','Post Matric Scholarship for Minority Students','Post Matric Scholarship for the Students with Disabilities','Central Sector Scholarship Scheme','State Level Schemes','Notices / Circulars','Ekalavya Financial Assistance Scheme','EX-Servicemen scholarship scheme','Rajarshi Chatrapati Shahu Maharaj Shikshan Shulk Scholarship','Foreign Scholarship','Government research Fellowship','State government Dakshina Fellowship','State Government Minority Scholarship','Vidya Niketan Scholarship','Physics-Math Scholarship','Meritorious students scholarship scheme','Open Merit Scholarship','MahaDBT Scholarship','Scholarship Information','Regional Nodal Officers','Girl’s Free Education','Swami Vivekanand Yuva Suraksha Yojana','Hostels','Awards','Committees','Budget','Statistics','Region wise Colleges','MIS Report','Recruitment','Departmental Exam.','Events','Activities','Sahyadri Shikshan Sanvad','NEP 2020 Interaction','eGovernance','Proactive Disclosure','Contact'
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* Accessibility / Utility Bar */}
      <div className="bg-white text-gray-800 text-sm border-b">
        <div className="w-full px-8 py-1 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a href="#main-content" className="px-2 py-1 rounded hover:underline focus:outline-none focus:ring-2 focus:ring-gov-orange focus:ring-offset-2">
              Skip to main content
            </a>
            {/* Font size controls */}
            <div className="relative" onMouseEnter={() => setOpenFont(true)} onMouseLeave={() => setOpenFont(false)}>
              <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200" aria-haspopup="true" aria-expanded={openFont}>
                <span className="font-bold">A</span>
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"/></svg>
              </button>
              {openFont && (
                <div className="absolute z-50 mt-1 bg-white border rounded shadow p-1 flex">
                  <button onClick={() => setFontSize((s) => Math.max(14, s - 1))} className="px-2 py-1 text-xs hover:bg-gray-100 rounded">A-</button>
                  <button onClick={() => setFontSize(16)} className="px-2 py-1 text-xs hover:bg-gray-100 rounded">A</button>
                  <button onClick={() => setFontSize((s) => Math.min(22, s + 1))} className="px-2 py-1 text-xs hover:bg-gray-100 rounded">A+</button>
                </div>
              )}
            </div>
            {/* Black/White theme toggle */}
            <button onClick={() => setIsBw(v => !v)} className="w-7 h-7 rounded-full border flex items-center justify-center bg-white text-black" title="Toggle black & white theme" aria-pressed={isBw}>
              ◐
            </button>
            {/* Sitemap mega menu - Click to toggle */}
            <div className="relative sitemap-container">
              <button 
                className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
                onClick={() => setOpenSitemap(!openSitemap)}
                aria-expanded={openSitemap}
                aria-haspopup="true"
              >
                Sitemap
              </button>
              {openSitemap && (
                <div className="absolute left-0 top-full mt-2 w-[min(90vw,650px)] bg-white border rounded-lg shadow-2xl z-50 p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base font-semibold text-gray-800">Site Navigation</h3>
                    <button 
                      onClick={() => setOpenSitemap(false)}
                      className="text-gray-500 hover:text-gray-700 text-lg font-bold ml-2"
                      aria-label="Close sitemap"
                    >
                      ×
                    </button>
                  </div>
                  <ul className="grid grid-cols-2 lg:grid-cols-3 gap-1 max-h-[50vh] overflow-auto">
                    {sitemapLinks.map((item, idx) => (
                      <li key={idx}>
                        <a href="#" className="block px-2 py-1 rounded text-gray-700 hover:bg-blue-600 hover:text-white text-sm transition-colors">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Search hover box */}
            <div className="relative" onMouseEnter={() => setShowSearch(true)} onMouseLeave={() => setShowSearch(false)}>
              <button className="px-2 py-1 rounded hover:bg-gray-200" aria-haspopup="true">🔍</button>
              {showSearch && (
                <div className="absolute left-0 mt-2 bg-white border rounded shadow p-2 z-50 w-64">
                  <input type="text" placeholder="Search..." className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gov-orange" />
                </div>
              )}
            </div>
          </div>
          {/* Right controls: Language + color swatches */}
          <div className="flex items-center gap-3">
            {/* Language selector */}
            <div className="relative group">
              <button className="px-2 py-1 rounded hover:bg-gray-200">
                {lang === 'en' ? 'English' : 'मराठी'} ▾
              </button>
              <div className="absolute hidden group-hover:block right-0 mt-1 bg-white border rounded shadow z-50">
                <button onClick={() => setLang('en')} className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100">English</button>
                <button onClick={() => setLang('mr')} className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100">मराठी</button>
              </div>
            </div>
            {/* Navbar color swatches */}
            <div className="hidden md:flex items-center gap-2">
              {[
                { c: 'bg-blue-800', label: 'Blue' },
                { c: 'bg-red-700', label: 'Red' },
                { c: 'bg-yellow-600', label: 'Yellow' },
                { c: 'bg-green-700', label: 'Green' }
              ].map(({c, label}) => (
                <button key={c} onClick={() => setNavColor(c)} className={`w-5 h-5 rounded border ${c} ${navColor===c ? 'ring-2 ring-black' : ''}`} title={label} aria-label={`Set navbar ${label}`}></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-2  bg-white w-full">
        {/* Top Header with Emblems and Title */}
        <div className="w-full py-4 bg-white">
          <div className="flex items-center justify-around px-8">
            {/* Left - Government Emblem */}
            <div className="flex items-center">
              <img 
                src="/assets/mh1.png.webp" 
                alt="Government of Maharashtra Emblem" 
                className="h-24 w-24"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iNDgiIGZpbGw9IiNmZmJmMDAiIHN0cm9rZT0iIzAwNDA4MCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxzdmcgeD0iMjQiIHk9IjI0IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwNDA4MCI+CjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyeiIvPgo8L3N2Zz4KPC9zdmc+'
                }}
              />
            </div>

            {/* Center - Government Title */}
            <div className="text-center flex-1 mx-8">
              <h1 className="text-5xl lg:text-3xl font-bold text-black leading-tight mb-2">
                Government of Maharashtra
              </h1>
              <h2 className="text-3xl lg:text-2xl font-semibold text-gray-500  mb-2">
                Directorate of Higher Education
              </h2>
              <p className="text-xl lg:text-2xl text-gray-500 font-medium">
                Maharashtra State, India
              </p>
            </div>

            {/* Right - Satyamev Jayate Emblem */}
            <div className="flex flex-col items-center object-fit">
              <img 
                src="https://commons.wikimedia.org/wiki/File:Ashok_Emblem_svg.svg" 
                alt="Satyamev Jayate" 
                className="h-24 w-24"
                onError={(e) => {
                  e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1cRe0KQ6vFHELc6wYZz88kOpI2OXYmTQ3hA&s'
                }}
              />
            </div>
          </div>
        </div>

        {/* Professional Navigation Menu Bar */}
        <nav className={`${navColor} w-full shadow-lg text-white`}>
          <ul className="flex flex-wrap justify-center items-center py-0">
<li><a href="#home" className="block px-6 py-4 text-white font-semibold hover:bg-white/10 transition-colors border-r border-white/10">Home</a></li>
<li><a href="#about" className="block px-6 py-4 text-white font-semibold hover:bg-white/10 transition-colors border-r border-white/10">About Us</a></li>
              <li className="relative group">
<a href="#institutions" className="block px-6 py-4 text-white font-semibold hover:bg-white/10 transition-colors border-r border-white/10 flex items-center">
                  Institutions / Colleges / University
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <div className="absolute top-full left-0 mt-0 bg-white shadow-xl rounded-b-lg py-2 min-w-64 opacity-0 group-hover:opacity-100 transition-all duration-300 z-50">
                  <a href="#gov-colleges" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 text-sm">Government Colleges</a>
                  <a href="#aided-colleges" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 text-sm">Aided Colleges</a>
                  <a href="#universities" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 text-sm">Universities</a>
                  <a href="#gov-hostels" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 text-sm">Government Hostels</a>
                  <a href="#pre-ias" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 text-sm">Pre IAS Training Institute</a>
                </div>
              </li>
<li><a href="#scholarship" className="block px-6 py-4 text-white font-semibold hover:bg-white/10 transition-colors border-r border-white/10">Scholarships</a></li>
<li><a href="#hostel" className="block px-6 py-4 text-white font-semibold hover:bg-white/10 transition-colors border-r border-white/10">Hostel</a></li>
              <li className="relative group">
<a href="#downloads" className="block px-6 py-4 text-white font-semibold hover:bg-white/10 transition-colors flex items-center">
                  Downloads
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <div className="absolute top-full right-0 mt-0 bg-white shadow-xl rounded-b-lg py-2 min-w-48 opacity-0 group-hover:opacity-100 transition-all duration-300 z-50">
                  <a href="#circular-downloads" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 text-sm">CIRCULAR</a>
                  <a href="#claim-sanctioned" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 text-sm">CLAIM SANCTIONED</a>
                  <a href="#useful-forms" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 text-sm">USEFUL FORMS</a>
                </div>
              </li>
            </ul>
          
          {/* Mobile menu toggle */}
          <div className="md:hidden flex justify-center py-2">
            <button 
              className="text-white p-2"
              onClick={toggleMenu}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header