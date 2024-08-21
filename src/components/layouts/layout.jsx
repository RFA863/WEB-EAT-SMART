import axios from "axios";
import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import NavbarComponent from "../common/navbar/navbar";
import FooterComponent from "../common/footer/footer";
import Beranda from "../../pages/beranda";
import Rekomendasi from "../../pages/rekomendasi";
import SmartChat from "../../pages/smartchat";
import Settings from "../../pages/settings";
import Personalisasi from "../../pages/personalisasi";

function Layout() {
  const [activeContent, setActiveContent] = useState("beranda");
  const location = useLocation();
  // const [cookies] = useCookies(["token"]);
  // const [isLogin, setIsLogin] = useState(false);
  // const [getProfile, setGetProfile] = useState({});

  // const url = import.meta.env.VITE_API_URL;

  // const fetchData = async () => {
  //   await axios
  //     .get(url + "/profile/get", {
  //       headers: {
  //         Authorization: cookies.token,
  //       },
  //     })
  //     .then((res) => {
  //       setGetProfile(res.data.data);
  //     });
  // };

  // useEffect(() => {
  //   if (cookies.token) {
  //     setIsLogin(true);
  //     // fetchData();
  //   }
  // }, [cookies]);

  //   const renderContent = () => {
  //     switch (activeContent) {
  //       case "rekomendasi":
  //         return <Rekomendasi />;
  //       case "smartchat":
  //         return <SmartChat />;
  //       case "settings":
  //         return <Settings />;
  //       case "beranda":
  //       default:
  //         return <Beranda />;
  //     }
  //   };

  // Check if the current path is "masuk" or "daftar"
  const hideNavbarAndFooter =
    location.pathname === "/masuk" ||
    location.pathname === "/daftar" ||
    location.pathname === "/personalisasi";

  return (
    <>
      {!hideNavbarAndFooter && (
        <NavbarComponent
          setActiveContent={setActiveContent}
          // isLogin={isLogin}
          // getProfile={getProfile}
        />
      )}
      <div>
        {/* {renderContent()} */}
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/rekomendasi" element={<Rekomendasi />} />
          <Route path="/smartchat" element={<SmartChat />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/personalisasi" element={<Personalisasi />} />
        </Routes>
      </div>
      {!hideNavbarAndFooter && <FooterComponent />}
    </>
  );
}

export default Layout;
