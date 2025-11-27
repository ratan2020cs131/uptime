import Navbar from "../components/Navbar";
import UserTabs from "../UserTabs";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <UserTabs />
    </div>
  );
};

export default Home;
