import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { serverActions } from '../../_actions';

function CreateChannel({
  handleClose, isOpen, server, channel,
}) {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    channelName: '',
  });
  const [errors, setErrors] = useState({
    channelName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(() => ({ ...inputs, [name]: value }));
  };

  useEffect(() => {
    setInputs(() => ({ channelName: channel.name }));
  }, [setInputs, channel]);

  const handleValidation = () => {
    let isFormValid = true;
    const currentErrors = {
      channelName: '',
    };

    if (!inputs.channelName) {
      isFormValid = false;
      currentErrors.channelName = 'Field required';
    } else if (inputs.channelName.length < 2 || inputs.channelName.length > 100) {
      isFormValid = false;
      currentErrors.channelName = 'Must be between 2 and 100 in length.';
    }

    setErrors(() => (currentErrors));
    return isFormValid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      serverActions.editChannelServer({
        serverId: server.id, channelId: channel.id, name: inputs.channelName,
      })
        .then(() => {
          handleClose();
          history.go(0);
        })
        .catch(() => setErrors(() => ({ channelName: 'Something went wrong.' })));
    }
  };

  return (
    <Modal
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      title="Edit Text Channel"
      desc=""
      isSubmitDisabled={!inputs.channelName}
      submitButton="Edit Channel"
    >
      <label htmlFor="channelName" className="text-sm font-medium tracking-wide">
        <div className="mb-2 text-sm">
          <span className="uppercase font-semibold">
            Channel name
          </span>
          {errors.channelName && (
            <span>
              &nbsp;-&nbsp;
              <span className="text-sm text-red-500 italic">
                {errors.channelName}
              </span>
            </span>
          )}
        </div>
        <input
          name="channelName"
          className="w-full text-gray-800 font-medium px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
          type="text"
          placeholder="New channel"
          value={inputs.channelName}
          onChange={handleChange}
        />
      </label>
    </Modal>
  );
}

CreateChannel.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  server: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  channel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CreateChannel;
