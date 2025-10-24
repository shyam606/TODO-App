import { Typography } from 'antd'
import React from 'react'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import AllTodoList from './AllTodoList'
import { useSelector } from 'react-redux'

const MainContent = () => {
    const { selecTodoType } = useSelector(state => state?.todos);
    console.log('selecTodoType', selecTodoType);

    return (
        <div className='flex-1 p-10 flex flex-col justify-center'>
            <h1 className='text-white text-xl font-semibold'>Today main focus</h1>
            <h3 className='text-white text-3xl font-bold mt-2'>Design team meeting</h3>
            {/* add input form */}
            <div className="mt-10 w-full">
                <AddTodo />
            </div>
            {/* todo list component */}
            <div className="max-h-96 overflow-y-auto">
                {
                    selecTodoType ?
                        <TodoList />
                        :
                        <AllTodoList />
                }

            </div>
        </div>
    )
}

export default MainContent
