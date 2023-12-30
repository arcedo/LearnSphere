import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Error from './pages/Error';
import Settings from './pages/Settings';

import isLogged from './utils/auth';
export default function App() {
  //if (!isLogged()) return <Login />
  return (
    <Router>
      <Routes>
        {isLogged() ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}