import { render, screen } from '@testing-library/react';
import App from './App';

test('renders something on screen', () => {
  render(<App />);
  const itRenders = screen.getByText('Wall Length');
  expect(itRenders).toBeInTheDocument();
});
