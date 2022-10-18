import React from 'react'

const Users = () => {
    const users=[{User:"Khadijah Onanuga Adebola  Adejuwon ", Email:"pppppppppppppppppp@gmail.com", Phone:"08066719237", Status:"Active", Last:"Today"},
    {User:"Khadijah Onanuga", Email:"ppp@gmail.com", Phone:"08066719237", Status:"Active", Last:"Today"},
    {User:"Khadijah Onanuga", Email:"ppp@gmail.com", Phone:"08066719237", Status:"Active", Last:"Today"}]
  return (
    <div className='bg-white p-4'> 
    <div className='overflow-auto rounded-lg'>
        <table className="w-full p-4 ">
            <thead className="bg-white text-black border border-[#DCDCFF] rounded-md p-6 ">
              <tr className='p-4'>
              <th className='px-4 pr-0 py-4  bg-purple-300'>
              <div className='border border-[#DCDCFF] w-4 h-4 rounded-sm mr-2'> </div>
              </th>
             
                <th className='items-center ml-6 my-4 text-start w-[30%] px-4 bg-red-300  '> Users</th>
         
                <th className='w-[15%] whitespace-nowrap text-start px-4'>Email Address</th>
                <th className='w-[20%] whitespace-nowrap text-start px-4'>Phone Number</th>
                <th className='w-[10%] whitespace-nowrap text-start px-4'>Status</th>
                <th className='w-[10%] whitespace-nowrap text-start px-4'>Last Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="w-full bg-blue-300 divide-y ">
              {users &&
                users.map(({User,Email,Phone,Status,Last}, index) => (
                  
                    <tr className="capitalize cursor-pointer   " key={index} >
                        <td className='px-4 pr-0 '>
                        <div className='border border-[#DCDCFF] w-4 h-4 rounded-sm mr-2'> </div>
                        </td>
                      <td className=' w-[30%] bg-purple-300  p-4 '> 
                      <div className='flex justify-start items-center whitespace-nowrap'>
                        <div className='rounded-full w-8 h-8 mr-2 bg-red-200 '></div>{User}

                      </div>
                     
                      
                      </td>
                     
                      <td className='w-[15%] bg-pink-600 md:bg-green-600 p-4' >{Email}</td>
                      <td className='w-[20%] p-4'>{Phone}</td>
                      <td className='w-[10%] p-4' >{Status}</td>
                      <td className='w-[10%] p-4' >{Last}</td>
                      <td className='pr-4'>...</td>
                    </tr>
                 
                ))}
            </tbody>
          </table>
          </div>

    </div>
  )
}

export default Users