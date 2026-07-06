import { Link } from "react-router-dom";

function AddCustomerBanner() {
    return (
        <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-700 rounded-full opacity-50 blur-2xl"></div>
            
            <div className="relative z-10">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                </div>
                <h2 className="text-xl font-bold mb-2">Add New Customer</h2>
                <p className="text-blue-100 text-sm mb-5">Register a new lead and start your follow-up pipeline.</p>
                
                <Link to="/customers" className="block w-full bg-white text-blue-600 text-center py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors">
                    + Add Customer Now
                </Link>
            </div>
        </div>
    );
}
export default AddCustomerBanner;
