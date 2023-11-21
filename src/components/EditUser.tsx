import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import swal from 'sweetalert';


import { useEffect } from "react";
import { useSingleDetailsQuery, useUserUpdateMutation } from "../redux/features/User/userApi";
import { IUserInputs } from "../interface/interface";
const EditUser = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const { data: user, refetch } = useSingleDetailsQuery(id)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IUserInputs>();
    const [userUpdate] = useUserUpdateMutation()

    console.log(user);

    useEffect(() => {
        refetch()
    }, [id, refetch])


    const onSubmit = async (data: IUserInputs) => {
        console.log(data);
        const options = {
            id: id,
            data: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                domain: data.domain,
                gender: data.gender,
                available: data.available,
            },

        }

        const result = await userUpdate(options)
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
        refetch()
        reset()
    };
    return (
        <div className="mt-10">
            <div className='grid grid-cols-1 justify-items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className="lg:w-[20%] md:w-[40%] w-[100%]">
                    <div>
                        <label className='label'>First Name</label>
                        <input type="text" className="input input-bordered input-primary w-full max-w-xs" placeholder="First name" defaultValue={user?.data.first_name}  {...register('first_name', { required: 'First Name is required' })} />
                        {errors.first_name && <p>{errors.first_name.message}</p>}
                    </div>
                    <div>
                        <label className='label'>Last Name</label>
                        <input type="text" className="input input-bordered input-primary w-full max-w-xs" placeholder="Last name" defaultValue={user?.data.last_name}   {...register('last_name', { required: 'last_name is required' })} />
                        {errors.last_name && <p>{errors.last_name.message}</p>}
                    </div>
                    <div>
                        <label className='label'>email</label>
                        <input type="text" className="input input-bordered input-primary w-full max-w-xs" placeholder="email" defaultValue={user?.data.email}  {...register('email', { required: 'email is required' })} />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className='label'>Domain</label>
                        <input type="text" className="input input-bordered input-primary w-full max-w-xs" placeholder="Domain" defaultValue={user?.data.domain}  {...register('domain', { required: 'Publication Date is required' })} />
                        {errors.domain && <p>{errors.domain.message}</p>}
                    </div>
                    <div>
                        <label className='label'>Gender</label>
                        <input type="text" className="input input-bordered input-primary w-full max-w-xs" placeholder="Gender" defaultValue={user?.data.gender}  {...register('gender', { required: 'gender Date is required' })} />
                        {errors.gender && <p>{errors.gender.message}</p>}
                    </div>
                    <div>
                        <label className='label'>Availlity</label>
                        <select className="input input-bordered input-primary w-full max-w-xs" defaultValue={user?.data.available} {...register("available", { required: 'Avalility is required' })}>
                            <option value="true">Available</option>
                            <option value="false">Unavailable</option>
                        </select>
                        {errors.available && <p>{errors.available.message}</p>}
                    </div>
                    <button className='btn btn-primary' type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;