import Image from "next/image";
import styles from "./not-found.module.css";
export default function NotFound() {
	return (
		<div className={`${styles["container"]}`}>
			<div className={styles["main-nav"]}>
				<nav className={`container`}>
					<Image
						className="main-nav__logo"
						src={"/images/logo.svg"}
						alt="Logo"
						width={100}
						height={50}
					/>
				</nav>
			</div>
			<div className={styles["not-found"]}>
				<Image src="/404.svg" alt="404" width={300} height={300} />
				<h1 className={styles["not-found__title"]}>ERROR 404!</h1>
				<p className={styles["not-found__description"]}>
					We are sorry, but we are unable to complete your request at this time.
				</p>
			</div>
		</div>
	);
}
