import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  useLocation,
} from 'react-router-dom';
import ChannelsSideBar from './ChannelsSideBar';
import { serverConstants } from '../../_constants';
import UserFooter from '../User/UserFooter';
import Chat from './Chat';

function Server(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { channel } = useSelector((state) => state.channel);
  const [server, setServer] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (user && props.match.params.id) {
      const servers = user.servers.filter((item) => item.id === props.match.params.id);
      if (servers.length === 1) {
        setServer(servers[0]);
        dispatch({ type: serverConstants.SERVER_UPDATE, server: servers[0] });
      }
    }
  }, [location, props, user, dispatch]);

  return (
    <div id="server" className="flex w-screen bg-gray-800">
      <div className="flex flex-col">
        {server && server.id && <ChannelsSideBar server={server} />}
        {user && <UserFooter />}
      </div>
      {server.id && channel && <Chat server={server} />}
    </div>
  );
}

export default Server;

Server.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
