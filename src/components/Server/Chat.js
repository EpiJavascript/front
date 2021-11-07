import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { serverActions } from '../../_actions';
import { messageConstants } from '../../_constants';
import t from '../../_helpers/localization';

function Chat({ server }) {
  const dispatch = useDispatch();
  const { channel } = useSelector((state) => state.channel);
  const { messages } = useSelector((state) => state.message);
  const [inputs, setInputs] = useState({
    message: '',
  });

  useEffect(() => {
    setInputs({ message: '' });
    dispatch({ type: messageConstants.MESSAGE_CLEAR });
    serverActions.getServerChannelMessages({ serverId: server.id, channelId: channel.id })
      .then((data) => {
        dispatch({ type: messageConstants.MESSAGE_UPDATE, messages: data });
        const objDiv = document.getElementById('message-container');
        objDiv.scrollTop = objDiv.scrollHeight;
      })
      .catch(() => { });
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [channel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(() => ({ ...inputs, [name]: value }));
  };

  const handleNewMessage = () => {
    if (!inputs.message) return;
    const $message = inputs.message;
    setInputs({ message: '' });
    serverActions.sendServerChannelMessages({
      serverId: server.id, channelId: channel.id, message: $message,
    })
      .then(() => {
        serverActions.getServerChannelMessages({ serverId: server.id, channelId: channel.id })
          .then((data) => {
            dispatch({ type: messageConstants.MESSAGE_UPDATE, messages: data });
            const objDiv = document.getElementById('message-container');
            objDiv.scrollTop = objDiv.scrollHeight;
          })
          .catch(() => { });
      })
      .catch(() => { });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleNewMessage();
    }
  };

  return (
    <div id="chat" className="flex w-full bg-gray-800 text-white justify-between flex-col">
      <div className="h-12 items-center flex p-4" style={{ backgroundColor: '#2b3544' }}>
        <i className="mr-2 fas fa-hashtag" />
        <h1 className="text-lg">{channel.name}</h1>
      </div>
      <div>
        <ul id="message-container" className="messageContainer flex-col">
          {messages && messages.map((item) => (
            <li key={item.id} className="my-3 px-4 w-full flex justify-start items-center">
              <img src={item.user.imageUrl} alt="User Avatar" className="mr-4 rounded-full w-12 h-12 object-cover" />
              <div className="flex-col">
                <div className="items-center flex">
                  <h1 className="font-semibold">{item.user.username}</h1>
                  <span className="ml-2 text-gray-300 text-sm">{moment(item.createdAt).format('L, LT')}</span>
                </div>
                <h1>{item.message}</h1>
              </div>
            </li>
          ))}
        </ul>
        <div className="items-center flex px-4" style={{ backgroundColor: '#2b3544', height: '60px' }}>
          <label htmlFor="message" className="flex justify-between items-center w-full px-4text-sm font-medium tracking-wide">
            <input
              onKeyDown={handleKeyDown}
              name="message"
              className="w-full text-gray-800 font-medium px-4 py-2 mr-4 border rounded focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder={`Message #${channel.name}`}
              value={inputs.message}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={handleNewMessage}
              className="flex justify-center items-center h-9 min-w-96 rounded px-4
          tracking-wide font-semibold text-sm cursor-pointer transition ease-in duration-150 disabled:opacity-50
          disabled:cursor-not-allowed bg-indigo-500 hover:bg-indigo-600"
            >
              {t.send}
            </button>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Chat;

Chat.propTypes = {
  server: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
