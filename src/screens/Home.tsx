import Navbar from "../components/Navbar";
import UserTabs from "../UserTabs";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <UserTabs />
      <Footer />
    </div>
  );
};

export default Home;
