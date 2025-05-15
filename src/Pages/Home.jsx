import React, { useState } from 'react';
import { FaClipboardList, FaSpinner, FaCheckCircle, FaTrash } from 'react-icons/fa'; // icons

function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] });

  const handleInputChange = (e) => setTask(e.target.value);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prev) => ({
        ...prev,
        todo: [...prev.todo, task],
      }));
      setTask('');
    }
  };

  const moveTask = (from, to, taskName) => {
    setTasks((prev) => {
      const updatedFrom = prev[from].filter((t) => t !== taskName);
      const updatedTo = [...prev[to], taskName];
      return { ...prev, [from]: updatedFrom, [to]: updatedTo };
    });
  };

  const deleteTask = (category, taskName) => {
    setTasks((prev) => ({
      ...prev,
      [category]: prev[category].filter((t) => t !== taskName),
    }));
  };

  const clearAll = (category) => {
    setTasks((prev) => ({
      ...prev,
      [category]: [],
    }));
  };

  return (
    <div className="app" style={{ background: 'linear-gradient(to right, #a18cd1, #fbc2eb)', minHeight: '100vh' }}>
      <div className="home" style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: '2rem' }}>
          TaskBuddy
        </h1>

        {/* Input Form */}
        <form
          className="task-form"
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <input
            type="text"
            placeholder="What's on your mind today?"
            className="task-input"
            value={task}
            onChange={handleInputChange}
            style={{
              width: '60%',
              padding: '10px',
              marginRight: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <button
            type="submit"
            className="add-task-button"
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: '#6a11cb',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            + Add Task
          </button>
        </form>

        {/* Task Sections */}
        <div className="task-sections" style={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
          {/* To-Do */}
          <div className="task-section" style={{ backgroundColor: '#d0e8ff', borderRadius: '8px', padding: '10px', width: '30%' }}>
            <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span><FaClipboardList style={{ marginRight: '8px' }} /> To Do Task</span>
              <button onClick={() => clearAll('todo')} style={{ fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}>
                Clear All
              </button>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {tasks.todo.length === 0 ? (
                <p>No tasks yet</p>
              ) : (
                tasks.todo.map((t, i) => (
                  <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    {t}
                    <div>
                      <button onClick={() => moveTask('todo', 'ongoing', t) } title='Ongoing'>➡️</button>
                      <button onClick={() => moveTask('todo', 'completed', t)} title='Completed'>✅</button>
                      <button onClick={() => deleteTask('todo', t)} title="Delete Task" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Ongoing */}
          <div className="task-section" style={{ backgroundColor: '#fff3c4', borderRadius: '8px', padding: '10px', width: '30%' }}>
            <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span><FaSpinner style={{ marginRight: '8px' }} /> Ongoing Task</span>
              <button onClick={() => clearAll('ongoing')} style={{ fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}>
                Clear All
              </button>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {tasks.ongoing.length === 0 ? (
                <p>No tasks yet</p>
              ) : (
                tasks.ongoing.map((t, i) => (
                  <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    {t}
                    <div>
                      <button onClick={() => moveTask('ongoing', 'todo', t)} title='To-do task'>↩️</button>
                      <button onClick={() => moveTask('ongoing', 'completed', t)} title='Completed'>✅</button>
                      <button onClick={() => deleteTask('ongoing', t)} title="Delete Task" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Completed */}
          <div className="task-section" style={{ backgroundColor: '#d0f5d8', borderRadius: '8px', padding: '10px', width: '30%' }}>
            <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span><FaCheckCircle style={{ marginRight: '8px' }} /> Completed Task</span>
              <button onClick={() => clearAll('completed')} style={{ fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}>
                Clear All
              </button>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {tasks.completed.length === 0 ? (
                <p>No tasks yet</p>
              ) : (
                tasks.completed.map((t, i) => (
                  <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    {t}
                    <div>
                      <button onClick={() => moveTask('completed', 'todo', t)} title='To-do task'>↩️</button>
                      <button onClick={() => moveTask('completed', 'ongoing', t)} title='Ongoing'>➡️</button>
                      <button onClick={() => deleteTask('completed', t)} title="Delete Task" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
