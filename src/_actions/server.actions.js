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

const serverActions = {
  createServer,
};

export default serverActions;
