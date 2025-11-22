"use client";

import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	// Auth layout intentionally excludes the global Header/navbar so login
	// and register pages render without the site's main navigation.
	return (
		<div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
			{children}
		</div>
	);
}

