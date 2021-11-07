import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { serverActions } from '../../_actions';
import t from '../../_helpers/localization';

function CreateServer({ handleClose, isOpen }) {
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const [inputs, setInputs] = useState({
    serverName: '',
    serverId: '',
  });
  const [errors, setErrors] = useState({
    serverName: '',
    serverId: '',
  });

  useEffect(() => {
    setInputs(() => ({ serverName: `${user.username}'s server`, serverId: '' }));
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

  const handleJoin = () => {
    serverActions.joinServer(inputs.serverId)
      .then(() => {
        handleClose();
        history.push(`/server/${inputs.serverId}`);
        history.go(0);
      })
      .catch(() => setErrors(() => ({ serverName: 'Something went wrong.' })));
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      serverActions.createServer(inputs.serverName)
        .then((server) => {
          handleClose();
          history.push(`/server/${server.id}`);
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
      title={t.createServer}
      desc={t.createServerDesc}
      isSubmitDisabled={!inputs.serverName}
    >
      <label htmlFor="serverName" className="text-sm font-medium tracking-wide">
        <div className="mb-2 text-sm">
          <span className="uppercase font-semibold">
            {t.serverName}
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
        <h1 className="my-2 text-gray-300 text-xl flex justify-center">{t.or}</h1>
        <div className="mb-2 text-sm">
          <span className="uppercase font-semibold">
            {t.joinServer}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <input
            name="serverId"
            className="w-full text-gray-800 font-medium px-4 py-2 mr-4 border rounded focus:outline-none focus:border-indigo-500"
            type="text"
            placeholder="Server ID"
            value={inputs.serverId}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={handleJoin}
            className="flex justify-center items-center h-9 min-w-96 rounded px-4
          tracking-wide font-semibold text-sm cursor-pointer transition ease-in duration-150 disabled:opacity-50
          disabled:cursor-not-allowed bg-green-500 hover:bg-green-600"
          >
            {t.join}
          </button>
        </div>
      </label>
    </Modal>
  );
}

CreateServer.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default CreateServer;
