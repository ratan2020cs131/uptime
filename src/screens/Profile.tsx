import { useParams } from "react-router-dom";
import useGetUser from "../api/useGetUser";
import IconWrapper from "../components/IconWrapper";
import peopleIcon from "../assets/peopleIcon.svg";
import companyIcon from "../assets/companyIcon.svg";
import locationIcon from "../assets/locationIcon.svg";
import mailIcon from "../assets/mailIcon.svg";
import linkIcon from "../assets/linkIcon.svg";
import linkedinIcon from "../assets/linkedinIcon.svg";
import xIcon from "../assets/xIcon.svg";
import useGetSocial from "../api/useGetSocial";
import Divider from "../components/Divider";
import { colors } from "../assets/colors";
import Badge from "../components/Badge";
import Repositories from "./Repositories";
import Contributions from "./Contributions";

const socialIconMap = {
  twitter: xIcon,
  linkedin: linkedinIcon,
};

const Profile = () => {
  const { user_name = "shreeramk" } = useParams();
  const { data: user, isLoading } = useGetUser(user_name);
  const { data: social } = useGetSocial(user_name);

  return (
    <div className="flex-1 h-full flex flex-col md:flex-row justify-center gap-6 px-4">
      {isLoading && <div>Loading...</div>}
      {!user ? (
        !isLoading && <div>User not found</div>
      ) : (
        <>
          <div className="flex flex-col gap-4 w-full md:max-w-[18rem] h-[100] flex-shrink-0 py-8">
            <div className="flex items-center md:items-start md:flex-col gap-4">
              <span className="rounded-full overflow-hidden">
                <img
                  src={user?.avatar_url}
                  alt={user?.name || ""}
                  className="max-w-[8rem] md:max-w-full w-full rounded-full object-contain"
                />
              </span>
              <span className="flex flex-col">
                <p className="text-primary text-[1.2rem] font-semibold md:leading-[1.2rem]">
                  {user.name}
                </p>
                <p className="text-primary-dark text-[1rem] leading-[1rem]">
                  {user.login}
                </p>
              </span>
            </div>

            <button className="hidden md:block cursor-pointer hover:bg-primary-light bg-secondary-light border border-secondary-dark text-primary text-[0.8rem] leading-[0.8rem] font-semibold px-4 py-2 rounded-md">
              Follow
            </button>

            {user.bio && (
              <p className="text-primary text-[1rem] leading-[1.25rem]">
                {user.bio}
              </p>
            )}

            <span className="flex gap-2 cursor-pointer">
              <IconWrapper icon={peopleIcon} alt="people" size="sm" />
              <p>
                <b>{user.followers}</b> followers . <b>{user.following}</b>{" "}
                following
              </p>
            </span>

            <span className="flex flex-col gap-1">
              {user.company && (
                <p className="flex items-center gap-2 text-primary text-[1rem] leading-[1.25rem]">
                  <IconWrapper icon={companyIcon} alt="company" size="sm" />
                  {user.company}
                </p>
              )}
              {user.location && (
                <p className="flex items-center gap-2 text-primary text-[1rem] leading-[1.25rem]">
                  <IconWrapper icon={locationIcon} alt="location" size="sm" />
                  {user.location}
                </p>
              )}

              {user.email && (
                <p className="flex items-center gap-2 text-primary text-[1rem] leading-[1.25rem]">
                  <IconWrapper icon={mailIcon} alt="mail" size="sm" />
                  {user.email}
                </p>
              )}

              {user.blog && (
                <p
                  className="cursor-pointer hover:underline flex items-center gap-2 text-primary text-[1rem] leading-[1.25rem]"
                  onClick={() => window.open(user.blog || "", "_blank")}
                >
                  <IconWrapper icon={linkIcon} alt="link" size="sm" />
                  {user.blog}
                </p>
              )}

              {social?.map((item) => (
                <p
                  key={item.url}
                  className="cursor-pointer hover:underline flex items-center gap-2 text-primary text-[1rem] leading-[1.25rem]"
                  onClick={() => window.open(item.url || "", "_blank")}
                >
                  <IconWrapper
                    icon={
                      socialIconMap[item.provider as keyof typeof socialIconMap]
                    }
                    alt="link"
                    size="sm"
                  />
                  {(() => {
                    const parts = item.url.split("/");
                    const last = parts.pop();
                    return last || parts.pop();
                  })()}
                </p>
              ))}
            </span>

            <button className="block md:hidden cursor-pointer hover:bg-primary-light bg-secondary-light border border-secondary-dark text-primary text-[0.8rem] leading-[0.8rem] font-semibold px-4 py-2 rounded-md">
              Follow
            </button>

            <Divider
              className="my-1"
              color={colors.secondary.dark}
              direction="horizontal"
            />

            <p className="text-primary text-[1rem] leading-[1.25rem] font-semibold">
              Achievements
            </p>

            <span className="flex">
              <Badge
                image="https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png"
                alt="Pair Extraordinaire"
                count={4}
              />
              <Badge
                image="https://github.githubassets.com/assets/yolo-default-be0bbff04951.png"
                alt="YOLO"
              />
              <Badge
                image="https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png"
                alt="Pull Shark"
                count={3}
              />
            </span>
          </div>

          <div className="flex flex-col gap-8 flex-1 min-w-[28rem] max-w-[56rem] h-[100] py-8">
            <Repositories />
            <Contributions />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
