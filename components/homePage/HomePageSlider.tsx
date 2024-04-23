"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";

const HomePageSlider = () => {
  const sliderData = [
    {
      id: 1,
      image_left_one: "/assets/home-header-left1.png",
      image_left_two: "/assets/home-header-left2.png",
      image_right: "/assets/home-header.png",
    },
    {
      id: 2,
      image_left_one: "/assets/home-header-left2.png",
      image_left_two: "/assets/home-header-left1.png",
      image_right: "/assets/home-header.png",
    },
    {
      id: 3,
      image_left_one: "/assets/home-header-left1.png",
      image_left_two: "/assets/home-header-left1.png",
      image_right: "/assets/home-header.png",
    },
  ];

  const [currentSlider, setCurrentSlider] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval: any;
  let intervalTime = 3000;

  const nextSlide = () => {
    setCurrentSlider(currentSlider === slideLength - 1 ? 0 : currentSlider + 1);
  };

  const auto = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  useEffect(() => {
    setCurrentSlider(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlider]);

  return (
    <div className="bg-black">
      {sliderData.map((item, index) => (
        <div
          className={index === currentSlider ? "slide current" : "slide"}
          key={index}
        >
          <div className="flex justify-evenly">
            {index === currentSlider && (
              <>
                <div className="lg:mt-20">
                  <Image src={item.image_left_one} className="" alt="slider"  width="350" height="350" />
                  <Image
                    src={item.image_left_two}
                    className="pt-10"
                    alt="slider"  width="350" height="350"
                  />
                  <button className="text-white flex mt-10">
                    Shop Now
                    <GoArrowRight className="mt-1 mx-2" />{" "}
                  </button>
                </div>

                <div>
                  <Image src={item.image_right} className="mt-10" alt="phone"  width="550" height="550"/>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <button className="text-gray-500   border-gray-500 rounded bg-gray-500">
          .
        </button>
      </div>
    </div>
  );
};

export default HomePageSlider;
