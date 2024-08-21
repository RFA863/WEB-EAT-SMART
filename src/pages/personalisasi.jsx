import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function Personalisasi() {
  const url = import.meta.env.VITE_API_URL;
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const [tujuanDiet, setTujuanDiet] = useState([]);
  const [aktivitas, setAktivitas] = useState([]);
  const [bahanMakanan, setBahanMakanan] = useState([]);

  const [postData, setPostData] = useState({
    tanggal_lahir: "",
    tinggi: 0,
    berat: 0,
    jeniskelamin: "true",
    aktivitas_id: 0,
    tujuan_diet_id: 0,
    bahan_makanan_id: [],
  });

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
      tanggal_lahir: postData.tanggal_lahir,
      tinggi: postData.tinggi,
      berat: postData.berat,
      jeniskelamin: JSON.parse(postData.jeniskelamin),
      aktivitas_id: postData.aktivitas_id.value,
      tujuan_diet_id: postData.tujuan_diet_id.value,
      bahan_makanan_id: postData.bahan_makanan_id.map((item) => item.value),
    };

    await axios
      .post(url + "/profile/input", bodyRequest, {
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
    fetchAktivitas();
    fetchTujuanDiet();
    fetchBahanMakanan();
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-backgroundPrimaryBolder">
      <div className="w-full mx-8 my-16 sm:mx-20 md:mx-32 lg:mx-80 p-8 bg-backgroundPrimary rounded-lg">
        <p className="text-xl font-bold text-contentBrand">
          Personalisasi Akun
        </p>

        <div className="my-6 text-sm font-medium">
          <form onSubmit={submitData}>
            <div className="text-base">Informasi Demografi dan Kesehatan</div>

            <div className="my-3">
              <div className="my-1">Tanggal Lahir</div>

              <input
                type="date"
                placeholder="Date"
                className="w-1/2 custom-input"
                value={postData.tanggal_lahir}
                onChange={(e) => {
                  setPostData({ ...postData, tanggal_lahir: e.target.value });
                }}
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
                    checked={postData.jeniskelamin === "true"}
                    onChange={(e) =>
                      setPostData({ ...postData, jeniskelamin: e.target.value })
                    }
                  />
                  <p>Laki - laki</p>
                </div>

                <div className="flex gap-x-3 items-center">
                  <input
                    type="radio"
                    name="jenisKelamin"
                    id=""
                    value={"false"}
                    checked={postData.jeniskelamin === "false"}
                    onChange={(e) =>
                      setPostData({ ...postData, jeniskelamin: e.target.value })
                    }
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
                    value={postData.berat}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        berat: Number(e.target.value.replace(/\D/g, "")),
                      })
                    }
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
                    value={postData.tinggi}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        tinggi: Number(e.target.value.replace(/\D/g, "")),
                      })
                    }
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
                value={postData.aktivitas_id}
                onChange={(e) => setPostData({ ...postData, aktivitas_id: e })}
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
                value={postData.tujuan_diet_id}
                onChange={(e) =>
                  setPostData({ ...postData, tujuan_diet_id: e })
                }
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
                value={postData.bahan_makanan_id}
                onChange={(e) =>
                  setPostData({ ...postData, bahan_makanan_id: e })
                }
              />
              <p className="text-xs font-normal text-contentPrimarySubtle">
                Pilih satu atau lebih
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-backgroundBrand rounded-lg text-white text-base font-medium"
            >
              Selanjutnya
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Personalisasi;
