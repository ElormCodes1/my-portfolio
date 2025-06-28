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
          {/* <p className="py-2 text-[#fff]">
            I&apos;m a frontend developer, a fullstack in the making...
          </p> */}
          <p className="py-2 text-[#fff]">
            I&apos;m your go-to developer for all things web scraping. I&apos;ve
            also got great skills in automating repetitive tasks with python
            too. I&apos;m currently wrapping up my CS degree. Beyond code, I
            love general aviation and even though I don&apos;t know how to fly
            an aircraft, I&apos;m obsessed with home built ultralights and
            experimentals! I&apos;ve dabbled in many businesses — from
            dropshipping and affiliate marketing to YouTube and flipping used
            laptops. I’m all about building, experimenting, and learning. Let’s
            create something impactful together!
          </p>
          {/* <Link href="/#projects">
            <p className="py-2 text-[#fff] underline cursor-pointer">
              Check out some of my latest projects.
            </p>
          </Link> */}
        </div>
        <div className="flex items-center justify-center w-full h-auto p-2 m-auto duration-300 ease-in bg-[#fff] shadow-xl shadow-gray-400 rounded-xl hover:scale-105">
          <Image
            src="/images/me/elormi.jpeg"
            className="rounded-xl"
            alt="picture of Elorm Dokosi"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
