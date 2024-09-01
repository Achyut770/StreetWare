// "use client"
// import { authenticateGoogle } from '@/app/lib/userActions';
// import { useFormState } from 'react-dom';
// import { FcGoogle } from 'react-icons/fc'

// const GoogleSignIn = () => {
//     const [state, formAction] = useFormState(authenticateGoogle, undefined);

//     return (
//         <form action={formAction} className=' mx-auto '>
//             <button className='flex flex-row py-2 border border-solid border-gray-300 w-full gap-4 px-3 items-center justify-center rounded-[7px] ' >
//                 <FcGoogle className='text-2xl' /> Continue with google
//             </button>
//             {state && <div className='text-red-400'>{state}</div>}
//         </form>
//     )
// }

// export default GoogleSignIn