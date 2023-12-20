import React from "react";
import Image from "next/image";
import Link from "next/link";
const About = () => {
  return (
    <div
      id="about"
      className="container w-full p-2 py-10 mx-auto my-20 lg:max-w-7xl"
    >
      <div className="grid-cols-3 gap-8 m-auto md:grid">
        <div className="col-span-2">
          <p className="uppercase text-xl tracking-widest text-[30px] font-bold text-[#fff]">
            About
          </p>
          <h2 className="py-4 text-[#fff]">Who am I?</h2>
          <p className="py-2 text-[#fff]">
            I'm a frontend developer, a fullstack in the making...
          </p>
          <p className="py-2 text-[#fff]">
            I'm your go-to developer for all things web-related. With a focus on
            Next.js and React, I wield these frameworks like a pro. Tailwind
            CSS, HTML, CSS, and JavaScript are my playgrounds, and I know them
            inside out. When it comes to deployment, you'll find me navigating
            Vercel, GitHub, and the vast Google Cloud with ease. I have a soft
            spot for WordPress and SEO – they're like old friends. If you ever
            need some Python magic or a bit of web scraping wizardry, I'm your
            guy. Let's create some digital magic together!
          </p>
          {/* <Link href="/#projects">
            <p className="py-2 text-[#fff] underline cursor-pointer">
              Check out some of my latest projects.
            </p>
          </Link> */}
        </div>
        <div className="flex items-center justify-center w-full h-auto p-2 m-auto duration-300 ease-in bg-[#fff] shadow-xl shadow-gray-400 rounded-xl hover:scale-105">
          <img
            src="/images/me/elormi.jpeg"
            className="rounded-xl"
            alt="picture of Elorm Dokosi"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
