import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center flex-wrap items-center pt-5 mt-10">
      <div className="flex flex-col sm:w-[95%] md:w-[90%] lg:w-[88%] xl:w-[85%] border-t-[1px]
       border-gray-100 p-3  bg-transparent items-center justify-center gap-4">
        <nav className="flex flex-wrap gap-2">
          <a
            href="https://www.safvan.dev/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            About Me
          </a>
          <a
            href="https://www.safvan.dev/contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </nav>
        <nav className="flex flex-wrap">
          <div className="flex flex-wrap gap-2">
            <Link href="https://www.linkedin.com/in/muhammed-safvan-8b912a21b">
              <Linkedin />
            </Link>
            <Link href="https://github.com/Safvan-tsy">
              <Github />
            </Link>
          </div>
        </nav>
        <aside>
          <p>made with ❤️ by safvan</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
