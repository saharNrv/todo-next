import todoModel from '@/models/Todo';
import userModel from '@/models/User';
import { veryfireToken } from '@/utils/auth';
import React, { useState } from 'react';

export default function todos({ user, todos }) {

  const [isShowInput, setIsShowInput] = useState(false)
  const [allTodos, setAllTodos] = useState([...todos])
  const [title, setTitle] = useState('')

  const showInput = () => {
    setIsShowInput(true)
  }

  const getTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();

    setAllTodos(data);
  };



  const addTodo = async (event) => {
    event.preventDefault()
    const newTodo = { title, isCompleted: false }


    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })

    if(res.status ===201 ){
      alert("Todo Added Successfully :))");
      getTodos()
    }
  }


  return (
    <div className='todo-container'>
      <div className={isShowInput ? 'todo-form-show' : 'todo-form'}>
        <form>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='enter todo...' />
          <button onClick={addTodo}>ADD</button>
        </form>
      </div>

      <div className='head'>
        <div>
          <h2>sahar</h2>
        </div>
        <div className='btn-wrap'>
          <span onClick={showInput}>+</span>
          <button>LogOut</button>
        </div>
      </div>


      <div className="pad">
        <div id="todo">
          <ul id="tasksContainer">
            {
              allTodos.map(todo=>(
                <li >
                <span className="mark">
                  <input type="checkbox" className="checkbox" />
                </span>
                <div className="list">
                  <p>{todo.title}</p>
                </div>
                <span className="delete" >
                  delete
                </span>
              </li>
              ))
            }

           

          </ul>
        </div>
      </div>

    </div>
  );
}


export async function getServerSideProps(context) {

  const { token } = context.req.cookies

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
      },
    }
  }
  const tokenPayload = veryfireToken(token)
  if (!tokenPayload) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }
  const user = await userModel.findOne(
    {
      email: tokenPayload.email,
    },
    "firstname lastname"
  );

  const todos = await todoModel.find({
    user: user._id,
  });
  return {
    props: {
      user:JSON.parse(JSON.stringify(user)),
      todos:JSON.parse(JSON.stringify(todos)),
      

    }
  }

}