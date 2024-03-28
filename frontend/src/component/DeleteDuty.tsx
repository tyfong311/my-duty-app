import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Duty } from '../types/duties';

type Props = {
    duty: Duty;
    onSuccessCallback : ()=>void;
};

const DeleteDuty = (props:  Props) => {
    const {duty, onSuccessCallback} = props;

    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

    const handleDelete = async (record: Duty) => {
        // Show the confirmation modal
        setIsUpdateModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        try{
            const serverEndpoint = "/api/Duty/"+duty.id;
            const response = await fetch(serverEndpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error || 'Something went wrong. Please try again later.';
                throw new Error(errorMessage);
            }
            const responseData = await response.json();

            Modal.success({
                title: 'Success',
                content: 'Deleted Successfully',
            });

            onSuccessCallback();
        }
        catch(error){
                const errorMessage = (error as Error).message;
                Modal.error({
                    title: 'Error',
                    content: errorMessage
                });
        }

        // Close the modal
        setIsUpdateModalVisible(false);
    };

    const handleCancelDelete = () => {
        // Close the modal without updating
        setIsUpdateModalVisible(false);
    };

    return (
        <div>
            <Button onClick={() => handleDelete(duty)}>Delete</Button>

            {/* Confirmation modal */}
            <Modal
                title="Confirm Delete"
                open={isUpdateModalVisible}
                onOk={handleConfirmDelete}
                onCancel={handleCancelDelete}
            >
                <p>Are you sure you want to delete item {duty.id}? </p>
            </Modal>
        </div>
    );
};

export default DeleteDuty;