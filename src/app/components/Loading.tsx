import React from 'react'
import {Spinner} from "@nextui-org/spinner";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="spinner border-4 border-t-4 border-purple-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  )
}

export default Loading