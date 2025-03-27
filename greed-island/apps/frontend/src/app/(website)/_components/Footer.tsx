import Link from "next/link";
import {Sparkles} from "lucide-react";

const Footer = () => {
    return <footer className="relative border-t border-gray-800 py-12">
        <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <Link href="/" className="flex items-center space-x-2 mb-4">
                        <div className="relative w-8 h-8">
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-lg rotate-45 transform-gpu"></div>
                            <div
                                className="absolute inset-1 bg-black rounded-lg rotate-45 flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-white"/>
                            </div>
                        </div>
                        <span
                            className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500">
                  PixelVerse
                </span>
                    </Link>
                    <p className="text-sm text-gray-400 mb-4">
                        Building the future of digital interaction, one pixel at a time.
                    </p>

                    {/* Pixelated Character */}
                    <div className="mb-4 w-16 h-16 relative">
                        <div className="absolute w-4 h-4 bg-purple-500 top-0 left-6"></div>
                        <div className="absolute w-4 h-4 bg-purple-500 top-4 left-2"></div>
                        <div className="absolute w-4 h-4 bg-purple-500 top-4 left-6"></div>
                        <div className="absolute w-4 h-4 bg-purple-500 top-4 left-10"></div>
                        <div className="absolute w-4 h-4 bg-purple-500 top-8 left-2"></div>
                        <div className="absolute w-4 h-4 bg-pink-500 top-8 left-6"></div>
                        <div className="absolute w-4 h-4 bg-purple-500 top-8 left-10"></div>
                        <div className="absolute w-4 h-4 bg-purple-500 top-12 left-2"></div>
                        <div className="absolute w-4 h-4 bg-purple-500 top-12 left-10"></div>
                    </div>

                    <div className="flex space-x-4">
                        <Link href="#" className="text-gray-400 hover:text-white">
                            <span className="sr-only">Twitter</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <path
                                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-white">
                            <span className="sr-only">Instagram</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                            </svg>
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-white">
                            <span className="sr-only">Discord</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <circle cx="9" cy="12" r="1"></circle>
                                <circle cx="15" cy="12" r="1"></circle>
                                <path d="M7.5 7.2c.3-.2.5-.4.8-.6a7.5 7.5 0 0 1 7.5-.6 6.8 6.8 0 0 1 .8.6"></path>
                                <path d="M7.5 16.8c.3.2.5.4.8.6a7.5 7.5 0 0 0 7.5.6c.3-.2.5-.4.8-.6"></path>
                                <path
                                    d="M16 8.5v.2c0 .5-.5 1-1 1H9c-.5 0-1-.5-1-1v-.2c0-.5.4-1 1-1h6c.5 0 1 .5 1 1z"></path>
                                <path
                                    d="M16 15.5v.2c0 .5-.5 1-1 1H9c-.5 0-1-.5-1-1v-.2c0-.5.4-1 1-1h6c.5 0 1 .5 1 1z"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div>
                    <h3 className="font-medium text-white mb-4">Platform</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="#explore" className="text-gray-400 hover:text-white">
                                Explore
                            </Link>
                        </li>
                        <li>
                            <Link href="#create" className="text-gray-400 hover:text-white">
                                Create
                            </Link>
                        </li>
                        <li>
                            <Link href="#connect" className="text-gray-400 hover:text-white">
                                Connect
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                Marketplace
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-medium text-white mb-4">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                Documentation
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                Tutorials
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                Support
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-medium text-white mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                Privacy
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} PixelVerse. All rights
                    reserved.</p>
                <div className="mt-4 md:mt-0">
                    <ul className="flex space-x-6 text-xs text-gray-400">
                        <li>
                            <Link href="#" className="hover:text-white">
                                Terms
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white">
                                Privacy
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white">
                                Cookies
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
}

export default Footer