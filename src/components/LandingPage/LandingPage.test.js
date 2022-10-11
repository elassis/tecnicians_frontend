import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';
import { BrowserRouter } from 'react-router-dom'

test('renders Home text', () => {
  render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
    );
  const title = screen.getAllByText(/this is the landing/i);
  expect(title).toBeInTheDocument;
});