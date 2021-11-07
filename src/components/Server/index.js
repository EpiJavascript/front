import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useLocation,
} from 'react-router-dom';
import ChannelsSideBar from './ChannelsSideBar';
import { serverConstants } from '../../_constants';

function Server(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [server, setServer] = useState({});
  const location = useLocation();

  useEffect(() => {
    /* eslint-disable react/prop-types */
    if (user && props.match.params.id) {
      const servers = user.servers.filter((item) => item.id === props.match.params.id);
      if (servers.length === 1) {
        setServer(servers[0]);
        dispatch({ type: serverConstants.SERVER_UPDATE, server: servers[0] });
      }
    }
  }, [location, props, user, dispatch]);

  return (
    <div id="server" className="flex bg-gray-800">
      <ChannelsSideBar server={server} />
      <div>
        {user && (
          <h1>
            Salut&nbsp;
            {user.username}
            &nbsp;!
            Server:&nbsp;
            {server.name}
          </h1>
        )}
      </div>
    </div>
  );
}

export default Server;
