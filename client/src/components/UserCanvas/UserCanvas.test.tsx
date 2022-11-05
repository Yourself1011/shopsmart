import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserCanvas from './UserCanvas';

describe('<UserCanvas />', () => {
  test('it should mount', () => {
    render(<UserCanvas />);
    
    const userCanvas = screen.getByTestId('UserCanvas');

    expect(userCanvas).toBeInTheDocument();
  });
});