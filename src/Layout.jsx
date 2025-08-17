import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from './App';
import { Button } from './components/ui/button';
import { ScrollArea } from './components/ui/scroll-area';

function Layout() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      {user && (
        <div className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold mb-4">Portal Penilaian</h2>
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <nav>
              <Link to="/" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
              <Link to="/assessment" className="block p-2 hover:bg-gray-700 rounded">Penilaian</Link>
              <Link to="/upload" className="block p-2 hover:bg-gray-700 rounded">Muat Naik CSV</Link>
              <Button onClick={logout} className="w-full mt-4">Log Keluar</Button>
            </nav>
          </ScrollArea>
        </div>
      )}
      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
