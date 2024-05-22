import React, { useState } from 'react';

export default function todos() {

  const [isShowInput, setIsShowInput] =useState(false)

  const showInput = ()=>{
    setIsShowInput(true)
  }

  return (
    <div className='todo-container'>
      <div className={isShowInput ? 'todo-form-show':'todo-form'}>
        <form>
          <input type="text" placeholder='enter todo...' />
          <button>ADD</button>
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
