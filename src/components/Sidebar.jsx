import { Avatar, Typography, Input, Button, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { FaRegCalendarMinus } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setTodoType, addTodoType, deleteTodoType } from '../redux/TodoSlice';
import { RxCross2, RxCrossCircled } from 'react-icons/rx';
import AddTypeModal from './AddTypeModal';
import { RiEditCircleFill } from 'react-icons/ri';

const { Option } = Select;

const Sidebar = () => {
    const { types, selecTodoType } = useSelector(state => state?.todos);
    const allTypes = [
        { color: 'bg-pink-400', name: 'All', value: '' },
        ...types,
    ];
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editType, setEditType] = useState(null);
    const handleClick = (item) => {
        dispatch(setTodoType(item.value));
    };

    const defaultTypes = ['', 'personal', 'freelance', 'work'];


    const handleDeleteType = (value) => {
        dispatch(deleteTodoType(value));
    };
    const handleEditType = (item) => {
        setEditMode(true);
        setEditType(item);
        setIsModalOpen(true);
    };
    return (
        <div className='bg-white w-48 p-4 flex-shrink-0'>
            {/* header */}
            <div className="flex gap-2 items-center">
                <div className="border-2 rounded-full">
                    <Avatar size={50} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUaCe5knDPnd0Ir44ez_1OgloCsnb1lbiGVw&s' />
                </div>
                <div>
                    <Typography className='text-sm'>Do-It</Typography>
                    <Typography className='text-gray-400 text-xs'>Hamza mameri</Typography>
                </div>
            </div>
            <div className="border-b border-purple-400 mt-4 w-10/12 mx-auto"></div>

            {/* tasks */}
            <div className="flex items-center gap-2 mt-10">
                <FaRegCalendarMinus size={20} color='#CF9FFF' />
                <Typography className='text-gray-400 text-[1rem] font-semibold'>Today tasks</Typography>
            </div>

            <div className="mt-4 ml-6 max-h-96 overflow-y-auto">
                {allTypes?.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-between mt-3 gap-2 cursor-pointer ${selecTodoType === item?.value ? 'bg-gray-200 px-2 py-1 rounded-xl' : ''}`}
                        onClick={() => handleClick(item)}
                    >
                        <div className='flex items-center gap-2'>
                            <div className={`w-3 h-3 ${item?.color} rounded-full`}></div>
                            <Typography className='text-purple-400 text-[1rem] font-semibold'>{item?.name}</Typography>
                        </div>
                        {/* Delete icon */}
                        {!defaultTypes.includes(item?.value) && (
                            <div className="flex items-center gap-2">
                                <RiEditCircleFill
                                    color='#BF40BF'
                                    size={18}
                                    onClick={(e) => {
                                        handleEditType(item);
                                    }}
                                />

                                <RxCrossCircled
                                    className='cursor-pointer text-red-500'
                                    size={18}
                                    onClick={() => handleDeleteType(item?.value)}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add new type button */}
            <div
                className="flex items-center ml-6 mt-4 gap-2 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <AiFillPlusCircle color='#CBC3E3' size={23} />
                <Typography className='text-gray-400 font-semibold text-[1rem]'>Add Filter</Typography>
            </div>

            {/* Add type modal */}
            {/* {
                isModalOpen &&
            } */}
            <AddTypeModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                editMode={editMode}
                editType={editType}
                setEditMode={setEditMode}
                setEditType={setEditType}
            />
        </div>
    );
};

export default Sidebar;
