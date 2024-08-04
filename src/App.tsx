import './App.css'
import AppRoutes from '@/routes/AppRoutes'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Toaster from '@/components/Toaster'

const App: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <Navigation />
      <div className="flex-grow">
        <AppRoutes />
        <Toaster />
      </div>
      <Footer />
    </div>
  )
}

export default App