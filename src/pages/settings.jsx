import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

function Settings() {
  const url = import.meta.env.VITE_API_URL;
  const [cookies] = useCookies(["token", "user"]);
  const navigate = useNavigate();

  const [tujuanDiet, setTujuanDiet] = useState([]);
  const [aktivitas, setAktivitas] = useState([]);
  const [bahanMakanan, setBahanMakanan] = useState([]);

  const [getIsDisable, setIsDisable] = useState(true);

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    tanggal_lahir: "",
    tinggi: 0,
    berat: 0,
    jeniskelamin: "true",
    aktivitas_id: {},
    tujuan_diet_id: {},
    bahan_makanan_id: [],
  });

  const fetchProfile = async () => {
    await axios
      .get(url + "/profile/get", {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((res) => {
        const profileData = res.data.data;
        const bahanMakananDetail = profileData.bahan_makanan_details;

        setProfile({
          username: profileData.user.username,
          email: profileData.user.email,
          tanggal_lahir: profileData.tanggal_lahir,
          tinggi: profileData.tinggi,
          berat: profileData.berat,
          jeniskelamin: String(profileData.jeniskelamin),
          aktivitas_id: {
            value: profileData.aktivitas_id,
            label: profileData.aktivita.aktivitas,
          },
          tujuan_diet_id: {
            value: profileData.tujuan_diet_id,
            label: profileData.tujuan_diet.tujuan,
          },
          bahan_makanan_id: bahanMakananDetail.map((item) => ({
            value: item.bahan_makanan.id,
            label: item.bahan_makanan.bahan,
          })),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAktivitas = async () => {
    await axios
      .get(url + "/profile/get-aktivitas", {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((res) => {
        const listAkivitas = res.data.data;

        setAktivitas(
          listAkivitas.map((item) => ({
            value: item.id,
            label: item.aktivitas,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchTujuanDiet = async () => {
    await axios
      .get(url + "/profile/get-tujuan-diet", {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((res) => {
        const listTujuan = res.data.data;

        setTujuanDiet(
          listTujuan.map((item) => ({
            value: item.id,
            label: item.tujuan,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchBahanMakanan = async () => {
    await axios
      .get(url + "/profile/get-bahan-makanan", {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((res) => {
        const listBahan = res.data.data;

        setBahanMakanan(
          listBahan.map((item) => ({
            value: item.id,
            label: item.bahan,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitData = async (e) => {
    e.preventDefault();

    const bodyRequest = {
      username: profile.username,
      email: profile.email,
      tanggal_lahir: profile.tanggal_lahir,
      tinggi: profile.tinggi,
      berat: profile.berat,
      jeniskelamin: JSON.parse(profile.jeniskelamin),
      aktivitas_id: profile.aktivitas_id.value,
      tujuan_diet_id: profile.tujuan_diet_id.value,
      bahan_makanan_id: profile.bahan_makanan_id.map((item) => item.value),
    };

    await axios
      .put(url + "/profile/update", bodyRequest, {
        headers: {
          Authorization: cookies.token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          navigate("/rekomendasi");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProfile();
    fetchAktivitas();
    fetchTujuanDiet();
    fetchBahanMakanan();
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-backgroundPrimaryBolder">
      <div className="w-full max-w-4xl mx-4 sm:mx-8 md:mx-16 lg:mx-24 p-8 bg-backgroundPrimary rounded-lg">
        <p className="text-xl font-bold text-contentBrand">Profile Akun</p>

        <div className="my-6 text-sm font-medium">
          <form onSubmit={submitData}>
            <div className="flex flex-col sm:flex-row items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <img
                  src={`https://ui-avatars.com/api/?name=${cookies.user}&background=4e73df&color=ffffff&size=150`}
                  className="rounded-full"
                  style={{ opacity: 0.8 }}
                  width="100"
                  height="100"
                  alt="Avatar"
                />
              </div>
              <div className="w-full sm:w-auto sm:ml-6">
                <div className="my-3">
                  <div className="my-1">Username</div>

                  <input
                    type="text"
                    className="w-full sm:w-auto custom-input"
                    value={profile.username}
                    onChange={(e) =>
                      setProfile({ ...profile, username: e.target.value })
                    }
                    required
                    disabled={getIsDisable}
                  />
                </div>
                <div className="my-3">
                  <div className="my-1">E-mail</div>

                  <input
                    type="email"
                    className="w-full sm:w-auto custom-input"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    required
                    disabled={getIsDisable}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="text-base mb-4 sm:mb-0">
                Informasi Demografi dan Kesehatan
              </div>
              {getIsDisable && (
                <button
                  className="bg-contentBrand px-6 py-2 rounded-lg text-white font-medium"
                  onClick={() => setIsDisable(false)}
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="my-3">
              <div className="my-1">Tanggal Lahir</div>

              <input
                type="date"
                className="w-full sm:w-1/2 custom-input"
                value={profile.tanggal_lahir}
                onChange={(e) => {
                  setProfile({ ...profile, tanggal_lahir: e.target.value });
                }}
                required
                disabled={getIsDisable}
              />
            </div>

            <div className="my-3">
              <div className="my-1">Jenis Kelamin</div>

              <div className="flex items-center justify-between w-full sm:w-1/2">
                <div className="flex gap-x-3 items-center">
                  <input
                    type="radio"
                    name="jenisKelamin"
                    value={"true"}
                    checked={profile.jeniskelamin === "true"}
                    onChange={(e) =>
                      setProfile({ ...profile, jeniskelamin: e.target.value })
                    }
                    required
                    disabled={getIsDisable}
                  />
                  <p>Laki - laki</p>
                </div>

                <div className="flex gap-x-3 items-center">
                  <input
                    type="radio"
                    name="jenisKelamin"
                    value={"false"}
                    checked={profile.jeniskelamin === "false"}
                    onChange={(e) =>
                      setProfile({ ...profile, jeniskelamin: e.target.value })
                    }
                    required
                    disabled={getIsDisable}
                  />
                  <p>Perempuan</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-y-3 sm:gap-y-0">
              <div className="w-full sm:w-1/2">
                <div className="my-3">
                  <div className="my-1">Berat Badan</div>

                  <div className="border border-borderPrimary rounded-lg overflow-hidden flex justify-between items-center custom-input">
                    <input
                      type="number"
                      className="w-full"
                      value={profile.berat}
                      onChange={(e) =>
                        setProfile({ ...profile, berat: e.target.value })
                      }
                      required
                      disabled={getIsDisable}
                    />
                    <span className="w-auto px-2">kg</span>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <div className="my-3">
                  <div className="my-1">Tinggi Badan</div>

                  <div className="border border-borderPrimary rounded-lg overflow-hidden flex justify-between items-center custom-input">
                    <input
                      type="number"
                      className="w-full"
                      value={profile.tinggi}
                      onChange={(e) =>
                        setProfile({ ...profile, tinggi: e.target.value })
                      }
                      required
                      disabled={getIsDisable}
                    />
                    <span className="w-auto px-2">cm</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-3">
              <div className="my-1">Aktivitas</div>
              <div className="border border-borderPrimary rounded-lg overflow-hidden custom-input">
                <Select
                  options={aktivitas}
                  value={profile.aktivitas_id}
                  onChange={(option) =>
                    setProfile({ ...profile, aktivitas_id: option })
                  }
                  placeholder="Pilih aktivitas"
                  isDisabled={getIsDisable}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      minHeight: "unset",
                    }),
                  }}
                />
              </div>
            </div>

            <div className="my-3">
              <div className="my-1">Tujuan Diet</div>
              <div className="border border-borderPrimary rounded-lg overflow-hidden custom-input">
                <Select
                  options={tujuanDiet}
                  value={profile.tujuan_diet_id}
                  onChange={(option) =>
                    setProfile({ ...profile, tujuan_diet_id: option })
                  }
                  placeholder="Pilih tujuan diet"
                  isDisabled={getIsDisable}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      minHeight: "unset",
                    }),
                  }}
                />
              </div>
            </div>

            <div className="my-3">
              <div className="my-1">Bahan Makanan yang Tidak Disukai</div>
              <div className="border border-borderPrimary rounded-lg overflow-hidden custom-input">
                <Select
                  isMulti
                  options={bahanMakanan}
                  value={profile.bahan_makanan_id}
                  onChange={(option) =>
                    setProfile({ ...profile, bahan_makanan_id: option })
                  }
                  placeholder="Pilih bahan makanan"
                  isDisabled={getIsDisable}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      minHeight: "unset",
                    }),
                  }}
                />
              </div>
            </div>

            {!getIsDisable && (
              <button
                type="submit"
                className="mt-6 w-full sm:w-auto bg-contentBrand px-6 py-2 rounded-lg text-white font-medium"
              >
                Simpan
              </button>
            )}
          </form>
        </div>
        <div className="flex justify-between items-center">
          <Link to="/beranda" className="text-contentBrand">
            &larr; Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Settings;
