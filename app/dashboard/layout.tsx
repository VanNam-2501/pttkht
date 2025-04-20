"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  Package,
  PackageCheck,
  PackagePlus,
  Percent,
  ShoppingCart,
  Store,
  Truck,
  TruckIcon as TruckOut,
  Users,
  Bell,
  Search,
  Settings,
  Leaf,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Suspense } from "react"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  title: string
  isActive: boolean
  onClick?: () => void
  badge?: number
}

function NavItem({ href, icon, title, isActive, onClick, badge }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "sidebar-item flex items-center gap-3 rounded-lg px-3 py-2 transition-all relative",
        isActive
          ? "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-50 font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {icon}
      <span>{title}</span>
      {badge && badge > 0 && (
        <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800 hover:bg-green-200">
          {badge}
        </Badge>
      )}
      {isActive && <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-green-600" />}
    </Link>
  )
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const closeSheet = () => {
    setOpen(false)
  }

  const navItems = [
    { href: "/dashboard", icon: <Home className="h-5 w-5" />, title: "Trang chủ", badge: 0 },
    { href: "/dashboard/invoice", icon: <ShoppingCart className="h-5 w-5" />, title: "Lập hoá đơn (UC-03)", badge: 0 },
    {
      href: "/dashboard/import-management",
      icon: <Truck className="h-5 w-5" />,
      title: "Quản lý nhập hàng (UC-04)",
      badge: 2,
    },
    {
      href: "/dashboard/export-management",
      icon: <TruckOut className="h-5 w-5" />,
      title: "Quản lý xuất hàng (UC-05)",
      badge: 1,
    },
    {
      href: "/dashboard/customers",
      icon: <Users className="h-5 w-5" />,
      title: "Khách hàng thân thiết (UC-06)",
      badge: 0,
    },
    { href: "/dashboard/statistics", icon: <BarChart3 className="h-5 w-5" />, title: "Thống kê (UC-07)", badge: 0 },
    {
      href: "/dashboard/import-note",
      icon: <PackagePlus className="h-5 w-5" />,
      title: "Phiếu nhập hàng (UC-08)",
      badge: 0,
    },
    {
      href: "/dashboard/export-note",
      icon: <PackageCheck className="h-5 w-5" />,
      title: "Phiếu xuất hàng (UC-09)",
      badge: 0,
    },
    {
      href: "/dashboard/inventory",
      icon: <ClipboardList className="h-5 w-5" />,
      title: "Kiểm kê hàng (UC-10)",
      badge: 0,
    },
    {
      href: "/dashboard/return-note",
      icon: <Package className="h-5 w-5" />,
      title: "Phiếu trả hàng (UC-11)",
      badge: 0,
    },
    { href: "/dashboard/products", icon: <Store className="h-5 w-5" />, title: "Quản lý sản phẩm (UC-13)", badge: 0 },
    {
      href: "/dashboard/promotions",
      icon: <Percent className="h-5 w-5" />,
      title: "Quản lý khuyến mãi (UC-14)",
      badge: 0,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col grocery-bg">
      {/* Header cho thiết bị di động */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-green-200 shadow-sm glass-effect px-4 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Mở menu điều hướng</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
            <div className="px-6 py-4 border-b border-green-200 bg-green-50">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-lg font-semibold text-green-800">Quản lý bán hàng tạp hoá</span>
              </div>
            </div>
            <nav className="flex-1 overflow-auto py-2 px-4">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  title={item.title}
                  isActive={pathname === item.href}
                  onClick={closeSheet}
                  badge={item.badge}
                />
              ))}
            </nav>
            <div className="border-t border-green-200 p-4">
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <Link href="/">
                  <LogOut className="h-4 w-4" />
                  <span>Đăng xuất</span>
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex-1">
          <h1 className="text-lg font-semibold leading-tight">
            Hệ thống quản lý
            <br />
            bán hàng tạp hoá
          </h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="font-medium">Yêu cầu nhập hàng mới</div>
                <div className="text-sm text-muted-foreground">Có 2 yêu cầu nhập hàng đang chờ xử lý</div>
                <div className="text-xs text-muted-foreground">2 phút trước</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="font-medium">Yêu cầu xuất hàng mới</div>
                <div className="text-sm text-muted-foreground">Có 1 yêu cầu xuất hàng đang chờ xử lý</div>
                <div className="text-xs text-muted-foreground">15 phút trước</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="font-medium">Cảnh báo tồn kho</div>
                <div className="text-sm text-muted-foreground">Sản phẩm "Gạo Tám Thơm 1kg" sắp hết hàng</div>
                <div className="text-xs text-muted-foreground">1 giờ trước</div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
          <AvatarFallback className="bg-green-100 text-green-800">NV</AvatarFallback>
        </Avatar>
      </header>

      <div className="flex flex-1">
        {/* Sidebar cho máy tính */}
        <aside className="hidden w-64 shrink-0 border-r border-green-200 shadow-md glass-effect md:block">
          <div className="flex h-16 items-center gap-2 border-b border-green-200 px-6">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-lg font-semibold text-green-800 leading-tight">
              Hệ thống quản lý
              <br />
              bán hàng tạp hoá
            </span>
          </div>
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                title={item.title}
                isActive={pathname === item.href}
                badge={item.badge}
              />
            ))}
            <div className="mt-auto pt-4">
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <Link href="/">
                  <LogOut className="h-4 w-4" />
                  <span>Đăng xuất</span>
                </Link>
              </Button>
            </div>
          </nav>
        </aside>

        {/* Nội dung chính */}
        <main className="flex-1 overflow-auto">
          {/* Header cho desktop */}
          <header className="hidden md:flex h-16 items-center justify-between border-b border-green-200 shadow-sm glass-effect px-6">
            <div className="flex-1">{/* Removed greeting */}</div>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Tìm kiếm..." className="pl-8 bg-background/50 focus-visible:ring-green-500" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-auto">
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                      <div className="font-medium">Yêu cầu nhập hàng mới</div>
                      <div className="text-sm text-muted-foreground">Có 2 yêu cầu nhập hàng đang chờ xử lý</div>
                      <div className="text-xs text-muted-foreground">2 phút trước</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                      <div className="font-medium">Yêu cầu xuất hàng mới</div>
                      <div className="text-sm text-muted-foreground">Có 1 yêu cầu xuất hàng đang chờ xử lý</div>
                      <div className="text-xs text-muted-foreground">15 phút trước</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                      <div className="font-medium">Cảnh báo tồn kho</div>
                      <div className="text-sm text-muted-foreground">Sản phẩm "Gạo Tám Thơm 1kg" sắp hết hàng</div>
                      <div className="text-xs text-muted-foreground">1 giờ trước</div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2" size="sm">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                      <AvatarFallback className="bg-green-100 text-green-800">NV</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-sm">
                      <span className="font-medium">Nhân viên</span>
                      <span className="text-xs text-muted-foreground">Nhân viên</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Hồ sơ cá nhân</DropdownMenuItem>
                  <DropdownMenuItem>Cài đặt tài khoản</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/">Đăng xuất</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <Suspense>{children}</Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}
