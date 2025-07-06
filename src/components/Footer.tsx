import React from "react";

const footerLinks = [
  {
    title: "Support",
    links: ["Help Centre", "Anti-discrimination", "Disability support", "Cancellation options", "Report neighbourhood concern"],
  },
  {
    title: "Community",
    links: ["SpotOwl.org: disaster relief", "Support Afghan refugees", "Combating discrimination"],
  },
  {
    title: "Hosting",
    links: ["Hosting resources", "Community forum", "Hosting responsibly"],
  },
  {
    title: "About",
    links: ["Newsroom", "Learn about new features", "Letter from founders", "Careers", "Investors"],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#F7F7F7] border-t border-gray-200 mt-8 text-[#222] text-sm">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {footerLinks.map((col) => (
          <div key={col.title}>
            <h3 className="font-bold mb-3 text-base">{col.title}</h3>
            <ul className="space-y-2">
              {col.links.map(link => (
                <li key={link}>
                  <a href="#" className="hover:underline text-[#717171]">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 py-6 px-4 flex flex-col md:flex-row justify-between items-center text-xs text-[#717171] bg-[#F7F7F7]">
        <div className="mb-2 md:mb-0">© {new Date().getFullYear()} SpotOwl, Inc. All rights reserved.</div>
        <div className="flex gap-4 flex-wrap justify-center">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Sitemap</a>
          <a href="#" className="hover:underline">Company details</a>
        </div>
      </div>
    </footer>
  );
} 