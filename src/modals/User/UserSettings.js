import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import Modal from '../Modal';

function UserSettings({
  handleClose, isOpen,
}) {
  const history = useHistory();
  const languageMap = [
    { id: 0, name: 'English' },
    { id: 1, name: 'Français' },
  ];
  const [selected, setSelected] = useState(languageMap[0]);

  const handleSubmit = () => {
    handleClose();
    history.go(0);
  };

  return (
    <Modal
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      title="Settings"
      desc="You can change the website language here"
      submitButton="Save"
    >
      <div className="w-48">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button style={{ backgroundColor: '#2b3544' }} className="relative w-full py-2 pl-3 pr-10 text-left rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <i className="fad fa-arrows-v" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options style={{ backgroundColor: '#2b3544' }} className="absolute w-full py-1 mt-1 overflow-auto rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {languageMap.map((language) => (
                  <Listbox.Option
                    key={language.id}
                    className={({ active }) => `${active ? 'text-indigo-500 bg-amber-100' : 'text-white'}
                    cursor-pointer select-none relative py-2 pl-10 pr-4`}
                    value={language}
                  >
                    {({ selectedItem, active }) => (
                      <>
                        <span
                          className={`${selectedItem ? 'font-medium' : 'font-normal'} block truncate`}
                        >
                          {language.name}
                        </span>
                        {selected.name === language.name ? (
                          <span
                            className={`${active ? 'text-indigo-500' : 'text-white'} absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <i className="far fa-check" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </Modal>
  );
}

UserSettings.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default UserSettings;
