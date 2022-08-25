import { render, screen } from '@testing-library/react';
import SignUp from './SignUp';

test('renders sign up text', () => {
  render(<SignUp />);
  const title = screen.getByText(/sign up/i);
  expect(title).toBeInTheDocument;
});