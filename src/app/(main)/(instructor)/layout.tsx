import BackButton from "@/modules/shared/presentation/components/BackButton";
import Sidebar from "@/modules/shared/presentation/components/layout/Sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!userId) return redirect('/sign-in');
  return (
    <div className="flex-1 flex">
      <Sidebar />
      <div className="flex-1">
        <div className="px-6 py-4">
          <BackButton />
        </div>
        {children}
      </div>
    </div>
  );
}

export default InstructorLayout;
