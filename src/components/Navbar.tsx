
import { Link } from "react-router-dom";
import CreateTeamItem from "./CreateTeamItem";


const Navbar = () => {

    return (
        <div className="navbar bg-primary text-primary-content h-[75px]">
            <div className="container-x flex items-center justify-between">
                <div>
                    <Link to='/' className="text-white font-bold text-4xl">Insta</Link>
                </div>
                <div className='flex items-center'>
                    <Link to='/create-user' className="text-white text-lg text-bold mr-4">
                        Create User
                    </Link>
                    <Link to='/Team' className="text-white text-lg text-bold mr-4">
                        Team
                    </Link>
                    <h4 className="text-white text-lg text-bold mr-4">
                        <CreateTeamItem />
                    </h4>

                </div>

            </div>
        </div>
    );
};

export default Navbar;