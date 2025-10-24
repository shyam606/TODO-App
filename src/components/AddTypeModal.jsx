import { Form, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { RxCrossCircled } from 'react-icons/rx'
import { useDispatch } from 'react-redux'
import { addTodoType, editTodoType } from '../redux/TodoSlice'
import { todoTypeColors } from '../utils/constant'

const AddTypeModal = ({ isModalOpen, setIsModalOpen, editMode, editType, setEditMode, setEditType }) => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [newTypeName, setNewTypeName] = useState('');
    const [newTypeColor, setNewTypeColor] = useState('bg-green-400');

    useEffect(() => {
        if (editMode && editType) {
            form.setFieldsValue({
                name: editType?.name,
                color: editType?.color
            })
        } else {
            form.setFieldsValue({
                name: '',
                color: 'bg-green-400'
            })
        }
    }, [editMode, editType]);

    const handleAddType = (values) => {
        console.log('valuess', values);

        if (newTypeName.trim() === '') return;
        let data ={
            name:values?.name,
            color:values?.color
        }
        if (editMode && editType) {
            dispatch(
                editTodoType({
                    value: editType?.value,
                    updatedData: data,
                })
            );
        } else {
            dispatch(addTodoType(data));
            form.resetFields()
        }
        setEditMode(false);
        setEditType(null);
        setIsModalOpen(false);
    };
    return (
        <div>
            <Modal
                title="Add New Type"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                closeIcon={<RxCrossCircled
                    color='red'
                    size={24}
                    className='cursor-pointer'
                />}
                width={400}
                centered
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddType}
                    autoComplete="off"
                >
                    <Form.Item
                        name="name"
                        label="Type Name"
                        rules={[{ required: true, message: 'Please enter a type name' }]}
                        className='mb-0'
                    >
                        <input
                            placeholder="Type name"
                            onChange={(e) => setNewTypeName(e.target.value)}
                            className="modal_input"
                        />
                    </Form.Item>
                    <Form.Item
                        name="color"
                        label="Type Color"
                        initialValue="bg-green-400"
                    >
                        <select
                            onChange={(e) => setNewTypeColor(e.target.value)}
                            className="modal_input"
                        >
                            {todoTypeColors?.map((type) => (
                                <option key={type?.value} value={type?.value}>
                                    {type?.name}?
                                </option>
                            ))}
                        </select>

                    </Form.Item>
                    <div className="mt-5  flex items-center gap-5 justify-end">
                        <button className='bg-red-500 text-white font-semibold h-10 px-6 rounded-xl hover:bg-red-400' onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button type='submit' className='bg-purple-500 text-white font-semibold h-10 px-6 rounded-xl hover:bg-purple-400'>
                            {editType?.value?"Edit":'Update'}
                        </button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}
export default AddTypeModal
