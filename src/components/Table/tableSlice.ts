import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addUser, deleteUser, editUser, fetchUsers } from '../../api/usersServices';
import { RootState } from '../../app/store';
import { IUser, TableState } from '../TableRow/types';

export const getUsers = createAsyncThunk(
  'table/getUsers',
  async () => {
    const users = await fetchUsers();

    return users;
  }
);

export const addUserThunk = createAsyncThunk(
  'table/addUser',
  async (params: IUser, thunkAPI) => {
    await addUser(params);
    thunkAPI.dispatch(getUsers());
  }
);

export const deleteUserThunk = createAsyncThunk(
  'table/deleteUser',
  async (id: string, thunkAPI) => {
    await deleteUser(id);
    thunkAPI.dispatch(getUsers());
  }
);

export const editUserThunk = createAsyncThunk(
  'table/editUser',
  async (params: IUser, thunkAPI) => {
    await editUser(params);
    thunkAPI.dispatch(getUsers());
  }
);

const initialState: TableState = {
    users: [],
    isLoading: false,
    error: '',
  };

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(addUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addUserThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(deleteUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const selectTableState = (state: RootState) => state.table;

export default tableSlice.reducer;
