import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import { UserProvider } from "@/context/UserContext";

export default function RootLayout({ children }) {
  return (
    <html className="mdl-js" lang="en">
      <body>
        <UserProvider>
          <Header />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
