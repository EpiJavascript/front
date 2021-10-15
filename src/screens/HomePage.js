import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import userActions from '../_actions/user.actions';

function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(userActions.getSelfUser());
  }, [dispatch]);

  useEffect(() => {
    console.log(user);
  });

  // function handleDeleteUser(id) {
  //   dispatch(userActions.delete(id));
  // }

  /* eslint-disable no-nested-ternary */
  return (
    <div id="home" className="h-screen w-screen flex bg-indigo-200">

      <aside
        className="p-3 flex flex-col items-center bg-gray-800 text-white shadow h-full"
      >
        <div className="mb-3 flex justify-center items-center">
          <div className="transition ease-in duration-300 bg-indigo-500 hover:bg-indigo-500 rounded-full hover:rounded-3xl h-16 w-16 flex items-center justify-center cursor-pointer">
            <Link to="/" className="text-5xl text-white flex self-center">
              <span className="iconify" data-icon="bx:bxl-discord-alt" />
            </Link>
          </div>
        </div>
        <div className="w-12 h-px flex justify-center bg-gray-400" />

        <ul className="flex-1 my-3">
          {
            user && user.servers && user.servers.map((server) => (
              <li className="mb-3 w-full flex justify-center items-center">
                <li className="transition ease-in duration-300 bg-gray-600 hover:bg-indigo-500 rounded-full hover:rounded-3xl h-16 w-16 flex items-center justify-center cursor-pointer">
                  <h1 className="text-xl">{server.name[0]}</h1>
                </li>
              </li>
            ))
          }
          <div className="flex justify-center items-center">
            <div className="transition ease-in duration-300 bg-gray-600 hover:bg-indigo-500 rounded-full h-12 w-12 flex items-center justify-center cursor-pointer">
              <div className="text-xl text-white flex self-center">
                <i className="fal fa-plus" />
              </div>
            </div>
          </div>
        </ul>

        <div className="w-12 h-px flex justify-center bg-gray-400" />
        <div className="mt-3 flex justify-center items-center">
          <div className="transition ease-in duration-300 bg-gray-600 hover:bg-indigo-500 rounded-full h-12 w-12 flex items-center justify-center cursor-pointer">
            <Link to="/login" className="text-2xl text-white flex self-center">
              <i className="fal fa-sign-out-alt" />
            </Link>
          </div>
        </div>

      </aside>
      <div>
        <h1>
          Hi&nbsp;
          {user && user.username}
          !
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
