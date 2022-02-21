import { useSession, signIn, signOut } from "next-auth/react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faEgg,
  faChild,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="p-3 shadow bg-white">
      <Button callback={session ? signIn : signOut} className="w-full mt-auto">
        <>{session ? "Sign out" : "Sign in"}</>
      </Button>
    </div>
  );
};

export default Header;
