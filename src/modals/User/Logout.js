import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal';
import { userActions } from '../../_actions';

function Logout({
  handleClose, isOpen,
}) {
  const history = useHistory();

  const handleSubmit = () => {
    userActions.logout();
    history.push('/login');
  };

  return (
    <Modal
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      title="Logout"
      desc="Are you sure you want to logout?"
      submitButton="Logout"
      submitButtonType="is-danger"
    />
  );
}

Logout.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Logout;
