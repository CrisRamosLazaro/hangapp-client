import AppRoutes from '@/routes/AppRoutes'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 h-screen">
      <Navigation />
      <div className="flex-grow">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  )
}

export default App