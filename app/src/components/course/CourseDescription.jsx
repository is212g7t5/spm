import React from "react";

// export default function CourseDescription({ desc }) {
//   return (
//     <div className='flex flex-row w-full p-4 transition duration-150 ease-in-out'>
//       <div className='flex flex-col w-full'>
//         <div className='font-medium text-left'>{desc}</div>
//       </div>
//     </div>
//   );
// }

export default function CourseDescription({ courseDesc }) {
  return (
    <div className='m-auto flex flex-col w-full p-5 px-10 bg-gray-100 rounded-lg'>
      <p className='font-medium text-justify'>{courseDesc}</p>
    </div>
  );
}
