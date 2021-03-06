import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { cloneDeep } from 'lodash';
import { Todo } from './Todo';

export interface ITodo {
  name: string;
  complete: boolean;
}

export interface IAppProps {}
export interface IAppState {
  todos: ITodo[];
  todoName: string;
}

class App extends React.Component<IAppProps, IAppState> {
  public state: IAppState = {
    todos: [],
    todoName: '',
  };

  public render() {
    const todos = this.state.todos.map((todo, index) => {
      return (
        <Todo
          key={index}
          todo={todo}
          onClickCheckbox={this.handleCheckboxTodoChange(index)}
          onClickDeleteButton={this.deleteTodo(index)}
        />
      )
    });

    return (
      <div className="app-container">
        <form>
          <div className="form-group">
            <label >Todo Name</label>
            <input value={this.state.todoName} onChange={this.handleTodoChange} className="form-control"/>
          </div>
          <button type="submit" onClick={this.onAddTodoClick} disabled={this.state.todoName === ''} className={'btn btn-primary'}>Add Todo</button>
        </form>
        {todos.length === 0 ? (
          <div className="no-todos-container">
            <p>You have not added any todos</p>
          </div>
        ) : (
          <div className="todos-container">
            <ul className="todos-ul">
              {todos}
            </ul>
          </div>
        )}
      </div>
    );
  }

  public handleTodoChange = (event: any) => {
    const newValue = event.target.value;
    // this.state.todoName = newValue;
    this.setState({
      todoName: newValue,
    });
  }

  public handleCheckboxTodoChange = (index: number) => (event: any) => {
    const newValue = event.target.checked;
    const clonedTodos = cloneDeep(this.state.todos);
    clonedTodos[index].complete = newValue;
    this.setState({
      todos: clonedTodos,
    })
  }

  public deleteTodo = (index: number) => () => {
    const clonedTodos = cloneDeep(this.state.todos);
    clonedTodos.splice(index, 1);
    this.setState({
      todos: clonedTodos,
    })
  }

  public onAddTodoClick = (event: any) => {
    event.preventDefault();

    const updatedTodos = [...this.state.todos, {
      name: this.state.todoName,
      complete: false,
    }];

    this.setState({
      todos: updatedTodos,
      todoName: '',
    });
  }
}

export default App;