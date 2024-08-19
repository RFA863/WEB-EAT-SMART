import React from 'react';
import { Link } from 'react-router-dom';

function Masuk() {
    return (
        <div className='flex items-center justify-center min-h-screen bg-backgroundPrimaryBolder'>
            <div className="w-full mx-8 my-16 sm:mx-20 md:mx-32 lg:mx-80 p-8 bg-backgroundPrimary rounded-lg">
                <h2 className="text-xl font-bold mb-8 text-contentBrand">Selamat Datang Kembali</h2>
                <div className="mb-8">
                    <div className="mb-6">
                        <label htmlFor="email" className="block custom-label">E-Mail</label>
                        <input id="email" type="email" placeholder="Silahkan masukkan e-mail anda" className="w-full custom-input" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block custom-label">Password</label>
                        <input id="password" type="password" placeholder="Silahkan masukkan kata sandi anda" className="w-full custom-input mb-4" />
                        <div className="text-center">
                            <a href="#" className="text-sm font-medium text-contentBrand hover:text-contentPrimarySubtle active:text-contentBrand focus:underline">Lupa kata sandi?</a>
                        </div>
                    </div>
                </div>
                <Link to="/">
                    <button type="button" className="w-full btn-medium btn-primary mb-4">Masuk</button>
                </Link>
                <p className="text-sm font-medium text-contentPrimary text-center">Belum punya akun? 
                    <Link to="/daftar">
                        <button type="button" className="ml-1 text-contentBrand hover:text-contentPrimarySubtle active:text-contentBrand focus:underline">Daftar sekarang</button>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Masuk;
