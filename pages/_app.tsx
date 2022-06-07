import React, { useContext } from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/index.css";
import { SocketContext } from "context/socket";
import useSocketClient from "hooks/useSocketClient";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const [socket, isConnected] = useSocketClient();

	return (
		<>
			<SocketContext.Provider value={{ socket, isConnected }}>
				<div className="min-h-screen bg-purple-600">
					<div className="p-5 w-full min-h-full">
						<Component {...pageProps} />
					</div>
				</div>
			</SocketContext.Provider>
		</>
	);
}

export default MyApp;
