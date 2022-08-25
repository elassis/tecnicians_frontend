import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders login text', () => {
  render(<Login />);
  const title = screen.getAllByText(/Login/i);
  expect(title).toBeTruthy;
});