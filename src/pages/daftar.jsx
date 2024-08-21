import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function Daftar() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const [cookies, setCookie] = useCookies(["token", "user"]);
  const [postData, setPostData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const submitData = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(url + "/auth/register", postData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log(res.data.status);
          if (res.data.status === 200) {
            const token = res.data.data.token;
            const user = res.data.data.regisUser.username;
            setCookie("token", token, {
              expires: new Date(Date.now() + 58 * 60 * 1000),
            });

            setCookie("user", user, {
              expires: new Date(Date.now() + 58 * 60 * 1000),
            });
            navigate("/personalisasi");
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
          Selamat Datang
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
                placeholder="Masukkan e-mail"
                className="w-full custom-input"
                value={postData.email}
                onChange={(e) => {
                  setPostData({ ...postData, email: e.target.value });
                }}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="nama" className="block custom-label">
                Nama
              </label>
              <input
                id="nama"
                type="text"
                placeholder="Masukkan nama lengkap"
                className="w-full custom-input"
                value={postData.username}
                onChange={(e) =>
                  setPostData({ ...postData, username: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block custom-label">
                Kata Sandi
              </label>
              <input
                id="password"
                type="password"
                placeholder="Masukkan kata sandi"
                className="w-full custom-input"
                value={postData.password}
                onChange={(e) =>
                  setPostData({ ...postData, password: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirm-password" className="block custom-label">
                Konfirmasi Kata Sandi
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Konfirmasi kata sandi"
                className="w-full custom-input"
                value={postData.confirmPassword}
                onChange={(e) =>
                  setPostData({ ...postData, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mb-2 text-red-600 h-4">{errorMessage}</div>

          <button type="submit" className="w-full btn-medium btn-primary mb-4">
            Daftar
          </button>
        </form>

        <p className="text-sm font-medium text-contentPrimary text-center">
          Sudah punya akun?
          <Link to="/masuk">
            <button
              type="button"
              className="ml-1 text-contentBrand hover:text-contentPrimarySubtle active:text-contentBrand focus:underline"
            >
              Masuk sekarang
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Daftar;
