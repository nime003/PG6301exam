import React from 'react';
import axios from 'axios';
import { render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LogHours from '../pages/LogHours';

jest.mock('axios');

describe('<LogHours />', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('displays error if no user information is provided', () => {
        render(<LogHours />);
        expect(screen.getByText('No user information available.')).toBeInTheDocument();
    });

    it('fetches and displays user assignments', async () => {
        const mockAssignments = [
            { task: 'Task 1' },
            { task: 'Task 2' }
        ];

        axios.get.mockResolvedValueOnce({ data: mockAssignments });

        render(<LogHours user={{ username: 'JohnDoe' }} />);

        await waitFor(() => expect(screen.getByText('Task 1')).toBeInTheDocument());
        expect(screen.getByText('Task 2')).toBeInTheDocument();
    });

    it('displays error if fetching assignments fails', async () => {
        axios.get.mockRejectedValueOnce(new Error('API Error'));

        render(<LogHours user={{ username: 'JohnDoe' }} />);

        await waitFor(() => expect(screen.getByText('An error occurred while fetching assignments.')).toBeInTheDocument());
    });
});
