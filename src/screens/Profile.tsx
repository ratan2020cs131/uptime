import { useParams } from "react-router-dom";

const Profile = () => {
  const { user_name = "shreeramk" } = useParams();
  return (
    <div className="flex-1 flex items-center justify-center">{user_name}</div>
  );
};

export default Profile;
