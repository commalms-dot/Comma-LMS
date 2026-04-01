"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectedIsAuthenticated } from "@/store/slices/auth.slice";

import "./Banner.css";

interface BannerItem {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  imagePath?: string | null;
}

const FALLBACK_IMAGE = "/images/default_banner.jpg";

const Banner = () => {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // Redux selector
  const isAuthenticated = useSelector(selectedIsAuthenticated);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/banners/get/active`
        );
        const data: BannerItem[] = await res.json();
        const activeBanners = data.filter((b: any) => b.isActive);
        setBanners(activeBanners);
      } catch (err) {
        console.error("Failed to load banners:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBanners();
  }, []);
  if (loading) {
    return (
      <section className="banner banner--skeleton">
        <div className="banner__content">
          <div className="banner__text">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text short"></div>

            <div className="banner__buttons">
              <div className="skeleton skeleton-button"></div>
              <div className="skeleton skeleton-button"></div>
            </div>
          </div>

          <div className="banner__image-wrapper">
            <div className="skeleton skeleton-image"></div>
          </div>
        </div>
      </section>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  const nextBanner = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevBanner = () =>
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  const currentBanner = banners[current];
  const imageSrc =
    currentBanner.imageUrl || currentBanner.imagePath || FALLBACK_IMAGE;

  return (
    <section className="banner">
      <div className="banner__bg-gradient" />

      <div className="banner__content">
        <div className="banner__text" key={currentBanner.id + "-text"}>
          <h1>{currentBanner.title}</h1>
          <p>{currentBanner.description}</p>

          {/* Only show buttons if NOT authenticated */}
          {!isAuthenticated && (
            <div className="banner__buttons">
              <Link href="/auth/sign-up" className="btn-primary">
                Start Learning
              </Link>
              <Link href="/join-as-expert" className="btn-secondary">
                Join as Expert
              </Link>
            </div>
          )}
        </div>

        <div
          className="banner__image-wrapper"
          key={currentBanner.id + "-image"}
        >
          <Image
            src={imageSrc}
            alt={currentBanner.title}
            fill
            style={{ objectFit: "cover" }}
            className="banner__image"
            priority
          />
          <div className="banner__image-overlay" />
        </div>
      </div>

      <button className="banner__arrow left" onClick={prevBanner}>
        &#8249;
      </button>
      <button className="banner__arrow right" onClick={nextBanner}>
        &#8250;
      </button>
    </section>
  );
};

export default Banner;
