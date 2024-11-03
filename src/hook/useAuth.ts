import { useRefreshTokenMutation } from "@/redux/api/authApi";
import { logOut, setCredentials } from "@/redux/features/authSlice";
// import { useRefreshTokenMutation } from "./authApi"; // Đảm bảo đường dẫn đúng
import { useDispatch } from "react-redux"; // Để dispatch action
// import { setCredentials, logOut } from "../features/authSlice"; // Đảm bảo đường dẫn đúng

export const useAuth = () => {
  const [refreshToken] = useRefreshTokenMutation();
  const dispatch = useDispatch(); // Sử dụng useDispatch để gọi các action

  const handleRefreshToken = async (currentRefreshToken: any) => {
    if (!currentRefreshToken) return null;

    try {
      const response = await refreshToken({
        refreshToken: currentRefreshToken,
      }).unwrap();
      // Nếu refresh thành công, cập nhật token mới vào Redux store
      if (response.success) {
        dispatch(setCredentials(response.accessToken));
        return response;
      } else {
        // Nếu không thành công, đăng xuất người dùng
        dispatch(logOut());
        return null;
      }
    } catch (error) {
      // Nếu có lỗi trong quá trình làm mới token, đăng xuất
      dispatch(logOut());
      return null;
    }
  };

  return { handleRefreshToken };
};
