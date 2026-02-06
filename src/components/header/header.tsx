import React, { use, useState } from 'react';
import { CONST } from '../../core/helper/const';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/style.css';
// Use correct public path and add width/height for Next.js Image
const logoUrl = '/images/w_n_logo.webp';

import {
  ChevronDown,
  Info,
  LogOut,
  Settings,
  Bell,
  ShoppingCart,
  Menu,
  X,
  Sun,
  Maximize
} from 'lucide-react';
import { Page } from '../../types';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/src/context/UserContext';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header:React.FC<HeaderProps> = ({ currentPage, setCurrentPage  }) => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {userResponse} = useUser()


  const navItems = [
    { label: 'READINGS & CHARTS', value: Page.DASHBOARD, route: CONST.ROUTES.DAILYFORCAST },
    { label: 'SAVED READINGS', value: Page.SAVED_READINGS, route: CONST.ROUTES.SAVEDREADINGS },
    { label: 'SAVED DATA', value: Page.SAVED_DATA, route: CONST.ROUTES.SAVEDDATA },
    { label: 'SINGLE READINGS', value: Page.SINGLE_READINGS, route: CONST.ROUTES.SINGLEREPOERT },
  ];

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };



  return (
    <>
      {/* Top Utilities Bar */}
      <div className="d-flex align-items-center justify-content-end py-2 px-3 top-bar gap-3">
        <div className="d-flex align-items-center gap-4 justify-content-end">
          <div className="d-flex align-items-center gap-2">GET THE APP <ChevronDown size={14} /></div>
          <div className="d-flex align-items-center gap-2">ACTIVE USER: {userResponse ? userResponse.data?.curnt_first_name.toUpperCase() : 'Guest'} <ChevronDown size={14} /></div>
          <div className="">ACCOUNT/USERS</div>
          <div className="">UPGRADE</div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <button className="t-btns"><Info /></button>
          <button className="t-btns" onClick={() => setCurrentPage(Page.LOGIN)}><LogOut /></button>
          <button className="t-btns"><Settings /></button>
          <button className="position-relative t-btns">
            <Bell />
            <span className="count">0</span>
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between py-2">
            <div className="logo">
              <span onClick={() => setCurrentPage(Page.DASHBOARD)}>
                <Image src={logoUrl} alt="logo" width={280} height={40}  />
              </span>
            </div>
            <div className="d-flex align-items-end gap-3">
              <nav>
                <ul className="d-flex gap-4 p-0 m-0">
                  {navItems.map((item) => (
                    <Link href={item.route} style={{ textDecoration: 'none' }} key={item.value} onClick={() => handlePageChange(item.value)}>
                      <li className={`${currentPage === item.value ? 'active' : ''}`}>
                        {item.label}
                      </li>
                    </Link>
                  ))}
                  <li>
                    <button>
                      <ShoppingCart size={22} />
                      <span className="count">2</span>
                    </button>
                  </li>
                </ul>
              </nav>

              {/* Mobile Menu Toggle & Cart */}
              <div className="flex lg:hidden items-center gap-4">
                <div className="relative cursor-pointer">
                  <ShoppingCart size={24} className="text-gray-700" />
                  <span className="absolute -top-2 -right-2 bg-[#C01D33] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">0</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#2D1B5E]">
                  {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b shadow-xl py-2 animate-in slide-in-from-top duration-200">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li
                  key={item.value}
                  onClick={() => handlePageChange(item.value)}
                  className={`px-6 py-4 text-sm font-bold border-l-4 transition-colors ${currentPage === item.value ? 'bg-gray-50 border-[#C01D33] text-[#C01D33]' : 'border-transparent text-gray-700 hover:bg-gray-50'}`}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;