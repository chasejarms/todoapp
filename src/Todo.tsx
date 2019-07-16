import React from 'react';
import { ITodo } from './App';

export interface ITodoProps {
    todo: ITodo;
    onClickCheckbox: (event: any) => void;
    onClickDeleteButton: () => void;
}
export interface ITodoState {}

export class Todo extends React.Component<ITodoProps, ITodoState> {
    public render() {
        const todo = this.props.todo;

        return (
            <div className="todo-container">
                <li>{todo.name}</li>
                <div className="form-group">
                    <input type="checkbox" className="form-check-input" onChange={this.props.onClickCheckbox}/>
                    <label className="form-check-label">Complete</label>
                </div>
                <div className="delete-todo-button-container">
                    <button className="btn btn-danger" onClick={this.props.onClickDeleteButton}>Delete</button>
                </div>
            </div>
        )
    }
}