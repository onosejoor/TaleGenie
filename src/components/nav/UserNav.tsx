import Link from "next/link";
import Img from "../Img";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import useSWR from "swr";
import { usePathname } from "next/navigation";
import Spinner from "../loaders/Spinner";
import { isActiveClassName } from "@/app/_lib/utils";
import { signOut } from "@/lib/actions/signout";
import { useRouter } from "next/navigation";

type Props = {
  openDropDown: boolean;
  setOpenDropDown: Dispatch<SetStateAction<boolean>>;
  handleNavExpansion: () => void;
};

type SWRResponse = {
  success: boolean;
  data: { name: string; email: string; avatar: string; username: string };
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function UserNavComp({
  openDropDown,
  handleNavExpansion,
  setOpenDropDown,
}: Props) {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR<SWRResponse>("/api/user/me", fetcher, {
    refreshWhenOffline: false,
    revalidateIfStale: false,
  });

  const router = useRouter();
  const path = usePathname();

  const authLinks = [
    { href: "/signin", text: "Sign-In" },
    { href: "/signup", text: "Sign-up" },
  ];

  const handleDropDown = () => setOpenDropDown(!openDropDown);

  async function handleSignOut() {
    await signOut();
    handleNavExpansion();
    await mutate();
    router.push("/signin");
  }

  if (error) {
    if (error.status === 401) {
      return (
        <>
          {authLinks.map((link, index) => {
            const isActive =
              path === link.href || path.split("/")[1] === link.href.slice(1);
            const className = isActiveClassName(isActive);
            return (
              <li
                key={index}
                className={`${className} hover:before:bg-secondary relative h-fit text-lg capitalize before:absolute before:-bottom-4 before:left-0 before:block before:h-[2px] before:rounded-full before:transition-all hover:before:w-full sm:h-full sm:before:-bottom-[25px]`}
              >
                <Link href={link.href}>{link.text}</Link>
              </li>
            );
          })}
        </>
      );
    }
    return (
      <div
        role="button"
        className="bg-accent-blue grid h-[40px] w-[40px] place-content-center rounded-full border-2 border-white"
      >
        <b className="text-xl text-white">E</b>
      </div>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (response) {
    const { name, email, avatar, username } = response?.data;

    const dropdownLinks = [
      { href: `/${username}`, text: "Profile" },
      { href: "/settings", text: "Settings" },
    ];

    return (
      <div className="hover:bg-accent-blue absolute bottom-0 left-0 flex w-full shrink-0 items-center gap-5 rounded-br-2xl p-5 hover:*:text-white sm:relative sm:w-fit sm:!bg-transparent sm:p-0">
        <div
          role="button"
          onClick={handleDropDown}
          className="hover:border-light-gray shadow-story-card border-accent-blue/70 h-[45px] w-[45px] cursor-pointer overflow-hidden rounded-full border-5"
        >
          <Img src={avatar} className="object-cover" alt={`${name} image`} />
        </div>
        <b className="text-secondary block sm:hidden">{name}</b>

        {openDropDown && (
          <div
            className={`divide-primary/70 animate-in zoom-in shadow-story-card dark:shadow-story-card-dark xs:left-[210px] absolute bottom-5 left-[70px] z-10 w-45 divide-y rounded-lg bg-white backdrop-blur-2xl sm:top-[70px] sm:-right-5 sm:bottom-auto sm:left-auto dark:bg-black/50`}
          >
            <div className="dark:text-secondary grid gap-3 px-4 py-3 text-sm text-gray-900">
              <p className="hidden font-semibold capitalize sm:block">{name}</p>
              <div className="truncate font-medium">{email}</div>
            </div>
            <ul className="text-secondary py-2 text-sm">
              {dropdownLinks.map((link, index) => {
                const isActive = link.href === path;

                const isActiveClassName =
                  isActive && "bg-gray-100 dark:bg-secondary/10";
                return (
                  <li key={index} onClick={handleNavExpansion}>
                    <Link
                      href={link.href}
                      className={`dark:hover:bg-secondary/10 ${isActiveClassName} block px-4 py-2 hover:bg-gray-100`}
                    >
                      {link.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="py-2">
              <button
                onClick={handleSignOut}
                className="dark:hover:bg-secondary/10 block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
