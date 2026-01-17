
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Phone, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTrigger } from
"@/components/ui/sheet";
import TerritoryRequestForm from "./components/TerritoryRequestForm";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [showRequestForm, setShowRequestForm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navigationItems = [
  { title: "Home", url: createPageUrl("Home") },
  { title: "About", url: createPageUrl("About") },
  { title: "Availability", url: createPageUrl("Availability") },
  { title: "Contact", url: createPageUrl("Contact") }];

  // handleMenuItemClick is no longer needed since Contact is now a regular page link
  // const handleMenuItemClick = (item) => {
  //   if (item.action === "contact") {
  //     setShowRequestForm(true);
  //   }
  // };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        :root {
          --primary: #1e40af;
          --primary-dark: #1e3a8a;
          --secondary: #059669;
          --accent: #f59e0b;
          --gray-50: #f9fafb;
          --gray-100: #f3f4f6;
          --gray-200: #e5e7eb;
          --gray-800: #1f2937;
          --gray-900: #111827;
        }
        
        .primary-gradient {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
        }
        
        .hero-pattern {
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(30, 64, 175, 0.15) 1px, transparent 0);
          background-size: 20px 20px;
        }
        
        .smooth-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center space-x-3 smooth-transition hover:opacity-80">
              <div className="w-12 h-12 primary-gradient rounded-xl flex items-center justify-center shadow-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                844-PLUMBER
              </h2>
            </Link>

            {/* Collapsible Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Menu className="h-5 w-5" />
                  <span className="hidden sm:inline">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 primary-gradient rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">844-PLUMBER</h3>
                    </div>
                  </div>
                </SheetHeader>
                <nav className="flex flex-col space-y-2">
                  {navigationItems.map((item) =>
                  <SheetClose asChild key={item.title}>
                    <Link
                      to={item.url}
                      className={`px-4 py-3 text-lg font-medium rounded-lg smooth-transition ${
                      location.pathname === item.url ?
                      'bg-blue-100 text-blue-700' :
                      'text-gray-700 hover:bg-gray-100'}`
                      }>
                      {item.title}
                    </Link>
                    </SheetClose>
                  )}
                  <SheetClose asChild>
                    <Button asChild size="lg" className="mt-6 primary-gradient text-white">
                      <Link to={createPageUrl("Availability")}>
                        View Available Territories
                      </Link>
                    </Button>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">844-PLUMBER</h3>
              </div>
              <p className="text-gray-400 max-w-md">The smart way for plumbing businesses to grow with exclusive territorial rights to one of the most memorable toll-free numbers in the industry.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigationItems.map((item) =>
                <li key={item.title}>
                  <Link
                    to={item.url}
                    className="text-gray-400 hover:text-white smooth-transition">
                    {item.title}
                  </Link>
                  </li>
                )}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>844-PLUMBER</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@844plumber.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 844-PLUMBER. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link to="#" className="text-gray-400 hover:text-white text-sm smooth-transition">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white text-sm smooth-transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Territory Request Form Modal */}
      {showRequestForm &&
      <TerritoryRequestForm
        territory="General Inquiry"
        onClose={() => setShowRequestForm(false)}
        onSuccess={() => {
          setShowRequestForm(false);
        }} />

      }
    </div>);

}
