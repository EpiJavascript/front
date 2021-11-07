import { Menu, Transition } from '@headlessui/react';
import React, {
  Fragment, useEffect, useState,
} from 'react';
import { serverActions } from '../../_actions';
import {
  CreateChannel, DeleteServer, EditServer, EditChannel, DeleteChannel,
} from '../../modals/Server';

/* eslint-disable react/prop-types */
function ChannelsSidebar({ server }) {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(undefined);
  const [isDeleteServerModalOpen, deleteServerModalOpenIs] = useState(false);
  const openDeleteServerModal = () => deleteServerModalOpenIs(true);
  const closeDeleteServerModal = () => deleteServerModalOpenIs(false);
  const [isEditServerModalOpen, editServerModalOpenIs] = useState(false);
  const openEditServerModal = () => editServerModalOpenIs(true);
  const closeEditServerModal = () => editServerModalOpenIs(false);
  const [isCreateChannelModalOpen, createChannelModalOpenIs] = useState(false);
  const openCreateChannelModal = () => createChannelModalOpenIs(true);
  const closeCreateChannelModal = () => createChannelModalOpenIs(false);
  const [isEditChannelModalOpen, editChannelModalOpenIs] = useState(false);
  const closeEditChannelModal = () => editChannelModalOpenIs(false);
  const [isDeleteChannelModalOpen, deleteChannelModalOpenIs] = useState(false);
  const closeDeleteChannelModal = () => deleteChannelModalOpenIs(false);

  useEffect(() => {
    if (server.id) {
      serverActions.getServerChannels(server.id).then((data) => {
        setChannels(data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [server]);

  return (
    <div id="server" className="h-screen w-64 bg-gray-700 text-white">
      <div className="px-4 h-12 w-full flex justify-between items-center">
        <h1 className="text-lg font-bold whitespace-nowrap overflow-ellipsis overflow-hidden">{server.name}</h1>
        <div className="">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex items-center justify-center w-full p-2 pr-0 text-sm font-medium text-white bg-transparent rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <i className="far fa-chevron-down" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-800 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-2">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={openEditServerModal}
                        className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-200'} group flex rounded-md items-center w-full px-3 py-2 text-sm`}
                      >
                        {active ? (
                          <i className="fas fa-pencil-alt mr-3" />
                        ) : (
                          <i className="fal fa-pencil-alt mr-3" />
                        )}
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={openDeleteServerModal}
                        className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-200'} group flex rounded-md items-center w-full px-3 py-2 text-sm`}
                      >
                        {active ? (
                          <i className="fas fa-trash-alt mr-3" />
                        ) : (
                          <i className="fal fa-trash-alt mr-3" />
                        )}
                        Delete Server
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="mt-4 mx-4 font-semibold text-gray-200 flex justify-between text-sm">
        <h1 className="uppercase">TEXT CHANNELS</h1>
        <button type="button" onClick={openCreateChannelModal} className="">
          <i className="fal fa-plus" />
        </button>
      </div>
      <ul className="my-3">
        {
          channels.map((channel) => (
            <li key={channel.id} className="mb-1 w-full flex items-center">
              <div
                className="group px-2 py-1 mx-2 flex w-full items-center justify-between hover:bg-gray-600 text-gray-200
              hover:rounded-md cursor-pointer transition-server ease-in-out duration-200"
              >
                <div className="flex items-center">
                  <i className="mr-2 fas fa-hashtag" />
                  <h1 className="text-lg whitespace-nowrap overflow-ellipsis overflow-hidden">{channel.name}</h1>
                </div>
                <div className="flex items-center hidden group-hover:flex">
                  <button
                    type="button"
                    className="hover:text-white"
                    onClick={() => {
                      setSelectedChannel(channel);
                      editChannelModalOpenIs(true);
                    }}
                  >
                    <i className="mr-2 fas fa-cog" />
                  </button>
                  <button
                    type="button"
                    className="hover:text-white"
                    onClick={() => {
                      setSelectedChannel(channel);
                      deleteChannelModalOpenIs(true);
                    }}
                  >
                    <i className="mr-2 fal fa-trash-alt" />
                  </button>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
      {server.id && (
        <div>
          <DeleteServer
            handleClose={closeDeleteServerModal}
            isOpen={isDeleteServerModalOpen}
            server={server}
          />
          <EditServer
            handleClose={closeEditServerModal}
            isOpen={isEditServerModalOpen}
            server={server}
          />
          <CreateChannel
            handleClose={closeCreateChannelModal}
            isOpen={isCreateChannelModalOpen}
            server={server}
          />
          {selectedChannel && (
            <div>
              <EditChannel
                handleClose={closeEditChannelModal}
                isOpen={isEditChannelModalOpen}
                server={server}
                channel={selectedChannel}
              />
              <DeleteChannel
                handleClose={closeDeleteChannelModal}
                isOpen={isDeleteChannelModalOpen}
                server={server}
                channel={selectedChannel}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChannelsSidebar;
