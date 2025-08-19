

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import Spinner from '../components/Spinner';
import { getTasks, reset } from '../features/taskSlice';
import { toast } from 'react-hot-toast';

function Dashboard() {
  const dispatch = useDispatch();
  const { tasks, isLoading, isError, message } = useSelector((state) => state.task);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTasks());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <section>
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <p className="text-gray-600">Welcome to your task manager!</p>
      </section>

      <div className="mt-8">
        <TaskForm />

        <section>
          <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
          {tasks.length > 0 ? (
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <p>You have not set any tasks yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;