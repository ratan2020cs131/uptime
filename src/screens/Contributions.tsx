import { useParams } from "react-router-dom";
import useGetContributions from "../api/useGetContributions";
import Heatmap from "../components/Heatmap";
import { useState } from "react";
import ContributionActivity from "../components/ContributionActivity";

const Contributions = () => {
  const { user_name = "shreeramk" } = useParams();
  const [year, setYear] = useState(new Date().getFullYear());
  const { data: contributionCalendar } = useGetContributions(user_name, year);

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-4 w-full md:w-auto md:flex-1 md:flex-shrink md:max-w-[46rem] md:min-w-0">
        <p className="text-primary text-[1rem]">
          {(contributionCalendar?.totalContributions || 0).toLocaleString()}{" "}
          contributions in {year}
        </p>

        <Heatmap year={year} user_name={user_name} />

        <h3 className="text-primary font-semibold mb-3">
          Contribution activity
        </h3>
        <ContributionActivity username={user_name} year={year} />
      </div>

      <div className="hidden md:flex flex-col gap-3 flex-1 max-w-[7rem]">
        {Array.from({ length: 10 }).map((_, idx) => {
          const yearOption = new Date().getFullYear() - idx;
          return (
            <button
              key={yearOption}
              onClick={() => setYear(yearOption)}
              className={`
                cursor-pointer
                px-3 py-1 rounded-md 
                text-[0.8rem] text-left
                transition-colors
                ${
                  year === yearOption
                    ? "bg-primary-link text-primary-light"
                    : "text-primary hover:bg-primary-light"
                }
                `}
            >
              {yearOption}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Contributions;
