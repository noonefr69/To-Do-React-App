import React, { useRef, useState, useEffect } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDarkMode } from "react-icons/md";
import { GoSun } from "react-icons/go";

export default function ToDo({ updateTaskCount, updateDarkMode }) {  
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : ['Task 1', 'Task 2', 'Task 3'];
    });

    const [dark, setDark] = useState(true);

    const [completed, setCompleted] = useState(Array(tasks.length).fill(false));
    const [value, setValue] = useState('');
    const [newTodo, setNewTodo] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateTaskCount(tasks.length);
    }, [tasks, updateTaskCount]);

    useEffect(() => {
        updateDarkMode(dark); // اینجا هر زمان که dark تغییر کرد به والد اطلاع می‌دهیم
    }, [dark, updateDarkMode]);

    function lineChecked(index) {
        const updatedCompleted = [...completed];
        updatedCompleted[index] = !updatedCompleted[index];
        setCompleted(updatedCompleted); 
    }

    function deleteList(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        const updatedCompleted = completed.filter((_, i) => i !== index);
        
        setTasks(updatedTasks); 
        setCompleted(updatedCompleted); 
    }

    function addTask(event) {
        event.preventDefault();
        if (value !== undefined && value.length < 15 && value !== '') {
            setTasks([...tasks, value]);
            setValue('');
        }
        if (value.length >= 15) {
            alert('Task name should not exceed 15 characters');
            setValue('');
        }
        setNewTodo(!newTodo);
    }

    return (
        <div className='w-full'>
            <header id='back' className='relative h-1/4 '>
                <h1 className='absolute bottom-4 left-4 text-white text-4xl font-semibold'>To-Do</h1>
                <button><MdOutlineDarkMode onClick={() => setDark(!dark)} className={`${dark ? '' : 'rotate-[180deg]'} cursor-pointer absolute bottom-5 right-5 scale-[2] text-gray-600 transition-all`} style={{opacity: dark ? '1' : '0', zIndex: 1}}/></button>
                <button><GoSun onClick={() => setDark(!dark)} className={`${dark ? '-rotate-[180deg] ' : ''} cursor-pointer absolute bottom-5 right-5 scale-[2] text-gray-600 transition-all`} style={{opacity: dark ? '0' : '1',zIndex: 1}}/></button>
            </header>
            <main className={`${dark ? 'bg-gray-800' : 'bg-gray-200'} md:border-l-2 border-gray-700 min-h-[67.25vh] relative transition-all`}>
                <ul className='p-3 relative'>
                    {tasks.map((task, index) => (
                        <div key={index} className={`${dark ? 'hover:bg-slate-700' : 'hover:bg-slate-400'} flex items-center justify-between w-full border-b-2 border-gray-700 p-2 transition-all`}>
                            <li className={`${completed[index] ? 'line-through' : ''} ${dark ? 'text-white' : 'text-black' } transition-all relative pl-7 text-xl`}>
                                <div onClick={() => lineChecked(index)} id='circle' className={`${completed[index] ? 'bg-white' : ''} ${dark ? '' : 'border-black'} border-2 transition-all cursor-pointer`}></div>
                                <span className={`${completed[index] ? 'opacity-50' : '' } transition-all`}>{task}</span>
                            </li> 
                            <button onClick={() => deleteList(index)} className='text-red-500'><FaRegTrashAlt /></button>
                        </div>
                    ))}
                    {
                        newTodo ? (
                            <li>
                                <form className='flex relative' onSubmit={addTask}>
                                    <input
                                        ref={inputRef}
                                        value={value}
                                        onChange={e => setValue(e.target.value)}
                                        className='p-2 w-full outline-none bg-transparent border-b-gray-600 border-2 border-transparent rounded-sm focus:border-b-gray-500 text-white transition-all'
                                        type="text" 
                                        placeholder='Add a to-do' 
                                    />
                                    <button onClick={addTask} type='submit' id='dokme' className='absolute z-20 right-2 top-[0.69rem] text-blue-600 font-bold transition-all'>Add</button>
                                </form>
                            </li>
                        ) : (
                            <li className={`${dark ? 'hover:bg-slate-700' : 'hover:bg-slate-400'} transition-all`}>
                                <button onClick={() => {
                                    setNewTodo(!newTodo); 
                                    setTimeout(() => { inputRef.current.focus() }, 0);
                                }} className={`${dark ? 'text-blue-500' : 'text-blue-700'} w-full flex items-center p-2 gap-2 text-xl transition-all`}>
                                    <IoMdAdd />Add a to-do
                                </button>
                            </li>
                        )
                    }
                </ul>
            </main>
        </div>
    );
}
