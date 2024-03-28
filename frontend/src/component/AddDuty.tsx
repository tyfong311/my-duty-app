import React, { useState } from 'react';
import { Button, Modal, Input, Form } from 'antd';


type Props = {
    onSuccessCallback : ()=>void;
};

const AddDuty = (props:  Props) => {
    const { onSuccessCallback} = props;
    
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    
    const [form] = Form.useForm();

    const handleAdd = async () => {
        // Show the confirmation modal
        setIsAddModalVisible(true);
    };

    const handleConfirmAdd = async () => {
        try{
            const id = form.getFieldValue('id');
            const name = form.getFieldValue('name');

            if (!id || id.trim() === '') {
                throw new Error('id is empty');
            }


            if (!name || name.trim() === '') {
                throw new Error('name is empty');
            }

            const dataToSend = {
                id: id,
                name: name
            };

            const serverEndpoint = "/api/Duty/";
            const response = await fetch(serverEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            })
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error || 'Something went wrong. Please try again later.';
                throw new Error(errorMessage);
            }
            const responseData = await response.json();

            Modal.success({
                title: 'Success',
                content: 'Add Successfully',
            });

            onSuccessCallback();
        }
        catch(error){
                console.error('Error:', error);
                const errorMessage = (error as Error).message;
                Modal.error({
                    title: 'Error',
                    content: errorMessage
                });
        }

        // Close the modal
        closeDialogBox();
    };

    const handleCancelAdd = () => {
        // Close the modal without updating
        closeDialogBox();
    };

    const closeDialogBox = async () => {
       // Close the modal
        setIsAddModalVisible(false);
        form.resetFields();
    };


    return (
        <div>
            <Button onClick={handleAdd}>Add</Button>

            {/* Confirmation modal */}
            <Modal
                title="Confirm Add"
                open={isAddModalVisible}
                onOk={handleConfirmAdd}
                onCancel={handleCancelAdd}
            >
                <Form form={form}>
                    <Form.Item
                        label="Id"
                        name="id"
                        rules={[
                            { required: true, message: 'Please enter the new value' },
                            { whitespace: true, message: 'Value cannot be empty or contain only spaces' }
                        ]}
                    >
                        <Input type="number"/>
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            { required: true, message: 'Please enter the new value' },
                            { whitespace: true, message: 'Value cannot be empty or contain only spaces' },
                            {
                                pattern: /^[A-Za-z0-9\s]+$/,
                                message: 'Alphanumeric characters and spaces only',
                            } // Alphanumeric and space validation
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddDuty;