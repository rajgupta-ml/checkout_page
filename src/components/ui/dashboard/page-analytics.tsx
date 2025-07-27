"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, BarChart3, CreditCard, Edit, Eye, HelpCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageDetails, RecentPayments } from "@/app/dashboard/[id]/analytics/page"


export function PageAnalytics({ pageData, recentPayments }: { pageData : PageDetails, recentPayments : RecentPayments[] }) {
  const router = useRouter()




  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => router.push("/dashboard")} className=" cursor-pointer flex items-center text-foreground hover:text-primary transition-all duration-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Pages
            </button>
            <span className="text-gray-400">/</span>
            <span className="font-medium">{pageData.name}</span>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={true}>Edit page →</Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-6 py-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-foreground mb-8">{pageData.name}</h1>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary rounded-lg">
                  <BarChart3 className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-foreground">Revenue</span>
                  <HelpCircle className="w-4 h-4 text-primary ml-1" />
                </div>
                <div className="text-3xl font-bold text-foreground mt-1">${pageData.revenue || 0}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary rounded-lg">
                  <CreditCard className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-foreground">Payments</span>
                  <HelpCircle className="w-4 h-4 text-primary ml-1" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mt-1">{pageData.payment || 0}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary rounded-lg">
                  <Eye className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-foreground">Page views</span>
                  <HelpCircle className="w-4 h-4 text-primary ml-1" />
                </div>
                <div className="text-3xl font-bold text-foreground mt-1">{pageData.pageView || 0}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-foreground">Conversion rate</span>
                  <HelpCircle className="w-4 h-4 text-primary ml-1" />
                </div>
                <div className="text-3xl font-bold text-foreground mt-1">{pageData.conversionRate}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent activity</h2>
            </div>
          </div>

          {/* Table Header */}
          <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500">
              <div>Customer</div>
              <div>Amount</div>
              <div>Date</div>
              <div>Status</div>
            </div>
          </div>

          {recentPayments.length > 0 ? (
              recentPayments.map((payment, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-4 gap-4 text-sm text-gray-700 px-6 py-4 border-b border-gray-100"
                >
                  <div>{payment.customer}</div>
                  <div>{payment.payment === "0" ? "Not Paid" : payment.payment}</div>
                  <div>{payment.date}</div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        payment.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-900 font-medium mb-2">No payments yet</div>
                <div className="text-gray-500 text-sm">Your payments will show up here.</div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
