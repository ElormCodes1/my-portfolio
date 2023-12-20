import Image from "next/image";
import React from "react";

const Skills = () => {
  const skills = [
    {
      id: 1,
      Skillimg: "/images/me/html.png",
      SkillTittle: "Html",
    },
    {
      id: 2,
      Skillimg: "/images/me/css.png",
      SkillTittle: "CSS",
    },
    {
      id: 3,
      Skillimg: "/images/me/javascript.png",
      SkillTittle: "JavaScript",
    },
    {
      id: 4,
      Skillimg: "/images/me/react.png",
      SkillTittle: "React",
    },
    {
      id: 5,
      Skillimg: "/images/me/Tailwind.png",
      SkillTittle: "Tailwind",
    },
    {
      id: 6,
      Skillimg: "/images/me/github.png",
      SkillTittle: "Github",
    },
    {
      id: 7,
      Skillimg: "/images/me/mongo.png",
      SkillTittle: "MongoDB",
    },
    {
      id: 8,
      Skillimg: "/images/me/nextjs.png",
      SkillTittle: "NextJS",
    },
  ];
  return (
    <div
      id="skills"
      className="container w-full p-2 py-10 mx-auto my-20 lg:max-w-7xl"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
        <p className="text-xl text-[30px] tracking-widest uppercase text-[#fff] font-bold">
          Skills
        </p>
        <h2 className="py-4 text-[#fff]">Technologies I am can work with.</h2>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {skills.map((val) => (
            <div
              key={val.id}
              className="z-10 p-6 duration-300 ease-in shadow-xl rounded-xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 hover:scale-105"
            >
              <div className="grid items-center justify-center grid-cols-2 gap-4">
                <div className="m-auto">
                  <Image
                    src={val?.Skillimg}
                    width="200"
                    height="70"
                    alt={val?.SkillTittle}
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3>{val?.SkillTittle}</h3>
                </div>
              </div>
            </div>
          ))}
          {/* <div className='p-6 duration-300 ease-in shadow-xl rounded-xl hover:scale-105'>

            <div className='grid items-center justify-center grid-cols-2 gap-4'>
              <div className='m-auto'>
                <Image src={Css} width='64px' height='64px' alt='/' />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <h3>CSS</h3>
              </div>
            </div>
          </div>
          <div className='p-6 duration-300 ease-in shadow-xl rounded-xl hover:scale-105'>
            <div className='grid items-center justify-center grid-cols-2 gap-4'>
              <div className='m-auto'>
                <Image src={Javascript} width='64px' height='64px' alt='/' />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <h3>JavaScript</h3>
              </div>
            </div>
          </div>
          <div className='p-6 duration-300 ease-in shadow-xl rounded-xl hover:scale-105'>
            <div className='grid items-center justify-center grid-cols-2 gap-4'>
              <div className='m-auto'>
                <Image src={ReactImg} width='64px' height='64px' alt='/' />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <h3>React Js</h3>
              </div>
            </div>
          </div>
          <div className='p-6 duration-300 ease-in shadow-xl rounded-xl hover:scale-105'>
            <div className='grid items-center justify-center grid-cols-2 gap-4'>
              <div className='m-auto'>
                <Image src={Tailwind} width='64px' height='64px' alt='/' />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <h3>Tailwind</h3>
              </div>
            </div>
          </div>
          <div className='p-6 duration-300 ease-in shadow-xl rounded-xl hover:scale-105'>
            <div className='grid items-center justify-center grid-cols-2 gap-4'>
              <div className='m-auto'>
                <Image src={MOngo} width='64px' height='64px' alt='/' />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <h3>MongoDB</h3>
              </div>
            </div>
          </div>
          <div className='p-6 duration-300 ease-in shadow-xl rounded-xl hover:scale-105'>
            <div className='grid items-center justify-center grid-cols-2 gap-4'>
              <div className='m-auto'>
                <Image src={Github} width='64px' height='64px' alt='/' />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <h3>Github</h3>
              </div>
            </div>
          </div>
          <div className='p-6 duration-300 ease-in shadow-xl rounded-xl hover:scale-105'>
            <div className='grid items-center justify-center grid-cols-2 gap-4'>
              <div className='m-auto'>
                <Image src={NextJS} width='64px' height='64px' alt='/' />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <h3>Next JS</h3>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Skills;
