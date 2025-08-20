import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../api/apiService';

const initialState = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// ✅ Create new task (with FormData support)
export const createTask = createAsyncThunk('tasks/create', async (taskData, thunkAPI) => {
  try {
    const response = await apiService.post('/tasks', taskData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Unable to create task';
    return thunkAPI.rejectWithValue(message);
  }
});

// ✅ Get all tasks
export const getTasks = createAsyncThunk('tasks/getAll', async (_, thunkAPI) => {
  try {
    const response = await apiService.get('/tasks');
    return response.data.tasks;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Unable to fetch tasks';
    return thunkAPI.rejectWithValue(message);
  }
});

// ✅ Delete task
export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
  try {
    await apiService.delete(`/tasks/${id}`);
    return id;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Unable to delete task';
    return thunkAPI.rejectWithValue(message);
  }
});

// ✅ Update task (new)
export const updateTask = createAsyncThunk('tasks/update', async (taskData, thunkAPI) => {
  try {
    const response = await apiService.put(`/tasks/${taskData.id}`, taskData.data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Unable to update task';
    return thunkAPI.rejectWithValue(message);
  }
});

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // 📌 Create
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 📌 Get all
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 📌 Delete
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 📌 Update
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
