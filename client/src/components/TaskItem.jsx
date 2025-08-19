### src/components/TaskItem.jsx

import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/taskSlice';

function TaskItem({ task }) {
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
          <div className="mt-2 text-sm text-gray-500">
            <span>Status: <span className="font-medium text-black">{task.status}</span></span>
            <span className="ml-4">Priority: <span className="font-medium text-black">{task.priority}</span></span>
          </div>
          <div className="text-sm text-gray-500">
            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
          </div>
          {task.documents && task.documents.length > 0 && (
            <div className="mt-2">
              <h4 className="text-sm font-semibold">Documents:</h4>
              <ul className="list-disc list-inside">
                {task.documents.map((doc, index) => (
                  <li key={index}>
                    <a href={`${API_URL}/tasks/document/${doc}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {doc}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          onClick={() => dispatch(deleteTask(task.id))}
          className="text-red-500 hover:text-red-700 font-bold"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default TaskItem;