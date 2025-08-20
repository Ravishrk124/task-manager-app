import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateTask } from '../features/taskSlice';
import { getUsersForAssignment } from '../features/userSlice';

function TaskForm({ task, closeModal }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'To Do',
    priority: task?.priority || 'Medium',
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    assignedTo: task?.assignedTo || '',
  });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (user?.role === 'admin') {
      dispatch(getUsersForAssignment());
    }
  }, [dispatch, user]);

  const { title, description, status, priority, dueDate, assignedTo } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onFileChange = (e) => setFiles(e.target.files);

  const onSubmit = (e) => {
    e.preventDefault();
    const taskData = new FormData();
    taskData.append('title', title);
    taskData.append('description', description);
    taskData.append('status', status);
    taskData.append('priority', priority);
    taskData.append('dueDate', dueDate);
    taskData.append('assignedTo', assignedTo || user.id); // Default to self if not assigned

    for (let i = 0; i < files.length; i++) {
        taskData.append('documents', files[i]);
    }
    
    if (task) {
      dispatch(updateTask({ id: task.id, data: formData }));
    } else {
      dispatch(createTask(taskData));
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{task ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={onSubmit}>
          {/* Title and Description */}
          <input name="title" value={title} onChange={onChange} placeholder="Task Title" required className="w-full p-2 mb-4 border rounded" />
          <textarea name="description" value={description} onChange={onChange} placeholder="Task Description" className="w-full p-2 mb-4 border rounded"></textarea>
          
          {/* Status and Priority */}
          <div className="flex gap-4 mb-4">
            <select name="status" value={status} onChange={onChange} className="w-full p-2 border rounded">
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
            <select name="priority" value={priority} onChange={onChange} className="w-full p-2 border rounded">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          
          {/* Due Date */}
          <input type="date" name="dueDate" value={dueDate} onChange={onChange} className="w-full p-2 mb-4 border rounded" />

          {/* User Assignment (Admin only) */}
          {user?.role === 'admin' && (
            <select name="assignedTo" value={assignedTo} onChange={onChange} className="w-full p-2 mb-4 border rounded">
              <option value="">Assign to User...</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.email}</option>
              ))}
            </select>
          )}

          {/* File Upload */}
          <label className="block mb-2 text-sm font-medium">Attach PDFs (up to 3)</label>
          <input type="file" name="documents" onChange={onFileChange} multiple accept=".pdf" className="w-full p-2 mb-4 border rounded" />

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{task ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;