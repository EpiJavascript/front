import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal';
import { serverActions } from '../../_actions';
import t from '../../_helpers/localization';

function DeleteServer({
  handleClose, isOpen, server, channel,
}) {
  const history = useHistory();

  const handleSubmit = () => {
    serverActions.deleteChannelServer({
      serverId: server.id, channelId: channel.id,
    })
      .then(() => {
        handleClose();
        history.go(0);
      })
      .catch(() => { });
  };

  return (
    <Modal
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      title={`${t.deleteChannel} '${channel.name}'`}
      desc={`Are you sure you want to delete '${channel.name}'? This action cannot be undone.`}
      submitButton={t.delete}
      submitButtonType="is-danger"
    />
  );
}

DeleteServer.propTypes = {
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

export default DeleteServer;
