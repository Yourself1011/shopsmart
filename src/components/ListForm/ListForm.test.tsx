import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListForm from './ListForm';

describe('<ListForm />', () => {
  test('it should mount', () => {
    render(<ListForm />);
    
    const listForm = screen.getByTestId('ListForm');

    expect(listForm).toBeInTheDocument();
  });
});