import React from 'react';

function Beranda() {
    return (
        <>
            <section class="flex flex-col-reverse md:flex-row mx-8 my-16 md:mx-20 lg:mx-56 lg:my-16 space-y-8 md:space-y-0 md:space-x-12 gap-10">
        
                <div class="flex-1 text-center md:text-left">
                    <h1 class="text-3xl text-contentPrimary md:text-5xl font-bold mb-4 md:mb-8 text-justify">Eat Smart: Panduan Anda untuk gaya hidup lebih sehat.</h1>
                    <p class="text-xl text-contentPrimarySubtle md:text-2xl font-regular mb-4 md:mb-8 text-justify">Temukan berbagai tips, resep, dan informasi yang akan membantu Anda menjalani hidup lebih baik setiap hari.</p>
                    <button class="w-full btn-large btn-primary">Coba Sekarang</button>
                </div>
    
                <div class="flex-1 flex items-center justify-center min-h-64">
                <img src="../../../../public/Mockup.svg" className="" alt="Mockup" />
                </div>
            </section>

            <section class="flex flex-col md:flex-row px-8 md:px-20 lg:px-56 py-16 bg-backgroundBrandSubtlest gap-10">
            
                <div class="flex-1 text-center md:text-left mb-8 md:mb-0">
                    <h1 class="text-3xl font-bold text-contentBrand mb-2">Kenapa Eat Smart?</h1>
                    <p class="text-lg text-contentPrimarySubtle mb-8">Pilihan Pintar untuk Kesehatan dan Kebahagiaan</p>
                        <img src="../../../../public/Why.svg" className="ml-[-35px]" alt="Mockup" />
                </div>
            
                <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-orange-100 p-6 rounded-lg">
                        <h2 class="text-xl font-semibold text-contentPrimary">Pilihan Nutrisi yang Sehat</h2>
                        <p class="text-contentPrimarySubtle mt-2">Eat Smart menyediakan pilihan makanan sehat yang kaya akan nutrisi penting seperti vitamin, mineral, dan serat. Setiap hidangan dirancang untuk mendukung kesehatan dan vitalitas tubuh.</p>
                    </div>
                    <div class="bg-orange-100 p-6 rounded-lg">
                        <h2 class="text-xl font-semibold text-contentPrimary">Dukungan bagi Gaya Hidup Aktif</h2>
                        <p class="text-contentPrimarySubtle mt-2">Dengan memilih Eat Smart, Anda mendukung gaya hidup aktif. Makanan yang dipilih secara cerdas tidak hanya memberi energi yang cukup, tetapi juga membantu dalam pemulihan dan peningkatan performa fisik.</p>
                    </div>
                    <div class="bg-orange-100 p-6 rounded-lg">
                        <h2 class="text-xl font-semibold text-contentPrimary">Pilihan Makanan Berimbang</h2>
                        <p class="text-contentPrimarySubtle mt-2">Eat Smart menawarkan pilihan makanan yang seimbang antara karbohidrat, protein, lemak sehat, serta serat. Ini membantu menjaga stabilitas energi sepanjang hari dan mendukung fungsi tubuh yang optimal.</p>
                    </div>
                    <div class="bg-orange-100 p-6 rounded-lg">
                        <h2 class="text-xl font-semibold text-contentPrimary">Inovasi Menu Berkala</h2>
                        <p class="text-contentPrimarySubtle mt-2">Tim kreatif kami terus mengembangkan menu dengan inovasi baru dan menarik. Ini memastikan variasi dalam pilihan makanan, menjaga Anda tetap terinspirasi dan terlibat dalam perjalanan makan sehat Anda.</p>
                    </div>
                </div>
            </section>

            <section class="px-8 md:px-20 lg:px-56 py-16 text-center">
                <div class="inline-block text-2xl font-medium bg-backgroundBrandSubtle text-contentPrimaryInverse px-4 py-2 rounded-lg mb-2">
                    Layanan Kami
                </div>
                <h2 class="text-3xl font-bold text-contentPrimary mb-6">Layanan kami dirancang untuk memberikan solusi yang personal dan efektif untuk gaya hidup sehat Anda.</h2>
                <p class="text-contentPrimarySubtle mb-12">Dengan kombinasi teknologi canggih dan fokus pada kebutuhan individu</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-orange-100 p-6 rounded-lg">
                        <div class="mb-4">
                            <div class="bg-gradient-to-br from-orange-300 to-orange-500 w-14 h-14 px-4 py-4 rounded-lg mb-6">
                            <img src="../../../../public/star.svg" className="" alt="star logo" />
                            </div>
                            <h3 class="text-xl font-bold text-contentPrimary text-left">Rekomendasi Makanan Sehat</h3>
                        </div>
                        <p class="text-contentPrimarySubtle text-justify">Fitur ini memungkinkan pengguna untuk menerima rekomendasi makanan sehat berdasarkan profil nutrisi dan preferensi mereka yang disimpan dalam akun. Setiap rekomendasi dipersonalisasi untuk memastikan pengguna mendapatkan makanan yang sesuai dengan tujuan kesehatan mereka.</p>
                    </div>
                
                    <div class="bg-orange-100 p-6 rounded-lg">
                        <div class="mb-4">
                            <div class="bg-gradient-to-br from-orange-300 to-orange-500 w-14 h-14 px-4 py-4 rounded-lg mb-6">
                            <img src="../../../../public/chat-question.svg" className="" alt="question logo" />
                            </div>
                            <h3 class="text-xl font-bold text-contentPrimary text-left">Smart Chat</h3>
                        </div>
                        <p class="text-contentPrimarySubtle text-justify">Pengguna dapat mengakses asisten AI yang tersedia untuk menjawab pertanyaan seputar nutrisi, resep makanan, dan tips hidup sehat. Super Chat ini dirancang untuk memberikan bantuan instan dan personal kepada pengguna dalam perjalanan mereka mencapai gaya hidup sehat.</p>
                    </div>
                
                    <div class="bg-orange-100 p-6 rounded-lg">
                        <div class=" mb-4">
                            <div class="bg-gradient-to-br from-orange-300 to-orange-500 w-14 h-14 px-4 py-4 rounded-lg mb-6">
                            <img src="../../../../public/pencil.svg" className="" alt="pencil logo" />
                            </div>
                            <h3 class="text-xl font-bold text-contentPrimary text-left">Personalisasi</h3>
                        </div>
                        <p class="text-contentPrimarySubtle text-justify">Memberikan pengguna akses langsung ke rekomendasi makanan. Pengguna dapat mengatur preferensi, dan menyesuaikan pengalaman mereka sesuai kebutuhan.</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Beranda;
