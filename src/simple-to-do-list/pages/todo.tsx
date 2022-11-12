import { IntervalHistogram } from 'perf_hooks'
import { useState, useEffect } from 'react'
import internal from 'stream'

interface ITodoList {
  itemId: number,
  name: string,
  done: boolean,
  toggleComplete(): Promise<void>,
  deleteTodo(): Promise<void>
}

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
          {createTodo.done ? 'not done' : 'done'}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            createTodo.deleteTodo()
          }}
          className=" p-1 bg-red-500 text-white rounded font-bold"
        >
          delete
        </button>
      </div>
  )
}

function TodoForm() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState<ITodoList[]>([])
  const [disabled, setDisabled] = useState(false)
  
  useEffect(() => {
    async function populateToDoList() {
        fetch('/api/todolist')
        .then((res) => res.json())
        .then((data) => {
          setTodos(data)
        })
    }
    populateToDoList()
  }, [])

  async function addTodo(e: any) {
    e.preventDefault()
    setDisabled(true)

    fetch('/api/todolist/insertItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newTodo, done: false }),
    })
    setNewTodo('')
    setDisabled(false)
  }

  async function toggleComplete(itemId : number, currentValue : ITodoList) {
    
    fetch(`/api/todolist/${itemId}/toggleComplete/${!currentValue.done}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...currentValue, done: !currentValue.done })
    })
      
  }

  function handleNewTodo(e: any) {
    e.preventDefault()
    setNewTodo(e.target.value)
  }


  async function deleteTodo(itemId: number) {
    setDisabled(true)

    fetch(`/api/todolist/insertItem/${itemId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      setNewTodo('')
      setDisabled(false)

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
              deleteTodo={() => deleteTodo(todo.itemId)}
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
