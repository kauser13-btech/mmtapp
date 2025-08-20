"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/global/Footer";
import FooterTop from "../components/global/FooterTop";
import DaisyModal from "../components/global/modal/DaisyModal";
import Navbar from "../components/global/navbar/Navbar";
import SignInModal from "../components/sign-in/modal/SignInModal";
import { CartProvider } from "../context/CartContext";
import { ClosetProvider } from "../context/ClosetContex";
import { UserNameProvider } from "../context/UserNameContext";
import "../globals.css";
// include styles
import { Suspense } from "react";
import "rodal/lib/rodal.css";
import PageLoader from "../components/global/InitialPageLoader/PageLoader";

import { GoogleTagManager } from "@next/third-parties/google";
import { Provider } from "react-redux";
import store from "./../redux/store";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="MatchMyTees" />
        <meta property="og:image:width" content="18px" />
        <meta property="og:image:height" content="9px" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        {/* favicon jpg */}
        <title>Tees to Match with Jordans, Adidas, Nike | MatchMyTees</title>
        <link rel="icon" href="../../images/favicon.svg" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="canonical" href="https://matchmytees.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Roboto:wght@300;400;500&family=Abril+Fatface&family=Staatliches&display=swap"
          rel="stylesheet"
        />

        {/* <!-- Google Tag Manager --> */}
        <GoogleTagManager gtmId="GTM-5LMF32ST" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Organization",
              name: "MatchMyTees",
              url: "https://matchmytees.com",
              logo: "https://matchmytees.com/images/logo-black.svg",
              sameAs: [
                "https://www.facebook.com/matchmytees",
                "https://www.instagram.com/matchmytees",
              ],
            }),
          }}
        />
        <script async type="text/javascript" src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=Sq24Uv"></script>
      </head>
      <Suspense fallback={<PageLoader />}>
        <body>
          <main>
            <Provider store={store}>
              <CartProvider>
                <ClosetProvider>
                  <UserNameProvider>
                    <Navbar />
                    <ProgressBar height="4px" color="#ff5e01" />
                    {children}
                    <FooterTop />
                    <Footer />
                    <div id="modal-container"></div>
                    <div id="shoppingCart"></div>

                    <DaisyModal modalId="sign-in-modal-in-search">
                      <SignInModal />
                    </DaisyModal>
                  </UserNameProvider>
                </ClosetProvider>
              </CartProvider>
            </Provider>
          </main>
        </body>
      </Suspense>
      <ToastContainer
        position="top-left"
        hideProgressBar={true}
        theme="dark"
        style={{ zIndex: 10000 }}
      />
    </html>
  );
}
