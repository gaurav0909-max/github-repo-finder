"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import FeatureCard from "./../components/feature-card/index";
import Footer from "./../components/Footer/index";
import Description from "@/components/home/description";
import SearchForm from "@/components/form/search-form";
import { stats } from "@/lib/utils";
import "../app/globals.css";
import StatsSection from "@/components/home/stats";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Explore from "./../components/home/explore/index";
import MobileUI from "./../components/mobile-ui/index";

export default function Home() {
  const [username, setUsername] = useState("");
  const [searchType, setSearchType] = useState<"users" | "repos">("users");

  const handleClick = () => {
    window.open(
      "https://github.com/gaurav0909-max/github-repo-finder",
      "_blank"
    );
  };

  const isMobile = useMediaQuery({ query: "(max-width: 720px)" });

  if (isMobile) {
    return <MobileUI />;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div
        className="relative min-h-[85vh] bg-cover bg-fixed bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-transparent" />
        <button
          className="fixed flex flex-row justify-center items-center font-semibold leading-7 gap-4 top-6 left-8 bg-gray-800 text-teal-500 py-2 px-4 border-2 border-gray-800
          rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={handleClick}
        >
          Github Repo
          <FaGithub />
        </button>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-4 sm:py-8 ">
          <Description />
          <SearchForm
            username={username}
            setUsername={setUsername}
            searchType={searchType}
            setSearchType={setSearchType}
          />
          <StatsSection stats={stats} />
          {/* <div className="flex justify-center items-center ">
            <div className="my-4 py-3  bg-[#FDF1DA] rounded-xl max-w-[350px]">
              <Link
                href="/organizations"
                className="font-bold text-xl text-slate-700 hover:text-slate-500 transition-all duration-300 px-2 py-6"
              >
                You can check all the organizations too!
              </Link>
            </div>
          </div> */}
          <Explore />
        </div>

        <button className="fixed top-6 right-8 bg-gray-800 font-semibold text-teal-500  leading-7 py-2 px-4 border-2 border-gray-800  rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          Sponsor Me 🥤
        </button>
      </div>

      <FeatureCard />

      <Footer />
    </main>
  );
}
