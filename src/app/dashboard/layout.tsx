import { ToastContainer } from "react-toastify";
import Sidenav from "../ui/dashboard/sidenave";
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <Sidenav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={true}
                draggable={true}
                pauseOnHover={true}
                theme="light"
                limit={3}
            />
        </div>
    );
}