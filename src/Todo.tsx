import React from 'react';
import { ITodo } from './App';
import { Api } from './Api';

export interface ITodoProps {
    todo: ITodo;
    onClickCheckbox: (event: any) => void;
    onClickDeleteButton: () => void;
}
export interface ITodoState {
    randomText: string;
}

export class Todo extends React.Component<ITodoProps, ITodoState> {
    public state = {
        randomText: '',
    }

    public async componentWillMount(): Promise<void> {
        const randomText = await Api.getRandomText();
        this.setState({
            randomText,
        })
    }

    public render() {
        const todo = this.props.todo;

        return (
            <div className="todo-container">
                <p>{todo.name}</p>
                <div className="form-group">
                    <input type="checkbox" className="form-check-input" onChange={this.props.onClickCheckbox}/>
                    <label className="form-check-label">Complete</label>
                </div>
                <div className="delete-todo-button-container">
                    <button className="btn btn-danger" onClick={this.props.onClickDeleteButton}>Delete</button>
                </div>
                {this.state.randomText ? (
                    <p>{this.state.randomText}</p>
                ) : undefined}
            </div>
        )
    }
}