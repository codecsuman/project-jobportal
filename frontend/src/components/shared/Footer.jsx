import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white mt-16">
      <div className="container mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Logo & Info */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold tracking-wide">Job Hunt</h2>
            <p className="text-sm opacity-80 mt-1">
              © 2024 Job Hunt • All rights reserved.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-6">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="transition transform hover:scale-110 hover:opacity-90"
            >
              <svg
                className="w-7 h-7"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128v-2.67c0-3.1 1.894-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238H18.45c-1.503 0-1.794.716-1.794 1.763v2.312h3.587l-.468 3.622h-3.119V24h6.118C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="transition transform hover:scale-110 hover:opacity-90"
            >
              <svg
                className="w-7 h-7"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.93 4.93 0 002.164-2.724 9.86 9.86 0 01-3.127 1.195A4.92 4.92 0 0016.616 3c-2.726 0-4.94 2.213-4.94 4.94 0 .388.044.765.128 1.128C7.728 8.94 4.1 6.96 1.67 3.888A4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.23-.616v.062c0 2.292 1.628 4.201 3.787 4.64a4.93 4.93 0 01-2.224.086 4.935 4.935 0 004.604 3.417A9.867 9.867 0 010 21.543 13.94 13.94 0 007.548 24C16.605 24 21.557 16.492 21.557 9.99c0-.214-.005-.426-.015-.637A9.98 9.98 0 0024 4.556z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="transition transform hover:scale-110 hover:opacity-90"
            >
              <svg
                className="w-7 h-7"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452H16.85v-5.57c0-1.327-.028-3.038-1.853-3.038-1.853 0-2.137 1.447-2.137 2.94v5.667H9.147V9.756h3.449v1.462h.049c.48-.91 1.653-1.87 3.401-1.87 3.635 0 4.306 2.39 4.306 5.498v5.606zM5.337 8.292c-1.105 0-2-.896-2-2 0-1.107.895-2 2-2 1.105 0 2 .894 2 2 0 1.103-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.77C.79 0 0 .774 0 1.729v20.542C0 23.226.79 24 1.77 24h20.452C23.205 24 24 23.226 24 22.271V1.729C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
