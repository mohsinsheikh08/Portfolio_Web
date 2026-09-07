const Skills = () => {
  const skillsData = [
    {
      category: "Frontend",
      skills: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "JavaScript (ES6+)",
        "HTML5 & CSS3",
      ],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "MongoDB"],
    },
    {
      category: "Design & Tools",
      skills: [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "UI/UX Principles",
        "Responsive Design",
      ],
    },
    {
      category: "Soft Skills",
      skills: [
        "Self-Taught",
        "Problem Solver",
        "Consistent Learner",
        "Team Player",
        "Communication",
      ],
    },
  ];

  return (
    <div className="px-5 ">
      <div className="py-3 md:px-0 flex justify-between items-center">
        <p className="text-3xl md:text-5xl font-extrabold">
          Skills
          <span className="text-5xl sm:text-7xl text-[#6E06F2]">.</span>
        </p>
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 ">
        {skillsData.map((item, index) => (
          <div key={index} className="space-y-2">
            <h3 className="md:text-xl font-bold text-black">{item.category}</h3>
            <ul className="space-y-1">
              {item.skills.map((skill, idx) => (
                <li key={idx} className="text-[#4F5863] text-xs md:text-sm">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
