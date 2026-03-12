import React, { useState } from 'react'

type TeamMember = {
    name: string
    title: string
    description: string
    img: string
}

const teamMembers: TeamMember[] = [
    {
        name: "Guillermo Flores",
        title: "Chief Executive Officer",
        description: "CEO THINGS",
        img: "https://asset-cdn.schoology.com/system/files/imagecache/profile_big/pictures/picture-2d2cd1bfc72440d98166b2addce6daea_69138b90440ad.jpg?1762888592"
    },
    {
        name: "Austin Chau",
        title: "Valorant Player",
        description: "HARDSTUCK GOLD FOR ETERNITY",
        img: "https://asset-cdn.schoology.com/system/files/imagecache/profile_big/pictures/picture-aa0b063f65ccba47285740ef52a28e97_69138c1d4e805.jpg?1762888733"
    },
    {
        name: "Steven Zhao",
        title: "Valorant Player",
        description: "HARDSTUCK GOLD FOR 2 ACTS",
        img: "https://asset-cdn.schoology.com/system/files/imagecache/profile_big/pictures/picture-4a86a0da75654b2aaa75b914d6d7a4fc_69138ed627f3a.jpg?1762889430"
    },
    {
        name: "Gurt",
        title: "Print Operator",
        description: "He takes 0 pay in exchange for work experience",
        img: "https://asset-cdn.schoology.com/system/files/imagecache/profile_big/pictures/picture-3b5a7ef40a2f076222939e3f5a94aa75_69138c077ba49.jpg?1762888711"
    },
]

const Team = () => {
    const [current, setCurrent] = useState<number>(0)

    function goNext(): void {
        if (current >= teamMembers.length - 1) {
            setCurrent(0)
        } else {
            setCurrent(current + 1)
        }
    }

    function goPrev(): void {
        if (current <= 0) {
            setCurrent(teamMembers.length - 1)
        } else {
            setCurrent(current - 1)
        }
    }

    function goToIndex(index: number): void {
        setCurrent(index)
    }

    const leftIndex: number = (current - 1 + teamMembers.length) % teamMembers.length
    const rightIndex: number = (current + 1) % teamMembers.length

    const leftMember: TeamMember = teamMembers[leftIndex]
    const centerMember: TeamMember = teamMembers[current]
    const rightMember: TeamMember = teamMembers[rightIndex]

    return (
        <div className="bg-gray-50 flex flex-col items-center justify-center py-16">

            {/* HEADER */}
            <h2 className="text-xs tracking-widest uppercase mb-3">
                The People Behind Our Work
            </h2>
            <h1 className="text-5xl text-gray-900">
                Our Team
            </h1>

            {/* CAROUSEL */}
            <div className="relative ml-15 mr-15 w-full max-w-3xl flex items-center justify-center gap-4 min-h-96">

                <button
                    onClick={goPrev}
                    className="absolute left-0 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 text-blue-600 text-xl flex items-center justify-center shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 cursor-pointer"
                >
                    ‹
                </button>

                {/* LEFT CARD */}
                <div
                    onClick={function () { goToIndex(leftIndex) }}
                    className="flex-none w-52 opacity-40 border-gray-100 rounded-2xl text-center bg-white border shadow-none cursor-pointer p-7 scale-90 flex flex-col items-center transition-all duration-300"
                >
                    <img src={leftMember.img} alt={leftMember.name} className="w-16 h-16 rounded-full object-cover mb-5 ring-1 ring-gray-200" />
                    <h3 className="text-base font-normal text-gray-900 mb-1">{leftMember.name}</h3>
                    <p className="text-secondary-navy-blue text-xs uppercase tracking-widest">{leftMember.title}</p>
                </div>

                {/* CENTER CARD */}
                <div className="flex-none w-72 opacity-100 border-blue-400 rounded-2xl text-center bg-white border shadow-lg cursor-pointer p-9 flex flex-col items-center transition-all duration-300">
                    <img src={centerMember.img} className="w-24 h-24 rounded-full object-cover mb-5 ring-2" />
                    <h3 className="text-xl font-normal text-gray-900 mb-1">{centerMember.name}</h3>
                    <p className="text-secondary-navy-blue text-xs uppercase tracking-widest mt-1 mb-3">{centerMember.title}</p>
                    <p className="text-gray-500 text-sm">{centerMember.description}</p>
                </div>

                {/* RIGHT CARD */}
                <div
                    onClick={function () { goToIndex(rightIndex) }}
                    className="flex-none w-52 opacity-40 border-gray-100 rounded-2xl text-center bg-white border shadow-none cursor-pointer p-7 scale-90 flex flex-col items-center transition-all duration-300"
                >
                    <img src={rightMember.img} className="w-16 h-16 rounded-full object-cover mb-5 ring-1 ring-gray-200" />
                    <h3 className="text-base text-gray-900 mb-1">{rightMember.name}</h3>
                    <p className="text-secondary-navy-blue text-xs uppercase tracking-widest">{rightMember.title}</p>
                </div>

                <button
                    onClick={goNext}
                    className="absolute right-0 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 text-xl flex items-center justify-center shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 cursor-pointer"
                >
                    ›
                </button>
            </div>

            {/* DOTS */}
            <div className="flex gap-2 mt-10">
                {teamMembers.map(function (_: TeamMember, i: number) {
                    return (
                        <button
                            key={i}
                            onClick={function () { goToIndex(i) }}
                            className={`h-2 rounded-full border-none transition-all duration-300 cursor-pointer ${i === current ? 'w-6 bg-secondary-navy-blue' : 'w-2 bg-gray-300'}`}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Team