import { Form, Input, Typography } from 'antd'
import { todoTypes } from '../utils/constant'
import { MdOutlineWatchLater } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../redux/TodoSlice'
import { useEffect } from 'react'

const AddTodo = () => {
    const selectTodoType = useSelector((state) => state?.todos?.selecTodoType)
    const dispatch = useDispatch()
    // console.log('selectTodoType>>', selectTodoType);

    const matchTodo = todoTypes?.find((ele)=>ele?.value===selectTodoType)


    const [form] = Form.useForm()
    const handleFinish = (values) => {
        console.log('Values', values);
        let data = {
            todoType: selectTodoType ? selectTodoType : 'personal',
            color:matchTodo?.color,
            value: values?.todo
        }
        console.log('dat@@@', data);
        dispatch(addTodo(data))
        form.resetFields()
    };
    const DotsComp = () => {
        return (
            <>
                {
                    todoTypes?.map((item, index) => {
                        return (
                            <div className="flex items-center gap-3 me-2 cursor-pointer" key={index}>
                                <div className={`w-3 h-3 ${item?.color} rounded-full`}></div>
                            </div>
                        )
                    })
                }
            </>
        )
    }
    return (
        <>
            <Form form={form} onFinish={handleFinish} className=''>
                <Form.Item
                    name={'todo'}
                    rules={[{ required: true, message: 'Please enter a task!' }]}
                >
                    <Input
                        prefix={<DotsComp />}
                        placeholder='What is your next task?'
                        className='w-full h-12 rounded-2xl'
                        suffix={<MdOutlineWatchLater color='#CF9FFF' size={25} />}
                    />
                </Form.Item>
            </Form>
        </>
    )
}

export default AddTodo
