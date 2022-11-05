import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from './Canvas';

describe('<Canvas />', () => {
  test('it should mount', () => {
    render(<Canvas />);
    
    const canvas = screen.getByTestId('Canvas');

    expect(canvas).toBeInTheDocument();
  });
});