import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import Modal from '../Modal';
import { serverActions } from '../../_actions';
import t from '../../_helpers/localization';

function EditServer({ handleClose, isOpen, server }) {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    serverName: undefined,
    images: [],
  });
  const [errors, setErrors] = useState({
    serverName: undefined,
  });
  const maxNumber = 1;

  const onChange = (imageList) => {
    setInputs(() => ({ ...inputs, images: imageList }));
  };

  useEffect(() => {
    if (server.imageUrl) {
      setInputs(() => ({ serverName: server.name, images: [{ data_url: server.imageUrl }] }));
    } else {
      setInputs(() => ({ serverName: server.name, images: [] }));
    }
  }, [setInputs, server]);

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
      const config = {
        id: server.id,
        name: inputs.serverName,
        image: inputs.images[0],
      };
      if (config.image && config.image.data_url.includes('imgur')) {
        config.image = undefined;
      }
      serverActions.editServer(config)
        .then(() => {
          handleClose();
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
      title={t.editServer}
      desc={t.editServerDesc}
      isSubmitDisabled={!inputs.serverName}
      submitButton={t.edit}
    >
      <label htmlFor="serverName" className="text-sm font-medium tracking-wide">
        <div className="mb-2 text-sm">
          <div className="mb-4">
            <span className="uppercase font-semibold">
              {t.serverAvatar}
            </span>
            <ImageUploading
              multiple
              value={inputs.images}
              onChange={onChange}
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
          value={inputs.serverName}
          onChange={handleChange}
        />
      </label>
    </Modal>
  );
}

EditServer.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  server: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

EditServer.default = {
  imageUrl: null,
};

export default EditServer;
