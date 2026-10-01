import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import '../../styles/layout.css';

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-layout__content">
        <Header />

        <main className="app-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;