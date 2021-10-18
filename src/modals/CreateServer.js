import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from './Modal';
import serverActions from '../_actions/server.actions';
import userActions from '../_actions/user.actions';

function CreateServer({ handleClose, isOpen }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [inputs, setInputs] = useState({
    serverName: undefined,
  });
  const [errors, setErrors] = useState({
    serverName: undefined,
  });

  useEffect(() => {
    setInputs(() => ({ serverName: `${user.username}'s server` }));
  }, [setInputs, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(() => ({ ...inputs, [name]: value }));
  };

  const handleValidation = () => {
    let isFormValid = true;
    const currentErrors = {
      serverName: '',
    };

    if (!inputs.serverName) {
      isFormValid = false;
      currentErrors.serverName = 'Field required';
    } else if (inputs.serverName.length < 2 || inputs.serverName.length > 100) {
      isFormValid = false;
      currentErrors.serverName = 'Must be between 2 and 100 in length.';
    }

    setErrors(() => (currentErrors));
    return isFormValid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      serverActions.createServer(inputs.serverName)
        .then(() => {
          dispatch(userActions.getSelfUser());
          handleClose();
        })
        .catch(() => setErrors(() => ({ serverName: 'Something went wrong.' })));
    }
  };

  return (
    <Modal
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      title="Create a server"
      desc="Give your new server a personality with a name and an icon. You can always change it later."
      isSubmitDisabled={!inputs.serverName}
    >
      <label htmlFor="serverName" className="text-sm font-medium tracking-wide">
        <div className="mb-2 text-sm">
          <span className="uppercase font-semibold">
            Server name
          </span>
          {errors.serverName && (
            <span>
              &nbsp;-&nbsp;
              <span className="text-sm text-red-500 italic">
                {errors.serverName}
              </span>
            </span>
          )}
        </div>
        <input
          name="serverName"
          className="w-full text-gray-800 font-medium px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
          type="text"
          placeholder="New server"
          value={inputs.serverName}
          onChange={handleChange}
        />
      </label>
    </Modal>
  );
}

CreateServer.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default CreateServer;
