import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSingleTeamDetailsQuery } from '../redux/features/User/userApi';
import { IUser } from '../interface/interface';

const TeamDetails = () => {
    const { id } = useParams();
    const { data: team, refetch } = useSingleTeamDetailsQuery(id)

    useEffect(() => {
        refetch()
    }, [id, refetch])

    // if (team.length === 0 ) {
    //     return <p className='text-center text-bold text-4xl'>Empty please Create a Team</p>
    // }

    console.log(team);
    return (
        <div>
            <h1 className='text-center text-bold text-4xl'>Team Name: {team?.data?.name}</h1>

            <div className='grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 justify-center mt-20'>
                {
                    team?.data?.members.map((user: IUser) => (
                        <div className="card card-compact w-80 bg-white shadow-xl mb-5 mx-15" key={user._id}>
                            <figure><img src={user?.avatar} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-black text-3xl">Name: {user?.first_name}{" "} {user?.last_name}</h2>
                                <p className='text-black text-lg font-semibold' >Domain: {user?.email}</p>
                                <p className='text-black text-lg font-semibold' >Domain: {user?.domain}</p>
                                <p className='text-black text-lg font-semibold'>Gender: {user?.gender}</p>
                                <p className="text-black text-lg font-semibold">{user?.available ? 'Available' : 'Unavailable'}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default TeamDetails;