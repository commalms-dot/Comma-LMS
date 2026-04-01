"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import NavigationBar from "./components/NavigationBar/NavigationBar";
import Button from "@/components/ui/Button/Button";
import styles from "./Header.module.css";
import CartButton from "@/features/Cart/components/CartButton/CartButton";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import SearchField from "../../SearchField/SearchField";

import { useAuthStore } from "@/store/authStore";
import { useAuthUser } from "@/hooks/useAuthUser";
import { logout } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import Cookies from "js-cookie";

export default function Header() {
  const { isAuthenticated } = useAuthUser();
  const user = useAuthStore((state) => state.user);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ------------------ EFFECTS ------------------ */
  useEffect(() => setMounted(true), []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ------------------ DERIVED DATA ------------------ */
  const userName =
    user?.fullName?.split(" ")[0] || // first name only
    user?.firstName ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "User";

  /* ------------------ LOGOUT HANDLER ------------------ */
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      dispatch(logout());
      useAuthStore.getState().clearAuth();
      Cookies.remove("token");
      localStorage.removeItem("authToken");

      toast.success("Logged out successfully!");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
      setIsDropdownOpen(false);
    }
  };

  if (!mounted) return null; // prevent hydration issues

  return (
    <nav>
      <div className={styles["main-nav"]}>
        <Link href="/">
          <Image
            className="main-nav__logo"
            src="/images/logo.svg"
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>

        <NavigationBar />

        <div className={styles.searchContainer}>
          <SearchField />
        </div>

        <div className={styles["nav__button-group"]}>
          <LanguageSelector />

          {isAuthenticated ? (
            <div className={styles["user-menu"]} ref={dropdownRef}>
              <button
                className={styles["user-menu__trigger"]}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                Hi, {userName}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className={styles["user-menu__dropdown"]}>
                  <Link
                    href="/profile"
                    className={styles["user-menu__item"]}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    My Profile
                  </Link>

                  <Link
                    href="/enrollments"
                    className={styles["user-menu__item"]}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    My Enrollments
                  </Link>

                  <button
                    onClick={handleLogout}
                    className={`${styles["user-menu__item"]} ${styles["user-menu__item--danger"]}`}
                    disabled={isLoggingOut}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 16L21 12M21 12L17 8M21 12H9M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/sign-in">
              <Button variant="secondary" className={styles["register-btn"]}>
                login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
