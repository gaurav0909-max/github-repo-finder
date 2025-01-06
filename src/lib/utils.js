import { Search, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";
// import { FaGithub, FaSearch } from "react-icons/fa";
import { MdOutlineTipsAndUpdates, MdSavedSearch } from "react-icons/md";

export const featureItems = [
  {
    icon: <MdSavedSearch className="w-10 h-10 text-teal-500 rounded-2xl" />,
    title: "Quick Search",
    description: "Find repositories instantly by entering a GitHub username.",
    gradient: "from-teal-500/10 to-cyan-500/10",
  },
  {
    icon: <FaGithub className="w-10 h-10 text-[#004085] rounded-2xl" />,
    title: "Browse Projects",
    description: "Explore repositories and discover innovative projects.",
    gradient: "from-blue-500/10 to-indigo-500/10 ",
  },
  {
    icon: (
      <MdOutlineTipsAndUpdates className="w-10 h-10 text-lime-700 rounded-2xl" />
    ),
    title: "Stay Updated",
    description: "Keep track of the latest updates and contributions.",
    gradient: "from-purple-500/10 to-pink-500/10",
  },
];

export const stats = [
  "1M+ Repositories",
  "100K+ Developers",
  "50K+ Organizations",
];
