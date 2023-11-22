import { Link } from "react-router-dom";
import { useGetAllTeamQuery } from "../redux/features/User/userApi";
import { ITeam } from "../interface/interface";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";


const Team = () => {
    const { data, isLoading, isError, refetch, } = useGetAllTeamQuery()
    if (isError) {
        toast.error("Something went wrong")
    }
    if (!isLoading) {
        toast.success('successful');
    }
    useEffect(() => {
        refetch() // refetch the data from redux toolkit
    }, [refetch])
    console.log(data?.data)
    return (
        <div className="lg:container-x mt-5">
            <div><h2 className="text-center text-white">Team</h2></div>,
            <div className='grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 mt-20 mb-5 justify-items-center'>
                {
                    isLoading ?
                        (<Toaster
                            position="top-center"
                            reverseOrder={false}
                        />)
                        : isError ? (
                            <Toaster
                                position="top-center"
                                reverseOrder={false}
                            />) : (
                            data?.data?.map((team: ITeam, i: number) => (
                                <div className="card card-compact w-80 bg-white shadow-xl mb-5 mx-15" key={i + 1}>
                                    <div className="card-body">
                                        <h2 className="card-title text-black">Team Name: {team.name}</h2>
                                        <div className='flex'>
                                            <Link to={`/team-details/${team._id}`} className="btn btn-secondary mr-auto" >View</Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
            </div>
        </div>
    );
};

export default Team;