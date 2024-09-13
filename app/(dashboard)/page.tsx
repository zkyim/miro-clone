"use client"
import { useOrganization, UserButton } from "@clerk/nextjs";
import EmptyOrg from "./_componentes/EmptyOrg";
import BoardList from "./_componentes/BoardList";
interface DashbordPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  }
}
export default function DashbordPage({
  searchParams,
}: DashbordPageProps) {
  const { organization } = useOrganization();
  return (
    <div className="flex-1 h-[calc(100% - 80px)]">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          query={searchParams}
        />
      )}
    </div>
  );
}
