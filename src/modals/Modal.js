import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import t from '../_helpers/localization';

ReactModal.setAppElement('#app');

const Modal = ({
  handleClose, handleSubmit, isOpen, title, desc, children, cancelButton, submitButton,
  isSubmitDisabled, submitButtonType,
}) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={handleClose}
    contentLabel="Example Modal"
    className="absolute bg-gray-700 rounded-md w-440"
    overlayClassName="fixed inset-0 text-white flex justify-center items-center bg-black
    bg-opacity-90"
  >
    {/* MODAL HEADER */}
    <div className="p-4 pb-0 text-center">
      <h3 className="text-2xl font-semibold">{title}</h3>
      {desc && (
        <p className="mt-2 text-gray-300">
          {desc}
        </p>
      )}
    </div>
    {/* MODAL CONTENT */}
    <div className="flex-1 px-4 my-4">
      {children}
    </div>
    {/* MODAL FOOTER */}
    <div className="p-4 bg-gray-800 rounded-br-md rounded-bl-md flex justify-end">
      <button
        type="button"
        onClick={handleClose}
        className="flex justify-center items-center h-9 min-w-96 text-white text-sm rounded hover:underline px-4
          font-semibold cursor-pointer"
      >
        {cancelButton}
      </button>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
        className={`flex justify-center items-center h-9 min-w-96 rounded px-4
          tracking-wide font-semibold text-sm cursor-pointer transition ease-in duration-150 disabled:opacity-50
          disabled:cursor-not-allowed ${submitButtonType === 'is-danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-500 hover:bg-indigo-600'}`}
      >
        {submitButton}
      </button>
    </div>
  </ReactModal>
);

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  children: PropTypes.element,
  cancelButton: PropTypes.string,
  submitButton: PropTypes.string,
  isSubmitDisabled: PropTypes.bool,
  submitButtonType: PropTypes.string,
};

Modal.defaultProps = {
  desc: '',
  cancelButton: t.cancel,
  submitButton: t.create,
  isSubmitDisabled: false,
  submitButtonType: 'is-primary',
  children: null,
};

export default Modal;
