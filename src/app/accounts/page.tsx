'use client';
import React, { useEffect } from 'react';
import { Mail, Trash2, Download, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useUser } from '@/src/context/UserContext';
import { services } from '@/src/core/services/route';
import { API_URL } from '@/src/core/services/api-url.services';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MOCK_READINGS = [
  { id: '1', report: 'Inner Reflection', user: 'test', date: 'January 09, 2026', image: 'https://picsum.photos/seed/inner/100/100', color: 'bg-[#548235]' },
  { id: '2', report: 'Yearly and Monthly Forecast', user: 'Markus', date: 'December 09, 2025', image: 'https://picsum.photos/seed/yearly/100/100', color: 'bg-[#F58220]' },
  { id: '3', report: 'Diamond Spirit Reading', user: 'Markus', date: 'December 09, 2025', image: 'https://picsum.photos/seed/spirit/100/100', color: 'bg-[#F5B120]' },
];

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}


const SavedReadings: React.FC<ConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  message 
}) => {
  const { userResponse } = useUser();
  const [savedReadings, setSavedReadings] = React.useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [selectedReadingId, setSelectedReadingId] = React.useState<string | null>(null);

  useEffect(() => {
    getSavedReadings();
  }, [userResponse]);

  const getSavedReadings = async () => {

    if (!userResponse) return;
    const today = new Date();
    const current_day = String(today.getDate()).padStart(2, "0");
    const current_month = String(today.getMonth() + 1).padStart(2, "0");
    const values = {
      responce_data: "getreportgendratelist",
      key: userResponse.data.logintoken,
      user_id: userResponse.data.user_id,
      swith_user_id: userResponse.data.user_id,
      currentuseronly: false
    };
    try {
      const response = await services.create(API_URL, values);
      console.log("response::", response);
      setSavedReadings(response.reports_list);
      // setLoading(false);

    } catch (error) {
      console.log("err::", error);
    } finally {
      // setLoading(false)
    }

  }

  const ConfirmModal: React.FC<{
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
    message?: string;
  }> = ({ show, onHide, onConfirm, message }) => {
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {message || "Are you sure you want to delete this record?"}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleDeleteClick = (readingId: string) => {
    setSelectedReadingId(readingId);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setSavedReadings((prev: any) => prev.filter((r: any) => r.id !== selectedReadingId));
    setShowDeleteModal(false);
    setSelectedReadingId(null);
  };

  const handleDeleteConfirm = () => {
    setSavedReadings((prev: any) => prev.filter((r: any) => r.id !== selectedReadingId));
    setShowDeleteModal(false);
    setSelectedReadingId(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedReadingId(null);
  };

  return (
    <div className={`max-w-[1400px] mx-auto bg-white shadow-sm border-x`}>
      <div className="bg-[#548235] text-white py-3 text-center font-bold uppercase tracking-widest text-sm shadow-inner">
        Saved Readings
      </div>

      <div className="px-6 py-4 flex items-center justify-between border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all border"></div>
          </div>
          <span className="text-xs font-semibold text-gray-500">Selected User</span>
        </div>
        <button className="bg-[#C01D33] text-white px-6 py-1.5 rounded font-bold uppercase text-[10px] shadow hover:bg-[#a0182a]">
          Delete
        </button>
      </div>

      <table className="w-full text-left text-xs">
        <thead className="border-b border-gray-100 bg-gray-50">
          <tr className="text-gray-400 font-bold uppercase text-[10px]">
            <th className="px-6 py-4 w-12"><input type="checkbox" className="w-4 h-4" /></th>
            <th className="px-6 py-4">Image</th>
            <th className="px-6 py-4">First Name</th>
            <th className="px-6 py-4">Report Name</th>
            <th className="px-6 py-4">Report Date</th>
            <th className="px-10 py-4 text-center">Options</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {savedReadings?.map((reading: any) => (
            <tr key={reading.id} className="hover:bg-gray-50 transition-colors group" >
              <td className="px-6 py-4"><input type="checkbox" className="w-4 h-4" /></td>
              <td className="px-6 py-4">
                <div className={`${reading.color} w-16 h-20 rounded border-2 border-white shadow-sm flex items-center justify-center p-2`}>
                  <img src="https://picsum.photos/seed/inner/100/100" alt={reading.report} className="w-full h-full object-cover rounded shadow" />
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-gray-700">{reading.report_firstname}</td>
              <td className="px-6 py-4 font-medium text-gray-700">{reading.productname}</td>
              <td className="px-6 py-4 font-medium text-gray-700">{reading.date_created}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2 justify-center">
                  <button className="bg-[#C01D33] text-white px-3 py-2 rounded text-[10px] font-bold uppercase flex items-center gap-1.5 hover:bg-[#a0182a]">
                    <Eye size={12} /> View
                  </button>
                  <button className="bg-[#C01D33] text-white px-3 py-2 rounded text-[10px] font-bold uppercase flex items-center gap-1.5 hover:bg-[#a0182a]">
                    <Download size={12} /> Download PDF
                  </button>
                  <button className="bg-[#C01D33] text-white p-2 rounded hover:bg-[#a0182a]">
                    <Mail size={14} />
                  </button>
                  <button className="bg-[#C01D33] text-white p-2 rounded hover:bg-[#a0182a]" onClick={() => handleDeleteClick(reading.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end items-center gap-8 py-6 px-10 border-t bg-gray-50">
        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
          Rows per page:
          <select className="bg-transparent border-b border-gray-300 outline-none cursor-pointer">
            <option>10</option>
            <option>25</option>
          </select>
        </div>
        <div className="flex items-center gap-8 text-xs font-medium text-gray-500">
          <span>1-10 of 28</span>
          <div className="flex gap-4">
            <ChevronLeft size={18} className="cursor-pointer text-[#C01D33]" />
            <ChevronRight size={18} className="cursor-pointer text-[#C01D33]" />
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          message="Are you sure you want to delete this record?"
        />
      )}
    </div>
  );
};

export default SavedReadings;
