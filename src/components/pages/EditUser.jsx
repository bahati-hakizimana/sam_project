// import React from 'react'

// function EditUser() {
//   return (
//     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//           Update
//         </h2>
//       </div>
//       <small className='mt-1.5 text-center'>Create New Account for Free</small>
//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
//               First Name
//             </label>
//             <div className="mt-2">
//               <input
//                 id="firstname"
//                 name="firstname"
//                 type="text"
//                 autoComplete="name"
//                 required
//                 value={formData.firstname}
//                 onChange={handleChange}
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
//               Last Name
//             </label>
//             <div className="mt-2">
//               <input
//                 id="lastname"
//                 name="lastname"
//                 type="text"
//                 autoComplete="name"
//                 required
//                 value={formData.lastname}
//                 onChange={handleChange}
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//               UserName
//             </label>
//             <div className="mt-2">
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 autoComplete="username"
//                 required
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//               Email
//             </label>
//             <div className="mt-2">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
//               Phone Number
//             </label>
//             <div className="mt-2">
//               <input
//                 id="phone"
//                 name="phone"
//                 type="text"
//                 autoComplete="phone number"
//                 required
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="group relative flex w-full justify-center rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
//                 <LockClosedIcon className='h-5 w-5 text-purple-400 group-hover:text-indigo-400' aria-hidden="true" />
//               </span>
//               <Link to="/login">Update</Link>
              
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default EditUser

import React from 'react'

function EditUser() {
  return (
    <div>
      edit user
    </div>
  )
}

export default EditUser

