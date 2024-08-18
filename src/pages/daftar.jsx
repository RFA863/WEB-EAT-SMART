import React from 'react';
import { Link } from 'react-router-dom';

function Daftar() {
    return (
        <div className='flex items-center justify-center min-h-screen bg-backgroundPrimaryBolder'>
            <div className="w-full mx-8 my-16 sm:mx-20 md:mx-32 lg:mx-80 p-8 bg-backgroundPrimary rounded-lg">
                <h2 className="text-xl font-bold mb-8 text-contentBrand">Selamat Datang</h2>
                <div className="mb-8">
                    <div className="mb-6">
                        <label htmlFor="email" className="block custom-label">E-Mail</label>
                        <input id="email" type="email" placeholder="Masukkan e-mail" className="w-full custom-input" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="nama" className="block custom-label">Nama</label>
                        <input id="nama" type="text" placeholder="Masukkan nama lengkap" className="w-full custom-input" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block custom-label">Kata Sandi</label>
                        <input id="password" type="password" placeholder="Masukkan kata sandi" className="w-full custom-input" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirm-password" className="block custom-label">Konfirmasi Kata Sandi</label>
                        <input id="confirm-password" type="password" placeholder="Konfirmasi kata sandi" className="w-full custom-input" />
                    </div>
                </div>
                <Link to="/masuk">
                    <button type="button" className="w-full btn-medium btn-primary mb-4">Daftar</button>
                </Link>
                <p className="text-sm font-medium text-contentPrimary text-center">Sudah punya akun?
                    <Link to="/masuk">
                        <button type="button" className="ml-1 text-contentBrand hover:text-contentPrimarySubtle active:text-contentBrand focus:underline">Masuk sekarang</button>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Daftar;
