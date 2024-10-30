import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/signup`,
        formData
      );

      if (response.status === 201) {
        toast.success("Felicitaciones! Tu usuario ha sido creado!");
        setTimeout(() => navigate("/"), 3000);
      }
    } catch (error) {
      const err = error as AxiosError;
      const errorMessage =
        err.response?.data?.message === "Email is not available"
          ? "Este email ya ha sido utilizado"
          : "Ha habido un error, intente nuevamente";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" expand={true} richColors />

      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-2xl font-bold text-black">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email and password below to create an account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-px">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              onChange={handleInputChange}
              value={formData.email}
              required
              className="appearance-none rounded-xl relative block w-full mb-2 px-3 py-2 placeholder-gray-500 text-gray-900 bg-white focus:bg-white focus:outline-none"
              placeholder="Email address"
            />

            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleInputChange}
              value={formData.password}
              required
              className="appearance-none rounded-xl relative block w-full mb-2 px-3 py-2 placeholder-gray-500 text-gray-900 bg-white focus:bg-white focus:outline-none"
              placeholder="Password"
            />
          </div>
          {/* forgot/remember */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-gray-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-black ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
