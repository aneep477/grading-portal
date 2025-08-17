import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { initialData } from './mocks/mock';
import Layout from './Layout';
import Dashboard from './Dashboard';
import Assessment from './Assessment';
import UploadCSV from './UploadCSV';

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  const login = (username, password) => {
    if (username === initialData.auth.username && password === initialData.auth.password) {
      const user = { username };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/assessment" element={user ? <Assessment /> : <Navigate to="/login" />} />
            <Route path="/upload" element={user ? <UploadCSV /> : <Navigate to="/login" />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

function Login() {
  const { login } = React.useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      setError('');
    } else {
      setError('Kredensial salah');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4">Log Masuk</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nama Pengguna"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
          <input
            type="password"
            placeholder="Kata Laluan"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Log Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
