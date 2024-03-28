import {render, fireEvent, waitFor } from "@testing-library/react"
import DeleteDuty from "./DeleteDuty";


describe('DeleteDuty', () => {
    it("Fetch success when attempting to delete duty",async ()=>{

        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ message: 'Duty deleted successfully' }),
        });

        const myDuty = {
            id: 1,
            name: "Clean the dishes"
          };
    
        const onSuccessCallback = jest.fn();  
        const {getByRole} = render(<DeleteDuty duty={myDuty} onSuccessCallback={onSuccessCallback}/>);
        
        // Simulate clicking the delete button
        const deleteBtn = getByRole("button", {name:"Delete"})
        fireEvent.click(deleteBtn);

        // Simulate clicking the OK button to confirm deletion
        const deleteBtnOk = getByRole("button", {name:"OK"})
        fireEvent.click(deleteBtnOk);


        // Wait for any asynchronous operations to complete
        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalled();
            expect(onSuccessCallback).toHaveBeenCalled();
        });

     
        // Clean up and restore the original fetch implementation
        fetchMock.mockRestore();


    });

    it('Fetch fails when attempting to delete duty', async () => {
        const fetchMock = jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

        const myDuty = {
            id: 1,
            name: "Important Task"
        };


        const onSuccessCallback = jest.fn();

        const {getByRole, findByText} = render(<DeleteDuty duty={myDuty} onSuccessCallback={onSuccessCallback} />);

        // Simulate clicking the delete button
        const deleteBtn = getByRole("button", { name: "Delete" });
        fireEvent.click(deleteBtn);
        
        // Simulate clicking the OK button to confirm deletion
        const deleteBtnOk = getByRole("button", { name: "OK" });
        fireEvent.click(deleteBtnOk);

        // Wait for any asynchronous operations to complete
        await waitFor(() => {
            // Place expectations that should be met after async operations are complete
            expect(fetchMock).toHaveBeenCalled();
            // In the failure case, onSuccessCallback should not be called
            expect(onSuccessCallback).not.toHaveBeenCalled();
        });

        /// Check for the error message to appear in the modal
        const errorMessage = await findByText('Network error');
        expect(errorMessage).toBeInTheDocument();
        
        // Clean up and restore the original fetch implementation
        fetchMock.mockRestore();
    });
})