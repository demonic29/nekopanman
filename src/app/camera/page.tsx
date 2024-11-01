// 'use client';
// import React, { useRef, useEffect, useState } from "react";
// import { Camera } from "react-camera-pro";

// const CameraScreen = () => {
//     const camera = useRef();
//     // const [isClient, setIsClient] = useState(false);

//     // useEffect(() => {
//     //     setIsClient(true); // Ensures the component renders only on the client
//     // }, []);

//     return (
//         <div className="h-screen">
//             {/* {isClient && (
//                 <Camera
//                     ref={camera}
//                     errorMessages={{
//                         noCameraAccessible: "",
//                         permissionDenied: "",
//                         switchCamera: "",
//                         canvas: "",
//                     }}
//                     className="h-screen w-screen"
//                 />
//             )} */}
//             <Camera
//                     ref={camera}
//                     errorMessages={{
//                         noCameraAccessible: "",
//                         permissionDenied: "",
//                         switchCamera: "",
//                         canvas: "",
//                     }}
//                     className="h-screen w-screen bg-cyan-100"
//                 />
//         </div>
//     );
// };

// export default CameraScreen;
