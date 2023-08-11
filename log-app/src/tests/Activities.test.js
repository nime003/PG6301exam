import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Activities from '../pages/Activities';

// Mocking axios calls
jest.mock('axios');

describe('<Activities />', () => {

    it('renders an error if no user data is provided', () => {
        render(<Activities user={null} />);
        expect(screen.getByText('No user data provided')).toBeInTheDocument();
    });

    it('handles error when fetching activities fails', async () => {
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<Activities user={{ occupancy: 'Engineer', username: 'John' }} />);

        await waitFor(() => expect(screen.getByText('An error occurred while fetching activities.')).toBeInTheDocument());
    });

    it('assigns an activity and handles success response', async () => {
        const logSpy = jest.spyOn(console, 'log');

        axios.get.mockResolvedValueOnce({ data: [{ task: 'Activity 1' }] });
        axios.post.mockResolvedValueOnce({ data: { success: true, message: 'Assigned successfully!' } });

        render(<Activities user={{ occupancy: 'Engineer', username: 'John' }} />);

        await waitFor(() => expect(screen.getByText('Activity 1')).toBeInTheDocument());

        fireEvent.click(screen.getByText('Assign to me'));

        await waitFor(() => expect(logSpy).toHaveBeenCalledWith('Assigned successfully!'));

        logSpy.mockRestore();
    });

    it('assigns an activity and handles error response', async () => {
        axios.get.mockResolvedValueOnce({ data: [{ task: 'Activity 1' }] });
        axios.post.mockRejectedValueOnce(new Error('Failed to assign'));

        render(<Activities user={{ occupancy: 'Engineer', username: 'John' }} />);

        await waitFor(() => expect(screen.getByText('Activity 1')).toBeInTheDocument());

        fireEvent.click(screen.getByText('Assign to me'));

        await waitFor(() => expect(screen.getByText('Error assigning activity. Please try again.')).toBeInTheDocument());
    });

});