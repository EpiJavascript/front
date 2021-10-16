import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

import userActions from '../_actions/user.actions';

Modal.setAppElement('#app');

/* eslint-disable react/prop-types */
const CreateServer = ({ handleClose, show, children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(userActions.getSelfUser());
  }, [dispatch]);

  useEffect(() => {
    console.log(user);
  });

  return (
    <Modal
      isOpen={show}
      onRequestClose={handleClose}
      contentLabel="Example Modal"
      className="absolute bg-gray-700 rounded-lg shadow-2xl"
      overlayClassName="fixed inset-0 text-white flex justify-center items-center bg-black bg-opacity-75"
    >
      <h3 className="p-4 text-2xl font-semibold ">Create a new server</h3>
      <form>
        <div className="p-4">
          <label htmlFor="server" className="text-sm font-medium tracking-wide">
            Server name
            <input
              name="server"
              className="w-full text-base px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="New server"
            />
          </label>
        </div>
        {children}
        <div className="p-4 mt-4 bg-gray-800 rounded-br-lg rounded-bl-lg flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="flex justify-center text-indigo-500 rounded hover:text-purple-500 py-2 px-4 font-semibold cursor-pointer transition ease-in duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex justify-center bg-indigo-500 rounded hover:bg-purple-500 py-2 px-4 tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-300"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateServer;
