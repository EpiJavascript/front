import serverService from '../_services/server.service';

function createServer(name) {
  return serverService.createServer(name);
}

const serverActions = {
  createServer,
};

export default serverActions;
