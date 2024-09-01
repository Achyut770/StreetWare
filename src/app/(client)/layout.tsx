import Footer from "../ui/client/footer";
import Navbar from "../ui/client/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
            <ToastContainer
                position="top-center"               // Position of the toasts (e.g., "top-right", "top-center", "bottom-left")
                autoClose={5000}                   // Duration in ms after which the toast automatically closes (set to false to disable auto-close)
                hideProgressBar={false}            // Whether to hide the progress bar
                newestOnTop={false}                // Whether to show the newest toast on top
                closeOnClick                        // Whether the toast closes when clicked
                rtl={false}                        // Whether the toast direction is right-to-left
                pauseOnFocusLoss={true}            // Whether the toast pauses when the window loses focus
                draggable={true}                   // Whether the toast can be dragged to close it
                pauseOnHover={true}                // Whether the toast pauses when hovered
                theme="light"                      // Theme of the toast (e.g., "light", "dark", "colored")
                limit={3}                          // Limits the number of toasts displayed at once
            />
        </div>
    );
}