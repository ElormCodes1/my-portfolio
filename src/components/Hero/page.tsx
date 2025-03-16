import Link from "next/link";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill, BsYoutube } from "react-icons/bs";
import { FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Main = () => {
  return (
    <div
      id="home"
      className="container w-full p-2 py-20 pt-20 mx-auto text-center lg:max-w-7xl"
    >
      <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
        <div>
          <p className="uppercase text-sm tracking-widest text-[#fff]">
            EMPOWERING IDEAS THROUGH CODE
          </p>
          <h1 className="py-4 text-[#fff]">
            Hey there, I&#39;m{" "}
            <span className="text-[#51e5e5]"> Elorm Marrion Dokosi</span>
          </h1>
          <h1 className="py-2 text-[#fff]">
            Your Friendly Front-End Web Developer, Full Stack in the making...
          </h1>
          <p className="py-4 text-[#fff] sm:max-w-[70%] m-auto">
            I am passionate about crafting user-friendly web applications and
            eager to dive into back-end technologies. ps!!!
          </p>
          <div className="flex items-center justify-between max-w-[330px] m-auto py-4">
            <a
              href="https://www.linkedin.com/in/elormdokosimarrion"
              target="_blank"
              rel="noreferrer"
              className="mr-2"
            >
              <div className="p-6 text-black duration-300 ease-in bg-[#fff] rounded-full shadow-lg cursor-pointer shadow-gray-400 hover:scale-110">
                <FaLinkedinIn />
              </div>
            </a>
            <a
              href="https://github.com/ElormCodes1"
              target="_blank"
              rel="noreferrer"
              className="mr-2"
            >
              <div className="p-6 text-black duration-300 ease-in rounded-full bg-[#fff]  shadow-lg cursor-pointer shadow-gray-400 hover:scale-110">
                <FaGithub />
              </div>
            </a>
            <Link href="mailto:marriondokosi@gmail.com" className="mr-2">
              <div className="p-6 text-black duration-300 ease-in rounded-full bg-[#fff]  shadow-lg cursor-pointer shadow-gray-400 hover:scale-110">
                <AiOutlineMail />
              </div>
            </Link>
            <Link href="/resume.pdf" download className="mr-2">
              <div className="p-6 text-black duration-300 ease-in rounded-full bg-[#fff]  shadow-lg cursor-pointer shadow-gray-400 hover:scale-110">
                <BsFillPersonLinesFill />
              </div>
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCu9o9jAc_oYXbQmIIb3aWkg"
              download
            >
              <div className="p-6 text-black duration-300 ease-in rounded-full bg-[#fff]  shadow-lg cursor-pointer shadow-gray-400 hover:scale-110">
                <BsYoutube />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
