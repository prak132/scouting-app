import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Send Data button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/send data/i);
  expect(buttonElement).toBeInTheDocument();
});
