import React from "react";
import { AppProps } from "next/app";
import { store } from "./../store/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import "../styles/index.css";
import Header from "../components/Header";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <div className="min-h-screen bg-purple-600">
            <Header/>

            <div className="p-5 w-full">
              <Component {...pageProps} />
            </div>
          </div>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
