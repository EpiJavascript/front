import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import userActions from '../_actions/user.actions';
import errorConstant from '../_constants/error.constants';

function LoginPage() {
  const alert = useSelector((state) => state.alert);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(() => ({ ...inputs, [name]: value }));
  }

  function handleValidation() {
    let formIsValid = true;
    const currentErrors = {
      email: '',
      password: '',
    };

    if (!email) {
      formIsValid = false;
      currentErrors.email = 'Please enter a valid adress email.';
    }

    if (!password) {
      formIsValid = false;
      currentErrors.password = 'Please enter a password.';
    }

    setErrors(() => (currentErrors));
    return formIsValid;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (handleValidation()) {
      const { from } = location.state || { from: { pathname: '/' } };
      dispatch(userActions.login(email, password, from));
    }
  }

  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative ed-cover"
    >
      <div className="absolute hidden md:flex bg-gradient-to-b from-purple-700 to-purple-800 opacity-50 inset-0 z-0" />
      <div className="min-h-screen flex flex-row mx-0 justify-center">
        <div className="flex-col hidden lg:flex flex self-center p-20 sm:max-w-5xl xl:max-w-2xl  z-10">
          <h1 className="mb-3 ed-brand ed-shadow text-7xl text-white flex self-center">Epicord</h1>
          <h3 className="ed-catchphrase ed-shadow text-3xl text-white flex self-center">We&apos;re so excited to see you again!</h3>
        </div>
        <div className="flex justify-center self-center z-10">
          <div className="ed-form p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>
            <form name="form" onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 tracking-wide">
                  Email
                  <input
                    name="email"
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                    type=""
                    placeholder="mail@gmail.com"
                    value={email}
                    onChange={handleChange}
                  />
                </label>
                {errors.email && (
                  <div className="text-red-700" role="alert">
                    <span className="text-sm">
                      <i className="mr-2 fas fa-exclamation-triangle" />
                      {errors.email}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Password
                  <input
                    name="password"
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                  />
                </label>
                {errors.password && (
                  <div className="text-red-700" role="alert">
                    <span className="text-sm">
                      <i className="mr-2 fas fa-exclamation-triangle" />
                      {errors.password}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray-800">
                    Need an account?&nbsp;
                  </span>
                  <Link to="/register" className="text-purple-600 hover:text-purple-800 transition ease-in duration-300">Register</Link>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-purple-700  hover:bg-purple-500 text-purple-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  {loggingIn && <span className="spinner-border spinner-border-sm mr-1" />}
                  Sign in
                </button>
                {alert.message && alert.type === 'alert-danger' && (
                  <div className="mt-3 text-red-700" role="alert">
                    <span className="text-sm">
                      <i className="mr-2 fas fa-exclamation-triangle" />
                      {errorConstant[alert.message]}
                    </span>
                  </div>
                )}
                {alert.message && alert.type === 'alert-success' && (
                  <div className="mt-3 text-green-700" role="alert">
                    <span className="text-sm">
                      <i className="mr-2 fas fa-shield-check" />
                      {alert.message}
                    </span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
