"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./header";
import { Page } from "../../types";

const NavbarWrapper: React.FC = () => {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  // Hide Navbar only on /login
  if (pathname === "/login") return null;
  return <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />;
};

export default NavbarWrapper;
