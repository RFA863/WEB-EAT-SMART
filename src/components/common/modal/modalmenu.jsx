import axios from "axios";
import parse from "html-react-parser";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function ModalComponent({ isOpen, onClose, menuId }) {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  const [menu, setMenu] = useState({
    id: 0,
    lemak: 0,
    nama: "",
    kalori: 0,
    detail: "",
    protein: 0,
    kategori: "",
    deskripsi: "",
    karbohidrat: 0,
    gambar_path: "",
    bahan_makanan: "",
  });

  if (!isOpen) return null;

  const handleClose = () => {
    onClose(); // Menutup modal
    navigate("/rekomendasi"); // Navigasi ke halaman rekomendasi
  };

  const fetchMenu = async () => {
    await axios
      .get(url + "/menu/get/" + menuId, {
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((res) => {
        const menuDetail = res.data.data;

        setMenu({
          ...menu,
          id: menuDetail.id,
          nama: menuDetail.nama,
          lemak: menuDetail.lemak,
          kalori: menuDetail.kalori,
          detail: menuDetail.detail,
          protein: menuDetail.protein,
          deskripsi: menuDetail.deskripsi,
          gambar_path: menuDetail.gambar_path,
          karbohidrat: menuDetail.karbohidrat,
          bahan_makanan: menuDetail.bahan_makanan.bahan,
          kategori: menuDetail.kategori_makanan.kategori,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const description = `
        <div className="font-semibold text-lg">Bahan-bahan </div> 
        <ul className="list-disc pl-5">
            <li>1 ekor bebek, berat sekitar 2-2,5kg/4lb 8oz-5lb 8oz</li>
            <li>1 buah persik</li>
            <li>2 sdt bubuk lima rempah Cina</li>
            <li>2 sdm merica sichuan</li>
            <li>2 sdt garam laut</li>
            <li>nasi melati dan irisan daun bawang, untuk penyajian</li>
        </ul>

        <div className="font-semibold text-lg">Cara Membuat </div> 
        <ol className="list-decimal pl-5">
            <li>Panaskan oven hingga 140C/120C fan/gas 1. Tusuk-tusuk kulit bebek dengan garpu – jangan menusuk terlalu dalam atau Anda malah akan menusuk dagingnya dan kehilangan semua sarinya selama proses memasak. Dorong seluruh buah persik ke dalam rongga bebek, selipkan lemak yang berlebih dengan rapi dan ikat kaki-kakinya dengan tali. Dengan menggunakan alu dan lumpang, tumbuk bersama lima rempah Cina, lada Sichuan, dan garam laut. Gosokkan ke seluruh bagian bebek dan taruh, sisi dada menghadap ke bawah, di rak dalam loyang panggang. Panggang selama 3 jam.</li>
            <li>Sementara itu, taruh buah persik, sisi yang dipotong menghadap ke atas, dalam wadah tahan oven yang cukup rapat. Campur madu, cuka, minyak wijen, jahe, dan hoisin dengan 3 sdm air. Tuangkan ke atas buah persik, lalu taburkan biji wijen di atasnya.</li>
            <li>Keluarkan bebek dari oven dan tiriskan lemak yang ada di dalam loyang. Naikkan suhu oven ke 200C/180C fan/gas 6 dan balik bebek sehingga bagian dada menghadap ke atas. Panggang selama 30 menit lagi, dengan buah persik di rak bawah, hingga bebek berwarna cokelat dan renyah serta buah persik empuk. Sajikan dengan nasi melati dan irisan daun bawang.</li>
        </ol>
    `;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-[1000px] max-h-screen mx-48 mt-10 mb-10 overflow-y-auto">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="mb-4 md:mb-0 w-full">
            <img
              src={menu.gambar_path}
              alt="Contoh Gambar"
              className="rounded-md"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">{menu.nama}</h2>
            <p className="text-gray-700">{menu.deskripsi}</p>
            <div>
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
                            ? menu.kalori
                            : index === 1
                            ? menu.protein
                            : index === 2
                            ? menu.lemak
                            : menu.karbohidrat}
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
            {parse(menu.detail)}
          </div>
        </div>
        <button
          onClick={handleClose}
          className="mt-6 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}

export default ModalComponent;
