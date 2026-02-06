'use client';
import React, { use, useEffect, useState } from 'react';
import { Calendar, ChevronRight, Mail, Info, ArrowLeft } from 'lucide-react';
// import { getDailyNumerology } from '../services/geminiService';
import { READING_CARDS } from './contatant';
import Image from 'next/image';
import { services } from '@/src/core/services/route';
import { useUser } from "@/src/context/UserContext";
import { API_URL } from '@/src/core/services/api-url.services';


const Dashboard: React.FC = ({ }) => {
  const { userResponse } = useUser();
  const [textSize, setTextSize] = useState<number>(1);
  const [reading, setReading] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cardValue, setCardValue] = useState<string>('dailyforecast');

  // useEffect(() => {
  //   const fetchReading = async () => {
  //     setLoading(true);
  //     const data = await getDailyNumerology('Saravana');
  //     setReading(data);
  //     setLoading(false);
  //   };
  //   fetchReading();
  // }, []);

  useEffect(() => {
    getData();
  }, [userResponse, cardValue]);

  const getData = async () => {

    if (!userResponse) return;
    const today = new Date();
    const current_day = String(today.getDate()).padStart(2, "0");
    const current_month = String(today.getMonth() + 1).padStart(2, "0");
    const values = {
      responce_data: cardValue,
      key: userResponse.data.logintoken,
      user_id: userResponse.data.user_id,
      first_name: userResponse.data.curnt_first_name,
      birth_month: userResponse.data.bmonth,
      birth_day: userResponse.data.bday,
      current_year: 2026,
      current_month: current_month,
      current_day: current_day,
    };
    try {
      const response = await services.create(API_URL, values);
     console.log("response::", response);
      setReading(response);
      setLoading(false);
    
    } catch (error) {
      console.log("err::", error);
    } finally {
      // setLoading(false)
    }

  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="d-flex">
          <div className="w-50 lft">
            <div className="bg-[#b47c44] text-white py-1 px-4 md:px-6">
              <div className="max-w-[1400px] mx-auto flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest">Text Size</span>
                <div className="flex gap-2 items-end pb-0.5">
                  <button onClick={() => setTextSize(1)} className={`border border-white/40 leading-none flex items-center justify-center w-5 h-5 text-[10px] font-bold transition-all ${textSize === 1 ? 'bg-white text-[#b47c44]' : 'hover:bg-white/10'}`}>A</button>
                  <button onClick={() => setTextSize(1.25)} className={`border border-white/40 leading-none flex items-center justify-center w-6 h-6 text-[12px] font-bold transition-all ${textSize === 1.25 ? 'bg-white text-[#b47c44]' : 'hover:bg-white/10'}`}>A</button>
                  <button onClick={() => setTextSize(1.5)} className={`border border-white/40 leading-none flex items-center justify-center w-7 h-7 text-[14px] font-bold transition-all ${textSize === 1.5 ? 'bg-white text-[#b47c44]' : 'hover:bg-white/10'}`}>A</button>
                </div>
              </div>
            </div>
            {/* Updated Calendar Header */}
            <div className="p-4 bg-white border-b">
              <div className="flex items-center gap-3 text-gray-700 font-bold text-sm mb-6 cursor-pointer">
                <span className="font-extrabold">2026 - January - 25</span>
                <Calendar size={18} className="text-gray-500" />
                <ArrowLeft size={18} className="text-gray-500" />
                <span className="text-gray-400 font-medium text-xs">Pick any day up to 3 months ahead</span>
              </div>

              <div className="flex flex-col gap-6 items-start">
                <div className="flex items-start gap-6 w-full">
                  <div className="shrink-0 flex items-center justify-center p-2 bg-[#F58220]/10 rounded">
                    {/* Visual placeholder for the "26" number graphic */}
                    <div className="text-[#F58220] text-5xl font-black leading-none flex flex-col items-center">
                      <span>2</span>
                      <span>6</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h2
                      style={{ fontSize: `${textSize * 2.2}rem` }}
                      className="text-[#2D1B5E] font-black leading-none uppercase tracking-tight text-left"
                    >
                      {loading ? 'CALCULATING...' : reading?.title}
                    </h2>
                  </div>
                </div>

                <div className="text-left w-full space-y-4" style={{ fontSize: `${textSize * 0.95}rem` }}>
                  <p className="font-bold text-gray-500">{reading?.desc}</p>
                  {loading ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  ) : (
                    <div className="whitespace-pre-line text-gray-600 leading-relaxed font-medium">
                      {reading?.reading}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex gap-4 items-start">
                <div className="w-20 h-20 bg-[#F58220] shrink-0 rounded flex items-center justify-center p-4">
                  <div className="w-full h-full border-2 border-white/50 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-[#2D1B5E] text-[13px] uppercase">Sending Readings by Email</h3>
                  <p className="text-[11px] text-gray-500 leading-tight">
                    Did you know that if you have a subscription you can go to SAVED READINGS and email any readings you made to yourself or a friend in print (PDF) format?
                  </p>
                  <button className="text-[#C01D33] text-[10px] font-extrabold uppercase hover:underline">Learn More</button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-50 rft">
            <div className="rft-bar d-flex align-items-center justify-content-center">
              <span>Readings & Charts Included In The Subscriptions</span>
            </div>
            <div className="sub-cards p-4">
              {READING_CARDS.map((card, i) => (
                <div key={i} className="d-flex align-items-center flex-column cards text-center" onClick={() => setCardValue(card.value)}>
                  <div className="d-flex align-items-center justify-content-center position-relative cards-img">
                    <div className={`${card.color} absolute inset-0 opacity-100`}></div>
                    <div className="relative z-10 text-white">
                      {typeof card.icon === 'string' ? (
                        <Image src={card.icon} alt="" width={100} height={100} />
                      ) : (
                        card.icon
                      )}
                    </div>
                  </div>
                  <span className="card-text">
                    {card.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;