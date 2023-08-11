import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GreetingsPage from '../pages/GreetingsPage';
import { MemoryRouter } from 'react-router-dom';

describe('<GreetingsPage />', () => {
    it('renders user name correctly', () => {
        render(
            <MemoryRouter>
                <GreetingsPage user={{ realName: 'John Doe' }} />
            </MemoryRouter>
        );

        expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();
    });

    it('always renders "Activities" and "Log hours" buttons', () => {
        render(
            <MemoryRouter>
                <GreetingsPage user={{ realName: 'John Doe' }} />
            </MemoryRouter>
        );

        expect(screen.getByText('Activities')).toBeInTheDocument();
        expect(screen.getByText('Log hours')).toBeInTheDocument();
    });

    it('renders admin buttons if user is an admin', () => {
        render(
            <MemoryRouter>
                <GreetingsPage user={{ realName: 'Admin Jane', isAdmin: true }} />
            </MemoryRouter>
        );

        expect(screen.getByText('Manage Activities')).toBeInTheDocument();
        expect(screen.getByText('Manage Hours')).toBeInTheDocument();
    });

    it('does not render admin buttons for non-admin users', () => {
        render(
            <MemoryRouter>
                <GreetingsPage user={{ realName: 'John Doe', isAdmin: false }} />
            </MemoryRouter>
        );

        expect(screen.queryByText('Manage Activities')).toBeNull();
        expect(screen.queryByText('Manage Hours')).toBeNull();
    });
});