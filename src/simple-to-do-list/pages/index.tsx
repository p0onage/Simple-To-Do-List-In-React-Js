import { useState, useEffect } from 'react'
import useSWR from 'swr'

interface ITodoList {
  itemId: number,
  name: string,
  done: boolean,
  toggleComplete(): Promise<void>
}

const fetcher = (url : string) => fetch(url).then((res) => res.json());

function Todo(createTodo : ITodoList) {
  return (
      <div className="flex items-center">
        <span className={createTodo.done ? 'text-gray-500' : ''}>{createTodo.name}</span>
        <button
          type="button"
          className="mx-4 p-1 rounded bg-purple-400 text-white font-bold"
          onClick={(e) => {
            e.preventDefault()
            createTodo.toggleComplete()
          }}
        >
          {createTodo.done ? 'complete' : 'pending' }
        </button>
      </div>
  )
}

function TodoForm() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState<ITodoList[]>([] as ITodoList[])
  const [disabled, setDisabled] = useState(false)
  let { data, mutate } = useSWR('/api/todolist', fetcher);

  async function populateToDoList() {
    if(data)
    {
      setTodos(data)
    }
  }

  useEffect(() => {
    populateToDoList()
  }, [data, todos])

  async function addTodo(e: any) {
    e.preventDefault()
    setDisabled(true)

    fetch('/api/todolist/insertItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newTodo  }),
    }).then(()=> {
      setNewTodo('')
      mutate();
      setDisabled(false)
    })
  }

  async function toggleComplete(itemId : number, currentValue : ITodoList) {
    
    fetch(`/api/todolist/${itemId}/toggleComplete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(()=>
    {
      setNewTodo('')
      mutate();
      setDisabled(false)
    })
      
  }

  function handleNewTodo(e: any) {
    e.preventDefault()
    setNewTodo(e.target.value)
  }

  return (
    <form className="bg-white shadow-md rounded p-8" onSubmit={addTodo}>
      <ul>
        {todos.map((todo) => (
          <li className="my-4" key={todo.itemId}>
            <Todo
              itemId ={todo.itemId}
              name={todo.name}
              done={todo.done}
              toggleComplete={() => toggleComplete(todo.itemId, todo)}
            />
          </li>
        ))}
      </ul>
      <div className="flex my-4">
        <input
          type="text"
          onChange={handleNewTodo}
          value={newTodo}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button disabled={disabled} className="btn-yellow mx-4" type="submit">
          add
        </button>
      </div>
    </form>
  )
}

export default TodoForm
