// "use client";
// import { getWebSettings } from "@/app/components/WebSettings";
// import React, { useEffect, useRef, useState } from "react";

// export default function Settings() {
//   const [webProps, setWebProps] = useState<any>("");

//   const handleSave = async () => {
//     const websiteTitle =
//       (document.getElementById("webTitle") as HTMLInputElement)?.value ||
//       webProps.websiteTitle;
//     const websiteDescription =
//       (document.getElementById("webDescription") as HTMLInputElement)?.value ||
//       webProps.websiteDescription;
//     try {
//       const response = await fetch("/api/edit-settings", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ websiteTitle, websiteDescription }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update settings");
//       }
//       window.location.reload();
//     } catch (error: any) {
//       throw new Error(error.message || "Error updating settings");
//     }
//   };

//   useEffect(() => {
//     const fetchWebSettings = async () => {
//       try {
//         const settings = await getWebSettings();
//         setWebProps(settings);
//       } catch (error: any) {
//         throw new Error(error);
//       }
//     };
//     fetchWebSettings();
//   }, []);

//   return (
//     <main className="flex min-h-screen">
//       <div className="w-screen flex my-[25px] justify-center items-center flex-col">
//         <div className="w-[90%] h-[10vh] flex">
//           <div>
//             <h1 className="text-3xl font-bold">Settings</h1>
//           </div>
//         </div>
//         <div className="w-[90%] h-full flex flex-col items-center">
//           <div className="bg-secondTheme w-4/5 h-full rounded-3xl flex justify-center">
//             <div className="w-4/5">
//               <div className="flex flex-col my-5">
//                 <label htmlFor="webTitle" className="text-lg">
//                   Website Title
//                 </label>
//                 <input
//                   id="webTitle"
//                   placeholder="Change website title"
//                   defaultValue={webProps.websiteTitle}
//                   type="text"
//                   className="bg-secondTheme shadow-[0_4px_0px_-2px_rgba(100,100,100,1)] text-[#777]  placeholder:text-[#777] rounded-3xl py-1 px-4 mt-2 transition focus:outline-none focus:text-[#fff] focus:shadow-white"
//                   spellCheck={false}
//                 />
//               </div>
//               <div className="flex flex-col my-5">
//                 <label htmlFor="webDescription" className="text-lg">
//                   Website Description
//                 </label>
//                 <input
//                   id="webDescription"
//                   placeholder="Change website title"
//                   defaultValue={webProps.websiteDescription}
//                   type="text"
//                   className="bg-secondTheme shadow-[0_4px_0px_-2px_rgba(100,100,100,1)] text-[#777]  placeholder:text-[#777] rounded-3xl py-1 px-4 mt-2 transition focus:outline-none focus:text-[#fff] focus:shadow-white"
//                   spellCheck={false}
//                 />
//               </div>
//               <button
//                 onClick={handleSave}
//                 className="bg-mainTheme select-none text-black py-2 px-5 rounded-xl hover:brightness-75 transition "
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

import React from "react";

export default function Settings() {
  return <div>page</div>;
}