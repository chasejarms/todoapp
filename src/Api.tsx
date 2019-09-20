import { ITodo } from "./App";

class Api {
    getTodos(): Promise<ITodo[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const todos: ITodo[] = [
                    {
                        name: 'Do Laundry',
                        complete: true,
                    },
                    {
                        name: 'Walk Dog',
                        complete: false,
                    },
                    {
                        name: 'Wash Car',
                        complete: false,
                    }
                ]
                resolve(todos);
            }, 3000);
        })
    }

    updateTodos(todos: ITodo[]) {
        console.log('The todos are being updated');
    }
}

export const api = new Api();