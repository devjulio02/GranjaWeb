// components/Layout.jsx
import { Outlet } from "react-router-dom";
import Menu from './Menu';
import Footer from './Footer';

const Layout = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' 
    }}>
      <Menu />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;