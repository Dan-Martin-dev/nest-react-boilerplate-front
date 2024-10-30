"use client";
import React, { ReactElement, ReactEventHandler, useEffect, useState } from "react";
import "/home/vare/project/frelo/silence_com/clients/ecom/styles/signup.css";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false); // Para verificar si el código se está ejecutando en el cliente
  const navigate = useNavigate();

  useEffect(() => {
    setIsClient(true); // Se asegura de que solo corra en el cliente
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission
    if (!isClient) return; // Asegurarse de que está corriendo en el cliente

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/signup",
        {
          email,
          password,
        }
      );

      if (response.status === 201) {
        toast.success("Felicitaciones! Tu usuario ha sido creado!");
        // Redirigir al usuario a la página principal después del toast
        setTimeout(() => {
          navigate("/"); // Navigate to the homepage
        }, 3000); // Espera de 3 segundos
      } 
    } 
    catch (error: any) {
      // Handle any errors that occur during signup
      if (error.response) {
        // Check if the error is related to the email being already taken
        if (
          error.response.status === 400 &&
          error.response.data.message === "Email is not available"
        ) {
          // Show a toast error for an existing email
          toast.error(
            "Este email ya ha sido utilizado",
            {
              position: "top-right",
              autoClose: 5000,
            }
          );
        } else {
          // Handle any other errors returned by the backend
          toast.error("Ha habido un error, intente nuevamente", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } else {
        // Handle unexpected errors (e.g., network issues)
        console.error("Error during signup:", error);
        toast.error("An unexpected error occurred. Please try again.", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

  // No renderices el componente hasta que estés seguro de que está en el cliente
  if (!isClient) {
    return null; // Puedes devolver un loader aquí si lo prefieres
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

        {/* card container */}
        <div className="max-w-md w-full space-y-8">
          {/* card header */}
          <div>
            <h2 className="text-center text-2xl font-bold text-black">
              Create an account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email and password below to create an account.
            </p>
          </div>

          <Toaster position="top-right" expand={false} richColors />

          {/* form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" value="true" />

            {/* email/password */}
            <div className="space-y-px">

              {/* email */}
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none rounded-xl relative block w-full mb-2 px-3 py-2 hover:border-gray-600 placeholder-gray-500 text-gray-900 bg-white focus:bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              {/* password */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full mb-2 px-3 py-2 border-gray-300 placeholder-gray-500 text-gray-900 bg-white focus:bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
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

            {/* submit */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black "
              >
                Sign in
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;