"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaBuildingColumns } from "react-icons/fa6";
import { TbBuildingCircus } from "react-icons/tb";
import { HiOfficeBuilding } from "react-icons/hi";



const VenueTimeline = ({ hackers }: any) => {
  const [glowClasses1, setGlowClasses1] = useState(false);
  const [glowClasses2, setGlowClasses2] = useState(false);
  const [venueVotes, setVenueVotes] = useState(0);

  const [glowClasses3, setGlowClasses3] = useState(false);

  const progressPercentage = (hackers / 10) * 100;

  useEffect(() => {
    try {
      fetch("/api/getvotes")
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setVenueVotes(data.venueVotes);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleAddVote = async () => {
    //call backend api to add vote
    try {
      const response = await fetch("/api/addvote", {
        method: "POST",
        body: JSON.stringify({ type: "venue" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Vote added successfully");
        alert("Vote added successfully");
        //reload the page to update the votes
        window.location.reload();
      } else {
        console.error("Failed to add vote");
      }
    } catch (err) {
      console.error("Failed to add vote");
    }
  };

  useEffect(() => {
    // Apply the glow class based on the number of hackers
    if (hackers >= 50) {
      setGlowClasses3(true);
      setGlowClasses2(false);
      setGlowClasses1(false);
    } else if (hackers >= 30) {
      setGlowClasses3(false);
      setGlowClasses2(true);
      setGlowClasses1(false);
    } else if (hackers >= 1) {
      setGlowClasses3(false);
      setGlowClasses2(false);
      setGlowClasses1(true);
    }
  }, [hackers]);

  return (
    <div className=" w-full dm-mono-regular rounded-lg bg-[#1A1A1A] px-10 py-5">
      <div className="flex gap-4 text-white dm-mono-regular text-xl mb-5 -ml-5">Venue
        <div className="flex items-center px-2 rounded-md bg-[#4C76FD] bg-opacity-10 text-xs text-[#4C76FD]">The more the number of registered hackers, the more you are entitled to bigger halls </div></div>
      <ol className="relative border-s-[0.4px] border-gray-200  border-dashed">
        <li className="flex items-center mb-5 ms-6 w-full">
          <span className="absolute flex items-center justify-center w-10 h-10 rounded-full -start-5">
            <div className={glowClasses3 ? `bg-white bg-opacity-40 w-20 rounded-full p-1` : `bg-[#3E3E3E] bg-opacity-20 w-20 rounded-full p-1`}>
              <div className={glowClasses3 ? `bg-white bg-opacity-45 rounded-full p-1` : `g-[#3E3E3E] bg-opacity-30 rounded-full p-1`}>
                <div
                  className={
                    glowClasses3
                      ? `bg-white text-center text-sm text-white font-medium rounded-full py-1 p-[0.8px] w-5 h-5 ml-[2px]`
                      : `bg-[#3E3E3E] text-center text-sm text-white font-medium rounded-full py-1 p-[0.8px] w-5 h-5 ml-[2px]`
                  }
                >
                  3
                </div>
              </div>
            </div>
          </span>
          <div
            className={
              glowClasses3
                ? "ml-4 p-4 py-5 w-full rounded-lg border-gray-700 border-[0.5px] shadow-sm bg-[#282828]  text-white "
                : "text-white ml-4 p-4  rounded-lg shadow-sm bg-[#111115] text-opacity-25"
            }
          >
            <div className="flex gap-2 items-center w-full justify-between">
              <div>
                <FaBuildingColumns className={glowClasses3 ? "text-[#FBC741] h-5 w-5" : "bg-[#111115] h-5 w-5"} />
              </div>
              <div className="w-full">Big Hall - Upto 50 Hackers</div>

            </div>

          </div>
        </li>
        <li className="mb-5 ms-6 w-full">
          <span className="absolute flex items-center justify-center w-10 h-10 rounded-full -start-5">
            <div className={glowClasses2 ? `bg-white bg-opacity-40 w-20 rounded-full p-1` : `bg-[#3E3E3E] bg-opacity-20 w-20 rounded-full p-1`}>
              <div className={glowClasses2 ? `bg-white bg-opacity-45 rounded-full p-1` : `bg-[#3E3E3E] bg-opacity-30 rounded-full p-1`}>
                <div
                  className={
                    glowClasses2
                      ? `bg-white text-center text-sm text-white font-medium rounded-full py-1 p-[0.8px] w-5 h-5 ml-[2px]`
                      : `bg-[#3E3E3E] text-[#3E3E3E] text-center text-sm  font-medium rounded-full py-1 p-[0.8px] w-5 h-5 ml-[2px]`
                  }
                >
                  2
                </div>
              </div>
            </div>
          </span>
          <div
            className={
              glowClasses2
                ? "ml-4 p-3 py-5 w-full rounded-lg  bg-[#282828]  text-white "
                : "text-white ml-4 p-4 py-5 rounded-lg bg-[#111115] text-opacity-25"
            }
          >
            <div className="flex gap-2 items-center w-full justify-between">
              <div>
                <HiOfficeBuilding className={glowClasses2 ? "text-[#FBC741] h-5 w-5" : "bg-[#111115] h-5 w-5"} />


              </div>
              <div className="w-full">Medium Hall - Upto 30 Hackers</div>

            </div>

          </div>
        </li>
        <li className="ms-6 w-full">
          <span className="absolute flex items-center justify-center w-10 h-10 rounded-full -start-5">
            <div className={glowClasses1 ? `bg-white bg-opacity-40 w-20 rounded-full p-1` : `bg-[#3E3E3E] bg-opacity-20 w-20 rounded-full p-1`}>
              <div className={glowClasses1 ? `bg-white bg-opacity-45 rounded-full p-1` : `bg-[#3E3E3E] bg-opacity-30 rounded-full p-1`}>
                <div
                  className={
                    glowClasses1
                      ? `bg-white text-center text-sm text-white font-medium rounded-full py-1 p-[0.8px] w-5 h-5 ml-[2px]`
                      : `bg-[#3E3E3E] text-[#3E3E3E] text-center text-sm  font-medium rounded-full py-1 p-[0.8px] w-5 h-5 ml-[2px]`
                  }
                >
                  1
                </div>
              </div>
            </div>
          </span>
          <div
            className={
              glowClasses1
                ? "ml-4 p-4 py-5 w-full rounded-lg shadow-sm bg-[#282828]  text-white "
                : "text-white ml-4 p-4 py-5  rounded-lg shadow-sm bg-[#111115] text-opacity-25"
            }
          >
            <div className="flex gap-2 items-center w-full justify-between">
              <div className="">                <TbBuildingCircus className={glowClasses1 ? "text-[#FBC741] h-5 w-5" : "bg-[#111115] h-5 w-5"} />

              </div>
              <div className="w-full">Small Hall - Upto 10 Hackers</div>

            </div>

          </div>
        </li>
      </ol>

    </div>
  );
};

export default VenueTimeline;