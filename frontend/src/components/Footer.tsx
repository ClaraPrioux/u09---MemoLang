import {
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaReddit,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-transparent w-full flex flex-col items-center justify-center text-center py-6">
      {/* Social Media Icons */}
      <div className="flex space-x-4 mb-2">
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-1 rounded-full"
          aria-label="Access our X-page here"
        >
          <FaXTwitter className="text-gray-400 text-sm hover:text-black" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-1 rounded-full"
          aria-label="Access our Instagram page here"
        >
          <FaInstagram className="text-gray-400 text-sm hover:text-pink-500" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-1 rounded-full"
          aria-label="Access our Facebook page here"
        >
          <FaFacebook className="text-gray-400 text-sm hover:text-blue-600" />
        </a>
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-1 rounded-full"
          aria-label="Access our Tiktok page here"
        >
          <FaTiktok className="text-gray-400 text-sm hover:text-black" />
        </a>
        <a
          href="https://reddit.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-1 rounded-full"
          aria-label="Access our Reddit page here"
        >
          <FaReddit className="text-gray-400 text-sm hover:text-orange-500" />
        </a>
      </div>

      {/* Links */}
      <div className="text-gray-200 text-sm">
        <a
          href="mailto:contact@memolang.com"
          className="px-4 hover:text-gray-700"
        >
          Contact
        </a>
        <span>|</span>
        <a href="/about" className="px-4 hover:text-gray-700">
          About
        </a>
        <span>|</span>
        <a
          href="https://www.linkedin.com/in/clara-prioux-24393a181/"
          className="px-4 hover:text-gray-700"
        >
          © MemoLang
        </a>
      </div>
    </footer>
  );
};

export default Footer;
