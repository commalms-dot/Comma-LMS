import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const url = request.nextUrl;
	const courseId = url.pathname.split("/")[2];
	console.log(courseId);
	const response = await fetch(
		`http://localhost:5000/users/me/enrolled-courses/${courseId}/check`,
		{
			headers: {
				Authorization: `Bearer ${request.cookies.get("token")?.value}`,
			},
		}
	);

	if (response.ok) {
		const { enrolled } = await response.json();
		console.log(enrolled);
		if (enrolled) {
			return NextResponse.next();
		}
	}

	// redirect to course/:courseid page if user is not enrolled
	return NextResponse.redirect(new URL("/course/" + courseId, url).toString());
}

export const config = {
	matcher: "/course/:courseid/watch",
};
