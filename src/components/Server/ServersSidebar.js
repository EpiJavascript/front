import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateServer from '../../modals/Server/CreateServer';
import userActions from '../../_actions/user.actions';

function ServersSidebar() {
  const { user } = useSelector((state) => state.user);
  const { server } = useSelector((state) => state.server);
  const [isCreateServerModalOpen, createServerModalOpenIs] = React.useState(false);

  useEffect(() => {
    userActions.getSelfUser().then(() => {
    }).catch(() => { });
  }, []);

  const openCreateServerModal = () => {
    createServerModalOpenIs(true);
  };

  const closeCreateServerModal = () => {
    createServerModalOpenIs(false);
  };

  return (
    <aside
      className="p-3 flex-col items-center bg-gray-800 text-white shadow h-full"
      style={{ width: '100px' }}
    >
      <div className="mb-3 flex justify-center items-center">
        <div
          className="transition-server ease-in-out duration-200 bg-indigo-500 hover:bg-indigo-500
        rounded-32 hover:rounded-20 h-16 w-16 flex items-center justify-center cursor-pointer"
        >
          <Link to="/" className="text-5xl text-white flex self-center">
            <span className="iconify" data-icon="bx:bxl-discord-alt" />
          </Link>
        </div>
      </div>

      <div className="w-12 h-0.5 m-auto bg-gray-600 rounded" />
      <ul className="my-3">
        {
          user && user.servers && user.servers.map((item) => (
            <li key={item.id} className="mb-3 w-full flex justify-center items-center">
              <Link to={`/server/${item.id}`}>
                <div
                  className={`${server && server.id === item.id ? 'rounded-20 bg-indigo-500' : 'rounded-32 hover:rounded-20'} flex items-center justify-center bg-gray-600 hover:bg-indigo-500
               h-16 w-16 cursor-pointer transition-server ease-in-out duration-200`}
                >
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="Server Avatar" className={`${server && server.id === item.id ? 'rounded-20 bg-indigo-500' : 'rounded-32 hover:rounded-20'} object-cover h-16 w-16`} />
                  ) : (
                    <h1 className="text-xl">{item.name[0]}</h1>
                  )}
                </div>
              </Link>
            </li>
          ))
        }
        <div className="flex justify-center items-center">
          <button type="button" onClick={openCreateServerModal}>
            <div
              className="flex items-center justify-center bg-gray-600 hover:bg-green-500 text-green-500 hover:text-white
              rounded-32 hover:rounded-20 h-16 w-16 cursor-pointer transition-server ease-in-out duration-200"
            >
              <div className="text-xl flex self-center">
                <i className="fal fa-plus" />
              </div>
            </div>
          </button>
        </div>
      </ul>
      {user
        && <CreateServer handleClose={closeCreateServerModal} isOpen={isCreateServerModalOpen} />}
    </aside>
  );
}

export default ServersSidebar;
