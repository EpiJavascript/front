import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal';
import { userActions } from '../../_actions';
import t from '../../_helpers/localization';

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
      title={t.logout}
      desc={t.logoutWarning}
      submitButton={t.logout}
      submitButtonType="is-danger"
    />
  );
}

Logout.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Logout;
