
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { IUser } from "../interface/interface";
import { userAdd } from "../redux/features/Team/teamSlice";
import { useGetAllUsersQuery, useGetFiltersUserQuery, useGetPagePaginationUserQuery, useGetSearchUserQuery } from '../redux/features/User/userApi';
import { useAppDispatch } from "../redux/hook";

type Input = {
  searchValue: string;
}
const User = () => {

  const { register, handleSubmit } = useForm<Input>()
  const dispatch = useAppDispatch();
  const [dataF, setDataF] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [available, setAvailable] = useState<string>('')
  const [domain, setDomain] = useState<string>('')

  const uniqueDomines = Array.from(new Set(dataF?.map((user: IUser) => user.domain)))
  const uniqueGenders = Array.from(new Set(dataF?.map((user: IUser) => user.gender)))

  //search and filters and page pagination with all users

  const { data: allUsersdata, isLoading: allUsersLoading, isError: allUsersError, refetch, } = useGetAllUsersQuery({ page: currentPage })


  const { data: searchUserData, isLoading: searchUserLoading, isError: searchUserError } = useGetSearchUserQuery(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1), {
    skip: searchTerm.trim() === ''
  })
  const { data: filterUserData, isLoading: filterUserLoading, isError: filterUserError } = useGetFiltersUserQuery({
    domain: domain,
    gender: gender,
    available: available,
    page: currentPage,
  }, {
    skip: domain.trim() === '' && gender.trim() === '' && available.trim() === '',
  })

  const { data: pageUserData, isLoading: pageUserLoading, isError: pageUserError } = useGetPagePaginationUserQuery(currentPage)



  let data: IUser[] | undefined;

  if (filterUserData?.data) {
    data = filterUserData?.data
    console.log('f', data);
  } else if (searchUserData?.data) {
    data = searchUserData?.data
    console.log('s', data);
  }
  else if (allUsersdata?.data) {
    data = allUsersdata?.data
    console.log('all', data);
  }
  else if (pageUserData?.data) {
    data = pageUserData?.data
    console.log('p', data);
  }
  else {
    data = allUsersdata?.data
    console.log('all2', data);
  }


  const isLoadings = filterUserLoading ? filterUserLoading : searchUserLoading ? searchUserLoading : pageUserLoading ? pageUserLoading : allUsersLoading;
  const isErrors = filterUserError ? filterUserError : searchUserError ? searchUserError : pageUserError ? pageUserError : allUsersError;

  if (isErrors) {
    toast.error("Something went wrong")
  }
  if (!isLoadings) {
    toast.success('successful');
  }



  const onSubmit: SubmitHandler<Input> = data => {
    if (data.searchValue.trim() !== '') {
      setSearchTerm(data.searchValue.trim())
    }
  }
  // get data some experiment
  useEffect(() => {
    axios.get('https://state-managment-server.vercel.app/api/v1/users')
      .then((response) => {
        // Handle the response data
        setDataF(response.data.data);
        console.log('data', response.data.data)
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching :', error);
      });
    refetch() // refetch the data from redux toolkit
  }, [refetch])

  const handleAddToTeam = (user: IUser) => {
    dispatch(userAdd(user))
    toast.success('successfulty added to team')
  }



  return (
    <div >
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-1 grid-cols-1 mt-20 justify-items-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='mb-5 flex'>
          <input type="text" placeholder="Search by Name" className="input input-bordered input-accent w-full max-w-xs mr-2" required {...register('searchValue')} />
          <button className="btn btn-outline btn-accent" type='submit'>Submit</button>
        </form>
        <select onChange={(e) => setDomain(e.target.value)} className="select select-info w-full max-w-xs mr-2 ">
          <option disabled selected>Select Domain</option>
          {
            uniqueDomines.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))
          }
        </select>
        <select onChange={(e) => setGender(e.target.value)} className="select select-primary w-full max-w-xs mr-2 mb-5">
          <option disabled selected>Select Gender</option>
          {
            uniqueGenders.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))
          }
        </select>
        <select onChange={(e) => setAvailable(e.target.value)} className="select select-secondary w-full max-w-xs mr-2">
          <option disabled selected>Select Availability</option>
          <option value='true'>Available</option>
          <option value='false'>Unavailable</option>
        </select>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 mt-20 mb-5 justify-items-center'>
        {
          isLoadings ?
            (<Toaster
              position="top-center"
              reverseOrder={false}
            />)
            : isErrors ? (
              <Toaster
                position="top-center"
                reverseOrder={false}
              />) : (
              data?.map((user: IUser) => (
                <div className="card card-compact w-80 bg-white shadow-xl mb-5 mx-15" key={user.id}>
                  <figure><img src={user.avatar} alt="Shoes" /></figure>
                  <div className="card-body">
                    <h2 className="card-title text-black">Name: {user.first_name}{" "} {user.last_name}</h2>
                    <p className='text-black font-semibold' >Email: {user.email}</p>
                    <p className='text-black font-semibold' >Domain: {user.domain}</p>
                    <p className='text-black font-semibold'>Gender: {user.gender}</p>
                    <p className="text-black font-semibold">{user.available ? 'Available' : 'Unavailable'}</p>
                    <div className='flex'>
                      <Link to={`/user-details/${user._id}`} className="btn btn-secondary mr-auto" >View</Link>
                      <button className="btn btn-secondary ml-auto" onClick={() => handleAddToTeam(user)}>Add To Team</button>
                    </div>
                  </div>
                </div>
              ))
            )}
      </div>
      <div className='flex justify-center'>
        <div className="join">
          <button className="join-item btn" onClick={() => {
            if (currentPage > 1) {
              setCurrentPage((p) => p - 1)
            }
          }
          }>«</button>
          <button className="join-item btn">{currentPage}</button>
          <button className="join-item btn" onClick={() => {
            if (data && data?.length > 0) {
              setCurrentPage((p) => p + 1);
            }
          }}>»</button>
        </div>
      </div>
    </div>
  );
};

export default User;