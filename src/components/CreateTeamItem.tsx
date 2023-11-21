
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { IUser } from '../interface/interface';
import { clearTeam, userRemoved } from '../redux/features/Team/teamSlice';
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import { useCreateTeamMutation } from '../redux/features/User/userApi';

type TeamInput = {
    teamName: string;
}
const CreateTeamItem = () => {
    const { members } = useAppSelector((state) => state.userList)
    const [createTeam] = useCreateTeamMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TeamInput>();
    const onSubmit = async (data: TeamInput) => {
        if (members.length <= 2) {
            swal(`Please! User Add a Team more then 2!`, {
                icon: "warning",
            })
        }
        const options = {
            data: {
                name: data.teamName,
                members: members
            },

        }

        const result = await createTeam(options)
        if ('data' in result) {
            const message = (result as { data: { messages: string } })?.data.messages;
            swal(`Done! Your imaginary ${message}!`, {
                icon: "success",
            }).then(() => {
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            })
        }
        dispatch(clearTeam())
        reset()
    };

    console.log(members);
    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-secondary">Create Team</label>
            </div>
            <div className="drawer-side z-10 w-[100%]">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu p-4 lg:w-[40%] md:w-[50%] w-[80%] min-h-full bg-base-200 text-base-content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className='text-3xl text-white'>Create Team</h2>
                        <div>
                            <label className='label'>Name of Team</label>
                            <input type="text" className="input input-bordered input-primary w-full max-w-xs" placeholder="Name of Team" {...register('teamName', { required: 'Team Name is required' })} />
                            {errors.teamName && <p>{errors.teamName.message}</p>}
                        </div>
                        <div className='grid lg:grid-cols-3 grid-cols-1 mt-2'>
                            {
                                members.map((user: IUser) => (
                                    <div className='border rounded-md h-[170px] w-[195px] p-5 mr-2 mb-2' key={user._id}>
                                        <div>
                                            <h3 >{user.first_name} {" "} {user.last_name}</h3>
                                            <h5 className='mt-1'>{user.email}</h5>
                                            <h5 className='mt-1'>{user.domain}</h5>
                                            <h5 className='mt-1'>{user.available ? 'Available' : 'Unavailable'}</h5>
                                            <button className="btn btn-primary mt-1" onClick={() => dispatch(userRemoved(user))}>Remove</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='fixed z-10'>
                            <button className='mt-2 btn btn-primary' type="submit">Submit Team</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTeamItem;