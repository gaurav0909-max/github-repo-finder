// import React from "react";

// function Description() {
//   return (
//     <div className="space-y-6 mb-12">
//       <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-500 tracking-tight">
//         RepoVision
//       </h1>
//       <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto text-balance">
//         Explore GitHub repositories effortlessly by username, location, or
//         organization. Discover top projects, contributions, and professional
//         achievements in seconds—your gateway to meaningful connections and
//         global expertise!
//       </p>
//     </div>
//   );
// }

// export default Description;
import content from "../../../../public/content.json";

function Description() {
  return (
    <div className="space-y-6 mb-12">
      <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent via-accent to-primary tracking-tight">
        {content.title}
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance">
        {content.description}
      </p>
    </div>
  );
}

export default Description;
