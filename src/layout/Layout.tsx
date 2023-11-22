
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-16">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;