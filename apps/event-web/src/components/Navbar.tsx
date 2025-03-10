'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, ChevronDown, User, Calendar, LogOut, Settings } from 'lucide-react';
import useColorMode from '@/hook/useColorMode';

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [colorMode, setColorMode] = useColorMode();
  
  // Check if user is admin
  const isAdmin = session?.user?.email?.endsWith('@admin.com') || session?.user?.role === 'admin';

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    setUserMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm py-3 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center text-blue-600 dark:text-blue-500">
            <span className="text-xl font-bold">EventHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/events" 
              className={`font-medium ${
                pathname === '/events' 
                  ? 'text-blue-600 dark:text-blue-500' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500'
              }`}
            >
              Events
            </Link>
            {session && (
              <Link 
                href="/auth/profile" 
                className={`font-medium ${
                  pathname === '/auth/profile' 
                    ? 'text-blue-600 dark:text-blue-500' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500'
                }`}
              >
                My Tickets
              </Link>
            )}
            {isAdmin && (
              <Link 
                href="/admin" 
                className={`font-medium ${
                  pathname?.startsWith('/admin') 
                    ? 'text-blue-600 dark:text-blue-500' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500'
                }`}
              >
                Admin
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              aria-label={colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {colorMode === "dark" ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 1.0415C10.3452 1.0415 10.625 1.32133 10.625 1.6665V2.49984C10.625 2.84502 10.3452 3.12484 10 3.12484C9.65484 3.12484 9.37502 2.84502 9.37502 2.49984V1.6665C9.37502 1.32133 9.65484 1.0415 10 1.0415ZM3.66553 3.66535C3.90961 3.42127 4.30533 3.42127 4.54941 3.66535L4.87678 3.99271C5.12085 4.23679 5.12085 4.63252 4.87678 4.87659C4.6327 5.12067 4.23697 5.12067 3.99289 4.87659L3.66553 4.54923C3.42145 4.30515 3.42145 3.90942 3.66553 3.66535ZM16.3343 3.66556C16.5784 3.90964 16.5784 4.30537 16.3343 4.54945L16.0069 4.87681C15.7629 5.12089 15.3671 5.12089 15.123 4.87681C14.879 4.63273 14.879 4.237 15.123 3.99293L15.4504 3.66556C15.6945 3.42148 16.0902 3.42148 16.3343 3.66556ZM10 5.62484C7.58377 5.62484 5.62502 7.58359 5.62502 9.99984C5.62502 12.4161 7.58377 14.3748 10 14.3748C12.4163 14.3748 14.375 12.4161 14.375 9.99984C14.375 7.58359 12.4163 5.62484 10 5.62484Z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.18118 2.33448C5.30895 2.74335 2.29169 6.01923 2.29169 9.99984C2.29169 14.257 5.74283 17.7082 10 17.7082C13.9806 17.7082 17.2565 14.6909 17.6654 10.8187C16.5598 12.2222 14.8439 13.1248 12.9167 13.1248C9.57997 13.1248 6.87502 10.4199 6.87502 7.08317C6.87502 5.15599 7.77765 3.44009 9.18118 2.33448Z" />
                </svg>
              )}
            </button>

            {/* Authentication */}
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500"
                  aria-expanded={userMenuOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                    {session.user?.name?.charAt(0).toUpperCase() || session.user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <ChevronDown size={16} />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 py-1">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{session.user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session.user?.email}</p>
                    </div>
                    <Link 
                      href="/auth/profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      Profile
                    </Link>
                    <Link 
                      href="/auth/profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Calendar size={16} className="mr-2" />
                      My Tickets
                    </Link>
                    {isAdmin && (
                      <Link 
                        href="/admin" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings size={16} className="mr-2" />
                        Admin Panel
                      </Link>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              aria-label={colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {colorMode === "dark" ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 1.0415C10.3452 1.0415 10.625 1.32133 10.625 1.6665V2.49984C10.625 2.84502 10.3452 3.12484 10 3.12484C9.65484 3.12484 9.37502 2.84502 9.37502 2.49984V1.6665C9.37502 1.32133 9.65484 1.0415 10 1.0415Z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.18118 2.33448C5.30895 2.74335 2.29169 6.01923 2.29169 9.99984C2.29169 14.257 5.74283 17.7082 10 17.7082C13.9806 17.7082 17.2565 14.6909 17.6654 10.8187C16.5598 12.2222 14.8439 13.1248 12.9167 13.1248C9.57997 13.1248 6.87502 10.4199 6.87502 7.08317C6.87502 5.15599 7.77765 3.44009 9.18118 2.33448Z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800 mt-1">
          <div className="px-4 py-2 space-y-2">
            <Link 
              href="/events" 
              className={`block py-2 px-3 rounded-md ${
                pathname === '/events' 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-500' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            
            {session ? (
              <>
                <Link 
                  href="/auth/profile" 
                  className={`block py-2 px-3 rounded-md ${
                    pathname === '/auth/profile' 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-500' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Tickets
                </Link>
                
                {isAdmin && (
                  <Link 
                    href="/admin" 
                    className={`block py-2 px-3 rounded-md ${
                      pathname?.startsWith('/admin') 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-500' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium mr-3">
                      {session.user?.name?.charAt(0).toUpperCase() || session.user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{session.user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session.user?.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="w-full mt-2 text-left flex items-center py-2 px-3 rounded-md text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/auth/login"
                  className="py-2 px-3 rounded-md text-gray-800 dark:text-white text-center hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  className="py-2 px-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;