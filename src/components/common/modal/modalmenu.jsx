import React from 'react';
import { useNavigate } from 'react-router-dom';

function ModalComponent({ isOpen, onClose }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleClose = () => {
        onClose(); // Menutup modal
        navigate('/rekomendasi'); // Navigasi ke halaman rekomendasi
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-[1000px] mx-48 mt-10 mb-10">
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="mb-4 md:mb-0 w-full">
                        <img src="../../../../public/contoh makanan.png" alt="Contoh Gambar" className="rounded-md" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-2">Judul Modal</h2>
                        <p className="text-gray-700">
                        Smoothie bowl buah adalah pilihan sarapan yang lezat dan sehat untuk memulai hari Anda dengan energi dan gizi yang cukup. Dengan paduan buah-buahan segar, yogurt Greek rendah lemak, granola, dan biji chia, smoothie bowl ini tidak hanya memberikan nutrisi yang tinggi namun juga memberikan rasa yang memuaskan. Cocok untuk mereka yang menginginkan sarapan yang mengenyangkan dan bergizi tanpa meningkatkan asupan lemak yang berlebihan. Rasakan kelezatan buah-buahan segar dalam setiap sendokan, disertai dengan rasa kenyang yang tahan lama.
                        </p>
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
