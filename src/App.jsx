import Header from './components/Header'
import Hero from './components/Hero'
import Officials from './components/Officials'
import Announcements from './components/Announcements'
import QuickLinks from './components/QuickLinks'
import Footer from './components/Footer'


function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content">
        <Hero />
        <Announcements />
        <QuickLinks />
      </main>
      <Footer />
    </div>
  )
}

export default App
