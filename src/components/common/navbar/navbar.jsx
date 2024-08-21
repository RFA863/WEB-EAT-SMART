import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function NavbarComponent({ setActiveContent, isLogin, getProfile }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //   const [isLogin, setIsLogin] = useState(false);
  const [cookies] = useCookies(["user"]);

  // console.log(getProfile);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path
      ? "text-contentBrand"
      : "text-contentPrimarySubtle";
  };

  //   useEffect(() => {
  //     if (cookies.token) {
  //       setIsLogin(true);
  //     }
  //   }, [cookies]);

  return (
    <>
      <nav className="bg-backgroundPrimary border-b-2">
        <div className="max-w-full flex flex-wrap items-center justify-between py-8 px-40">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="../../../../public/logo eat smart 80cm.svg"
              className="h-8"
              alt="Eat Smart Logo"
            />
            <span className="text-contentBrand self-center text-2xl font-semibold whitespace-nowrap">
              | EAT SMART
            </span>
          </a>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col items-center font-medium mt-2 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row">
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    setActiveContent("beranda");
                    toggleMenu();
                  }}
                  className={`block py-2 px-3 md:p-0 rounded md:bg-transparent md:border-0 ${isActive(
                    "/"
                  )}`}
                  aria-current="page"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/rekomendasi"
                  onClick={() => {
                    setActiveContent("rekomendasi");
                    toggleMenu();
                  }}
                  className={`block py-2 px-3 md:p-0 rounded md:bg-transparent md:border-0 ${isActive(
                    "/rekomendasi"
                  )}`}
                >
                  Rekomendasi
                </Link>
              </li>
              <li>
                <Link
                  to="/smartchat"
                  onClick={() => {
                    setActiveContent("smartchat");
                    toggleMenu();
                  }}
                  className={`block py-2 px-3 md:p-0 rounded md:bg-transparent md:border-0 ${isActive(
                    "/smartchat"
                  )}`}
                >
                  Smart Chat
                </Link>
              </li>
              {cookies.user ? (
                <Link to="/settings">
                  <img
                    src={`https://ui-avatars.com/api/?name=${cookies.user}&background=4e73df&color=ffffff&size=150`}
                    className="rounded-full"
                    style={{ opacity: 0.8 }}
                    width="40"
                    height="40"
                    alt="Avatar"
                  />
                </Link>
              ) : (
                <div className="flex space-x-4">
                  <Link to="/masuk">
                    <button type="button" className="btn-small btn-secondary">
                      Masuk
                    </button>
                  </Link>
                  <Link to="/daftar">
                    <button type="button" className="btn-small btn-primary">
                      Daftar
                    </button>
                  </Link>
                </div>
              )}
              {/* //   <div className="flex space-x-4">
            //     <Link to="/masuk">
            //       <button type="button" className="btn-small btn-secondary">
            //         Masuk
            //       </button>
            //     </Link>
            //     <Link to="/daftar">
            //       <button type="button" className="btn-small btn-primary">
            //         Daftar
            //       </button>
            //     </Link>
            //   </div> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarComponent;
