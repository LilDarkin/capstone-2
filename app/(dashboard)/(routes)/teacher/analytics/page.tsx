import { getAnalytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

const AnalyticsPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const {
        data,
        totalUsers,
        totalCompleted,
    } = await getAnalytics(userId);

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DataCard
                    label="Total Users"
                    value={totalUsers}
                />
                <DataCard
                    label="Total Completed"
                    value={totalCompleted}
                />
            </div>
            <Chart 
                data={data}
            />
        </div>
    )
}

export default AnalyticsPage;