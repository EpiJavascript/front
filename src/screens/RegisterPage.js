import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import userActions from '../_actions/user.actions';
import errorConstant from '../_constants/error.constants';

function RegisterPage() {
  const alert = useSelector((state) => state.alert);
  const [user, setUser] = useState({
    email: 'axel@mail.com',
    username: 'Axel',
    password: 'p@ssword',
  });
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
  });
  const registering = useSelector((state) => state.registration.registering);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser(() => ({ ...user, [name]: value }));
  }

  function handleValidation() {
    let formIsValid = true;
    const currentErrors = {
      email: '',
      username: '',
      password: '',
    };

    if (!user.email) {
      formIsValid = false;
      currentErrors.email = 'Please enter a valid adress email.';
    } else {
      const lastAtPos = user.email.lastIndexOf('@');
      const lastDotPos = user.email.lastIndexOf('.');
      if (
        !(
          lastAtPos < lastDotPos
          && lastAtPos > 0
          && user.email.indexOf('@@') === -1
          && lastDotPos > 2
          && user.email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        currentErrors.email = 'Please enter a valid adress email.';
      }
    }

    if (!user.username) {
      formIsValid = false;
      currentErrors.username = 'Please enter a username.';
    } else if (!user.username.match(/^[a-zA-Z0-9]+$/)) {
      formIsValid = false;
      currentErrors.username = 'Unauthorized characters.';
    }

    if (!user.password) {
      formIsValid = false;
      currentErrors.password = 'Please enter a password.';
    } else if (user.password.length < 8) {
      formIsValid = false;
      currentErrors.password = 'Length must be at least 8 characters.';
    }

    setErrors(() => (currentErrors));
    return formIsValid;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (handleValidation()) {
      dispatch(userActions.register(user));
      // if (alert.message === '')
      // dispatch(userActions.login(user.email, user.password, { from: { pathname: '/' } }));
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
          <h3 className="ed-catchphrase ed-shadow text-3xl text-white flex self-center">Ready to start your journey?</h3>
        </div>
        <div className="flex justify-center self-center z-10">
          <div className="ed-form p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Create an account</h3>
              <p className="text-gray-500">It&apos;s free and only takes a minute.</p>
            </div>
            <form name="form" onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 tracking-wide">
                  Email
                  <input
                    name="email"
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                    type="email"
                    placeholder="mail@gmail.com"
                    value={user.email}
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
                <label htmlFor="username" className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Username
                  <input
                    name="username"
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                    type="text"
                    placeholder="Enter your username"
                    value={user.username}
                    onChange={handleChange}
                  />
                </label>
                {errors.username && (
                  <div className="text-red-700" role="alert">
                    <span className="text-sm">
                      <i className="mr-2 fas fa-exclamation-triangle" />
                      {errors.username}
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
                    value={user.password}
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
                    Already have an account?&nbsp;
                  </span>
                  <Link to="/login" className="text-purple-600 hover:text-purple-800 transition ease-in duration-300">Sign in</Link>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-purple-700  hover:bg-purple-500 text-purple-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  {registering && <span className="spinner-border spinner-border-sm mr-1" />}
                  Register
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
                      <i className="fas fa-shield-check" />
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

export default RegisterPage;
