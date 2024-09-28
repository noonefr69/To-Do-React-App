import React, { useRef, useState } from 'react'
import { IoMdMenu } from "react-icons/io";


export default function Nav({ taskCount, darkMode }) {

    const btnRef = useRef();
    const [tr, setTr] = useState(false);

    function navOpenClose(){
        setTr(!tr);
    }

  return (
    <div className={`${tr ? 'md:w-[0rem]' : 'md:w-[20rem]'} ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} transition-all`}>
        <button ref={btnRef} onClick={navOpenClose} className={`relative border-l-2 border-purple-400 flex w-full justify-between p-3 ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-400'} transition-all`}>
            <div className='flex items-center gap-2 '> <IoMdMenu className={`scale-150 text-purple-700 z-50`}/> <h6 className={`${tr ? 'hidden:' : ''} ${darkMode ? 'text-white' : 'text-gray-800'} transition-all `}>Menu</h6> </div>
            <div className={`${darkMode ? 'text-white' : 'text-black'} transition-all`}>{taskCount}</div>
        </button>
    </div>
  )
}
