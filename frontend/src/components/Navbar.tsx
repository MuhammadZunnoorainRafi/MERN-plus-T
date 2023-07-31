import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/rtkHooks';
import { logout } from '../features/authSlice';
import { useState } from 'react';
import { motion } from 'framer-motion';

type themeType = {
  darkTheme: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDarkTheme: any;
};

function Navbar({ darkTheme, setDarkTheme }: themeType) {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    setShowMenu(!showMenu);
    setOpen(false);
  };
  const [showMenu, setShowMenu] = useState(false);
  const NavItem = [
    { id: 'home', href: '/', title: 'Home' },
    { id: 'blog', href: '/blogs', title: 'Blogs' },
    { id: 'about', href: '/about', title: 'About' },
  ];

  const location = useLocation();
  const pathName = location.pathname;

  const [hovered, setHovered] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* desktop screen */}
      <div className="px-6 md:px-12 py-3 flex bg-base-300 text-base-content  items-center justify-between">
        <Link
          to="/"
          className="btn  btn-ghost font-bold text-3xl tracking-wider"
        >
          Blogverse
        </Link>

        <div className="hidden md:flex items-center  justify-center ">
          {NavItem.map((val) => {
            return (
              <Link to={val.href} key={val.id}>
                <motion.div
                  className={`${
                    hovered === val.id || pathName === val.href
                      ? darkTheme === 'dark'
                        ? 'text-slate-50 '
                        : 'text-black'
                      : ''
                  }  relative px-4  py-1 `}
                  onHoverStart={() => setHovered(val.id)}
                  onHoverEnd={() => setHovered('')}
                >
                  {hovered === val.id && (
                    <motion.span
                      layoutId="nav-item"
                      className={`absolute  inset-0  rounded-md ${
                        darkTheme === 'dark'
                          ? 'bg-opacity-10 bg-slate-100'
                          : 'bg-opacity-10 bg-slate-900'
                      }   `}
                      transition={{
                        type: 'spring',
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span>{val.title}</span>
                </motion.div>
                {pathName === val.href && (
                  <motion.div
                    layoutId="border-anm"
                    transition={{
                      type: 'spring',
                      duration: 0.6,
                    }}
                    className={`${
                      pathName === val.href && darkTheme === 'dark'
                        ? 'border-b-2  border-b-slate-50 '
                        : 'border-b-2 border-slate-950'
                    } mx-4 `}
                  ></motion.div>
                )}
              </Link>
            );
          })}
        </div>
        <div className="hidden md:flex  items-center justify-center gap-2">
          <button
            className="btn btn-sm glass "
            onClick={() =>
              darkTheme === 'light'
                ? setDarkTheme('dark')
                : setDarkTheme('light')
            }
          >
            {darkTheme === 'dark' ? (
              <svg
                className="swap-on fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            ) : (
              <svg
                className="swap-off fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            )}
          </button>
          {user ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.6,
                },
              }}
              className="dropdown dropdown-end"
            >
              <label
                onClick={() => setShowMenu(!showMenu)}
                tabIndex={0}
                className="btn btn-ghost  btn-circle "
              >
                <div>
                  <img
                    src={user.image!}
                    className=" rounded-full h-10 w-10 object-cover"
                    alt="Profile image error"
                  />
                </div>
              </label>

              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                }}
                tabIndex={0}
                className={`${
                  showMenu ? 'absolute right-1 top-12' : 'hidden'
                } mt-1 z-[1] p-2 bg-slate-50 border border-slate-400  shadow menu menu-sm  dark:bg-base-100 rounded-box w-52 `}
              >
                <h2 className=" menu-title"> Hey, {user.name}!</h2>
                <ul>
                  <li>
                    <Link
                      onClick={() => setShowMenu(!showMenu)}
                      to="/upd-user"
                      className="justify-between"
                    >
                      Profile
                    </Link>
                  </li>

                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </motion.ul>
            </motion.div>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary">
              Login
            </Link>
          )}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="z-20 text-center   pl-[14px] btn btn-circle inline md:hidden"
        >
          {/* hamburger icon */}
          {!open ? (
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          ) : (
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          )}
        </button>
      </div>
      <div
        className={`${
          open ? 'w-64' : 'w-0'
        } h-full ease-in-out duration-200 bg-slate-900 text-slate-100 overflow-x-hidden z-10 absolute top-0 right-0 whitespace-nowrap md:hidden`}
      >
        <div className={'flex flex-col overflow-hidden space-y-3 pt-20  p-5'}>
          {user ? (
            <div className="space-y-2 border border-slate-400 rounded-md p-2">
              <div>
                <img
                  src={user.image!}
                  className=" rounded-full h-10 w-10 object-cover"
                  alt="Profile image error"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-2">
                <h2 className="font-bold text-secondary"> Hey, {user.name}!</h2>
                <Link
                  onClick={() => setOpen(!open)}
                  className="hover:text-slate-300"
                  to="/upd-user"
                >
                  Profile
                </Link>

                <button className="hover:text-slate-300" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              onClick={() => setOpen(!open)}
              to="/login"
              className="btn btn-sm btn-primary"
            >
              Login
            </Link>
          )}
          {NavItem.map((val) => {
            return (
              <Link
                onClick={() => setOpen(!open)}
                className="hover:text-slate-300"
                to={val.href}
                key={val.id}
              >
                {val.title}
              </Link>
            );
          })}
        </div>
        <div className="flex  p-5 flex-col md:hidden   gap-2">
          <button
            className="btn btn-sm   "
            onClick={() =>
              darkTheme === 'light'
                ? setDarkTheme('dark')
                : setDarkTheme('light')
            }
          >
            {darkTheme === 'dark' ? (
              <svg
                className="swap-on fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            ) : (
              <svg
                className="swap-off fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
