function NavbarComponent () {
    return (
        <>
            <nav class="bg-backgroundPrimary border-b-2">
            <div class="max-w-full flex flex-wrap items-center justify-between py-8 px-40">
                <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="../../../../public/logo eat smart 80cm.svg" class="h-8" alt="Flowbite Logo"/>
                    <span class="text-contentBrand self-center text-2xl font-semibold whitespace-nowrap">| EAT SMART</span>
                </a>
                <button data-collapse-toggle="navbar-solid-bg" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                <ul class="flex flex-col font-medium mt-2 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row">
                    <li>
                    <a href="#" class="block py-2 px-3 md:p-0 text-white bg-backgroundBrand rounded md:bg-transparent md:text-contentBrand" aria-current="page">Beranda</a>
                    </li>
                    <li>
                    <a href="#" class="block py-2 px-3 md:p-0 text-contentPrimarySubtle rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-contentBrand">Rekomendasi</a>
                    </li>
                    <li>
                    <a href="#" class="block py-2 px-3 md:p-0 text-contentPrimarySubtle rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-contentBrand">Smart Chat</a>
                    </li>
                    <li>
                    <button type="button" class="btn-small btn-secondary mt-[-16px] mr-[-16px]">Masuk</button>
                    </li>
                    <li>
                    <button type="button" class="btn-small btn-primary mt-[-16px]">Daftar</button>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </>
    );
}

export default NavbarComponent;