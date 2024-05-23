import React, { useState } from 'react';

export default function todos() {

  const [isShowInput, setIsShowInput] = useState(false)
  const [title, setTitle] = useState('')

  const showInput = () => {
    setIsShowInput(true)
  }

  const addTodo = async (event) => {
    event.preventDefault()
    const newTodo = { title ,isCompleted: false}


    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })

    console.log('res todo =>', res);
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

            <li >
              <span className="mark">
                <input type="checkbox" className="checkbox" />
              </span>
              <div className="list">
                <p>learn js</p>
              </div>
              <span className="delete" >
                delete
              </span>
            </li>

          </ul>
        </div>
      </div>

    </div>
  );
}
