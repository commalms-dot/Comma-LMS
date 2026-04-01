import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { authApiSlice } from "../../services/auth.service";
import { RootState } from "../";

export interface User {
	id?: number;
	fullName: string;
	email: string;
	firstName?: string;
	lastName?: string;
	avatarUrl?: string;
	mobile?: string;
	gender?: string;
	nationality?: string;
	jobTitle?: string;
	organization?: string;
	discipline?: string;
	graduationYear?: number;
	yearsOfTrainingExperience?: number;
	linkedinUrl?: string;
	facebookUrl?: string;
	bio?: string;
}

interface AuthState {
	token: string | null;
	user: User | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	token: null,
	user: {
		id: undefined,
		fullName: "",
		email: "",
		firstName: undefined,
		lastName: undefined,
		avatarUrl: undefined,
		mobile: undefined,
		gender: undefined,
		nationality: undefined,
		jobTitle: undefined,
		organization: undefined,
		discipline: undefined,
		graduationYear: undefined,
		yearsOfTrainingExperience: undefined,
		linkedinUrl: undefined,
		facebookUrl: undefined,
		bio: undefined,
	},
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.token = null;
			state.user = null;
			state.isAuthenticated = false;

			Cookies.remove("token");

			localStorage.removeItem("authToken");
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApiSlice.endpoints.login.matchFulfilled,
			(state, action) => {
				state.token = action.payload.accessToken;
				state.user = action.payload.user;
				state.isAuthenticated = true;
				Cookies.set("token", action.payload.accessToken);
			}
		);
		builder.addMatcher(
			authApiSlice.endpoints.updateUser.matchFulfilled,
			(state, action) => {
				if (state.user) {
					state.user = { ...state.user, ...action.payload };
				}
			}
		);
		builder.addMatcher(
			authApiSlice.endpoints.changeEmail.matchFulfilled,
			(state, action) => {
				if (state.user) {
					state.user = { ...state.user, email: action.payload.email };
				}
			}
		);
	},
});

export const { logout } = authSlice.actions;
export const selectedAuthUser = (state: RootState) => state.auth.user;
export const selectedIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated;
export const selectedToken = (state: RootState) => state.auth.token;
export default authSlice.reducer;
