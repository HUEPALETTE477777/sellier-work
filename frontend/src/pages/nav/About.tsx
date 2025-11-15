import React from 'react';

const About = () => {
    return (
        <div className="bg-primary-gray min-h-screen -mt-5 px-6 flex flex-col md:flex-row items-center justify-center">

            {/* LEFT SIDE — TITLE */}
            <div className="md:w-1/2 text-center animate-slide-in-left">
                <h1 className="md:text-9xl font-bold text-white mb-4">
                    About Cybot
                </h1>
            </div>

            {/* RIGHT SIDE — PARAGRAPH */}
            <div className="md:w-1/2 text-lg text-secondary-white animate-slide-in-right md:text-2xl sm:text-xl font-light">
                <p className="mb-4">
                    Our product, Cybot, is a robot which ensures safe and efficient tasks
                    directly assigned by the user, to be completed with ease. These tasks
                    can range from simple chores to effective and extensive transportation
                    to those in need.
                </p>

                <p>
                    Cybot is internally built with its own cooling system, outer stable
                    structures to properly uphold weight, water-resistant, and can come
                    with a variety of designs the owner prefers. In addition, Cybot is
                    AI-powered and responsible for its system to operate successfully.
                    Cybot is the new innovation building a bridge between AI and humans
                    for support.
                </p>
            </div>

        </div>
    );
};

export default About;
