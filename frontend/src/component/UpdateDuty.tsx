import React, { useState } from 'react';
import { Button, Modal, Input, Form } from 'antd';
import { Duty } from '../types/duties';

type Props = {
    duty: Duty;
    onSuccessCallback : ()=>void;
};

const UpdateDuty = (props:  Props) => {
    const {duty, onSuccessCallback} = props;
    
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    
    const [form] = Form.useForm();

    const handleUpdate = async () => {
        // Show the confirmation modal
        setIsUpdateModalVisible(true);
    };

    const handleConfirmUpdate = async () => {
        try{
            const updatedValue = form.getFieldValue('name');
            if (updatedValue.trim() === '') {
                throw new Error('Please enter non-empty value');
            }

            const dataToSend = {
                name: updatedValue
            };

            const serverEndpoint = "/api/Duty/"+duty.id;
            const response = await fetch(serverEndpoint, {
                method: 'PUT',
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

            Modal.success({
                title: 'Success',
                content: 'Updated Successfully',
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
        setIsUpdateModalVisible(false);
    };

    const handleCancelUpdate = () => {
        // Close the modal without updating
        setIsUpdateModalVisible(false);
    };

    return (
        <div>
            <Button onClick={handleUpdate}>Update</Button>

            {/* Confirmation modal */}
            <Modal
                title="Confirm Update"
                open={isUpdateModalVisible}
                onOk={handleConfirmUpdate}
                onCancel={handleCancelUpdate}
            >
                {/* <p>Enter the new value:</p>
                <Input value={updatedValue} onChange={(e) => setUpdatedValue(e.target.value)} /> */}
                <Form form={form}>
                    <Form.Item
                        label="New Duty"
                        name="name"
                        initialValue={duty.name}
                        rules={[
                            { required: true, message: 'Please enter the new value' },
                            { whitespace: true, message: 'Value cannot be empty or contain only spaces' },
                            {
                                pattern: /^[A-Za-z0-9\s]+$/,
                                message: 'Alphanumeric characters and spaces only',
                            } // Alphanumeric and space validation
                        ]}
                    >
                        <Input type="text"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UpdateDuty;