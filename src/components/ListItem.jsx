import { Typography } from 'antd'
import React from 'react'
import { FaRegCircle } from 'react-icons/fa'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { RxCrossCircled } from 'react-icons/rx'
import { useDispatch } from 'react-redux'
import { deleteTodo, markComplete } from '../redux/TodoSlice'

const ListItem = ({item}) => {
    const dispatch =useDispatch()
    return (
        <div className='flex justify-between w-full'>
            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 ${item?.color} rounded-full`}></div>
                <Typography>{item?.value}</Typography>
            </div>
            <div className="flex items-center gap-2">
                {item?.isComplete ? (
                    <FaRegCircleCheck
                        color="#DA70D6"
                        size={24}
                        onClick={() => dispatch(markComplete(item?._id))}
                        className="cursor-pointer"
                    />
                ) : (
                    <FaRegCircle
                        color="#DA70D6"
                        size={25}
                        onClick={() => dispatch(markComplete(item?._id))}
                        className="cursor-pointer"
                    />
                )}
                <RxCrossCircled
                    color="red"
                    size={24}
                    className="cursor-pointer"
                    onClick={() => dispatch(deleteTodo(item?._id))}
                />
            </div>
        </div>
    )
}

export default ListItem
