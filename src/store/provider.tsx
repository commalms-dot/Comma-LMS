"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "react-query";
import { store } from ".";

export function Providers({ children }: { children: ReactNode }) {
	const queryClient = new QueryClient();

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</Provider>
	);
}
