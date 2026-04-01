import React from "react";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Providers } from "../store/provider";
import Header from "@/components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/index.css";

export const metadata: Metadata = {
	title: "Comma | Online Courses",
	description: "Unlock Your Potential with Anytime, Anywhere Learning ss   ",
	icons: "/favicon.png",
};

export default function RootLayout({
	children,
  }: Readonly<{
	children: React.ReactNode;
  }>) {
	return (
	  <html lang="en">
		<body className="layout-body">
		  <Providers>
			<Suspense fallback={<div>Loading...</div>}>
			  <Header />
			  <main className="layout-main">{children}</main>
			  <Footer />
			</Suspense>
			<ToastContainer />
		  </Providers>
		</body>
	  </html>
	);
  }