"use client";

import Link from "next/link";
import LogoIcon from "@/components/icons/Logo";
import { useGetMeQuery, useLoginMutation } from "@/redux/api/authApi";
import { useState } from "react";
import { Divider, message } from "antd";
import { useRouter } from "next/navigation";
import { useUser } from "@/hook/AuthContext";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const { data, error, refetch } = useGetMeQuery("", {
    skip: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(formValues).unwrap();
      message.success("Đăng nhập thành công");
      refetch();
      router.back();
    } catch (error) {
      message.error("Đăng nhập thất bại");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL as string;
    } catch (error: any) {
      message.error("Google login failed:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto text-center sm:w-full sm:max-w-sm">
        <Link href="/">
          <LogoIcon />
        </Link>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Đăng nhập
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-4 text-gray-900"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formValues.email}
                onChange={handleChange}
                autoComplete="email"
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-4 text-gray-900"
              >
                Mật khẩu
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Quên mật khẩu
                </a>
              </div>
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formValues.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>
        </form>
        <Divider>Hoặc</Divider>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full gap-3 justify-center rounded-md bg-[#eee] px-3 py-1.5 text-sm font-semibold leading-6 text-[#000] shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
        >
          <svg className="h-6 w-6" viewBox="0 0 40 40">
            <path
              d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
              fill="#FFC107"
            />
            <path
              d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
              fill="#FF3D00"
            />
            <path
              d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
              fill="#4CAF50"
            />
            <path
              d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
              fill="#1976D2"
            />
          </svg>
          Đăng nhập bằng Google
        </button>

        <p className="mt-5 text-center text-sm text-gray-500">
          Bạn chưa có tài khoản?
          <Link
            href="/register"
            className="font-semibold leading-6 px-2 text-indigo-600 hover:text-indigo-500"
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
