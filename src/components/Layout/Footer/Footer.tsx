import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const footerLinks = [
    {
      title: "Comma",
      items: [
        { text: "Comma", href: "/" },
        { text: "About Comma", href: "/about" },
        { text: "Comma Experts", href: "/experts" },
        { text: "Vacancies", href: "/vacancies" },
        { text: "Help Center", href: "/help" },
      ],
    },
    {
      title: "Discover",
      items: [
        { text: "Recorded courses", href: "/courses/recorded" },
        // { text: "Interactive courses", href: "/courses/interactive" },
      ],
    },
    {
      title: "Help Center",
      items: [
        { text: "FAQs", href: "#" },
        { text: "Contact Us", href: "#" },
        { text: "20 st-Nasr city - behind el shohadaa mosque", href: "#" },
      ],
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        {/* CTA Section */}
        <div className={styles.cta}>
          <h3 className={styles.footerHeading}>Ready to get started?</h3>
          <Button variant="danger" size="medium">
            Get Started
          </Button>
        </div>

        {/* Links Section */}
        <div className={styles.links}>
          {footerLinks.map((section, index) => (
            <div key={index} className={styles.linkColumn}>
              <p className={styles.linkTitle}>{section.title}</p>
              <ul>
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href}>{item.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <ul className={styles.rules}>
          <li>
            <Link href="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link href="/policy">Privacy Policy</Link>
          </li>
        </ul>
        <p className={styles.copy}>
          © {new Date().getFullYear()} LogoIpsum. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
