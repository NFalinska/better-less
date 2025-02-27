import { LOGIN_PAGE_LINK } from "@/constants/routes";
import { Redirect } from "expo-router";

export default function HomeScreen() {
  return (
     <Redirect href={LOGIN_PAGE_LINK} />
  );
}


