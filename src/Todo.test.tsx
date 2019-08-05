import { shallow } from 'enzyme';
import { Todo } from './Todo';
import React from 'react';
import { Api } from './Api';

describe('Todo', () => {
    it('should display the todo name', () => {
        const todoWithName = {
            name: 'Take Out Trash',
        } as any;

        const wrapper = shallow(<Todo
            todo={todoWithName}
            onClickCheckbox={() => null}
            onClickDeleteButton={() => null}
        />)

        const showsName = wrapper.find('p').contains(todoWithName.name);
        expect(showsName).toBe(true);
    });

    it('should trigger the onClickCheckbox when it is clicked', () => {
        const todoWithName = {
            name: 'Take Out Trash',
        } as any;

        const onClickCheckbox = jest.fn();
        const wrapper = shallow(<Todo
            todo={todoWithName}
            onClickCheckbox={onClickCheckbox}
            onClickDeleteButton={() => null}
        />)

        expect(onClickCheckbox.mock.calls.length).toBe(0);
        wrapper.find('.form-check-input').simulate('change');
        expect(onClickCheckbox.mock.calls.length).toBe(1);
    });

    it('should trigger the onClickDeleteButton when the delete button is clicked', () => {
        const todoWithName = {
            name: 'Take Out Trash',
        } as any;

        const onClickDeleteButton = jest.fn();
        const wrapper = shallow(<Todo
            todo={todoWithName}
            onClickCheckbox={() => null}
            onClickDeleteButton={onClickDeleteButton}
        />)

        expect(onClickDeleteButton.mock.calls.length).toBe(0);
        wrapper.find('button').simulate('click');
        expect(onClickDeleteButton.mock.calls.length).toBe(1);
    });

    it('should set the random text based on the api\'s return value', async() => {
        const todoWithName = {
            name: 'Take Out Trash',
        } as any;

        const randomText = 'Here is some text';
        Api.getRandomText = () => Promise.resolve(randomText);
        const wrapper = shallow(<Todo
            todo={todoWithName}
            onClickCheckbox={() => null}
            onClickDeleteButton={() => null}
        />)

        await Promise.resolve();
        const shallowWrapperArray = wrapper.find('p').filterWhere((node) => {
            return node.text() === randomText;
        });
        expect(shallowWrapperArray.length).toBe(1);
    });
});