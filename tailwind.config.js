/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        contentPrimary: '#292D32',
        contentPrimarySubtle: '#687685',
        contentPrimarySubtlest: '#97ACBB',
        contentPrimaryInverse: '#FFFFFF',
        contentBrand: '#E09143',
        contentBrandSubtle: '#EDB76B',
        contentInformation: '#4096FF',
        contentAlert: '#DC3545',
        contentWarning: '#FFC107',
        contentSuccsess: '#28A746',
        contentDisabled: '#C4D0D9',

        backgroundPrimary: '#FFFFFF',
        backgroundPrimaryInverse: '#292D32',
        backgroundPrimaryBolder: '#F1F3F6',
        backgroundBrandBolder: '#D0773A',
        backgroundBrand: '#E09143',
        backgroundBrandSubtle: '#EDB76B',
        backgroundBrandSubtlest: '#F6DFBC',
        backgroundInformation: '#4096FF',
        backgroundInformationSubtle: '#BEDEFF',
        backgroundInformationSubtlest: '#E4F2F',
        backgroundAlert: '#DC3545',
        backgroundAlertSubtle: '#FFD0D9',
        backgroundAlertSubtlest: '#FFECF1',
        backgroundWarning: '#FFC107',
        backgroundWarningSubtle: '#FFECB3',
        backgroundWarningSubtlest: '#FFF8E1',
        backgroundSuccess: '#28A746',
        backgroundSuccessSubtle: '#C5E9CA',
        backgroundSuccessSubtlest: '#E7F6E9',
        backgroundDisabled: '#F1F3F6',

        borderPrimary: '#DBE3E8',
        borderPrimarySubtle: '#F1F3F6',
        borderPrimaryBolder: '#97ACBB',
        borderBrand: '#E09143',
        borderBrandSubtle: '#EDB76B',
        borderBrandSubtlest: '#F6DFBC',
        borderInformation: '#3F88F0',
        borderInformationSubtle: '#4096FF',
        borderInformationSubtlest: '#BEDEFF',
        borderAlert: '#CF2E3E',
        borderAlertSubtle: '#DC3545',
        borderAlertSubtlest: '#FFD0D9',
        borderWarning: '#FFB300',
        borderWarningSubtle: '#FFC107',
        borderWarningSubtlest: '#FFECB3',
        borderSuccess: '#1A953A',
        borderSuccessSubtle: '#28A746',
        borderSuccessSubtlest: '#C5E9CA',
        borderDisabled: '#C4D0D9',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

