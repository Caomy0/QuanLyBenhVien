import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thiết lập base URL cho API
const api = axios.create({
  baseURL: "http://localhost:5000/api/users", // Địa chỉ của backend
});

// Tạo async thunk cho các thao tác gọi API
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", { email, password });
      console.log("Login response:", response.data); // Kiểm tra dữ liệu trả về từ API
      // Lưu token vào localStorage
      return response.data; // Trả về dữ liệu
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "An error occurred"); // Ném lỗi nếu có
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/register", userData);
      return response.data; // Trả về dữ liệu
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "An error occurred"); // Ném lỗi nếu có
    }
  }
);

export const createDoctor = createAsyncThunk(
  "user/createDoctor",
  async (doctorData, { rejectWithValue, getState }) => {
    const state = getState();
    const token = state.user?.user?.token; // Lấy token từ Redux state

    if (!token) return rejectWithValue("No token available"); // Xác thực token

    try {
      // Gọi API để tạo bác sĩ mới
      const response = await api.post("/doctors", doctorData, {
        headers: {
          Authorization: `Bearer ${token}`, // Sử dụng token để xác thực admin
        },
      });
      return response.data; // Trả về dữ liệu nếu thành công
    } catch (error) {
      // Trả về thông báo lỗi từ backend nếu có
      return rejectWithValue(error.response?.data?.msg || "An error occurred");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();

    const token = state.user?.user?.token;

    if (!token) return rejectWithValue("No token available");

    try {
      const response = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Sử dụng token từ Redux
        },
      });
      console.log("Profile response: ", response.data); // Log phản hồi từ server
      return response.data;
    } catch (error) {
      console.error("Fetch user profile error: ", error.response || error); // Log lỗi
      return rejectWithValue(error.response?.data?.msg || "An error occurred");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/update-profile",
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();
    const token = state.user?.user?.token; // Lấy token từ Redux state

    if (!token) return rejectWithValue("No token available");

    try {
      const response = await api.put("/update-profile", userData, {
        headers: {
          Authorization: `Bearer ${token}`, // Sử dụng token từ Redux state
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "An error occurred");
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "user/users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users"); // Gọi API /api/users để lấy tất cả người dùng
      return response.data; // Trả về dữ liệu
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "An error occurred");
    }
  }
);
// Tạo async thunk cho tìm kiếm người dùng
export const searchUsers = createAsyncThunk(
  "user/searchUsers",
  async ({ name, email, role, phone, address }, { rejectWithValue }) => {
    try {
      // Lọc các giá trị không undefined hoặc null trước khi tạo query string
      const params = new URLSearchParams();

      if (name) params.append("name", name);
      if (email) params.append("email", email);
      if (role) params.append("role", role);
      if (phone) params.append("phone", phone);
      if (address) params.append("address", address);

      const query = params.toString();

      const response = await api.get(`/search?${query}`); // Gọi API /api/users/search với query string đã lọc
      return response.data; // Trả về dữ liệu
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "An error occurred");
    }
  }
);

export const fetchDoctors = createAsyncThunk(
  "user/fetchDoctors",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const token = state.user?.user.token; // Get the token from state

    if (!token) return rejectWithValue("No token available");

    try {
      const response = await api.get("/doctors", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      });
      return response.data; // Return the list of doctors
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "An error occurred");
    }
  }
);
export const deleteDoctor = createAsyncThunk(
  "user/deleteDoctor",
  async (doctorId, { rejectWithValue, getState }) => {
    const state = getState();
    const token = state.user?.token; // Get the token from state

    if (!token) return rejectWithValue("No token available");

    try {
      const response = await api.delete(`/users/doctors/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      });
      return response.data; // Return success message
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "An error occurred");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    users: [], // Thêm mảng để lưu tất cả người dùng
    error: null,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        state.error = null;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true; // Đang tải dữ liệu
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload; // Lưu danh sách người dùng vào state
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.doctor = action.payload; // Lưu thông tin bác sĩ sau khi thêm thành công
        state.loading = false;
        state.error = null;
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Thêm trường hợp cho tìm kiếm người dùng
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.users = action.payload; // Cập nhật danh sách người dùng sau khi tìm kiếm
        state.loading = false;
        state.error = null;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter(
          (doctor) => doctor._id !== action.meta.arg // Remove deleted doctor from the list
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, logout, setUser } = userSlice.actions;
export default userSlice.reducer;
