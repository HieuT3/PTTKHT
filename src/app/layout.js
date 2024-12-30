import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import { UserProvider } from "@/context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html className="mdl-js" lang="en">
      <body>
        <UserProvider>
          <Header />
          {children}
          <ToastContainer />
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
