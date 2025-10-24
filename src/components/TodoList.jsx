import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from './ListItem';

const TodoList = () => {
    const dispatch = useDispatch();
    const [listData, setListData] = useState([]);
    const {selecTodoType,types,List} = useSelector((state) => state?.todos);
    const typeObj = types?.find((type) => type?.value === selecTodoType);

    useEffect(() => {
        if (selecTodoType) {
            const filterData = List?.filter(
                (item) => item?.todoType === selecTodoType
            );
            setListData(filterData);
        } else {
            setListData(getTodos?.List || []);
        }
    }, [List, selecTodoType,types]);

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.index === destination.index) return;

        const updatedList = Array.from(listData);
        const [reorderedItem] = updatedList.splice(source.index, 1);
        updatedList.splice(destination.index, 0, reorderedItem);
        setListData(updatedList);
    };
console.log('listData',listData);

    return (
        <div className="w-[800px]">
            <h1 className="text-white text-xl capitalize font-semibold">
                {typeObj ? `${typeObj.name} Todos List` : 'All Todos List'}
            </h1>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="todo-list">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {listData?.map((item, index) => (
                                <Draggable
                                    key={item._id}
                                    draggableId={item._id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`bg-white flex items-center justify-between mt-3 p-3 rounded-xl transition ${
                                                snapshot.isDragging
                                                    ? 'shadow-lg scale-[1.02]'
                                                    : ''
                                            }`}
                                        >
                                            <ListItem item={item} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default TodoList;
