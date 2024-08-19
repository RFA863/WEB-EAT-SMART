import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarComponent from "../common/navbar/navbar";
import FooterComponent from "../common/footer/footer";
import Beranda from '../../pages/beranda';
import Rekomendasi from '../../pages/rekomendasi';
import SmartChat from '../../pages/smartchat';
import Settings from '../../pages/settings';

function Layout() {
    const [activeContent, setActiveContent] = useState('beranda');
    const location = useLocation();

    const renderContent = () => {
        switch (activeContent) {
            case 'rekomendasi':
                return <Rekomendasi />;
            case 'smartchat':
                return <SmartChat />;
            case 'settings':
                return <Settings />;
            case 'beranda':
            default:
                return <Beranda />;
        }
    };

    // Check if the current path is "masuk" or "daftar"
    const hideNavbarAndFooter = location.pathname === "/masuk" || location.pathname === "/daftar";

    return (
        <>
            {!hideNavbarAndFooter && <NavbarComponent setActiveContent={setActiveContent} />}
            <div>
                {renderContent()}
            </div>
            {!hideNavbarAndFooter && <FooterComponent />}
        </>
    );
}

export default Layout;
