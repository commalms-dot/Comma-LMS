"use client";
import React, { useState } from "react";
import styles from "./CartItem.module.css";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import ShareButton from "@/components/ui/ShareButton/ShareButton";
import StarRatingSummary from "@/components/ui/StarRatingSummary/StarRatingSummary";
import { CartListItem } from "../../types/CartItem";

type Props = {
  data: CartListItem;
  onRemove: (id: number) => void;
};

function CartItem({ data, onRemove }: Props) {
  const fallbackImage = "/images/course-placeholder.png";
  const [imgSrc, setImgSrc] = useState(data.item.course.posterUrl || fallbackImage);

  return (
    <section className={styles["card"]}>
      <div className={styles["content"]}>
        <Image
          src={imgSrc}
          alt="Course"
          width={140}
          height={130}
          className={styles["image"]}
          onError={() => setImgSrc(fallbackImage)} 
        />

        <p className={styles["title"]}>{data.item.course.title}</p>
        <p className={styles["instructor"]}>By {data.item.instructor.name}</p>

        <div className={styles["rating-container"]}>
          <StarRatingSummary
            className={styles["rating"]}
            rating={4.5}
            reviewsCount={1000}
          />
          {/* you had `length` undefined here, maybe should be `data.totalDuration`? */}
          {data.totalDuration && (
            <p className={styles["length"]}>{data.totalDuration} total hours</p>
          )}
        </div>

        <p className={styles["price"]}>
          {data.item.course.discountPrice == 0
            ? data.item.course.price
            : data.item.course.discountPrice}{" "}
          EGP
        </p>

        <button
          className={styles["remove-btn"]}
          onClick={() => onRemove(data.item.id)}
        >
          remove from cart
        </button>

        <div className={styles["actions"]}>
          <ShareButton />
          <Button variant="transparent">save</Button>
        </div>
      </div>
    </section>
  );
}

export default CartItem;
