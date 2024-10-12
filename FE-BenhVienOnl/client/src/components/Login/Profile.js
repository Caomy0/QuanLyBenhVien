import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateProfile } from "../../Redux/User/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Gọi API để lấy thông tin người dùng khi có token
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile()); // Gọi API để lấy thông tin người dùng khi có token
    }
  }, [dispatch, token]);

  // Cập nhật state với thông tin người dùng khi dữ liệu được lấy
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updatedData = { name, email, phone };

    // Gọi API để cập nhật thông tin người dùng và cập nhật state ngay sau khi thành công
    dispatch(updateProfile(updatedData))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          // Cập nhật trực tiếp vào state Redux sau khi cập nhật thành công
          alert("Thông tin đã được cập nhật thành công!");
          dispatch(fetchUserProfile()); // Tải lại thông tin người dùng để đảm bảo dữ liệu mới nhất
        } else {
          alert("Cập nhật thông tin thất bại. Vui lòng thử lại.");
        }
      })
      .catch((error) => {
        console.error("Cập nhật thất bại", error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Thông tin cá nhân
        </h2>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div>
            <label className="block mb-2">Họ và tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block mb-2">Số điện thoại</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300"
          >
            Cập nhật thông tin
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
