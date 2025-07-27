import { PageAnalytics } from "@/components/ui/dashboard/page-analytics";
import { getAnalyticsFromDb, getConfigFromDbThroughConfigId } from "@/lib/getSubdomain";
import { IAnalytics } from "@/model/analytics";
import { IConfig } from "@/model/config";
import mongoose from "mongoose";
import Link from "next/link";
import { redirect } from "next/navigation";



export interface RecentPayments {
  customer : string,
  payment  : string,
  date : string,
  status : "Completed" | "Failed"
}

export interface PageDetails {
  name? : string,
  revenue : string,
  payment : string,
  pageView : string,
  conversionRate : string,
}


const getRecentPayementDetails = (analytics: IAnalytics[]): RecentPayments[] => {
  return analytics.map((data) => {
    const customerDetails = data.customerDetails || {};
  
    const [firstKey] = Object.keys(customerDetails);
    const customer = firstKey ? String(customerDetails[firstKey]) : `${data._id}`;
    return {
      customer,
      payment: data.payment?.toString() || "Not Paid",
      date: data.createdAt?.toString() || "",
      status: data.conversion ? "Completed" : "Failed",
    };
  });
};

const getPageDetails = (analytics: IAnalytics[]): PageDetails => {
  const totalRevenue = analytics.reduce((sum, a) => sum + (a.revenue || 0), 0);
  const totalPayments = analytics.reduce((sum, a) => sum + (a.payment || 0), 0);
  const totalViews = analytics.reduce((sum, a) => sum + (a.pageView || 0), 0);
  const totalConversions = analytics.reduce((sum, a) => sum + (Number(a.conversion) || 0), 0);

  const conversionRate =
    totalViews > 0 ? ((totalConversions / totalViews) * 100).toFixed(1).toString() + "%" : "0%";
  return {
    revenue: `$${totalRevenue.toFixed(2)}`,
    payment: totalPayments === 0 ? "Not Paid" : `${totalPayments}`,
    pageView: totalViews.toString(),
    conversionRate,
  };
};

export default async function AnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    redirect("/dashboard"); // or show 404
  }

  
  const config = await getConfigFromDbThroughConfigId(new mongoose.Types.ObjectId(id)) as IConfig;
  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page not found</h1>
          <Link href={"/dashboard"} className="bg-orange-600 hover:bg-orange-700 text-white">
            Back to Pages
          </Link>
        </div>
      </div>
    )
  }
  const analytics = await getAnalyticsFromDb(config._id.toString());
  const pageDetails = getPageDetails(analytics)
  pageDetails.name = config.productTitle;
  const recentActivity = getRecentPayementDetails(analytics);
  return <PageAnalytics pageData= {pageDetails} recentPayments={recentActivity}/>
}
