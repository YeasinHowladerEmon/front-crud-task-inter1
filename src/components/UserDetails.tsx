import { useEffect } from "react";
import { useSingleDetailsQuery, useUserDeleteMutation } from "../redux/features/User/userApi";

import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";


const UserDetails = () => {
    const { id } = useParams();
    const { data: user, refetch } = useSingleDetailsQuery(id)
    const [userDelete] = useUserDeleteMutation()
    const navigate = useNavigate();
    useEffect(() => {
        refetch()
    }, [id, refetch])
    console.log(user);
    const handleDelete = async () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this User!",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const options = {
                    id: id,
                }
                const result = await userDelete(options)
                console.log(result)
                if ('data' in result) {
                    swal("Done! Your User has been deleted!", {
                        icon: "success",
                    }).then(() => {
                        setTimeout(() => {
                            navigate('/')
                        }, 2000)
                    })
                    refetch();
                }
            } else {
                swal("Your User is safe!");
            }
        })
    }

    return (
        <div className='flex justify-center'>
            <div className="card card-compact w-80 bg-white shadow-xl mb-5 mx-15">
                <figure><img src={user?.data.avatar} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-black text-3xl">Name: {user?.data.first_name}{" "} {user?.data.last_name}</h2>
                    <p className='text-black text-lg font-semibold' >Domain: {user?.data.email}</p>
                    <p className='text-black text-lg font-semibold' >Domain: {user?.data.domain}</p>
                    <p className='text-black text-lg font-semibold'>Gender: {user?.data.gender}</p>
                    <p className="text-black text-lg font-semibold">{user?.data.available ? 'Available' : 'Unavailable'}</p>
                    <div>
                        <div>
                            <Link to={`/edit-user/${user?.data._id}`}>
                                <button className='btn btn-secondary'>
                                    Edit Book
                                </button>
                            </Link>
                        </div>
                        <br />
                        <form onSubmit={e => e.preventDefault()}>
                            <div>
                                <button className='btn btn-primary' onClick={handleDelete}>Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
