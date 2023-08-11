import React from 'react';
import { render } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import { MemoryRouter } from 'react-router-dom';

test('login page renders without crashing', () => {
    render(
        <MemoryRouter>
            <LoginPage />
        </MemoryRouter>
    );
});

test('renders login title', () => {
    const { getByRole } = render(
        <MemoryRouter>
            <LoginPage />
        </MemoryRouter>
    );
    const loginHeading = getByRole('heading', { name: /login/i, level: 2 });
    expect(loginHeading).toBeInTheDocument();
});

test('renders login button', () => {
    const { getByRole } = render(
        <MemoryRouter>
            <LoginPage />
        </MemoryRouter>
    );
    const loginButton = getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
});

