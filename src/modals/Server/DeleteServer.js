import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal';
import { serverActions } from '../../_actions';

function DeleteServer({ handleClose, isOpen, server }) {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    serverName: '',
  });
  const [errors, setErrors] = useState({
    serverName: '',
  });

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
    } else if (inputs.serverName.toLowerCase() !== server.name.toLowerCase()) {
      isFormValid = false;
      currentErrors.serverName = 'You didn\'t enter the server name correctly';
    }

    setErrors(() => (currentErrors));
    return isFormValid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      serverActions.deleteServer(server.id)
        .then(() => {
          handleClose();
          history.push('/');
          history.go(0);
        })
        .catch(() => setErrors(() => ({ serverName: 'Something went wrong.' })));
    }
  };

  return (
    <Modal
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      title={`Delete Server '${server.name}'`}
      desc={`Are you sure you want to delete '${server.name}'? This action cannot be undone.`}
      isSubmitDisabled={inputs.serverName.toLowerCase() !== server.name.toLowerCase()}
      submitButton="Delete Server"
      submitButtonType="is-danger"
    >
      <label htmlFor="serverName" className="text-sm font-medium tracking-wide">
        <div className="mb-2 text-sm">
          <span className="uppercase font-semibold">
            Enter server name
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
          value={inputs.serverName}
          onChange={handleChange}
        />
      </label>
    </Modal>
  );
}

DeleteServer.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  server: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeleteServer;
