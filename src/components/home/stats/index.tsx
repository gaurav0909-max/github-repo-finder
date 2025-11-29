import React from "react";

const StatsSection = ({ stats }: { stats: string[] }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-12">
      {stats.map((stat) => (
        <div
          key={stat}
          className="px-6 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/20 text-muted-foreground text-sm shadow-lg hover:scale-105 transition-transform"
        >
          {stat}
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
