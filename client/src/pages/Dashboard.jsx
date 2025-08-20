import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import Spinner from '../components/Spinner';
import { getTasks, reset } from '../features/taskSlice';
import { toast } from 'react-hot-toast';

function Dashboard() {
  const dispatch = useDispatch();
  const { tasks, isLoading, isError, message } = useSelector((state) => state.task);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // You can add state here for filters and sorting
  // const [filters, setFilters] = useState({ status: '', priority: '' });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTasks());
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  if (isLoading && tasks.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-4">
      {isModalOpen && <TaskForm task={editingTask} closeModal={() => setIsModalOpen(false)} />}
      
      <section className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-gray-600">Welcome to your task manager!</p>
        </div>
        <button onClick={handleAddNew} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            + Add New Task
        </button>
      </section>

      {/* Add Filter/Sort UI here later */}

      <section>
        <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} onEdit={handleEdit} />
            ))}
          </div>
        ) : (
          <p>You have not set any tasks yet.</p>
        )}
      </section>
    </div>
  );
}

export default Dashboard;