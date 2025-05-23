import { auth } from "@/auth";
import { redirect } from "next/navigation";
import StartupForm from "@/components/StartupForm";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <>
      <section className="pink-container bg-primary min-h-[230px]">
        <h1 className="heading">submit Your Startup</h1>
      </section>
      <StartupForm />
    </>
  );
};

export default Page;
