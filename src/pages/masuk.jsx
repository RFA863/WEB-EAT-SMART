import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function Masuk() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const [cookies, setCookie] = useCookies(["token", "user"]);

  const [postData, setPostData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const submitData = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(url + "/auth/login", postData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            const token = res.data.data.token;
            const user = res.data.data.getUser.username;

            setCookie("token", token, {
              expires: new Date(Date.now() + 58 * 60 * 1000),
            });

            setCookie("user", user, {
              expires: new Date(Date.now() + 58 * 60 * 1000),
            });
            navigate("/rekomendasi");
          }
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
        });
    } catch (error) {
      setErrorMessage("System error, please try again later !");
    }

    // console.log(postData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-backgroundPrimaryBolder">
      <div className="w-full mx-8 my-16 sm:mx-20 md:mx-32 lg:mx-80 p-8 bg-backgroundPrimary rounded-lg">
        <h2 className="text-xl font-bold mb-8 text-contentBrand">
          Selamat Datang Kembali
        </h2>

        <form onSubmit={submitData}>
          <div className="mb-8">
            <div className="mb-6">
              <label htmlFor="email" className="block custom-label">
                E-Mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="Silahkan masukkan e-mail anda"
                className="w-full custom-input"
                value={postData.username}
                onChange={(e) => {
                  setPostData({ ...postData, username: e.target.value });
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block custom-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Silahkan masukkan kata sandi anda"
                className="w-full custom-input mb-4"
                value={postData.password}
                onChange={(e) => {
                  setPostData({ ...postData, password: e.target.value });
                }}
              />
              {/* <div className="text-center">
              <a
                href="#"
                className="text-sm font-medium text-contentBrand hover:text-contentPrimarySubtle active:text-contentBrand focus:underline"
              >
                Lupa kata sandi?
              </a>
            </div> */}
            </div>
          </div>

          <div className="mb-2 text-red-600 h-4">{errorMessage}</div>

          <button type="submit" className="w-full btn-medium btn-primary mb-4">
            Masuk
          </button>
        </form>

        <p className="text-sm font-medium text-contentPrimary text-center">
          Belum punya akun?
          <Link to="/daftar">
            <button
              type="button"
              className="ml-1 text-contentBrand hover:text-contentPrimarySubtle active:text-contentBrand focus:underline"
            >
              Daftar sekarang
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Masuk;
