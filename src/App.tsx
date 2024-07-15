import AppRoutes from '@/routes/AppRoutes'
import Navigation from './components/Navigation'

const App: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 font-poppins">
      <Navigation />
      <AppRoutes />
    </div>
  )
}

export default App