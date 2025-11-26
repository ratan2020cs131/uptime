import Tabs from "./components/Tabs";
import overviewIcon from "./assets/overviewIcon.svg";
import projectIcon from "./assets/projectIcon.svg";
import starIcon from "./assets/starIcon.svg";
import packageIcon from "./assets/packageIcon.svg";
import repoIcon from "./assets/repoIcon.svg";
import Profile from "./screens/Profile";

const tabs = [
  {
    icon: overviewIcon,
    label: "Overview",
    value: "",
    component: <Profile />,
  },
  {
    icon: repoIcon,
    label: "Repositories",
    value: "repositories",
    component: (
      <div className="flex-1 flex items-center justify-center">
        Repositories
      </div>
    ),
  },
  {
    icon: projectIcon,
    label: "Projects",
    value: "projects",
    component: (
      <div className="flex-1 flex items-center justify-center">Projects</div>
    ),
  },
  {
    icon: packageIcon,
    label: "Packages",
    value: "packages",
    component: (
      <div className="flex-1 flex items-center justify-center">Packages</div>
    ),
  },
  {
    icon: starIcon,
    label: "Stars",
    value: "stars",
    component: (
      <div className="flex-1 flex items-center justify-center">Stars</div>
    ),
  },
];

const UserTabs = () => {
  return <Tabs tabs={tabs} className="bg-primary-light" />;
};

export default UserTabs;
