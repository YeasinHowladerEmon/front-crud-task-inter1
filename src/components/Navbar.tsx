
import { Link } from "react-router-dom";


const Navbar = () => {
  
    return (
        <div className="navbar bg-primary text-primary-content h-[75px]">
            <div className="container-x flex items-center justify-between">
                <div>
                    <Link to='/' className="text-white font-bold text-4xl">Insta</Link>
                </div>
                <div>
                    <Link to='/Team' className="text-white text-lg text-bold mr-4">
                        Team
                    </Link>
                    <Link to='/create-user' className="text-white text-lg text-bold mr-4">
                        Create User
                    </Link>
                    
                </div>

            </div>
        </div>
    );
};

export default Navbar;