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

function joinServer(id) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader().Authorization },
  };

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/servers/${id}/join`, requestOptions)
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

async function editServer({ id, name, image }) {
  const formData = new FormData();
  if (image) {
    const base64Response = await fetch(`${image.data_url}`);
    const blob = await base64Response.blob();
    formData.append('image', blob, image.file.name);
  }
  formData.append('name', name);
  const requestOptions = {
    method: 'PUT',
    headers: { Authorization: authHeader().Authorization },
    body: formData,
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

function getServerChannelMessages({ serverId, channelId }) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader().Authorization },
  };

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/servers/${serverId}/channels/${channelId}/messages`, requestOptions)
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

function sendServerChannelMessages({ serverId, channelId, message }) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader().Authorization },
    body: JSON.stringify({ message }),
  };

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/servers/${serverId}/channels/${channelId}/messages`, requestOptions)
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
  joinServer,
  getServerChannelMessages,
  sendServerChannelMessages,
};

export default serverActions;
