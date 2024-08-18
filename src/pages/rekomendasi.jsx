import React, { useState } from 'react';
import ModalComponent from '../components/common/modal/modalmenu';

function Rekomendasi() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <section className='max-w-full px-40 py-16'>
                <div className='flex gap-12 justify-center items-center'>
                    <div>
                        <h1 className='mb-5 text-contentPrimary font-medium text-xl text-center'>Kebutuhan Nutrisi Harian</h1>
                        <div className='flex flex-wrap md:flex-row gap-9 justify-center items-center'>
                            {['Kalori', 'Protein', 'Lemak', 'Karbohidrat'].map((nutrient, index) => (
                                <div key={index} className='bg-backgroundInformationSubtlest p-6 rounded-lg'>
                                    <div className='w-24 mb-1 text-contentInformation font-medium text-lg text-center'>
                                        <p>{nutrient}</p>
                                        <p>{index === 0 ? 400 : index === 1 ? 15 : index === 2 ? 10 : 60}</p>
                                    </div>
                                    <p className='px-5 text-contentPrimarySubtlest text-sm text-center'>
                                        {index === 0 ? 'Kcal' : 'g'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h1 className='mb-5 text-contentPrimary font-medium text-xl text-center'>Kebutuhan Nutrisi Hari Ini</h1>
                        <div className='flex flex-wrap md:flex-row gap-9 justify-center items-center'>
                            {['Kalori', 'Protein', 'Lemak', 'Karbohidrat'].map((nutrient, index) => (
                                <div key={index} className='bg-backgroundBrandSubtlest p-6 rounded-lg'>
                                    <div className='w-24 mb-1 text-contentBrand font-medium text-lg text-center'>
                                        <p>{nutrient}</p>
                                        <p>{index === 0 ? 400 : index === 1 ? 15 : index === 2 ? 10 : 60}</p>
                                    </div>
                                    <p className='px-5 text-contentPrimarySubtlest text-sm text-center'>
                                        {index === 0 ? 'Kcal' : 'g'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='mt-14'>
                    <h1 className='mb-5 text-contentPrimary font-medium text-xl'>Selamat Pagi, Genta!</h1>
                    <p className='text-contentPrimarySubtle text-base w-[350px]'>
                        Berikut adalah rekomendasi menu sehat khusus untuk anda hari ini.
                    </p>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                            {[1, 2, 3].map((item, index) => (
                                <div key={index} className="bg-backgroundPrimary p-3 rounded-lg shadow-lg">
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
                                        Fitur ini memungkinkan pengguna untuk menerima rekomendasi makanan sehat berdasarkan profil
                                        nutrisi dan preferensi mereka yang disimpan dalam akun. Setiap rekomendasi dipersonalisasi
                                        untuk memastikan pengguna mendapatkan makanan yang sesuai dengan tujuan kesehatan mereka.
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
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {isModalOpen && <ModalComponent isOpen={isModalOpen} onClose={closeModal} />}
        </>
    );
}

export default Rekomendasi;
