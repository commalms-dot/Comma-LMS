import {
	selectedAuthUser,
	selectedIsAuthenticated,
	selectedToken,
} from "@/store";
import { useAppSelector } from "@/store/hooks";

export const useAuthUser = () => {
	const authUser = useAppSelector(selectedAuthUser);
	const isAuthenticated = useAppSelector(selectedIsAuthenticated);
	const token = useAppSelector(selectedToken);
	return {
		authUser,
		isAuthenticated,
		token,
	};
};
