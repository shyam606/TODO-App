import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { deleteTodo, markComplete, reorderTodos } from '../redux/TodoSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FaRegCircle } from 'react-icons/fa';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { RxCrossCircled } from 'react-icons/rx';
import { Typography } from 'antd';
import ListItem from './ListItem';

const AllTodoList = () => {
    const getTodos = useSelector(state => state?.todos);
    console.log('getTodos', getTodos?.types);
    const dispatch = useDispatch();
    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;
        dispatch(reorderTodos({
            sourceIndex: source.index,
            destinationIndex: destination.index,
            sourceType: source.droppableId,
            destinationType: destination.droppableId
        }));
    };

    return (
        <div className="w-[800px]">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-4 flex-wrap">
                    {getTodos?.types?.map(type => {
                        const listData = getTodos?.List?.filter(item => item?.todoType === type?.value);
                        return (
                            <Droppable droppableId={type?.value} key={type?.value}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="bg-gray-200 p-3 min-h-24 rounded-lg w-64"
                                    >
                                        <h2 className="font-semibold capitalize">{type?.name} Todos</h2>
                                        {listData?.map((item, index) => (
                                            <Draggable key={item?._id} draggableId={item?._id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bg-white flex items-center justify-between mt-3 p-3 rounded-xl"
                                                    >
                                                        <ListItem item={item} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided?.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        );
                    })}
                </div>
            </DragDropContext>
        </div>
    );
};

export default AllTodoList