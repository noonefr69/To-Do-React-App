import React, { useState } from 'react'
import Nav from './Nav'
import ToDo from './ToDo'

export default function App() {

  const [taskCount, setTaskCount] = useState(0); 

    const handleTaskCount = (count) => {
        setTaskCount(count);
    };

    const [isDarkMode, setIsDarkMode] = useState(true);

    function handleDarkModeChange(dark) {
        setIsDarkMode(dark);
    }

  return (
    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'} min-h-[100vh] flex items-center`}>
      <div className={`flex flex-col md:flex-row h-[90vh] md:w-[70vw] w-[90vw] overflow-auto mx-auto bg-gray-800 border-2 ${isDarkMode ? 'border-gray-500' : 'border-gray-900'}`}>
        <Nav taskCount={taskCount} darkMode={isDarkMode}/>
        <ToDo updateTaskCount={handleTaskCount} updateDarkMode={handleDarkModeChange}/>
      </div>
    </div>
  )
}
