import React from 'react';

const Footer = () => {
    return (
        <footer className="fixed bottom-0 w-full bg-primary-navy-blue text-white py-4 text-center sm:text-sm md:text-xl">
            <p>&copy; {new Date().getFullYear()} Cybot. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
