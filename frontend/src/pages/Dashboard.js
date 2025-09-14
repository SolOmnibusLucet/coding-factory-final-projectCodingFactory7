import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Dashboard.css';
import FontSelector from '../components/FontSelector';


function Dashboard() {
  const [lists, setLists] = useState([]);
  const [font, setFont] = useState('Helvetica Neue');
  const [fontSize, setFontSize] = useState('20px');
  const [editingListId, setEditingListId] = useState(null);
  const [titleEdit, setTitleEdit] = useState('');
  const [categoryEdit, setCategoryEdit] = useState('');
  const [editingTask, setEditingTask] = useState({ listId: null, index: null });
  const [editText, setEditText] = useState('');
  const [newListTitle, setNewListTitle] = useState('');
  const [newListCategory, setNewListCategory] = useState('');
  const [newTaskTexts, setNewTaskTexts] = useState({}); 
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
  }, [token, navigate]);

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: `Bearer ${token}` }
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('token');
        navigate('/');
        toast.error('Session expired. Please login again.');
      }
      return Promise.reject(error);
    }
  );

  const refreshLists = async () => {
    try {
      setLoading(true);
      const response = await api.get('/lists');
      setLists(response.data);
    } catch (error) {
      toast.error('Failed to load lists');
      console.error('Error fetching lists:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshLists();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const addTask = async (listId) => {
    const taskText = newTaskTexts[listId]?.trim();
    if (!taskText) return;

    try {
      await api.post(`/lists/${listId}/tasks`, { text: taskText });
      setNewTaskTexts({ ...newTaskTexts, [listId]: '' });
      refreshLists();
      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Failed to add task');
      console.error('Error adding task:', error);
    }
  };

  const toggleTaskCompletion = async (listId, taskIndex) => {
    try {
      await api.put(`/lists/${listId}/tasks/${taskIndex}/toggle`);
      refreshLists();
    } catch (error) {
      toast.error('Failed to toggle task');
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (listId, taskIndex) => {
    try {
      await api.delete(`/lists/${listId}/tasks/${taskIndex}`);
      refreshLists();
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  const startEditing = (listId, index, text) => {
    setEditingTask({ listId, index });
    setEditText(text);
  };

  const saveTaskEdit = async (listId, index) => {
    if (!editText.trim()) return;

    try {
      await api.put(`/lists/${listId}/tasks/${index}`, { newText: editText });
      setEditingTask({ listId: null, index: null });
      refreshLists();
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
      console.error('Error updating task:', error);
    }
  };

  const cancelTaskEdit = () => {
    setEditingTask({ listId: null, index: null });
    setEditText('');
  };

  const createList = async (e) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;

    try {
      await api.post('/lists', {
        title: newListTitle,
        category: newListCategory
      });
      setNewListTitle('');
      setNewListCategory('');
      refreshLists();
      toast.success('List created successfully');
    } catch (error) {
      toast.error('Failed to create list');
      console.error('Error creating list:', error);
    }
  };

  const startListEditing = (list) => {
    setEditingListId(list._id);
    setTitleEdit(list.title);
    setCategoryEdit(list.category);
  };

  const saveListEdit = async (listId) => {
    if (!titleEdit.trim()) return;

    try {
      await api.put(`/lists/${listId}`, { 
        title: titleEdit, 
        category: categoryEdit 
      });
      setEditingListId(null);
      refreshLists();
      toast.success('List updated successfully');
    } catch (error) {
      toast.error('Failed to update list');
      console.error('Error updating list:', error);
    }
  };

  const cancelListEdit = () => {
    setEditingListId(null);
    setTitleEdit('');
    setCategoryEdit('');
  };

  const deleteList = async (listId) => {
    if (!window.confirm('Are you sure you want to delete this list? This action cannot be undone.')) {
      return;
    }

    try {
      await api.delete(`/lists/${listId}`);
      refreshLists();
      toast.success('List deleted successfully');
    } catch (error) {
      toast.error('Failed to delete list');
      console.error('Error deleting list:', error);
    }
  };

  const handleNewTaskTextChange = (listId, text) => {
    setNewTaskTexts({ ...newTaskTexts, [listId]: text });
  };

  const handleKeyPress = (e, action, ...args) => {
    if (e.key === 'Enter') {
      action(...args);
    } else if (e.key === 'Escape') {
      if (action === saveTaskEdit) {
        cancelTaskEdit();
      } else if (action === saveListEdit) {
        cancelListEdit();
      }
    }
  };

  if (loading && lists.length === 0) {
    return (
      <div className="dashboard" style={{ fontFamily: font, fontSize }}>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard" style={{ fontFamily: font, fontSize }}>
      <div className="header">
        <h1 className="title">Simplified</h1>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
      
      <FontSelector
        font={font}
        setFont={setFont}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      <form onSubmit={createList} className="create-list-form">
        <input
          type="text"
          placeholder="New list title"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category (optional)"
          value={newListCategory}
          onChange={(e) => setNewListCategory(e.target.value)}
        />
        <button type="submit" disabled={!newListTitle.trim()}>
          Create List
        </button>
      </form>

      {lists.length === 0 ? (
        <div className="empty-state">
          <p>No lists yet. Create your first list above!</p>
        </div>
      ) : (
        lists.map(list => (
          <div key={list._id} className="list">
            <div className="list-header">
              {editingListId === list._id ? (
                <div className="edit-list">
                  <input
                    value={titleEdit}
                    onChange={(e) => setTitleEdit(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, saveListEdit, list._id)}
                    autoFocus
                    placeholder="List title"
                  />
                  <input
                    value={categoryEdit}
                    onChange={(e) => setCategoryEdit(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, saveListEdit, list._id)}
                    placeholder="Category"
                  />
                  <div className="edit-buttons">
                    <button onClick={() => saveListEdit(list._id)}>Save</button>
                    <button onClick={cancelListEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="list-info">
                  <h2 onDoubleClick={() => startListEditing(list)}>
                    {list.title}
                  </h2>
                  {list.category && (
                    <p onDoubleClick={() => startListEditing(list)}>
                      {list.category}
                    </p>
                  )}
                </div>
              )}
              
              <div className="list-actions">
                <button 
                  onClick={() => startListEditing(list)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteList(list._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Add new task form */}
            <div className="add-task-form">
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTaskTexts[list._id] || ''}
                onChange={(e) => handleNewTaskTextChange(list._id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addTask(list._id);
                  }
                }}
              />
              <button 
                onClick={() => addTask(list._id)}
                disabled={!newTaskTexts[list._id]?.trim()}
              >
                Add Task
              </button>
            </div>

            {/* Tasks list */}
            <ul className="tasks-list">
              {list.tasks.length === 0 ? (
                <li className="empty-tasks">No tasks yet. Add one above!</li>
              ) : (
                list.tasks.map((task, i) => (
                  <li key={i} className="task-item">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(list._id, i)}
                    />
                    
                    {editingTask.listId === list._id && editingTask.index === i ? (
                      <div className="edit-task">
                        <input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => handleKeyPress(e, saveTaskEdit, list._id, i)}
                          autoFocus
                        />
                        <div className="task-buttons">
                          <button onClick={() => saveTaskEdit(list._id, i)}>Save</button>
                          <button onClick={cancelTaskEdit}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="task-content">
                        <span
                          onDoubleClick={() => startEditing(list._id, i, task.text)}
                          className={task.completed ? 'completed-task' : ''}
                        >
                          {task.text}
                        </span>
                        <div className="task-actions">
                          <button 
                            onClick={() => startEditing(list._id, i, task.text)}
                            className="edit-task-btn"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteTask(list._id, i)}
                            className="delete-task-btn"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        ))
      )}
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Dashboard;

