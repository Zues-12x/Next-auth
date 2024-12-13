import { auth } from "@/auth";
import UserInfo from "../_components/UserInfo";

export default async function ServerPage() {
  const { user } = await auth();
  return <UserInfo user={user} label={"User Info: (server component)"} />;
}
