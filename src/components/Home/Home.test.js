import { render, screen } from '@testing-library/react';
import Home from './Home';
import {BrowserRouter as Router} from 'react-router-dom'

test('renders Home text', () => {
  render(
    <Router>
      <Home />
    </Router>
  );
  const title = screen.getAllByText(/this is the home/i);
  expect(title).toBeInTheDocument;
});