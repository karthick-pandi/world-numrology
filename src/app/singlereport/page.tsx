
import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';

const STORE_ITEMS = [
  { id: '1', title: 'Yearly & Monthly Forecast', subtitle: 'LUNA LOVEGOOD', price: '$ 12.95', image: 'https://picsum.photos/seed/forecast/200/200', color: 'bg-[#F58220]' },
  { id: '2', title: 'Personality Profile', subtitle: 'LUNA LOVEGOOD', price: '$ 14.95', image: 'https://picsum.photos/seed/personality/200/200', color: 'bg-[#F58220]/60' },
  { id: '3', title: 'Personality Profile & Yearly Forecast', subtitle: 'LUNA LOVEGOOD', price: '$ 17.95', image: 'https://picsum.photos/seed/combo/200/200', color: 'bg-[#F58220]/40' },
  { id: '4', title: 'Relationship Compatibility Profile', subtitle: 'LINDA LOVEGOOD & JONATHAN SEAGULL', price: '$ 12.95', image: 'https://picsum.photos/seed/relation/200/200', color: 'bg-[#C01D33]' },
  { id: '5', title: 'Inner Reflections', subtitle: 'LUNA LOVEGOOD', price: '$ 11.95', image: 'https://picsum.photos/seed/inner/200/200', color: 'bg-[#C01D33]/70' },
  { id: '6', title: 'Diamond Spirit Guide', subtitle: 'LUNA LOVEGOOD', price: '$ 15.95', image: 'https://picsum.photos/seed/diamond/200/200', color: 'bg-[#548235]' },
];

const SingleReadings: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto bg-white border-x font-['Figtree']">
      <div className="bg-[#5C6799] text-white py-3 text-center font-black uppercase tracking-widest text-xs">
        Single Readings in Print Format – Great Gifts!
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8 gap-8">
        {STORE_ITEMS.map((item) => (
          <div key={item.id} className="bg-white border border-gray-100 rounded-sm shadow-sm flex flex-col items-center overflow-hidden hover:shadow-lg transition-all group">
            {/* Reduced size book image */}
            <div className={`${item.color} w-full aspect-[4/4.5] p-5 relative overflow-hidden`}>
              <div className="bg-white p-3 h-full shadow-md rounded-[2px] flex flex-col relative z-10 border border-black/5">
                <div className="text-[8px] font-black tracking-widest text-gray-800 uppercase mb-1">World Numerology</div>
                <div className="flex-grow flex items-center justify-center p-2">
                  <div className="w-full h-full border border-gray-100 rounded-full flex items-center justify-center relative overflow-hidden">
                    <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-90" />
                  </div>
                </div>
                <div className="mt-2 text-left">
                  <h3 className="text-[10px] font-black uppercase text-[#2D1B5E] leading-tight">{item.title}</h3>
                  <p className="text-[7px] font-bold text-gray-400 uppercase mt-0.5">{item.subtitle}</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 -rotate-45 translate-x-12 -translate-y-12"></div>
            </div>

            {/* Content & Actions with larger font sizes */}
            <div className="p-5 w-full text-center space-y-4 bg-gray-50/50">
              <h4 className="font-extrabold text-[#2D1B5E] text-base lg:text-lg h-12 flex items-center justify-center leading-tight">
                {item.title}
              </h4>
              <p className="text-[#2D1B5E] font-black text-xl tracking-tight">{item.price}</p>
              
              <button className="text-[#00A99D] text-[11px] font-black uppercase tracking-widest hover:underline block w-full transition-all">
                Learn More
              </button>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <button className="bg-[#f09a24] text-white text-[10px] font-black uppercase py-2.5 px-2 rounded-sm hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-sm">
                   <ShoppingCart size={13} /> Add to Cart
                </button>
                <button className="bg-[#f09a24] text-white text-[10px] font-black uppercase py-2.5 px-2 rounded-sm hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-sm">
                   <Eye size={13} /> View Sample
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dot */}
      <div className="flex justify-center pb-12">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-[#C01D33] rounded-full"></div>
          <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleReadings;
