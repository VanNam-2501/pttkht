import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  BarChart3,
  ClipboardList,
  Package,
  PackageCheck,
  PackagePlus,
  Percent,
  ShoppingCart,
  Store,
  Truck,
  TruckIcon as TruckOut,
  Users,
  Leaf,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const functionCards = [
    {
      title: "Lập hoá đơn",
      description: "Tạo hoá đơn cho khách hàng (UC-03)",
      icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
      href: "/dashboard/invoice",
      color: "bg-green-50",
      borderColor: "border-green-200",
      iconBg: "bg-green-100",
    },
    {
      title: "Quản lý nhập hàng",
      description: "Quản lý việc nhập hàng vào kho (UC-04)",
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      href: "/dashboard/import-management",
      color: "bg-blue-50",
      borderColor: "border-blue-200",
      badge: "2 yêu cầu mới",
      badgeColor: "bg-blue-100 text-blue-800",
      iconBg: "bg-blue-100",
    },
    {
      title: "Quản lý xuất hàng",
      description: "Quản lý việc xuất hàng từ kho (UC-05)",
      icon: <TruckOut className="h-8 w-8 text-purple-600" />,
      href: "/dashboard/export-management",
      color: "bg-purple-50",
      borderColor: "border-purple-200",
      badge: "1 yêu cầu mới",
      badgeColor: "bg-purple-100 text-purple-800",
      iconBg: "bg-purple-100",
    },
    {
      title: "Khách hàng thân thiết",
      description: "Quản lý khách hàng thân thiết (UC-06)",
      icon: <Users className="h-8 w-8 text-orange-600" />,
      href: "/dashboard/customers",
      color: "bg-orange-50",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-100",
    },
    {
      title: "Thống kê",
      description: "Xem thống kê doanh thu (UC-07)",
      icon: <BarChart3 className="h-8 w-8 text-red-600" />,
      href: "/dashboard/statistics",
      color: "bg-red-50",
      borderColor: "border-red-200",
      iconBg: "bg-red-100",
    },
    {
      title: "Phiếu nhập hàng",
      description: "Tạo phiếu nhập hàng (UC-08)",
      icon: <PackagePlus className="h-8 w-8 text-cyan-600" />,
      href: "/dashboard/import-note",
      color: "bg-cyan-50",
      borderColor: "border-cyan-200",
      iconBg: "bg-cyan-100",
    },
    {
      title: "Phiếu xuất hàng",
      description: "Tạo phiếu xuất hàng (UC-09)",
      icon: <PackageCheck className="h-8 w-8 text-teal-600" />,
      href: "/dashboard/export-note",
      color: "bg-teal-50",
      borderColor: "border-teal-200",
      iconBg: "bg-teal-100",
    },
    {
      title: "Kiểm kê hàng",
      description: "Kiểm kê hàng trong kho (UC-10)",
      icon: <ClipboardList className="h-8 w-8 text-emerald-600" />,
      href: "/dashboard/inventory",
      color: "bg-emerald-50",
      borderColor: "border-emerald-200",
      iconBg: "bg-emerald-100",
    },
    {
      title: "Phiếu trả hàng",
      description: "Tạo phiếu trả hàng (UC-11)",
      icon: <Package className="h-8 w-8 text-amber-600" />,
      href: "/dashboard/return-note",
      color: "bg-amber-50",
      borderColor: "border-amber-200",
      iconBg: "bg-amber-100",
    },
    {
      title: "Quản lý sản phẩm",
      description: "Quản lý thông tin sản phẩm (UC-13)",
      icon: <Store className="h-8 w-8 text-indigo-600" />,
      href: "/dashboard/products",
      color: "bg-indigo-50",
      borderColor: "border-indigo-200",
      iconBg: "bg-indigo-100",
    },
    {
      title: "Quản lý khuyến mãi",
      description: "Quản lý chương trình khuyến mãi (UC-14)",
      icon: <Percent className="h-8 w-8 text-pink-600" />,
      href: "/dashboard/promotions",
      color: "bg-pink-50",
      borderColor: "border-pink-200",
      iconBg: "bg-pink-100",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="section-container">
        <h1 className="text-3xl font-bold tracking-tight text-green-800">Trang chủ</h1>
        <p className="text-muted-foreground">Chào mừng đến với Hệ thống Quản lý Bán hàng Tạp hoá</p>
      </div>

      {/* Banner */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 z-0"></div>
        <div className="absolute inset-0 opacity-20 z-0 pattern-bg"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Hệ thống quản lý bán hàng tạp hoá</h2>
          </div>
          <p className="text-white/90 max-w-lg text-lg">
            Giúp bạn quản lý cửa hàng tạp hoá một cách hiệu quả và đơn giản
          </p>
          <div className="flex gap-2 mt-4">
            <Badge className="bg-white/20 text-white hover:bg-white/30 px-3 py-1">Dễ sử dụng</Badge>
            <Badge className="bg-white/20 text-white hover:bg-white/30 px-3 py-1">Hiệu quả</Badge>
            <Badge className="bg-white/20 text-white hover:bg-white/30 px-3 py-1">Toàn diện</Badge>
          </div>
        </div>
      </div>

      {/* Chức năng chính */}
      <div className="section-container">
        <h2 className="section-title">
          <Store className="h-5 w-5 text-green-600" />
          Chức năng chính
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {functionCards.map((card, index) => (
            <Link href={card.href} key={index}>
              <Card
                className={`h-full transition-all card-hover-effect border ${card.borderColor} glass-effect overflow-hidden`}
              >
                <div className={`relative h-32 w-full ${card.color}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`${card.iconBg} p-4 rounded-full`}>{card.icon}</div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
                </div>
                <CardHeader className={`rounded-t-lg`}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription>{card.description}</CardDescription>
                  {card.badge && <Badge className={`mt-2 ${card.badgeColor}`}>{card.badge}</Badge>}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-sm text-muted-foreground">
        <p>© 2025 Bản quyền thuộc về nhóm 6.</p>
      </div>
    </div>
  )
}
