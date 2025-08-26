import React, {useState, useEffect} from 'react';
import './App.css';

import {
  Container, Typography, Box, TextField, Button, List, ListItem,
  ListItemText, IconButton, Checkbox, Collapse, Modal
} from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import ReactConfetti from 'react-confetti';

// --- ▼▼▼ アイコン ▼▼▼ ---
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const[showCelebration, setShowCelebration] = useState(false);

  const apiUrl = 'http://localhost:8000/api/todos/'


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
    fetchTodos();
  }, [apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim())
      return;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodoTitle,
          description: '',
          completed: false,
        }),
        
      });

      if (!response.ok) {
        throw new Error('Failed to add todo')
      }

      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
    } catch(error){
      console.error('Error adding todo:', error);
    }
  }

  const handleDelete = async (todo) => {
    try {
      const response = await fetch(todo.url,{
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo')
      }

      setTodos(todos.filter(item => item.id !== todo.id))
    }catch(error){
      console.error('Error deleting todo:', error)
    }
  }

  const handleToggleComplete = async (todo) => {
    try {
      const response = await fetch(todo.url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        })
      })
      if (!response.ok) {
        throw new Error('Failed to update todo')
      }
      const updatedTodo = await response.json();
      setTodos(todos.map(item => (item.id === updatedTodo.id ? updatedTodo : item)))

      if (updatedTodo.completed) {
        setShowCelebration(true);
      }
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const handleEditStart = (todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  }

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingTitle('');
  }

  const handleEditSave = async (todo) => {
    try {
      const response = await fetch(todo.url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editingTitle
        })
      })
      if (!response.ok) {
        throw new Error('Failed to update todo title')
      }

      const updatedTodo = await response.json();
      setTodos(todos.map(item => (item.id === updatedTodo.id ? updatedTodo : item)))
      handleEditCancel();

    } catch (error) {
      console.error('Error saving todo:', error)
    }
  }



  return (
    <div className='App'>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
          placeholder='Enter a new todo'
        />
        <button type='submit'>Add Todo</button>
      </form>
      <ul>
        {todos.length > 0 ? (
          todos.map(todo => (
            <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {editingId === todo.id ? (
                <>
                  <input
                    type='text'
                    value={editingTitle}
                    onChange={e => setEditingTitle(e.target.value)}
                  />
                  <button onClick={() => handleEditSave(todo)}>Save</button>
                  <button onClick={handleEditCancel}>Cancel</button>
                </>
              ):(
                <>
                  <input
                    type='checkbox'
                    checked = {todo.completed}
                    onChange={() => handleToggleComplete(todo)}
                  />

                  {todo.title}
                  <button onClick={() => handleEditStart(todo)} style={{ marginLeft: '10px'}}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(todo)} style={{ marginLeft: '10px' }}>
                    Delete
                  </button>
                </>

              )}
            </li>
          ))
        ) : (
          <p>No todos found. Make sure the backend server is running and has data.</p>
        )}
      </ul>

      <Container maxWidth="md" sx = {{ mt: 4}}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo List
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx = {{display: 'flex', gap: 2, mb: 4}}>
          <TextField
            label = 'Enter a new todo'
            variant = 'outlined'
            fulWidth
            value = {newTodoTitle}
            onChange = {(e) => setNewTodoTitle(e.target.value)}
          />
          <Button type='submit' variant='contained' size='large'>Add</Button>
        </Box>
        <List>
          <TransitionGroup>
            {todos.map(todo => (
              <Collapse key = {todo.id}>
                <ListItem
                divider
                secondaryAction = {
                  editingId === todo.id ? (
                    <>
                      <IconButton edge = 'end' aria-label='save' onClick={() => handleEditSave(todo)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton edge = 'end' aria-label='cancel' onClick={handleEditCancel}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton edge = 'end' aria-label='edit' onClick={() => handleEditStart(todo)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge = 'end' aria-label='delete' onClick={() => handleDelete(todo)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )
                }
                >
                  <Checkbox
                    edge = 'start'
                    checked = {todo.completed}
                    onChange={() => handleToggleComplete(todo)}
                    tabIndex={-1}
                    disableRipple
                  />
                  {editingId === todo.id ? (
                    <TextField 
                      variant='standard'
                      fulWidth
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <ListItemText
                      primary={todo.title}
                      sx={{ textDecoration: todo.completed ? 'line-through' : 'none'}}
                    />
                  )
                  }

                </ListItem>
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Container>

      <Modal
        open = {showCelebration}
        onClose = {() => setShowCelebration(false)}
        aria-labelledby = 'celebration-modal-title'
      >
        <>
          <ReactConfetti
            recycle = {false}
            numberOfPieces={400}
            onConfettiComplete={() => setShowCelebration(false)}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'white'
            }}
          >
            <Typography variant='h2' component='h2' id='celebration-modal-title' sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 4px #000000' 
              }}
            >
              Task Complete!
            </Typography>
            <Typography sx={{ mt: 2, textShadow: '1px 1px 2px #000000' }}>
              Great Job!
            </Typography>

          </Box>
        </>
      </Modal>

    </div>

  );
}

export default App;
