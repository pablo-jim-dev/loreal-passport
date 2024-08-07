import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Scanner from './pages/Scanner';
import List from './pages/List';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/menu" element={<Menu />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/list" element={<List />} />
          </Route>
        </Routes>
        <Toaster richColors position="top-center" />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
