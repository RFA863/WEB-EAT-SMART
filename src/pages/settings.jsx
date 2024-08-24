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
  // const [postData, setPostData] = useState({
  //   tanggal_lahir: "",
  //   tinggi: 0,
  //   berat: 0,
  //   jeniskelamin: "true",
  //   aktivitas_id: 0,
  //   tujuan_diet_id: 0,
  //   bahan_makanan_id: [],
  // });

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
        // console.log(bahanMakananDetail);

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
      <div className="w-full mx-8 my-16 sm:mx-20 md:mx-32 lg:mx-80 p-8 bg-backgroundPrimary rounded-lg">
        <p className="text-xl font-bold text-contentBrand">Profile Akun</p>

        <div className="my-6 text-sm font-medium">
          <form onSubmit={submitData}>
            <div className="flex items-center justify-around ">
              <div>
                <img
                  src={`https://ui-avatars.com/api/?name=${cookies.user}&background=4e73df&color=ffffff&size=150`}
                  className="rounded-full"
                  style={{ opacity: 0.8 }}
                  width="100"
                  height="100"
                  alt="Avatar"
                />
              </div>
              <div>
                <div className="my-3">
                  <div className="my-1">Username</div>

                  <input
                    type="text"
                    className=" custom-input"
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
                    type="text"
                    className=" custom-input"
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

            <div className="flex items-center justify-between">
              <div className="text-base">Informasi Demografi dan Kesehatan</div>
              {getIsDisable && (
                <button
                  className="bg-contentBrand px-6 py-2 rounded-lg text-white font-medium mr-24"
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
                placeholder="Date"
                className="w-1/2 custom-input"
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

              <div className="flex items-center justify-between w-1/2 ">
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
                    id=""
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

            <div className="w-3/4 flex justify-between items-center">
              <div className="my-3">
                <div className="my-1">Berat Badan</div>

                <div className="border border-borderPrimary rounded-lg  flex justify-between items-center focus-within:ring-1 focus-within:ring-blue-500">
                  <input
                    type="text"
                    placeholder="Isi Berat Badan"
                    className="appearance-none bg-transparent border-none outline-none focus:ring-0"
                    pattern="[0-9]*"
                    value={profile.berat}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        berat: Number(e.target.value.replace(/\D/g, "")),
                      })
                    }
                    required
                    disabled={getIsDisable}
                  />
                  <p className="text-black mx-2">Kg</p>
                </div>
              </div>

              <div className="my-3">
                <div className="my-1">Tinggi Badan</div>

                <div className="border border-borderPrimary rounded-lg  flex justify-between items-center focus-within:ring-1 focus-within:ring-blue-500">
                  <input
                    type="text"
                    placeholder="Isi Berat Badan"
                    className="appearance-none bg-transparent border-none outline-none focus:ring-0"
                    pattern="[0-9]*"
                    value={profile.tinggi}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        tinggi: Number(e.target.value.replace(/\D/g, "")),
                      })
                    }
                    required
                    disabled={getIsDisable}
                  />
                  <p className="text-black mx-2">Cm</p>
                </div>
              </div>
            </div>

            <div className="my-3">
              <div className="my-1">Aktivitas Harian</div>

              <Select
                className="w-1/2 border-none"
                isClearable={true}
                // isSearchable={true}
                options={aktivitas}
                placeholder="Pilih Tingkat Aktivitas Harian Kamu"
                value={profile.aktivitas_id}
                onChange={(e) => setProfile({ ...profile, aktivitas_id: e })}
                required
                isDisabled={getIsDisable}
              />
              <p className="text-xs font-normal text-contentPrimarySubtle">
                Aktivitas harian dapat berupa (ringan, sedang,dll)
              </p>
            </div>

            <div className="text-base my-6">Informasi Preferensi Diet</div>

            <div className="my-3">
              <div className="my-1">Tujuan Diet</div>

              <Select
                className="w-1/2 border-none"
                isClearable={true}
                // isSearchable={true}
                options={tujuanDiet}
                placeholder="Pilih Tujuan Diet Kamu"
                value={profile.tujuan_diet_id}
                onChange={(e) => setProfile({ ...profile, tujuan_diet_id: e })}
                required
                isDisabled={getIsDisable}
              />
              <p className="text-xs font-normal text-contentPrimarySubtle">
                Tujuan diet dapat berupa (menurunkan berat,dll)
              </p>
            </div>

            <div className="my-3">
              <div className="my-1">Bahan Utama</div>

              <Select
                className="w-1/2  border-none"
                isClearable={true}
                // isSearchable={true}
                options={bahanMakanan}
                isMulti
                closeMenuOnSelect={false}
                placeholder="Pilih Bahan Utama"
                value={profile.bahan_makanan_id}
                onChange={(e) =>
                  setProfile({ ...profile, bahan_makanan_id: e })
                }
                required
                isDisabled={getIsDisable}
              />
              <p className="text-xs font-normal text-contentPrimarySubtle">
                Pilih satu atau lebih
              </p>
            </div>

            {getIsDisable ? (
              <Link to="/rekomendasi">
                <button className="w-full py-2 bg-backgroundBrand rounded-lg text-white text-base font-medium">
                  Tutup
                </button>
              </Link>
            ) : (
              <div className="flex justify-between items-center gap-x-6">
                <button
                  className=" w-full py-2 bg-contentDisabled rounded-lg text-contentBrand text-base font-medium"
                  onClick={() => setIsDisable(true)}
                >
                  Kembali
                </button>

                <button
                  type="submit"
                  className=" w-full py-2 bg-backgroundBrand rounded-lg text-white text-base font-medium"
                >
                  Update
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
