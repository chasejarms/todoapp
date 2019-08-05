import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { cloneDeep } from 'lodash';
import { Todo } from './Todo';

export interface ITodo {
  id: string;
  name: string;
  complete: boolean;
}

export interface IAppProps {}
export interface IAppState {
  todos: ITodo[];
  todoName: string;
  todosThatAreBeingDeleted: {
    [id: string]: boolean;
  };
  loadingTodos: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
  public state: IAppState = {
    todos: [],
    todoName: '',
    todosThatAreBeingDeleted: {},
    loadingTodos: true,
  };

  public async componentWillMount(): Promise<void> {
    console.log('App: WillMount');
    try {
      const todos = await getTodos();
      this.setState({
        todos,
        loadingTodos: false,
      });
    } catch {
      this.setState({
        loadingTodos: false,
      })
    }
  }

  public componentDidMount(): void {
    console.log('App: DidMount');
  }

  public componentWillReceiveProps(): void {
    console.log('App: WillReceiveProps');
  }

  public shouldComponentUpdate(nextProps: IAppProps, nextState: IAppState, nextContext: any): boolean {
    console.log('App: ShouldUpdate');
    return true;
  }

  public componentWillUpdate(): void {
    console.log('App: WillUpdate');
  }

  public componentDidUpdate(): void {
    console.log('App: DidUpdate');
  }

  public componentWillUnmount(): void {
    console.log('App: WillUnmount');
  }

  public render() {
    console.log('App: Render');

    if (this.state.loadingTodos) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    const todos = this.state.todos.map((todo, index) => {
      return (
        <Todo
          key={index}
          todo={todo}
          onClickCheckbox={this.handleCheckboxTodoChange(index)}
          onClickDeleteButton={this.deleteTodo(index)}
          isDeleting={this.state.todosThatAreBeingDeleted[todo.id]}
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
        {/* <div className="delete-all-todos-container">
          <button type="button" onClick={this.deleteAllTodos} disabled={this.state.todos.length < 0} className={'btn btn-danger'}>Delete All Todos</button>
        </div> */}
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
    const clonedTodosThatAreBeingDeleted = cloneDeep(this.state.todosThatAreBeingDeleted);
    const todoId = this.state.todos[index].id;
    clonedTodosThatAreBeingDeleted[todoId] = true;
    clonedTodos.splice(index, 1);

    this.setState({
      todosThatAreBeingDeleted: clonedTodosThatAreBeingDeleted,
      todos: clonedTodos,
    })
  }

  public onAddTodoClick = (event: any) => {
    event.preventDefault();

    const updatedTodos = [...this.state.todos, {
      id: generateUniqueId(),
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

function getTodos(): Promise<ITodo[]> {
  throw new Error();
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve([
  //       {
  //         id: generateUniqueId(),
  //         name: 'Laundry',
  //         complete: false,
  //       },
  //       {
  //         id: generateUniqueId(),
  //         name: 'Groceries',
  //         complete: false,
  //       },
  //       {
  //         id: generateUniqueId(),
  //         name: 'Soccer Practice',
  //         complete: false,
  //       },
  //     ])
  //   }, 3000);
  // });
}

function generateUniqueId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}