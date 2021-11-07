import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import {
  Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import history from '../_helpers/history';
import Server from '../components/Server';
import ServersSidebar from '../components/Server/ServersSidebar';
import { serverConstants, channelConstants, messageConstants } from '../_constants';
import authHeader from '../_helpers/auth-header';
import { serverActions } from '../_actions';
import t from '../_helpers/localization';

function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { channel } = useSelector((state) => state.channel);

  if (user) {
    const socket = io(process.env.REACT_APP_BACKEND_URL, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: authHeader().Authorization,
          },
        },
      },
    });
    // socket.on('connect', () => {
    //   console.log('Connected');
    // });
    // socket.on('disconnect', () => {
    //   console.log('Disconnected');
    // });
    socket.on('server-channel-message', (payload) => {
      if (channel && channel.id === payload.id) {
        serverActions.getServerChannelMessages({
          serverId: payload.serverId, channelId: payload.id,
        })
          .then((data) => {
            dispatch({ type: messageConstants.MESSAGE_UPDATE, messages: data });
            const objDiv = document.getElementById('message-container');
            objDiv.scrollTop = objDiv.scrollHeight;
          })
          .catch(() => { });
      } else {
        toast.info(`${payload.createdBy.username}: ${payload.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  }

  useEffect(() => {
    dispatch({ type: serverConstants.SERVER_CLEAR });
    dispatch({ type: channelConstants.CHANNEL_CLEAR });
    const lang = JSON.parse(localStorage.getItem('lang'));
    if (lang) t.setLanguage(lang);
  }, [dispatch]);

  return (
    <div id="home" className="h-screen w-screen flex bg-gray-800">
      <ServersSidebar />
      <Router history={history}>
        <Switch>
          <Route exact path="/server/:id" component={Server} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default HomePage;
