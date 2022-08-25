import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders Home text', () => {
  render(<Home />);
  const title = screen.getAllByText(/this is the home/i);
  expect(title).toBeInTheDocument;
});