import gitIcon from "../assets/gitIcon.svg";
import IconWrapper from "./IconWrapper";

const Footer = () => {
  const footerLinks = [
    "Terms",
    "Privacy",
    "Security",
    "Status",
    "Community",
    "Docs",
    "Contact",
    "Manage cookies",
    "Do not share my personal information",
  ];

  return (
    <footer className="mt-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row-reverse md:items-center md:justify-center gap-4 md:gap-4">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {footerLinks.map((link) => (
              <span
                key={link}
                className="text-[0.8rem] hover:text-primary-link active:text-primary-link cursor-pointer text-primary-dark hover:underline transition-colors"
              >
                {link}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 text-primary-dark">
            <IconWrapper icon={gitIcon} alt="GitHub" size="md" />
            <span className="text-[0.8rem]">© 2025 GitHub, Inc.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
