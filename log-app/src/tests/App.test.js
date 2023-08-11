import React from 'react';
import { render } from '@testing-library/react';
import App from '../pages/App';

test('app renders without crashing using basic render', () => {
    const { getByText } = render(<App />);
    expect(getByText("Welcome to Log-App")).toBeInTheDocument();
});

test('renders login page link', () => {
    const { getByText } = render(<App />);
    const loginButton = getByText("Log In");
    expect(loginButton).toBeInTheDocument();
});

test('prompts users to log in', () => {
    const { getByText } = render(<App />);
    const prompt = getByText("Log in to access all features");
    expect(prompt).toBeInTheDocument();
});