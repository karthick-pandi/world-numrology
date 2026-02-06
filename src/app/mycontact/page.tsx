'use client';
import React, { useEffect } from 'react';
import { Edit2, Trash2, UserPlus, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useUser } from '@/src/context/UserContext';
import { services } from '@/src/core/services/route';
import { API_URL } from '@/src/core/services/api-url.services';

const MOCK_DATA = [
  { id: '1', firstName: 'saravanakumar', middleName: '', lastName: 'fdghgh', currentName: 'Saravanakumar, dfgsdfg, sdfgdfg', dob: 'January 01, 1980' },
  { id: '2', firstName: 'sara', middleName: 'vana', lastName: 'sara', currentName: 'sara, sdf, ku', dob: 'January 01, 1970' },
  { id: '3', firstName: 'jdikd', middleName: '', lastName: 'jdjd', currentName: '', dob: 'January 01, 1980' },
  { id: '4', firstName: 'ldj', middleName: '', lastName: 'Odjd', currentName: 'Jdikd, Jdjd', dob: 'January 01, 1980' },
];

const SavedData: React.FC = () => {
    const { userResponse } = useUser();
    const [contactList, setContactList] = React.useState<any>(null);

     useEffect(() => {
        getContactList();
      }, [userResponse]);

      const getContactList = async () => {

        if (!userResponse) return;
        const today = new Date();
        const current_day = String(today.getDate()).padStart(2, "0");
        const current_month = String(today.getMonth() + 1).padStart(2, "0");
        const values = {
          responce_data: "getcontactlist",
          size:10,
          page:1,
          key: userResponse.data.logintoken,
          user_id: userResponse.data.user_id,
          swith_user_id: userResponse.data.user_id,
        };
        try {
          const response = await services.create(API_URL, values);
          console.log("response::", response);
          setContactList(response.user_list);
          // setLoading(false);
    
        } catch (error) {
          console.log("err::", error);
        } finally {
          // setLoading(false)
        }
    
      }
  return (
    <div className="max-w-[1400px] mx-auto p-0 bg-white shadow-sm min-h-[600px] border-x">
      <div className="flex justify-between items-stretch">
        <div className="flex-grow bg-[#C01D33] text-white py-3 px-6 flex items-center justify-center gap-2 font-bold uppercase text-sm tracking-widest">
          <Users size={18} /> Data For Single Readings & Relationship Profiles
        </div>
        <div className="bg-[#2D1B5E] text-white py-3 px-8 flex items-center justify-center gap-2 font-bold uppercase text-sm tracking-widest cursor-pointer hover:bg-indigo-900 transition-colors">
          Add Someone <UserPlus size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-400 uppercase tracking-tighter">First Name</th>
              <th className="px-6 py-4 font-semibold text-gray-400 uppercase tracking-tighter">Middle Name</th>
              <th className="px-6 py-4 font-semibold text-gray-400 uppercase tracking-tighter">Last Name</th>
              <th className="px-6 py-4 font-semibold text-gray-400 uppercase tracking-tighter">Current Name</th>
              <th className="px-6 py-4 font-semibold text-gray-400 uppercase tracking-tighter">DOB</th>
              <th className="px-6 py-4 font-semibold text-gray-400 uppercase tracking-tighter">Options</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {contactList?.map((row:any) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-600 font-medium">{row.first_name}</td>
                <td className="px-6 py-4 text-gray-600 font-medium">{row.middle_name || ''}</td>
                <td className="px-6 py-4 text-gray-600 font-medium">{row.last_name}</td>
                <td className="px-6 py-4 text-gray-400 text-[10px] italic leading-tight max-w-[200px]">{row.curnt_first_name}</td>
                <td className="px-6 py-4 text-gray-600 font-medium whitespace-nowrap">{row.dob}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="bg-[#C01D33] text-white p-2 rounded hover:bg-[#a0182a] transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button className="bg-[#C01D33] text-white p-2 rounded hover:bg-[#a0182a] transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center gap-8 py-6 px-10 border-t bg-gray-50">
        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
           Rows per page: 
           <select className="bg-transparent border-b border-gray-300 outline-none cursor-pointer">
             <option>10</option>
             <option>25</option>
           </select>
        </div>
        <div className="flex items-center gap-8 text-xs font-medium text-gray-500">
          <span>1-4 of 4</span>
          <div className="flex gap-4">
            <ChevronLeft size={18} className="cursor-not-allowed opacity-30" />
            <ChevronRight size={18} className="cursor-not-allowed opacity-30" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedData;
