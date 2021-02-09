import { getByTestId, render, screen } from '@testing-library/react';
import Board from './Board';

test('renders board', () => {
  render(<Board />);
  expect(getByTestId(document.documentElement, 'canvas-element')).toBeInTheDocument();
}); 