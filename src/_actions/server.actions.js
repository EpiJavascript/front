import authHeader from '../_helpers/auth-header';

function createServer(name) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader().Authorization },
    body: JSON.stringify({ name }),
  };

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/servers`, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error = undefined) => {
      if (error) throw error;
      throw new Error(error);
    });
}

function editServer({ id, name, image }) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader().Authorization },
    body: JSON.stringify({ name, image }),
  };

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/servers/${id}`, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error = undefined) => {
      if (error) throw error;
      throw new Error(error);
    });
}

function deleteServer(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader().Authorization },
  };

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/servers/${id}`, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error = undefined) => {
      if (error) throw error;
      throw new Error(error);
    });
}

function getServerChannels(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader().Authorization },
    // body: JSON.stringify({ id }),
  };

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/servers/${id}/channels`, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error = undefined) => {
      if (error) throw error;
      throw new Error(error);
    });
}

function createChannelServer({ id, name }) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader().Authorization },
    body: JSON.stringify({ name }),
  };

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/servers/${id}/channels`, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error = undefined) => {
      if (error) throw error;
      throw new Error(error);
    });
}

function editChannelServer({ serverId, channelId, name }) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader().Authorization },
    body: JSON.stringify({ name }),
  };

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/servers/${serverId}/channels/${channelId}`, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error = undefined) => {
      if (error) throw error;
      throw new Error(error);
    });
}

function deleteChannelServer({ serverId, channelId }) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader().Authorization },
  };

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/servers/${serverId}/channels/${channelId}`, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error = undefined) => {
      if (error) throw error;
      throw new Error(error);
    });
}

const serverActions = {
  createServer,
  editServer,
  deleteServer,
  getServerChannels,
  createChannelServer,
  editChannelServer,
  deleteChannelServer,
};

export default serverActions;
