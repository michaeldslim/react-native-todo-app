/*
 Copyright (C) 2025 Michael Lim - React Native Todo App 
 This software is free to use, modify, and share under 
 the terms of the GNU General Public License v3.
*/
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TodoDetail from '../TodoDetail';
import * as firebaseService from '../../service/firebaseService';

jest.mock('../../service/firebaseService', () => ({
  updateTodo: jest.fn().mockResolvedValue(undefined),
  deleteTodo: jest.fn().mockResolvedValue(undefined),
  toggleStatus: jest.fn().mockResolvedValue(undefined),
}));

const createProps = () => {
  return {
    route: {
      params: {
        todoItem: {
          id: '1',
          todo: 'Test todo',
          completed: false,
        },
      },
    },
    navigation: {
      goBack: jest.fn(),
    },
  } as any;
};

describe('TodoDetail screen', () => {
  it('renders input and action buttons', () => {
    const props = createProps();
    const { getByPlaceholderText, getByText } = render(
      <TodoDetail {...props} />,
    );

    expect(getByPlaceholderText('Edit Carrot note Title')).toBeTruthy();
    expect(getByText('Update Carrot note')).toBeTruthy();
    expect(getByText('Delete Carrot note')).toBeTruthy();
    expect(getByText('Mark as Complete')).toBeTruthy();
  });

  it('calls updateTodo and navigates back when Update Carrot note is pressed', async () => {
    const props = createProps();
    const { getByText, getByPlaceholderText } = render(
      <TodoDetail {...props} />,
    );

    const input = getByPlaceholderText('Edit Carrot note Title');
    const updatedText = 'Updated Carrot note';

    fireEvent.changeText(input, updatedText);

    const updateButton = getByText('Update Carrot note');
    fireEvent.press(updateButton);

    await waitFor(() => {
      expect(firebaseService.updateTodo).toHaveBeenCalledWith('1', updatedText);
      expect(props.navigation.goBack).toHaveBeenCalled();
    });
  });
});
