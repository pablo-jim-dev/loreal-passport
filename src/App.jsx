import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Header from './components/Header';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Scanner from './pages/Scanner';
import List from './pages/List';
import NotFound from '../NotFound';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/menu" element={<Menu />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/list" element={<List />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster richColors position="top-center" />
      </AuthProvider>
    </Router>
  )
}

export default App
