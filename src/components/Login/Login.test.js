import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

test('renders login text', () => {
  render(
    <BrowserRouter>
    <Login />
    </BrowserRouter>
  );
  const title = screen.getAllByText(/Login/i);
  expect(title).toBeTruthy;
});