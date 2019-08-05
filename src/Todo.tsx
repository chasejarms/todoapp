import React from 'react';
import { ITodo } from './App';

export interface ITodoProps {
    todo: ITodo;
    onClickCheckbox: (event: any) => void;
    onClickDeleteButton: () => void;
    isDeleting?: boolean;
}
export interface ITodoState {}

export class Todo extends React.Component<ITodoProps, ITodoState> {
    public componentWillMount(): void {
        console.log('Todo: WillMount');
    }

    public componentDidMount(): void {
        console.log('Todo: DidMount');
    }

    public componentWillReceiveProps(): void {
        console.log('Todo: WillReceiveProps');
    }

    public shouldComponentUpdate(nextProps: ITodoProps, nextState: ITodoState, nextContext: any): boolean {
        console.log('Todo: ShouldUpdate');
        return true;
    }

    public componentWillUpdate(): void {
        console.log('Todo: WillUpdate');
    }

    public componentDidUpdate(): void {
        console.log('Todo: DidUpdate');
    }

    public componentWillUnmount(): void {
        console.log('Todo: WillUnmount');
    }

    public render() {
        console.log('Todo: Render');
        const todo = this.props.todo;

        return (
            <div className="todo-container">
                <li>{todo.name}</li>
                <div className="form-group">
                    <input type="checkbox" className="form-check-input" onChange={this.props.onClickCheckbox}/>
                    <label className="form-check-label">Complete</label>
                </div>
                <div className="delete-todo-button-container">
                    <button className="btn btn-danger" onClick={this.props.onClickDeleteButton} disabled={this.props.isDeleting}>Delete</button>
                </div>
            </div>
        )
    }
}