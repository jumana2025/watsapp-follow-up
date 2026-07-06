import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ isSidebarOpen }) {
    const [isFollowupOpen, setIsFollowupOpen] = useState(true);
    const location = useLocation();

    const isActive = (path) => location.pathname.includes(path);

    return (
        <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} flex-shrink-0 transition-all duration-300 overflow-hidden bg-slate-900 text-slate-300 min-h-screen flex flex-col`}>
            <div className="w-64 flex flex-col h-full">
                
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-800/60">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white leading-tight tracking-wide">FollowUp CRM</h1>
                        <p className="text-[11px] text-slate-400 font-medium">B2B Sales Platform</p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
                    
                    {/* Main Menu */}
                    <div>
                        <p className="px-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                            Main Menu
                        </p>
                        <nav className="space-y-1">
                            <Link
                                to="/dashboard"
                                className={`group flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium transition-colors ${isActive('dashboard') ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                            >
                                <svg className={`h-5 w-5 ${isActive('dashboard') ? 'text-blue-500' : 'text-slate-400 group-hover:text-slate-300'}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                Dashboard
                            </Link>

                            <Link
                                to="/customers"
                                className={`group flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium transition-colors ${isActive('customers') && !isActive('new') ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                            >
                                <svg className={`h-5 w-5 ${isActive('customers') && !isActive('new') ? 'text-blue-500' : 'text-slate-400 group-hover:text-slate-300'}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Customer List
                            </Link>

                            <div>
                                <button
                                    onClick={() => setIsFollowupOpen(!isFollowupOpen)}
                                    className="w-full group flex items-center justify-between rounded-lg px-2 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <svg className="h-5 w-5 text-slate-400 group-hover:text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                        Follow-up List
                                    </div>
                                    <svg className={`h-4 w-4 text-slate-500 transition-transform ${isFollowupOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isFollowupOpen && (
                                    <div className="mt-1 ml-4 space-y-1">
                                        <Link
                                            to="/followups"
                                            className={`group flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors ${isActive('followups') && !isActive('today') && !isActive('completed') ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                                        >
                                            <svg className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                            </svg>
                                            All Follow-ups
                                        </Link>
                                        
                                        <Link
                                            to="/today-followups"
                                            className={`group flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors ${isActive('today-followups') ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                                        >
                                            <svg className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Today's Follow-ups
                                        </Link>

                                        <Link
                                            to="/completed-followups"
                                            className={`group flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors ${isActive('completed-followups') ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                                        >
                                            <svg className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Completed
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>

                    {/* Analytics Menu */}
                    <div>
                        <p className="px-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                            Analytics
                        </p>
                        <nav className="space-y-1">
                            <Link
                                to="/reports"
                                className={`group flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium transition-colors ${isActive('reports') ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                            >
                                <svg className={`h-5 w-5 ${isActive('reports') ? 'text-blue-500' : 'text-slate-400 group-hover:text-slate-300'}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Reports
                            </Link>
                        </nav>
                    </div>

                </div>

                {/* Footer / User Profile */}
                <div className="p-4">
                    <div className="bg-slate-800/80 rounded-xl p-3 flex items-center gap-3 mb-2 shadow-sm">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                            A
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-white truncate">Admin User</p>
                            <p className="text-xs text-slate-400 truncate">admin@crm.com</p>
                        </div>
                    </div>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Sidebar;