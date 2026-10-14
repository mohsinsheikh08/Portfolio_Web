const MyJourney = () => {
  return (
    <div className="md:px-7 px-5 ">
      <div className="py-3   flex justify-between items-center">
        <p className="text-3xl md:text-5xl font-extrabold">
          My Journey
          <span className="text-5xl sm:text-7xl text-[#3F0091]">.</span>
        </p>
      </div>
      <div className=" text-xs mt-4 leading-6 pl-5 border-l-2 border-[#3F0091] ">
        <p className="text-[#4e525a] text-sm md:text-lg md:leading-12 leading-8">
          <span className="text-[#3F0091] pr-1">
            Started with HTML, CSS, and JavaScript.
          </span>
          Moved to React, then full-stack with
          <span className="text-[#3F0091] px-1">
            Node.js, Express, and MongoDB.
          </span>
          Built
          <span className="text-[#3F0091] px-1">
            Elite Store (e-commerce), ResuMatch (AI resume analyzer),
          </span>
          and a portfolio website. Now working with
          <span className="text-[#3F0091] px-1">
            TypeScript, Next.js, and AI integrations.
          </span>
          Currently building
          <span className="text-[#3F0091] px-1">
            KINETTA — a premium gym wear e-commerce platform.
          </span>
          <span className="text-[#3F0091] px-1">
            Self-taught, consistent, and always building.
          </span>
          Also have a background in graphic design — which helps me create
          <span className="text-[#3F0091] px-1">
            clean, user-friendly interfaces.
          </span>
        </p>
      </div>
    </div>
  );
};

export default MyJourney;