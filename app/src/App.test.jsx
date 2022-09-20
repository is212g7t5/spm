import { render, screen } from '@testing-library/react';
import Navbar from './components/Navbar';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('navbar', () => {
  render(<Navbar />);
  const title = screen.getByText(/LJPS/i);
  expect(title).toBeInTheDocument();
})
