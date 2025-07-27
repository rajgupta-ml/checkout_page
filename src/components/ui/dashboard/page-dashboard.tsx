"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  ChevronRight,
  Copy,
  CreditCard,
  Edit,
  UploadIcon as Embed,
  Eye,
  FileText,
  HelpCircle,
  Home,
  Loader2,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SVG } from "../Navbar"
import { IAnalytics } from "@/model/analytics"
import { PagesData } from "@/app/dashboard/page"
import { toast } from "sonner"
import { UserButton, useUser } from "@clerk/nextjs"

const sidebarItems = [
  { icon: FileText, label: "Dashboard", active: true },
  
]


export function PagesDashboard({pagesData} : {pagesData? : PagesData[]}) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser()

  const handleClick = () => {
    setIsLoading(true);
    router.push("/create-checkout");
  };


  const handlePageClick = (page: any) => {
    setIsLoading(true)
    router.push(`/dashboard/${page.id}/analytics`)
  }

  const handleCopyEmbedCode = (pageId: string) => {
    const embedCode = `<iframe src="http://${pageId}.localhost:3000/live-preview/" width="100%" height="600" frameborder="0"></iframe>`
    navigator.clipboard.writeText(embedCode)
    toast("Emedding has been copied to your clipboard")
  }


  const openLivePreview = (pageId : string) => {
    const livePreview = `http://${pageId}.localhost:3000/live-preview/`
    window.open(livePreview, "_blank");
  } 


  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <div className="w-8 h-8 rounded-full flex items-center gap-0">
            <div>
                <SVG></SVG>
            </div>
            <h1 className="text-xl font-bold text-foreground">CheckoutPage</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.active ? "bg-primary text-primary-foreground": "text-primary-foreground hover:bg-primary-foreground/80"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 ">
              <UserButton />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">{user?.fullName?.toUpperCase()}</span>
                <span className="text-xs text-gray-500">Free Plan</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-sidebar border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
            <div className="flex items-center space-x-4">
            <Button
                onClick={handleClick}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 cursor-pointer text-white"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                {isLoading ? 'Redirecting...' : 'Create page'}
            </Button>
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="flex-1 px-6 py-6">
          <Tabs defaultValue="checkouts" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
              <TabsTrigger value="checkouts">Checkouts</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
            </TabsList>

            <TabsContent value="checkouts" className="space-y-4">
              { pagesData && pagesData.length === 0 ? (
                /* Empty State */
                <div className="bg-card rounded-lg border border-border p-12 text-center">
                  <div className="w-16 h-16 bg-border rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No pages yet</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Create your first checkout page to start selling your products and services online.
                  </p>
                  <Button
                  onClick={() => router.push("/create-checkout")} 
                  className="bg-primary hover:bg-primary/70 text-primary-foreground">
                    <Plus className="w-4 h-4 mr-2" />
                    Create new page
                  </Button>
                </div>
              ) : (
                /* Pages Table */
                <div className="bg-secondary rounded-lg border border-border">
                  <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border text-sm font-medium text-foreground">
                    <div className="col-span-3"></div>
                    <div className="col-span-2 text-center">Revenue</div>
                    <div className="col-span-2 text-center">Payments</div>
                    <div className="col-span-2 text-center">Views</div>
                    <div className="col-span-2 text-center">CVR</div>
                    <div className="col-span-1"></div>
                  </div>
                  { pagesData && pagesData.map((page) => (
                    <div
                      key={page.id}
                      className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-b-0 hover:bg-border cursor-pointer"
                      onClick={() => handlePageClick(page)}
                    >
                      <div className="col-span-3 flex items-center space-x-3">
                        <div className="w-10 h-10 bg-background rounded flex items-center justify-center">
                          <FileText className="w-5 h-5 text-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {page.type}
                            </Badge>
                          </div>
                          <div className="font-medium text-gray-900 mt-1">{page.name}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            {page.price}{" "}
                            {page.originalPrice && (
                              <span className="line-through text-gray-400 ml-2">{page.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center justify-center">
                        <span className="font-medium">{page.revenue}</span>
                      </div>
                      <div className="col-span-2 flex items-center justify-center">
                        <span>{page.payments}</span>
                      </div>
                      <div className="col-span-2 flex items-center justify-center">
                        <span>{page.views}</span>
                      </div>
                      <div className="col-span-2 flex items-center justify-center">
                        <span className="text-green-600 font-medium">{page.cvr}</span>
                      </div>
                      <div className="col-span-1 flex items-center justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handlePageClick}>
                              <Eye className="w-4 h-4 mr-2" />
                              View page
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCopyEmbedCode(page.id)
                              }}
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copy embed code
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation()
                              openLivePreview(page.id);
                            }}>
                              <Eye className="w-4 h-4 mr-2" />
                              Live Preview
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
                <p className="text-gray-500 mb-6">Create your first event to get started.</p>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create new event
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="forms" className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No forms yet</h3>
                <p className="text-gray-500 mb-6">Create your first form to collect submissions.</p>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create new form
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
