import axios from "axios";
import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";

import ModalComponent from "../components/common/modal/modalmenu";
import { useNavigate } from "react-router-dom";

function Rekomendasi() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [profile, setProfile] = useState({
    id: 0,
    username: "",
    berat: 0,
    ibm: "",
    bmr: 0,
    total_kalori: 0,
    protein: 0,
    karbohidrat: 0,
    lemak: 0,
    tujuan_diet: "",
  });

  const [cookies] = useCookies(["token"]);
  const url = import.meta.env.VITE_API_URL;

  const [menuId, setMenuId] = useState();
  const openModal = (menu_id) => {
    setMenuId(menu_id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // setMenuId(null);
    setIsModalOpen(false);
  };

  const fetchMenu = async () => {
    await axios
      .get(url + "/menu/get", {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((res) => {
        const listData = res.data.data;
        // console.log(listData);
        setMenu(
          listData.map((item) => ({
            id: item.id,
            menu_id: item.menu_id,
            nama: item.menu.nama,
            gambar: item.menu.gambar_path, // Mengganti 'gambat_path' dengan 'gambar_path'
            deskripsi: item.menu.deskripsi,
          }))
        );
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/masuk");
        }
      });
  };

  const fetchProfile = async () => {
    await axios
      .get(url + "/profile/get", {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((res) => {
        const profileData = res.data.data;
        setProfile({
          ...profile,
          id: profileData.id,
          username: profileData.user.username,
          berat: profileData.berat,
          ibm: profileData.ibm,
          bmr: profileData.bmr,
          total_kalori: profileData.total_kalori,
          protein: profileData.protein,
          karbohidrat: profileData.karbohidrat,
          lemak: profileData.lemak,
          tujuan_diet: profileData.tujuan_diet.tujuan,
        });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/masuk");
        }
      });
  };

  useEffect(() => {
    fetchMenu();
    fetchProfile();
  }, []);

  return (
    <>
      <section className="max-w-full px-40 py-16">
        {/* flex gap-12 justify-center items-center */}
        <div className="">
          <div>
            <h1 className="mb-5 text-contentPrimary font-medium text-xl text-center">
              Data Kondisi Tubuh
            </h1>
            <div className="flex flex-wrap md:flex-row gap-9 justify-center items-center">
              {["Tujuan Diet", "IBM", "Berat Badan", "BMR"].map(
                (bodyCondition, index) => (
                  <div
                    key={index}
                    className="bg-backgroundInformationSubtlest p-4 rounded-lg w-44 h-32 shadow-md"
                  >
                    <div className=" mb-1 text-contentInformation font-medium text-lg text-center ">
                      <p>{bodyCondition}</p>
                      <p className="font-bold">
                        {index === 0
                          ? profile.tujuan_diet
                          : index === 1
                          ? profile.ibm
                          : index === 2
                          ? profile.berat
                          : profile.bmr}
                      </p>
                    </div>
                    <p className="px-5 text-contentPrimarySubtlest text-sm text-center">
                      {index === 0
                        ? ""
                        : index === 1
                        ? ""
                        : index === 2
                        ? "Kg"
                        : "Kcal"}
                    </p>
                  </div>
                )
              )}

              {/* {['Kalori', 'Protein', 'Lemak', 'Karbohidrat'].map((nutrient, index) => (
                                <div key={index} className='bg-backgroundInformationSubtlest p-6 rounded-lg'>
                                    <div className='w-24 mb-1 text-contentInformation font-medium text-lg text-center'>
                                        <p>{nutrient}</p>
                                        <p>{index === 0 ? 400 : index === 1 ? 15 : index === 2 ? 10 : 60}</p>
                                    </div>
                                    <p className='px-5 text-contentPrimarySubtlest text-sm text-center'>
                                        {index === 0 ? 'Kcal' : 'g'}
                                    </p>
                                </div>
                            ))} */}
            </div>
          </div>
          <div className=" mt-8">
            <h1 className="mb-5 text-contentPrimary font-medium text-xl text-center">
              Kebutuhan Nutrisi Hari Ini
            </h1>
            <div className="flex flex-wrap md:flex-row gap-9 justify-center items-center">
              {["Kalori", "Protein", "Lemak", "Karbohidrat"].map(
                (nutrient, index) => (
                  <div
                    key={index}
                    className="bg-backgroundBrandSubtlest p-6 rounded-lg"
                  >
                    <div className="w-24 mb-1 text-contentBrand font-medium text-lg text-center">
                      <p>{nutrient}</p>
                      <p>
                        {index === 0
                          ? profile.total_kalori
                          : index === 1
                          ? profile.protein
                          : index === 2
                          ? profile.lemak
                          : profile.karbohidrat}
                      </p>
                    </div>
                    <p className="px-5 text-contentPrimarySubtlest text-sm text-center">
                      {index === 0 ? "Kcal" : "g"}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h1 className="mb-5 text-contentPrimary font-medium text-xl">
            {`Selamat Datang, ${profile.username} !`}
          </h1>
          <p className="text-contentPrimarySubtle text-base w-[350px]">
            Berikut adalah rekomendasi menu sehat khusus untuk anda.
          </p>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
              {menu.map((item, index) => (
                <div
                  key={index}
                  className="bg-backgroundPrimary p-3 rounded-lg shadow-lg"
                >
                  <div className="mb-4">
                    <div className="h-40 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={item.gambar} // Menggunakan 'gambar' yang sudah diperbaiki
                        className="w-full h-auto"
                        alt="Rekomendasi Makanan Sehat"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-contentPrimary text-left">
                      {item.nama}
                    </h3>
                  </div>
                  <p className="mb-3 text-contentPrimarySubtle text-justify">
                    {item.deskripsi}
                  </p>
                  <button
                    onClick={() => openModal(item.menu_id)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-backgroundBrand rounded-lg hover:bg-backgroundBrandBolder"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              {/* {[1, 2, 3].map((item, index) => (
                <div
                  key={index}
                  className="bg-backgroundPrimary p-3 rounded-lg shadow-lg"
                >
                  <div className="mb-4">
                    <div className="h-40 rounded-lg mb-4 overflow-hidden">
                      <img
                        src="../../../../public/contoh makanan.png"
                        className="w-full h-auto"
                        alt="Rekomendasi Makanan Sehat"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-contentPrimary text-left">
                      Rekomendasi Makanan Sehat
                    </h3>
                  </div>
                  <p className="mb-3 text-contentPrimarySubtle text-justify">
                    Fitur ini memungkinkan pengguna untuk menerima rekomendasi
                    makanan sehat berdasarkan profil nutrisi dan preferensi
                    mereka yang disimpan dalam akun. Setiap rekomendasi
                    dipersonalisasi untuk memastikan pengguna mendapatkan
                    makanan yang sesuai dengan tujuan kesehatan mereka.
                  </p>
                  <button
                    onClick={openModal}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-backgroundBrand rounded-lg hover:bg-backgroundBrandBolder"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={closeModal}
          menuId={menuId}
        />
      )}
    </>
  );
}

export default Rekomendasi;
