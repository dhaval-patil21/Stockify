"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/stockify_logo.png";

const Footer = () => {
  const [currenthref, setCurrenthref] = useState("");

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Stocks", href: "/stocks" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Link href="/">
                <Image
                  src={logo}
                  alt="logo"
                  width={220}
                  height={120}
                  className="object-contain"
                />
              </Link>
            </div>
            <p className="text-slate-300 mb-4 max-w-md">
              Your comprehensive platform for stock analysis, fundamental
              research, and portfolio management. Make informed investment
              decisions with our advanced tools and real-time data.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                <span className="text-xs font-bold">f</span>
              </div>
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                <span className="text-xs font-bold">t</span>
              </div>
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                <span className="text-xs font-bold">in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setCurrenthref(item.href)}
                      className="text-slate-300 hover:text-emerald-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <span>{item.name}</span> // Fallback or warning if href is undefined
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@stockify.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </p>
              <p className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Bombay, India</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 Stockify. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-slate-400 text-sm hover:text-emerald-400 transition-colors cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-slate-400 text-sm hover:text-emerald-400 transition-colors cursor-pointer">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
