import React, { useEffect, useState } from 'react'

const Officials = () => {
  const [officials, setOfficials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fallback list in case backend is not running yet
  const fallbackOfficials = [
    {
      name: 'Shri. Devendra Fadnavis',
      designation: 'Hon’ble Deputy Chief Minister',
      image: 'https://jdhepune.in/assets/img/team/Devendra_Fadnvis.jpg',
      type: 'current'
    },
    {
      name: 'Shri. Eknath Shinde',
      designation: 'Hon’ble Chief Minister',
      image: '/assets/img/Shinde.jpg',
      type: 'current'
    },
    {
      name: 'Shri. Ajit Pawar',
      designation: 'Hon’ble Deputy Chief Minister',
      image: '/assets/img/Ajit_Pawar.jpg',
      type: 'current'
    },
    {
      name: 'Shri. Chandrakantdada Patil',
      designation: 'Hon’ble Minister\nHigher and Technical Education',
      image: '/assets/img/chandrakant_dad_patil.jpg',
      type: 'current'
    },
    {
      name: 'Shri. Indranil Naik',
      designation: 'Hon\'ble Minister of State\nHigher and Technical Education',
      image: '/assets/img/Naik.jpg',
      type: 'current'
    },
    {
      name: 'Shri. B. Venugopal Reddy, IAS',
      designation: 'Hon\'ble Addl. Chief Secretary\nHigher and Technical Education',
      image: '/assets/img/IAS.jpg',
      type: 'current'
    },
    {
      name: 'Dr. Shailendra Deolankar',
      designation: 'Incharge Director\nHigher Education',
      image: '/assets/img/Deoulankar.jpg',
      type: 'current'
    },
    {
      name: 'Dr. Ashok Ubale',
      designation: 'Joint Director\nHigher Education, Pune Region',
      image: '/assets/img/Deoulankar.jpg',
      type: 'current'
    }
  ]

  useEffect(() => {
    const fetchOfficials = async () => {
      try {
        const res = await fetch('/api/officials')
        if (!res.ok) throw new Error('Failed to fetch officials')
        const data = await res.json()
        setOfficials(data)
      } catch (err) {
        // Fallback to local data if backend is not available yet
        setOfficials(fallbackOfficials)
        setError('Using local data (backend not reachable).')
      } finally {
        setLoading(false)
      }
    }
    fetchOfficials()
  }, [])

  const OfficialCard = ({ official }) => (
    <div className="group bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="relative mx-auto mb-3 overflow-hidden rounded-lg bg-white w-[150px] h-[150px] flex items-center justify-center">
        <img
          src={official.image}
          alt={official.name}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmM2Y0ZjYiLz48cGF0aCBkPSJNNzAgODBoNjB2NDBINzBWNzB6IiBmaWxsPSIjZDFkNWRiIi8+PHRleHQgeD0iMTAwIiB5PSIxMDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2Nzc0ODMiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij5JbWFnZTwvdGV4dD48L3N2Zz4='
          }}
        />
      </div>
      <h3 className="text-base font-semibold text-gray-700 mb-1">
        {official.name}
      </h3>
      <p className="text-sm text-gray-900 whitespace-pre-line">
        {official.designation}
      </p>
    </div>
  )


  return (
    <section className="py-8 bg-white">
      <div className="w-[70%] mx-auto">
      
          {error && (
            <div className="mb-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">{error}</div>
          )}
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 justify-center">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-[260px] bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-6 mb-10">
              {officials.map((official, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="relative mx-auto mb-3 overflow-hidden rounded-lg bg-white w-[150px] h-[150px] flex items-center justify-center">
                    <img
                      src={official.image}
                      alt={official.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmM2Y0ZjYiLz48cGF0aCBkPSJNNzAgODBoNjB2NDBINzBWNzB6IiBmaWxsPSIjZDFkNWRiIi8+PHRleHQgeD0iMTAwIiB5PSIxMDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2Nzc0ODMiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij5JbWFnZTwvdGV4dD48L3N2Zz4='
                      }}
                    />
                  </div>
                  <h3 className="text-base font-semibold text-gray-700 mb-1">
                    {official.name}
                  </h3>
                  <p className="text-sm text-gray-900 whitespace-pre-line">
                    {official.designation}
                  </p>
                </div>
              ))}
            </div>
          )}
      </div>
    </section>
  )
}

export default Officials
