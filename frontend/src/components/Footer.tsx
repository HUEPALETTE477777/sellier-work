import logo from "../assets/logo.png";

import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-primary-black px-10 py-16 text-white border-t border-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">

                {/* COMPANY INFO */}
                <div className="space-y-2">
                    <img src={logo} className="w-32 sm:w-40" alt="Logo" />

                    <p className="font-semibold text-xl sm:text-2xl">
                        CYBOT LLC
                    </p>

                    <p className="sm:text-lg">
                        Providing Unrealistic Business Ideas Since {new Date().getFullYear()}
                    </p>
                </div>

                {/* SOCIALS */}
                {/* SOCIALS */}
                <div className="space-y-4">
                    <h6 className="font-bold text-lg sm:text-xl">Socials</h6>
                    <ul className="flex gap-6 items-center sm:text-lg">
                        <li>
                            <a
                                className="hover:text-gray-400 hover:border-b-2"
                                href="https://www.tiktok.com/@thecybot"
                                target="_blank"
                            >
                                <FaInstagram className="text-4xl sm:text-5xl" />
                            </a>
                        </li>
                        <li>
                            <a
                                className="hover:text-gray-400 hover:border-b-2"
                                href="https://www.instagram.com/theecybot/"
                                target="_blank"
                            >
                                <FaTiktok className="text-4xl sm:text-5xl" />
                            </a>
                        </li>
                    </ul>
                </div>



                {/* COMPANY */}
                <div className="space-y-4">
                    <h6 className="font-bold text-lg sm:text-xl">Company</h6>
                    <ul className="space-y-3 sm:text-lg">
                        <li><a className="hover:text-gray-400 hover:border-b-2" href="#">About us</a></li>
                        <li><a className="hover:text-gray-400 hover:border-b-2" href="#">Contact</a></li>
                        <li><a className="hover:text-gray-400 hover:border-b-2" href="#">Jobs</a></li>
                    </ul>
                </div>

                {/* LEGAL */}
                <div className="space-y-4">
                    <h6 className="font-bold text-lg sm:text-xl">Legal</h6>
                    <ul className="space-y-3 text-base sm:text-lg">
                        <li><a className="hover:text-gray-400 hover:border-b-2" href="#">Terms of use</a></li>
                        <li><a className="hover:text-gray-400 hover:border-b-2" href="#">Privacy policy</a></li>
                        <li><a className="hover:text-gray-400 hover:border-b-2" href="#">Cookie policy</a></li>
                    </ul>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
