import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import Modal from '../Modal';
import { userActions } from '../../_actions';
import t from '../../_helpers/localization';

function EditUser({ handleClose, isOpen }) {
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    images: [],
  });
  const [errors, setErrors] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });
  const maxNumber = 1;

  const handleImageChange = (imageList) => {
    setInputs(() => ({ ...inputs, images: imageList }));
  };

  useEffect(() => {
    if (user.imageUrl) {
      setInputs(() => ({
        username: user.username, email: user.email, images: [{ data_url: user.imageUrl }],
      }));
    } else {
      setInputs(() => ({ username: user.username, email: user.email, images: [] }));
    }
  }, [setInputs, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(() => ({ ...inputs, [name]: value }));
  };

  const handleValidation = () => {
    let isFormValid = true;
    const currentErrors = {
      username: '',
    };

    if (!inputs.username) {
      isFormValid = false;
      currentErrors.username = 'Field required';
    } else if (inputs.username.length < 2 || inputs.username.length > 100) {
      isFormValid = false;
      currentErrors.username = 'Must be between 2 and 100 in length.';
    }

    if (!user.email) {
      isFormValid = false;
      currentErrors.email = 'Please enter a valid adress email.';
    } else {
      const lastAtPos = user.email.lastIndexOf('@');
      const lastDotPos = user.email.lastIndexOf('.');
      if (
        !(
          lastAtPos < lastDotPos
          && lastAtPos > 0
          && user.email.indexOf('@@') === -1
          && lastDotPos > 2
          && user.email.length - lastDotPos > 2
        )
      ) {
        isFormValid = false;
        currentErrors.email = 'Please enter a valid adress email.';
      }
    }

    setErrors(() => (currentErrors));
    return isFormValid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      const config = {
        id: user.id,
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
        image: inputs.images[0],
      };
      if (config.image && config.image.data_url.includes('imgur')) {
        config.image = undefined;
      }
      userActions.editUser(config)
        .then(() => {
          handleClose();
          history.go(0);
        })
        .catch(() => setErrors(() => { }));
    }
  };

  return (
    <Modal
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      title={t.editProfil}
      desc={t.editProfilDesc}
      isSubmitDisabled={!inputs.username}
      submitButton={t.save}
    >
      <label htmlFor="username" className="text-sm font-medium tracking-wide">
        <div className="mb-2 text-sm">
          <div className="mb-4">
            <span className="uppercase font-semibold">
              {t.userAvatar}
            </span>
            <ImageUploading
              multiple
              value={inputs.images}
              onChange={handleImageChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className="upload__image-wrapper align-items flex">
                  {/* eslint-disable react/jsx-props-no-spreading */}
                  {!imageList.length && (
                    <button
                      type="button"
                      style={isDragging ? { color: 'red' } : undefined}
                      onClick={onImageUpload}
                      className="my-2"
                      {...dragProps}
                    >
                      <span className="font-bold">Click</span>
                      <span>&nbsp;or&nbsp;</span>
                      <span className="font-bold">Drop here</span>
                    </button>
                  )}
                  &nbsp;
                  {imageList.map((image, index) => (
                    <div key={image} className="my-2 image-item items-center flex">
                      <img src={image.data_url} alt="Server Avatar" className="rounded-full w-32 h-32 object-cover" />
                      <div className="mt-2 ml-4 image-item__btn-wrapper">
                        <button type="button" className="font-bold hover:underline" onClick={() => onImageUpdate(index)}>{t.update}</button>
                        <span>
                          &nbsp;
                          {t.or}
                          &nbsp;
                        </span>
                        <button type="button" className="font-bold hover:underline" onClick={() => onImageRemove(index)}>{t.remove}</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </div>
          <span className="uppercase font-semibold">
            {t.username}
          </span>
          {errors.username && (
            <span>
              &nbsp;-&nbsp;
              <span className="text-sm text-red-500 italic">
                {errors.username}
              </span>
            </span>
          )}
        </div>
        <input
          name="username"
          className="mb-2 w-full text-gray-800 font-medium px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
          type="text"
          value={inputs.username}
          onChange={handleChange}
        />

        <span className="uppercase font-semibold">
          Email
        </span>
        {errors.email && (
          <span>
            &nbsp;-&nbsp;
            <span className="text-sm text-red-500 italic">
              {errors.email}
            </span>
          </span>
        )}
        <input
          name="email"
          className="mb-2 w-full text-gray-800 font-medium px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
          type="text"
          value={inputs.email}
          onChange={handleChange}
        />

        <span className="uppercase font-semibold">
          {t.password}
        </span>
        {errors.password && (
          <span>
            &nbsp;-&nbsp;
            <span className="text-sm text-red-500 italic">
              {errors.password}
            </span>
          </span>
        )}
        <input
          name="password"
          className="w-full text-gray-800 font-medium px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
          type="password"
          value={inputs.password}
          onChange={handleChange}
        />
      </label>
    </Modal>
  );
}

EditUser.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default EditUser;
