import React, { useState, type ChangeEvent, type FormEvent } from 'react';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
}

const INITIAL_FORM_DATA: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
};


const BACKGROUND_IMAGE_URL =
    'https://asset-cdn.schoology.com/system/files/imagecache/profile_big/pictures/picture-aa0b063f65ccba47285740ef52a28e97_69138c1d4e805.jpg?1762888733';

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
    const [focused, setFocused] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const inputClass = (name: string): string => `
        w-full bg-transparent border-b-2 px-0 py-2.5 text-sm text-gray-900 placeholder-gray-400
        outline-none transition-all duration-300
        ${focused === name ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'}
    `;

    const sanitize = (str: string) => {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    const resetContactForm = () => {
        setSubmitted(false);
        setFormData(INITIAL_FORM_DATA);
    }

    return (
        <div className="relative rounded-2xl overflow-hidden mr-15 ml-15 mt-5 mb-5">
            {/* BACKGROUND IMAGE */}
            <img
                src={BACKGROUND_IMAGE_URL}
                className="absolute inset-0 bg-center w-full h-full object-cover"
            />

            {/* CONTENT */}
            <div className="relative z-10 p-12 flex justify-between">
                {/* LEFT TEXT */}
                <div className="text-white max-w-2xl hidden lg:flex flex-col justify-between">
                    <div className="space-y-4">
                        <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/40">Get in touch</p>
                        <h2 className="text-4xl font-bold uppercase tracking-wider">You have Questions</h2>
                        <h2 className="text-4xl font-bold uppercase tracking-wider">We have Answers</h2>
                        <p className="text-white/50 text-sm leading-relaxed">
                            Whether you have a question or a project in mind — we'd love to hear from you.
                        </p>
                    </div>
                    <div>
                        <p className="text-white/30 text-xs">Little Saint James Island, United States. Cybot LLC</p>
                    </div>
                </div>

                {/* FORM RIGHT*/}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-7 w-full lg:max-w-sm bg-white p-10 rounded-2xl"
                >
                    {/* HEADER */}
                    <div className="space-y-1.5">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Tell Us What You Need
                        </h1>
                        <p className="text-sm text-gray-400">
                            Our team is ready to assist you with every detail, big or small.
                        </p>
                    </div>

                    {submitted ? (
                        <div className="py-8 text-center space-y-3">
                            <p className="text-gray-900 font-semibold">Message received!</p>
                            <p className="text-gray-400 text-xs">We'll be in touch with you in 24 hours.</p>
                            <button
                                onClick={() => resetContactForm()}
                                className="text-xs text-gray-400 hover:text-gray-700 transition-colors underline underline-offset-4 mt-2"
                            >
                                Send another
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* NAMES */}
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">First Name</label>
                                    <input
                                        type="text" 
                                        name="firstName" 
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        onFocus={() => setFocused('firstName')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="Austin" required
                                        className={inputClass('firstName')}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Last Name</label>
                                    <input
                                        type="text" 
                                        name="lastName" 
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        onFocus={() => setFocused('lastName')}
                                        onBlur={() => setFocused(null)}
                                        placeholder="Chau" required
                                        className={inputClass('lastName')}
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Email</label>
                                <input
                                    type="email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocused('email')}
                                    onBlur={() => setFocused(null)}
                                    placeholder="austinsbirthkid@gmail.com" 
                                    required
                                    className={inputClass('email')}
                                />
                            </div>

                            {/* PHONE */}
                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Phone</label>
                                <input
                                    type="tel" 
                                    name="phone" 
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onFocus={() => setFocused('phone')}
                                    onBlur={() => setFocused(null)}
                                    placeholder="+1 (626) 666-6666"
                                    className={inputClass('phone')}
                                />
                            </div>

                            {/* MESSAGE */}
                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Message</label>
                                <textarea
                                    name="message" 
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocused('message')}
                                    onBlur={() => setFocused(null)}
                                    placeholder="write your shidjeet message here"
                                    rows={3} 
                                    required
                                    className={`${inputClass('message')} resize-none`}
                                />
                            </div>

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                className="w-full py-3.5 rounded-xl bg-gray-900 text-white text-sm font-semibold tracking-wide hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md mt-1"
                            >
                                Send Message
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ContactForm;