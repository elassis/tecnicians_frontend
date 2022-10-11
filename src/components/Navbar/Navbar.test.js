import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import {BrowserRouter as Router} from 'react-router-dom'

test(' render Icon test', () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );
  const title = screen.getAllByText(/Icon/i);
  expect(title).toBeInTheDocument;
});