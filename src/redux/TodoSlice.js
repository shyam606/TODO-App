import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';


const initialState = {
    selecTodoType: '',
    List: [
        {
            "todoType": "personal",
            "color": "bg-red-400",
            "value": "personal1",
            "_id": "10f62db8-7f99-40a3-9871-8d0f85d67ebiuiui",
            "isComplete": false
        },
        {
            "todoType": "freelance",
            "color": "bg-sky-400",
            "value": "freelance1",
            "_id": "10f62db8-7f99-3333-9871-8d0f85d67ebiuiui",
            "isComplete": false
        },
    ],
    types: [  // default types
        // { color: 'bg-pink-400', name: 'All', value: '' },
        { color: 'bg-red-400', name: 'Personal', value: 'personal' },
        { color: 'bg-sky-400', name: 'Freelance', value: 'freelance' },
        // { color: 'bg-yellow-400', name: 'Work', value: 'work' },
    ]
};

export const TodoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodoType: (state, action) => {
            state.selecTodoType = action.payload
        },
        addTodo: (state, action) => {
            let data = {
                ...action.payload,
                _id: uuidv4(),
                isComplete: false
            }
            console.log('stte', data);
            state.List.push(data)
        },
        markComplete: (state, action) => {
            const id = action.payload
            const todo = state?.List?.find((item) => item?._id === id)
            if (todo) {
                todo.isComplete = !todo?.isComplete
            }
        },
        deleteTodo: (state, action) => {
            const id = action.payload;
            const filterData = state.List.filter(item => item._id !== id);
            state.List = filterData
        },
        addTodoType: (state, action) => {
            const newType = { ...action.payload, value: uuidv4() };
            state.types.push(newType);
        },
        editTodoType: (state, action) => {
            const { value, updatedData } = action.payload;
            const type = state?.types?.find((t) => t?.value === value);
            if (type) {
                if (updatedData?.name) type.name = updatedData?.name;
                if (updatedData?.color) type.color = updatedData?.color;
            }
        },
        deleteTodoType: (state, action) => {
            const value = action.payload;
            state.types = state.types.filter(type => type.value !== value);
            if (state.selecTodoType === value) state.selecTodoType = '';
        },
        reorderTodos: (state, action) => {
            const { sourceIndex, destinationIndex, sourceType, destinationType } = action.payload;

            if (sourceType === destinationType) {
                // Reorder within same list
                const sameList = state.List.filter(item => item.todoType === sourceType);
                const otherItems = state.List.filter(item => item.todoType !== sourceType);

                const [movedItem] = sameList.splice(sourceIndex, 1);
                sameList.splice(destinationIndex, 0, movedItem);

                state.List = [...otherItems, ...sameList];
            } else {
                // Move between lists
                const sourceList = state.List.filter(item => item.todoType === sourceType);
                const destinationList = state.List.filter(item => item.todoType === destinationType);

                const [movedItem] = sourceList.splice(sourceIndex, 1);
                movedItem.todoType = destinationType; // update type

                destinationList.splice(destinationIndex, 0, movedItem);

                // combine everything back
                const remaining = state.List.filter(
                    item => item.todoType !== sourceType && item.todoType !== destinationType
                );

                state.List = [...remaining, ...sourceList, ...destinationList];
            }
        },


    },
});

export const { addTodo, setTodoType, markComplete, deleteTodo, addTodoType, editTodoType, deleteTodoType, reorderTodos } = TodoSlice.actions;

export default TodoSlice.reducer;



