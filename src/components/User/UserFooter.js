import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserSettings, EditUser, Logout } from '../../modals/User';

function Server() {
  const { user } = useSelector((state) => state.user);
  const [isUserSettingsModalOpen, userSettingsModalOpenIs] = useState(false);
  const openUserSettingsModal = () => userSettingsModalOpenIs(true);
  const closeUserSettingsModal = () => userSettingsModalOpenIs(false);
  const [isEditUserModalOpen, editUserModalOpenIs] = useState(false);
  const openEditUserModal = () => editUserModalOpenIs(true);
  const closeEditUserModal = () => editUserModalOpenIs(false);
  const [isLogoutModalOpen, logoutModalOpenIs] = useState(false);
  const openLogoutModal = () => logoutModalOpenIs(true);
  const closeLogoutModal = () => logoutModalOpenIs(false);

  return (
    <div id="user-footer" className="flex h-16 w-72 items-center justify-between" style={{ backgroundColor: '#2b3544' }}>
      <div className="px-2 flex items-center justify-between text-white">
        {user.imageUrl ? (
          <img src={user.imageUrl} alt="User Avatar" className="rounded-full w-12 h-12 object-cover" />
        ) : (
          <div
            className="bg-indigo-500 rounded-32 h-12 w-12 flex items-center justify-center text-3xl"
          >
            <span className="iconify" data-icon="bx:bxl-discord-alt" />
          </div>
        )}
        <h1 className="ml-2 text-md font-semibold whitespace-nowrap overflow-ellipsis overflow-hidden">{user.username}</h1>
      </div>
      <div className="px-2 flex items-center">
        <button
          type="button"
          className="mr-1 text-xl text-gray-300 hover:text-white"
          onClick={openLogoutModal}
        >
          <i className="mr-2 fal fa-sign-out-alt" />
        </button>
        <button
          type="button"
          className="mr-1 text-xl text-gray-300 hover:text-white"
          onClick={openEditUserModal}
        >
          <i className="mr-2 fal fa-pencil" />
        </button>
        <button
          type="button"
          className="text-xl text-gray-300 hover:text-white"
          onClick={openUserSettingsModal}
        >
          <i className="mr-2 fal fa-cog" />
        </button>
      </div>
      <UserSettings
        handleClose={closeUserSettingsModal}
        isOpen={isUserSettingsModalOpen}
      />
      <EditUser
        handleClose={closeEditUserModal}
        isOpen={isEditUserModalOpen}
      />
      <Logout
        handleClose={closeLogoutModal}
        isOpen={isLogoutModalOpen}
      />
    </div>
  );
}

export default Server;
