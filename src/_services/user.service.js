import authHeader from '../_helpers/auth-header';

function logout() {
  localStorage.removeItem('user');
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch('http://localhost:3001/api/auth/login', requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    });
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch('http://localhost:3001/api/auth/register', requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    });
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch('http://localhost:3001/api/users', requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => data);
}

// function getById(id) {
//   const requestOptions = {
//     method: 'GET',
//     headers: authHeader(),
//   };

//   return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
//     handleResponse,
//   );
// }

// function update(user) {
//   const requestOptions = {
//     method: 'PUT',
//     headers: { ...authHeader(), 'Content-Type': 'application/json' },
//     body: JSON.stringify(user),
//   };

//   return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(
//     handleResponse,
//   );
// }

// function deleteFunc(id) {
//   const requestOptions = {
//     method: 'DELETE',
//     headers: authHeader(),
//   };

//   return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
//     handleResponse,
//   );
// }

const userService = {
  login,
  logout,
  register,
  getAll,
  //   getById,
  //   update,
  //   delete: deleteFunc,
};

export default userService;
