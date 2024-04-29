"use client";

import React, { useState, useEffect } from "react";
import FoodQuestion from "../components/foodQuestions/page";
import MiscQuestion from "../components/miscQuestion/page";
import Question from "../components/questions/page";
import GoBackbtn from "../../../components/GoBack2";
import Navbar from "@/components/navbar";
import AHackathonManager from "../../../artifacts/contracts/HackathonManager.sol/AHackathonManager.json";
import CHackathonManager from "../../../artifacts/contracts/HackathonManager.sol/CHackathonManager.json";
import { Acontract_add, Ccontract_add } from "../../../artifacts/config";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, parseEther, formatUnits } from "ethers";
import { useParams } from "next/navigation";
import { GoOrganization } from "react-icons/go";
import { chainIdToContractMap } from "@/context/allchains";

const Home = () => {
  const { id } = useParams();

  const [currentVenueQuestion, setCurrentVenueQuestion] = useState(0);
  const [currentFoodQuestion, setCurrentFoodQuestion] = useState(0);
  const [currentMiscQuestion, setCurrentMiscQuestion] = useState(0);

  const [selectedVenueOption, setSelectedVenueOption] = useState<string[]>([]);
  const [selectedFoodOption, setSelectedFoodOption] = useState<string[]>([]);
  const [selectedMiscOption, setSelectedMiscOption] = useState<string[]>([]);

  const [activeTab, setActiveTab] = useState("profile");
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [xHackToken, setXHackToken] = useState(0);
  const [hackDetails, setHackDetails] = useState({
    name: "EthMumbai",
    description:
      "EthMumbai is a 36-hour hackathon that will test your endurance and creativity . Come showcase your skills and win exciting prizes.",
    city: "Mumbai, India",
    category: "Blockchain",
    experience: "Ninja",
    organizedBy: "ETHGlobal",
    date: "12th August 2021",
    hackers: 2200,
  } as any);

  //@ts-ignore
  const contractDetails = chainIdToContractMap[chainId];

  useEffect(() => {
    const fetchHackathons = async () => {
      if (!walletProvider) {
        console.log("Wallet provider is not available.");
        return;
      }
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const resp = new Contract(
        contractDetails?.address,
       contractDetails?.abi,
         ethersProvider
       );
       const tx = await resp.getHackathonDetails(id);
       console.log(tx)
       setHackDetails({
         name: tx[0],
         organizedBy: tx[1],
         description: tx[2],
         date: tx[3],
         city: tx[4],
         experience: tx[5],
         category: tx[6],
         hackers: Number(tx[7]),
       });
       const balance = await resp.balanceOf(address);
       console.log(formatUnits(balance, 18));
       setXHackToken(parseFloat(formatUnits(balance, 18)));
     
    };

    fetchHackathons();
  }, [walletProvider, chainId]);


  const handleTabClick = (tabId: any) => {
    setActiveTab(tabId);
  };

  const VenueQuestions = [
    {
      question: "PICK AN OPTION",
      options: [
        "Smriti Upvan",
        "Hotel Taj",
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1780.8302719674755!2d80.919590638875!3d26.78708849418054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfbf54d989c0d%3A0xa1252f4a2636da19!2sSmriti%20Upvan%2C%20Jalvayu%20Vihar%2C%20Ashiyana%2C%20Lucknow%2C%20Uttar%20Pradesh%20226012!5e0!3m2!1sen!2sin!4v1711821915781!5m2!1sen!2sin",
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.6339548925434!2d80.9709969761558!3d26.85159247668364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd3a99fba681%3A0xe82b751c187af53b!2sTaj%20Mahal%20Lucknow!5e0!3m2!1sen!2sin!4v1711822134632!5m2!1sen!2sin",
        "costs $300/day",
        "costs $700/day",
        "within 1km to the nearest metro",
        "great facilities",
        "A great place with medium level facilities, the pros being its closer to the city and well connected. Its cheaper and costs could be distributed better.",
        "A great place wth medium level facilities, the pros being it closer to the city and well connected. It’s cheaper and it costs could be distributed better.",
        "31",
        "11",
      ],
    },
  ];

  const FoodQuestions = [
    {
      question: "PICK AN OPTION: STARTERS",
      options: [
        "Paneer Tikka",
        "Aloo Tikki",
        "https://www.foodfusion.com/wp-content/uploads/2018/03/2-1.jpg",
        "https://i.ndtvimg.com/i/2015-07/appetizers-625_625x350_41436947402.jpg",
        "55",
        "70"
      ],
    },
    // {
    //   question: "Choose an option: Main Course",
    //   options: [
    //     "Chicken Roast",
    //     "Paneer Masala",
    //     "https://images.immediate.co.uk/production/volatile/sites/2/2019/10/134_Roma_9780451497017_art_r1-facac84.jpg?quality=90&resize=700,466",
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdFG_wyivSLOB7tiozZjoBEjBAAwpQYegCFA&usqp=CAU",
    //     "500",
    //     "601"
    //   ],
    // },
    // {
    //   question: "PICK AN OPTION: DESSERTS",
    //   options: [
    //     "Cheese Cake",
    //     "Choco Cake",
    //     "https://cdn.loveandlemons.com/wp-content/uploads/2021/06/summer-desserts.jpg",
    //     "https://hips.hearstapps.com/hmg-prod/images/no-bake-buckeye-cheesecake-bars-lead-64b5646b6b074.jpg?crop=1.00xw:1.00xh;0,0&resize=640:*",
    //     "20",
    //     "31"
    //   ],
    // },
  ];

  const MiscQuestions = [
    {
      question: "PICK AN OPTION",
      options: [
        "Bean Bag",
        "Mattress",
        "https://rukminim2.flixcart.com/image/850/1000/xif0q/bean-bag/h/y/t/xxxl-beanbag-beige-3xl-swiner-original-imagngtndfgjyfzp.jpeg?q=90&crop=false",
        "https://www.godrejinterio.com/imagestore/B2C/56101508SD05928/56101508SD05928_01_803x602.jpg",
        "23",
        "45"
      ],
    },
    // {
    //   question: "PICK AN OPTION: ",
    //   options: [
    //     "Red Bull",
    //     "Sting",
    //     "https://api.freelogodesign.org/assets/blog/thumb/6457476a3cdd41118a31f81a20418b56_1176x840.jpg?t=638351341370000000",
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTuszJ-RoSYsV-nJh0qOtvJK_2GSm7Cctog&usqp=CAU",
    //     "21",
    //     "55"
    //   ],
    // },
  ];

  const handleVenueOptionSelect = (option: any) => {
    setSelectedVenueOption([...selectedVenueOption, option]);
    setCurrentVenueQuestion(currentVenueQuestion + 1);
  };
  const handleFoodOptionSelect = (option: any) => {
    setSelectedFoodOption([...selectedFoodOption, option]);
    setCurrentFoodQuestion(currentFoodQuestion + 1);
  };
  const handleMiscOptionSelect = (option: any) => {
    setSelectedMiscOption([...selectedMiscOption, option]);
    setCurrentMiscQuestion(currentMiscQuestion + 1);
  };

  return (
    <>
      <Navbar balance={(xHackToken).toString()} />
      <div className="mx-10">
        <GoBackbtn />
        <div className="flex dm-mono-regular justify-between mx-10">
          <div>
            <div className="mt-5">
              <svg width="209" height="24" viewBox="0 0 209 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="57" height="24" rx="4" fill="#45464D" />
                <path d="M9.59967 17L8.10167 7.2H9.29167L10.2857 14.76L11.6717 7.2H12.8757L14.2617 14.76L15.2557 7.2H16.4457L14.9477 17H13.6037L12.2737 9.468L10.9437 17H9.59967ZM20.4582 17.168C19.8049 17.168 19.2262 17.0187 18.7222 16.72C18.2275 16.412 17.8355 15.9873 17.5462 15.446C17.2569 14.8953 17.1122 14.256 17.1122 13.528C17.1122 12.8 17.2522 12.1653 17.5322 11.624C17.8215 11.0733 18.2182 10.6487 18.7222 10.35C19.2262 10.042 19.8142 9.888 20.4862 9.888C21.1582 9.888 21.7322 10.042 22.2082 10.35C22.6842 10.6487 23.0482 11.0453 23.3002 11.54C23.5522 12.0347 23.6782 12.5667 23.6782 13.136C23.6782 13.2387 23.6735 13.3413 23.6642 13.444C23.6642 13.5467 23.6642 13.6633 23.6642 13.794H18.2742C18.3022 14.3073 18.4189 14.7367 18.6242 15.082C18.8389 15.418 19.1049 15.67 19.4222 15.838C19.7489 16.006 20.0942 16.09 20.4582 16.09C20.9715 16.09 21.3729 15.9827 21.6622 15.768C21.9515 15.5533 22.1709 15.2547 22.3202 14.872H23.4822C23.3235 15.516 22.9922 16.062 22.4882 16.51C21.9842 16.9487 21.3075 17.168 20.4582 17.168ZM20.4582 10.938C19.9169 10.938 19.4409 11.1013 19.0302 11.428C18.6289 11.7547 18.3815 12.212 18.2882 12.8H22.5162C22.4789 12.2213 22.2689 11.7687 21.8862 11.442C21.5129 11.106 21.0369 10.938 20.4582 10.938ZM28.7407 17.168C28.2087 17.168 27.7561 17.0607 27.3827 16.846C27.0187 16.622 26.7481 16.3187 26.5707 15.936H26.4867L26.3607 17H25.3947V6.92H26.5707V11.05C26.7481 10.742 27.0234 10.4713 27.3967 10.238C27.7794 10.0047 28.2274 9.888 28.7407 9.888C29.3381 9.888 29.8654 10.028 30.3227 10.308C30.7801 10.588 31.1394 10.9987 31.4007 11.54C31.6621 12.0813 31.7927 12.7393 31.7927 13.514C31.7927 14.298 31.6621 14.9653 31.4007 15.516C31.1394 16.0573 30.7754 16.468 30.3087 16.748C29.8514 17.028 29.3287 17.168 28.7407 17.168ZM28.5867 16.048C29.1747 16.048 29.6554 15.8427 30.0287 15.432C30.4114 15.012 30.6027 14.3773 30.6027 13.528C30.6027 12.6787 30.4114 12.0487 30.0287 11.638C29.6554 11.218 29.1747 11.008 28.5867 11.008C27.9987 11.008 27.5134 11.218 27.1307 11.638C26.7481 12.0487 26.5567 12.6787 26.5567 13.528C26.5567 14.3773 26.7481 15.012 27.1307 15.432C27.5134 15.8427 27.9987 16.048 28.5867 16.048ZM44.8578 17.168C44.2138 17.168 43.6351 17.0513 43.1218 16.818C42.6178 16.5753 42.2118 16.2253 41.9038 15.768C41.5958 15.3107 41.4278 14.7507 41.3998 14.088H42.6038C42.6225 14.648 42.8278 15.124 43.2198 15.516C43.6118 15.8987 44.1578 16.09 44.8578 16.09C45.5391 16.09 46.0665 15.9173 46.4398 15.572C46.8131 15.2173 46.9998 14.7367 46.9998 14.13C46.9998 13.71 46.8925 13.3647 46.6778 13.094C46.4631 12.814 46.1738 12.6087 45.8098 12.478C45.4551 12.338 45.0585 12.268 44.6198 12.268H43.7658V11.204H44.5078C45.1425 11.204 45.6465 11.0687 46.0198 10.798C46.4025 10.5273 46.5938 10.1307 46.5938 9.608C46.5938 9.16933 46.4398 8.81 46.1318 8.53C45.8331 8.25 45.4038 8.11 44.8438 8.11C44.3025 8.11 43.8638 8.264 43.5278 8.572C43.1918 8.87067 43.0005 9.26267 42.9538 9.748H41.7778C41.7965 9.216 41.9365 8.74933 42.1978 8.348C42.4591 7.93733 42.8138 7.61533 43.2618 7.382C43.7191 7.14867 44.2465 7.032 44.8438 7.032C45.4878 7.032 46.0245 7.144 46.4538 7.368C46.8925 7.592 47.2238 7.89533 47.4478 8.278C47.6718 8.65133 47.7838 9.06667 47.7838 9.524C47.7838 10.0093 47.6345 10.4387 47.3358 10.812C47.0371 11.176 46.6825 11.4327 46.2718 11.582V11.666C46.8225 11.834 47.2798 12.1187 47.6438 12.52C48.0078 12.9213 48.1898 13.458 48.1898 14.13C48.1898 14.6993 48.0545 15.2127 47.7838 15.67C47.5225 16.1273 47.1398 16.4913 46.6358 16.762C46.1411 17.0327 45.5485 17.168 44.8578 17.168Z" fill="white" />
                <path d="M73 4C73 1.79086 74.7909 0 77 0H205C207.209 0 209 1.79086 209 4V20C209 22.2091 207.209 24 205 24H77C74.7909 24 73 22.2091 73 20V4Z" fill="#03EF1B" fill-opacity="0.26" />
                <circle cx="84" cy="12" r="3" fill="#03EF1B" />
                <path d="M96.5928 17L93.4708 7.2H94.7308L97.2928 15.474L99.8548 7.2H101.129L97.9928 17H96.5928ZM105.967 17.168C105.314 17.168 104.735 17.0187 104.231 16.72C103.727 16.4213 103.331 16.0013 103.041 15.46C102.752 14.9093 102.607 14.2653 102.607 13.528C102.607 12.7907 102.752 12.1513 103.041 11.61C103.331 11.0593 103.727 10.6347 104.231 10.336C104.735 10.0373 105.314 9.888 105.967 9.888C106.621 9.888 107.199 10.0373 107.703 10.336C108.207 10.6347 108.604 11.0593 108.893 11.61C109.183 12.1513 109.327 12.7907 109.327 13.528C109.327 14.2653 109.183 14.9093 108.893 15.46C108.604 16.0013 108.207 16.4213 107.703 16.72C107.199 17.0187 106.621 17.168 105.967 17.168ZM105.967 16.048C106.369 16.048 106.733 15.9593 107.059 15.782C107.386 15.6047 107.643 15.3293 107.829 14.956C108.025 14.5827 108.123 14.1067 108.123 13.528C108.123 12.9493 108.025 12.4733 107.829 12.1C107.643 11.7267 107.386 11.4513 107.059 11.274C106.733 11.0967 106.369 11.008 105.967 11.008C105.575 11.008 105.216 11.0967 104.889 11.274C104.563 11.4513 104.301 11.7267 104.105 12.1C103.909 12.4733 103.811 12.9493 103.811 13.528C103.811 14.396 104.021 15.0353 104.441 15.446C104.861 15.8473 105.37 16.048 105.967 16.048ZM115.37 17C114.735 17 114.236 16.846 113.872 16.538C113.508 16.23 113.326 15.6747 113.326 14.872V11.064H111.562V10.056H112.612C113.088 10.056 113.363 9.82267 113.438 9.356L113.634 8.278H114.502V10.056H117.274V11.064H114.502V14.872C114.502 15.264 114.591 15.5393 114.768 15.698C114.955 15.8567 115.272 15.936 115.72 15.936H117.274V17H115.37ZM123.232 8.824C122.952 8.824 122.719 8.73067 122.532 8.544C122.346 8.35733 122.252 8.13333 122.252 7.872C122.252 7.60133 122.346 7.37733 122.532 7.2C122.719 7.01333 122.952 6.92 123.232 6.92C123.503 6.92 123.732 7.01333 123.918 7.2C124.114 7.37733 124.212 7.60133 124.212 7.872C124.212 8.13333 124.114 8.35733 123.918 8.544C123.732 8.73067 123.503 8.824 123.232 8.824ZM120.516 17V15.992H122.728V11.414C122.728 11.1807 122.612 11.064 122.378 11.064H120.754V10.056H122.658C123.489 10.056 123.904 10.4713 123.904 11.302V15.992H126.116V17H120.516ZM129.023 17V10.056H130.003L130.129 11.106H130.199C130.386 10.77 130.68 10.4853 131.081 10.252C131.482 10.0093 131.944 9.888 132.467 9.888C133.316 9.888 133.951 10.14 134.371 10.644C134.8 11.148 135.015 11.876 135.015 12.828V17H133.839V12.968C133.839 12.352 133.704 11.8713 133.433 11.526C133.162 11.1713 132.742 10.994 132.173 10.994C131.622 10.994 131.156 11.1853 130.773 11.568C130.39 11.9413 130.199 12.4827 130.199 13.192V17H129.023ZM140.539 14.956C140.054 14.956 139.62 14.8673 139.237 14.69L138.761 15.264C138.659 15.404 138.631 15.544 138.677 15.684C138.733 15.8147 138.869 15.88 139.083 15.88H140.917C141.748 15.88 142.42 16.0433 142.933 16.37C143.447 16.6873 143.703 17.196 143.703 17.896C143.703 18.316 143.596 18.7033 143.381 19.058C143.167 19.4127 142.826 19.6973 142.359 19.912C141.902 20.136 141.3 20.248 140.553 20.248C139.583 20.248 138.803 20.066 138.215 19.702C137.627 19.338 137.333 18.7827 137.333 18.036C137.333 17.7653 137.399 17.5133 137.529 17.28C137.669 17.056 137.842 16.8553 138.047 16.678C137.777 16.51 137.609 16.258 137.543 15.922C137.487 15.586 137.59 15.2547 137.851 14.928L138.481 14.144C138.033 13.6773 137.809 13.1033 137.809 12.422C137.809 11.974 137.917 11.5587 138.131 11.176C138.346 10.784 138.654 10.4713 139.055 10.238C139.466 10.0047 139.961 9.888 140.539 9.888C140.913 9.888 141.258 9.944 141.575 10.056H144.179V10.938L142.877 10.98V11.078C143.12 11.4793 143.241 11.9273 143.241 12.422C143.241 12.87 143.134 13.29 142.919 13.682C142.714 14.0647 142.406 14.3727 141.995 14.606C141.594 14.8393 141.109 14.956 140.539 14.956ZM140.539 13.948C140.997 13.948 141.37 13.8127 141.659 13.542C141.958 13.2713 142.107 12.898 142.107 12.422C142.107 11.946 141.958 11.5773 141.659 11.316C141.37 11.0453 140.997 10.91 140.539 10.91C140.073 10.91 139.69 11.0453 139.391 11.316C139.093 11.5773 138.943 11.946 138.943 12.422C138.943 12.898 139.093 13.2713 139.391 13.542C139.69 13.8127 140.073 13.948 140.539 13.948ZM138.495 17.994C138.495 18.4047 138.687 18.7127 139.069 18.918C139.452 19.1233 139.947 19.226 140.553 19.226C141.141 19.226 141.617 19.1093 141.981 18.876C142.355 18.6427 142.541 18.33 142.541 17.938C142.541 17.63 142.411 17.3687 142.149 17.154C141.888 16.9487 141.407 16.846 140.707 16.846H139.125C138.705 17.154 138.495 17.5367 138.495 17.994ZM154.851 17V7.2H158.113C158.859 7.2 159.471 7.33533 159.947 7.606C160.423 7.87667 160.773 8.236 160.997 8.684C161.221 9.132 161.333 9.62667 161.333 10.168C161.333 10.7093 161.221 11.204 160.997 11.652C160.773 12.1 160.423 12.4593 159.947 12.73C159.471 13.0007 158.859 13.136 158.113 13.136H156.027V17H154.851ZM156.027 12.058H158.085C158.775 12.058 159.289 11.8853 159.625 11.54C159.961 11.1853 160.129 10.728 160.129 10.168C160.129 9.608 159.961 9.15067 159.625 8.796C159.289 8.44133 158.775 8.264 158.085 8.264H156.027V12.058ZM163.651 17V6.92H164.827V11.106C165.014 10.7513 165.322 10.462 165.751 10.238C166.18 10.0047 166.652 9.888 167.165 9.888C168.014 9.888 168.658 10.1447 169.097 10.658C169.545 11.1713 169.769 11.89 169.769 12.814V17H168.593V12.968C168.593 12.3427 168.439 11.8573 168.131 11.512C167.832 11.1667 167.412 10.994 166.871 10.994C166.498 10.994 166.157 11.078 165.849 11.246C165.541 11.414 165.294 11.6613 165.107 11.988C164.92 12.3147 164.827 12.716 164.827 13.192V17H163.651ZM174.776 17.168C174.225 17.168 173.768 17.07 173.404 16.874C173.04 16.678 172.769 16.4213 172.592 16.104C172.414 15.7773 172.326 15.4227 172.326 15.04C172.326 14.3307 172.582 13.794 173.096 13.43C173.618 13.0567 174.314 12.87 175.182 12.87H177.086V12.73C177.086 11.5167 176.53 10.91 175.42 10.91C174.972 10.91 174.594 11.008 174.286 11.204C173.987 11.4 173.796 11.708 173.712 12.128H172.508C172.554 11.6613 172.708 11.26 172.97 10.924C173.24 10.588 173.586 10.3313 174.006 10.154C174.426 9.97667 174.897 9.888 175.42 9.888C176.409 9.888 177.128 10.1493 177.576 10.672C178.033 11.1853 178.262 11.8713 178.262 12.73V17H177.254L177.156 15.922H177.058C176.852 16.258 176.577 16.552 176.232 16.804C175.896 17.0467 175.41 17.168 174.776 17.168ZM174.986 16.132C175.434 16.132 175.812 16.0247 176.12 15.81C176.437 15.5953 176.675 15.3107 176.834 14.956C177.002 14.6013 177.086 14.214 177.086 13.794H175.28C174.645 13.794 174.197 13.9013 173.936 14.116C173.684 14.3307 173.558 14.6153 173.558 14.97C173.558 15.334 173.679 15.6187 173.922 15.824C174.164 16.0293 174.519 16.132 174.986 16.132ZM184.108 17.168C183.221 17.168 182.503 16.9627 181.952 16.552C181.411 16.132 181.107 15.558 181.042 14.83H182.26C182.316 15.2127 182.503 15.5253 182.82 15.768C183.147 16.0107 183.585 16.132 184.136 16.132C184.659 16.132 185.046 16.02 185.298 15.796C185.559 15.572 185.69 15.3153 185.69 15.026C185.69 14.634 185.536 14.368 185.228 14.228C184.92 14.0787 184.458 13.9667 183.842 13.892C183.105 13.808 182.493 13.6073 182.008 13.29C181.523 12.9727 181.28 12.4967 181.28 11.862C181.28 11.2927 181.518 10.8213 181.994 10.448C182.47 10.0747 183.119 9.888 183.94 9.888C184.752 9.888 185.391 10.0747 185.858 10.448C186.325 10.812 186.591 11.3347 186.656 12.016H185.494C185.466 11.68 185.303 11.414 185.004 11.218C184.715 11.0127 184.351 10.91 183.912 10.91C183.455 10.91 183.1 10.9987 182.848 11.176C182.596 11.344 182.47 11.568 182.47 11.848C182.47 12.128 182.61 12.3613 182.89 12.548C183.179 12.7253 183.632 12.842 184.248 12.898C184.733 12.954 185.177 13.0473 185.578 13.178C185.979 13.3087 186.297 13.514 186.53 13.794C186.773 14.074 186.894 14.466 186.894 14.97C186.903 15.39 186.787 15.768 186.544 16.104C186.311 16.4307 185.984 16.692 185.564 16.888C185.144 17.0747 184.659 17.168 184.108 17.168ZM192.783 17.168C192.129 17.168 191.551 17.0187 191.047 16.72C190.552 16.412 190.16 15.9873 189.871 15.446C189.581 14.8953 189.437 14.256 189.437 13.528C189.437 12.8 189.577 12.1653 189.857 11.624C190.146 11.0733 190.543 10.6487 191.047 10.35C191.551 10.042 192.139 9.888 192.811 9.888C193.483 9.888 194.057 10.042 194.533 10.35C195.009 10.6487 195.373 11.0453 195.625 11.54C195.877 12.0347 196.003 12.5667 196.003 13.136C196.003 13.2387 195.998 13.3413 195.989 13.444C195.989 13.5467 195.989 13.6633 195.989 13.794H190.599C190.627 14.3073 190.743 14.7367 190.949 15.082C191.163 15.418 191.429 15.67 191.747 15.838C192.073 16.006 192.419 16.09 192.783 16.09C193.296 16.09 193.697 15.9827 193.987 15.768C194.276 15.5533 194.495 15.2547 194.645 14.872H195.807C195.648 15.516 195.317 16.062 194.813 16.51C194.309 16.9487 193.632 17.168 192.783 17.168ZM192.783 10.938C192.241 10.938 191.765 11.1013 191.355 11.428C190.953 11.7547 190.706 12.212 190.613 12.8H194.841C194.803 12.2213 194.593 11.7687 194.211 11.442C193.837 11.106 193.361 10.938 192.783 10.938Z" fill="#03EF1B" />
              </svg>



            </div>
            <div className="flex flex-col gap-2 my-5"> <h4
              className={`text-4xl font-thunder tracking-widest font-bold mt-2 text-white`}
            >
              {hackDetails.name}
            </h4>  <p className="flex items-center gap-x-2 text-[#C3C3C3] text-xs my-1.5">
                by
                <GoOrganization className="bg-[#FF6624] text-white p-1 w-6 h-6 rounded-sm" />
                <span className="text-white dm-mono-regular">
                  {hackDetails.organizedBy}
                </span>
              </p></div>
          </div>
          <div>   <div className="flex justify-center  items-center bg-[#00F07D] rounded-lg bg-opacity-10 border-[#374e43] border-[0.1px] px-10 p-4 w-full">
            <div className="flex items-center gap-2 text-md">Event Starts In: <p className="bg-[#19191D] text-[#00F07D] px-4 py-2 rounded-md">03 </p> days</div>

          </div></div>
          <div className="flex flex-col gap-4"><svg className="w-full" width="252" height="42" viewBox="0 0 252 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.25" y="0.25" width="251.5" height="41.5" rx="3.75" stroke="#4C76FD" stroke-width="0.5" />
            <path d="M40.5 27.75C36.772 27.75 33.75 24.728 33.75 21C33.75 17.272 36.772 14.25 40.5 14.25C44.228 14.25 47.25 17.272 47.25 21C47.25 24.728 44.228 27.75 40.5 27.75ZM40.5 26.4C41.9322 26.4 43.3057 25.8311 44.3184 24.8184C45.3311 23.8057 45.9 22.4322 45.9 21C45.9 19.5678 45.3311 18.1943 44.3184 17.1816C43.3057 16.1689 41.9322 15.6 40.5 15.6C39.0678 15.6 37.6943 16.1689 36.6816 17.1816C35.6689 18.1943 35.1 19.5678 35.1 21C35.1 22.4322 35.6689 23.8057 36.6816 24.8184C37.6943 25.8311 39.0678 26.4 40.5 26.4ZM39.825 17.625H41.175V18.975H39.825V17.625ZM39.825 20.325H41.175V24.375H39.825V20.325Z" fill="#4C76FD" />
            <path d="M61.798 26.168C61.1073 26.168 60.5053 26.0373 59.992 25.776C59.488 25.5147 59.096 25.1507 58.816 24.684C58.5453 24.2173 58.4053 23.6713 58.396 23.046H59.628C59.6373 23.606 59.824 24.0913 60.188 24.502C60.5613 24.9033 61.098 25.104 61.798 25.104C62.442 25.104 62.9367 24.95 63.282 24.642C63.6367 24.3247 63.814 23.9467 63.814 23.508C63.814 23.144 63.73 22.8407 63.562 22.598C63.394 22.346 63.1187 22.1267 62.736 21.94C62.3627 21.744 61.8587 21.5433 61.224 21.338C60.328 21.0673 59.6747 20.6987 59.264 20.232C58.8533 19.7653 58.648 19.1867 58.648 18.496C58.648 18.0293 58.7693 17.6093 59.012 17.236C59.2547 16.8627 59.6047 16.5687 60.062 16.354C60.5193 16.1393 61.0747 16.032 61.728 16.032C62.344 16.032 62.8807 16.1487 63.338 16.382C63.8047 16.606 64.164 16.9233 64.416 17.334C64.6773 17.7447 64.808 18.216 64.808 18.748H63.576C63.576 18.4867 63.506 18.23 63.366 17.978C63.226 17.726 63.016 17.516 62.736 17.348C62.456 17.18 62.1013 17.096 61.672 17.096C61.1587 17.096 60.7293 17.222 60.384 17.474C60.0387 17.7167 59.866 18.0527 59.866 18.482C59.866 18.8087 59.9407 19.084 60.09 19.308C60.2487 19.532 60.5053 19.7373 60.86 19.924C61.2147 20.1013 61.6953 20.2927 62.302 20.498C62.8713 20.6847 63.3567 20.904 63.758 21.156C64.1687 21.3987 64.4813 21.702 64.696 22.066C64.92 22.43 65.032 22.8827 65.032 23.424C65.032 23.956 64.8967 24.4273 64.626 24.838C64.3553 25.2487 63.9773 25.5753 63.492 25.818C63.0067 26.0513 62.442 26.168 61.798 26.168ZM66.8185 26V16.2H72.9365V17.264H67.9945V20.526H72.5165V21.59H67.9945V24.936H72.9365V26H66.8185ZM74.9331 26V16.2H81.0511V17.264H76.1091V20.526H80.6311V21.59H76.1091V24.936H81.0511V26H74.9331ZM90.6161 26V16.2H91.7921V20.428H96.5381V16.2H97.7141V26H96.5381V21.492H91.7921V26H90.6161ZM102.273 26.168C101.479 26.168 100.798 25.958 100.229 25.538C99.6593 25.118 99.2207 24.53 98.9127 23.774C98.614 23.0087 98.4647 22.1173 98.4647 21.1C98.4647 20.0827 98.614 19.196 98.9127 18.44C99.2207 17.6747 99.6593 17.082 100.229 16.662C100.798 16.242 101.479 16.032 102.273 16.032C103.066 16.032 103.747 16.242 104.317 16.662C104.886 17.082 105.32 17.6747 105.619 18.44C105.927 19.196 106.081 20.0827 106.081 21.1C106.081 22.1173 105.927 23.0087 105.619 23.774C105.32 24.53 104.886 25.118 104.317 25.538C103.747 25.958 103.066 26.168 102.273 26.168ZM102.273 25.062C103.047 25.062 103.673 24.7167 104.149 24.026C104.634 23.3353 104.877 22.36 104.877 21.1C104.877 19.84 104.634 18.8647 104.149 18.174C103.673 17.4833 103.047 17.138 102.273 17.138C101.489 17.138 100.859 17.4833 100.383 18.174C99.9067 18.8647 99.6687 19.84 99.6687 21.1C99.6687 22.36 99.9067 23.3353 100.383 24.026C100.859 24.7167 101.489 25.062 102.273 25.062ZM107.713 26L106.215 16.2H107.405L108.399 23.76L109.785 16.2H110.989L112.375 23.76L113.369 16.2H114.559L113.061 26H111.717L110.387 18.468L109.057 26H107.713ZM125.916 26L122.794 16.2H124.054L126.616 24.474L129.178 16.2H130.452L127.316 26H125.916ZM134.731 26.168C133.937 26.168 133.256 25.958 132.687 25.538C132.117 25.118 131.679 24.53 131.371 23.774C131.072 23.0087 130.923 22.1173 130.923 21.1C130.923 20.0827 131.072 19.196 131.371 18.44C131.679 17.6747 132.117 17.082 132.687 16.662C133.256 16.242 133.937 16.032 134.731 16.032C135.524 16.032 136.205 16.242 136.775 16.662C137.344 17.082 137.778 17.6747 138.077 18.44C138.385 19.196 138.539 20.0827 138.539 21.1C138.539 22.1173 138.385 23.0087 138.077 23.774C137.778 24.53 137.344 25.118 136.775 25.538C136.205 25.958 135.524 26.168 134.731 26.168ZM134.731 25.062C135.505 25.062 136.131 24.7167 136.607 24.026C137.092 23.3353 137.335 22.36 137.335 21.1C137.335 19.84 137.092 18.8647 136.607 18.174C136.131 17.4833 135.505 17.138 134.731 17.138C133.947 17.138 133.317 17.4833 132.841 18.174C132.365 18.8647 132.127 19.84 132.127 21.1C132.127 22.36 132.365 23.3353 132.841 24.026C133.317 24.7167 133.947 25.062 134.731 25.062ZM142.257 26V17.264H139.625V16.2H146.065V17.264H143.433V26H142.257ZM148.146 26V24.978H150.372V17.222H148.146V16.2H153.774V17.222H151.548V24.978H153.774V26H148.146ZM155.672 26V16.2H156.876L161.328 23.942V16.2H162.49V26H161.272L156.82 18.258V26H155.672ZM167.091 26.168C166.4 26.168 165.784 25.9673 165.243 25.566C164.702 25.1553 164.277 24.572 163.969 23.816C163.67 23.06 163.521 22.1547 163.521 21.1C163.521 20.0547 163.675 19.154 163.983 18.398C164.291 17.642 164.725 17.0587 165.285 16.648C165.854 16.2373 166.526 16.032 167.301 16.032C168.225 16.032 168.976 16.3027 169.555 16.844C170.143 17.3853 170.493 18.1133 170.605 19.028H169.303C169.21 18.468 168.99 18.0153 168.645 17.67C168.309 17.3153 167.861 17.138 167.301 17.138C166.498 17.138 165.868 17.488 165.411 18.188C164.954 18.888 164.725 19.8587 164.725 21.1C164.725 22.36 164.954 23.3353 165.411 24.026C165.868 24.7167 166.461 25.062 167.189 25.062C167.712 25.062 168.141 24.908 168.477 24.6C168.813 24.2827 169.065 23.8813 169.233 23.396C169.41 22.9013 169.508 22.3927 169.527 21.87H167.343V20.862H170.731V26H169.653L169.555 24.516H169.499C169.303 25.02 169.014 25.4213 168.631 25.72C168.258 26.0187 167.744 26.168 167.091 26.168ZM180.744 26L179.246 16.2H180.436L181.43 23.76L182.816 16.2H184.02L185.406 23.76L186.4 16.2H187.59L186.092 26H184.748L183.418 18.468L182.088 26H180.744ZM191.533 26.168C190.739 26.168 190.058 25.958 189.489 25.538C188.919 25.118 188.481 24.53 188.173 23.774C187.874 23.0087 187.725 22.1173 187.725 21.1C187.725 20.0827 187.874 19.196 188.173 18.44C188.481 17.6747 188.919 17.082 189.489 16.662C190.058 16.242 190.739 16.032 191.533 16.032C192.326 16.032 193.007 16.242 193.577 16.662C194.146 17.082 194.58 17.6747 194.879 18.44C195.187 19.196 195.341 20.0827 195.341 21.1C195.341 22.1173 195.187 23.0087 194.879 23.774C194.58 24.53 194.146 25.118 193.577 25.538C193.007 25.958 192.326 26.168 191.533 26.168ZM191.533 25.062C192.307 25.062 192.933 24.7167 193.409 24.026C193.894 23.3353 194.137 22.36 194.137 21.1C194.137 19.84 193.894 18.8647 193.409 18.174C192.933 17.4833 192.307 17.138 191.533 17.138C190.749 17.138 190.119 17.4833 189.643 18.174C189.167 18.8647 188.929 19.84 188.929 21.1C188.929 22.36 189.167 23.3353 189.643 24.026C190.119 24.7167 190.749 25.062 191.533 25.062ZM196.595 26V16.2H199.605C200.361 16.2 200.982 16.326 201.467 16.578C201.962 16.83 202.33 17.1753 202.573 17.614C202.816 18.0433 202.937 18.5333 202.937 19.084C202.937 19.728 202.769 20.2973 202.433 20.792C202.106 21.2773 201.602 21.618 200.921 21.814L203.049 26H201.649L199.675 21.982H199.605H197.771V26H196.595ZM197.771 20.904H199.563C200.31 20.904 200.856 20.736 201.201 20.4C201.556 20.0547 201.733 19.616 201.733 19.084C201.733 18.524 201.56 18.0807 201.215 17.754C200.879 17.4273 200.324 17.264 199.549 17.264H197.771V20.904ZM204.71 26V16.2H205.886V20.764L209.722 16.2H211.22L207.09 21.072V21.128L211.276 26H209.75L205.886 21.506V26H204.71ZM215.974 26.168C215.283 26.168 214.681 26.0373 214.168 25.776C213.664 25.5147 213.272 25.1507 212.992 24.684C212.721 24.2173 212.581 23.6713 212.572 23.046H213.804C213.813 23.606 214 24.0913 214.364 24.502C214.737 24.9033 215.274 25.104 215.974 25.104C216.618 25.104 217.113 24.95 217.458 24.642C217.813 24.3247 217.99 23.9467 217.99 23.508C217.99 23.144 217.906 22.8407 217.738 22.598C217.57 22.346 217.295 22.1267 216.912 21.94C216.539 21.744 216.035 21.5433 215.4 21.338C214.504 21.0673 213.851 20.6987 213.44 20.232C213.029 19.7653 212.824 19.1867 212.824 18.496C212.824 18.0293 212.945 17.6093 213.188 17.236C213.431 16.8627 213.781 16.5687 214.238 16.354C214.695 16.1393 215.251 16.032 215.904 16.032C216.52 16.032 217.057 16.1487 217.514 16.382C217.981 16.606 218.34 16.9233 218.592 17.334C218.853 17.7447 218.984 18.216 218.984 18.748H217.752C217.752 18.4867 217.682 18.23 217.542 17.978C217.402 17.726 217.192 17.516 216.912 17.348C216.632 17.18 216.277 17.096 215.848 17.096C215.335 17.096 214.905 17.222 214.56 17.474C214.215 17.7167 214.042 18.0527 214.042 18.482C214.042 18.8087 214.117 19.084 214.266 19.308C214.425 19.532 214.681 19.7373 215.036 19.924C215.391 20.1013 215.871 20.2927 216.478 20.498C217.047 20.6847 217.533 20.904 217.934 21.156C218.345 21.3987 218.657 21.702 218.872 22.066C219.096 22.43 219.208 22.8827 219.208 23.424C219.208 23.956 219.073 24.4273 218.802 24.838C218.531 25.2487 218.153 25.5753 217.668 25.818C217.183 26.0513 216.618 26.168 215.974 26.168Z" fill="#4C76FD" />
          </svg>
            <div className="flex flex-col gap-6 bg-[#282828] p-4 py-8 rounded-lg"> Voters for option so far:
              <div className="flex justify-end ">
                <svg width="59" height="5" viewBox="0 0 59 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.426 4.792H0.905999V0.615999H12.426V4.792ZM27.8235 4.792H16.3035V0.615999H27.8235V4.792ZM43.221 4.792H31.701V0.615999H43.221V4.792ZM58.6185 4.792H47.0985V0.615999H58.6185V4.792Z" fill="white" />
                </svg>
              </div></div>

          </div>
        </div>

        <div className="m-5 bg-[#282828] mx-10 rounded-lg" id="default-tab-content">
          <div
            className={`p-4 rounded-lg  ${activeTab === "profile" ? "" : "hidden"}`}
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            {currentVenueQuestion >= VenueQuestions.length ? (
              <>
                {currentFoodQuestion >= FoodQuestions.length ? (
                  <>
                    {currentMiscQuestion >= MiscQuestions.length ? (
                      <>
                        <div className="text-center  my-10 text-2xl font-bold">You have voted for all the available options.</div>
                      </>
                    ) : (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <MiscQuestion
                          question={MiscQuestions[currentMiscQuestion].question}
                          options={MiscQuestions[currentMiscQuestion].options}
                          onOptionSelect={handleMiscOptionSelect}
                        />
                      </div>
                    )}            </>
                ) : (
                  <div className="text-sm -mt-10 text-gray-500 dark:text-gray-400">
                    <FoodQuestion
                      selectedVenueOption={selectedVenueOption}

                      question={FoodQuestions[currentFoodQuestion].question}
                      options={FoodQuestions[currentFoodQuestion].options}
                      onOptionSelect={handleFoodOptionSelect}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <Question
                  selectedVenueOption={selectedVenueOption}
                  question={VenueQuestions[currentVenueQuestion].question}
                  options={VenueQuestions[currentVenueQuestion].options}
                  onOptionSelect={handleVenueOptionSelect}
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;
