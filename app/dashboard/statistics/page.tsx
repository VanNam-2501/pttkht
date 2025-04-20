"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Printer, Download, TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users } from "lucide-react"

export default function StatisticsPage() {
  const [period, setPeriod] = useState("month")

  // Dữ liệu mô phỏng cho biểu đồ
  const monthlyData = [
    { month: "T1", sales: 0 },
    { month: "T2", sales: 12500000 },
    { month: "T3", sales: 18000000 },
    { month: "T4", sales: 8500000 }, // Chỉ tính đến 15/04
    { month: "T5", sales: 0 },
    { month: "T6", sales: 0 },
    { month: "T7", sales: 0 },
    { month: "T8", sales: 0 },
    { month: "T9", sales: 0 },
    { month: "T10", sales: 0 },
    { month: "T11", sales: 0 },
    { month: "T12", sales: 0 },
  ]

  const quarterlyData = [
    { quarter: "Q1", sales: 30500000 }, // Tháng 2 + Tháng 3
    { quarter: "Q2", sales: 8500000 }, // Chỉ tính đến 15/04
    { quarter: "Q3", sales: 0 },
    { quarter: "Q4", sales: 0 },
  ]

  const topProducts = [
    { name: "Gạo Tám Thơm 1kg", sales: 1250, percentage: 15 },
    { name: "Đậu Đen 1kg", sales: 980, percentage: 12 },
    { name: "Đường Trắng 1kg", sales: 850, percentage: 10 },
    { name: "Cà Phê Rang 500g", sales: 720, percentage: 9 },
    { name: "Sữa Tươi 1L", sales: 680, percentage: 8 },
  ]

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    alert("Báo cáo đã được tải xuống thành công!")
  }

  return (
    <div className="space-y-6">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-green-800">Thống kê</h1>
            <p className="text-muted-foreground">Xem thống kê doanh thu và hàng hóa</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px] border-green-200 focus:ring-green-500">
                <SelectValue placeholder="Chọn kỳ thống kê" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Theo tháng</SelectItem>
                <SelectItem value="quarter">Theo quý</SelectItem>
                <SelectItem value="year">Theo năm</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={handlePrint}
              className="border-green-200 hover:bg-green-50 hover:text-green-700"
            >
              <Printer className="mr-2 h-4 w-4" /> In báo cáo
            </Button>

            <Button
              variant="outline"
              onClick={handleDownload}
              className="border-green-200 hover:bg-green-50 hover:text-green-700"
            >
              <Download className="mr-2 h-4 w-4" /> Xuất báo cáo
            </Button>
          </div>
        </div>
      </div>

      <div className="section-container">
        <h2 className="section-title">
          <DollarSign className="h-5 w-5 text-green-600" />
          Tổng quan
        </h2>
        <div className="section-grid-4">
          <Card className="dashboard-card border-green-100 glass-effect">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tổng doanh thu</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">264.000.000 đ</div>
              <div className="mt-1 flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+12% so với kỳ trước</span>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card border-blue-100 glass-effect">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Sản phẩm đã bán</CardTitle>
              <ShoppingBag className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.640</div>
              <div className="mt-1 flex items-center text-xs text-blue-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+8% so với kỳ trước</span>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card border-purple-100 glass-effect">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Khách hàng hoạt động</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <div className="mt-1 flex items-center text-xs text-purple-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+15% so với kỳ trước</span>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card border-amber-100 glass-effect">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Lợi nhuận</CardTitle>
              <BarChart3 className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">79.200.000 đ</div>
              <div className="mt-1 flex items-center text-xs text-amber-600">
                <TrendingDown className="mr-1 h-3 w-3" />
                <span>-3% so với kỳ trước</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="bg-green-50 p-1 border border-green-100 rounded-lg">
          <TabsTrigger
            value="sales"
            className="data-[state=active]:bg-white data-[state=active]:text-green-700 rounded-md"
          >
            Doanh thu
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="data-[state=active]:bg-white data-[state=active]:text-green-700 rounded-md"
          >
            Sản phẩm
          </TabsTrigger>
          <TabsTrigger
            value="inventory"
            className="data-[state=active]:bg-white data-[state=active]:text-green-700 rounded-md"
          >
            Tồn kho
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <Card className="border-green-100 glass-effect">
            <CardHeader className="border-b border-green-100">
              <CardTitle className="text-green-800">Doanh thu theo {period === "month" ? "tháng" : "quý"}</CardTitle>
              <CardDescription>Biểu đồ thể hiện doanh thu từ tháng 02/2025 đến 15/04/2025</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="relative h-[300px] w-full bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="h-[250px] w-full px-4">
                  {/* Simulated chart using divs */}
                  <div className="h-full flex items-end gap-2">
                    {(period === "month" ? monthlyData : quarterlyData).map((item, index) => (
                      <div key={index} className="flex flex-1 flex-col items-center gap-2">
                        <div
                          className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-md transition-all duration-500 ease-in-out hover:from-green-700 hover:to-green-500"
                          style={{
                            height: `${(item.sales / (period === "month" ? 35000000 : 92000000)) * 250}px`,
                          }}
                        ></div>
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-medium">{period === "month" ? item.month : item.quarter}</span>
                          {item.sales > 0 && (
                            <span className="text-xs text-muted-foreground">{(item.sales / 1000000).toFixed(1)}M</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card className="border-blue-100 glass-effect">
            <CardHeader className="border-b border-blue-100">
              <CardTitle className="text-blue-800">Sản phẩm bán chạy nhất</CardTitle>
              <CardDescription>Top 5 sản phẩm có doanh số cao nhất từ tháng 02/2025 đến 15/04/2025</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {topProducts.map((product, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-medium">
                          {index + 1}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center">
                            <ShoppingBag className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </div>
                      <span className="font-medium">{product.sales.toLocaleString()} sản phẩm</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-blue-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animated-gradient"
                        style={{ width: `${product.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground text-right">{product.percentage}% doanh số</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card className="border-purple-100 glass-effect">
            <CardHeader className="border-b border-purple-100">
              <CardTitle className="text-purple-800">Tình trạng tồn kho</CardTitle>
              <CardDescription>Phân tích tình trạng tồn kho của các sản phẩm tính đến ngày 15/04/2025</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center justify-center">
                  <div className="relative h-64 w-64">
                    <div className="absolute inset-0 rounded-full border-[16px] border-green-500 border-r-amber-500 border-b-red-500 border-l-blue-500 transition-all duration-500 hover:scale-105"></div>
                    <div className="absolute inset-8 rounded-full bg-white"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold">85%</div>
                        <div className="text-sm text-muted-foreground">Tồn kho</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50 border border-green-100">
                    <div className="h-4 w-4 rounded-full bg-green-500"></div>
                    <div>
                      <div className="font-medium">Tồn kho bình thường</div>
                      <div className="text-sm text-muted-foreground">65% sản phẩm có tồn kho ở mức an toàn</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-amber-50 border border-amber-100">
                    <div className="h-4 w-4 rounded-full bg-amber-500"></div>
                    <div>
                      <div className="font-medium">Tồn kho thấp</div>
                      <div className="text-sm text-muted-foreground">20% sản phẩm sắp hết hàng, cần nhập thêm</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-red-50 border border-red-100">
                    <div className="h-4 w-4 rounded-full bg-red-500"></div>
                    <div>
                      <div className="font-medium">Hết hàng</div>
                      <div className="text-sm text-muted-foreground">5% sản phẩm đã hết hàng, cần nhập gấp</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                    <div>
                      <div className="font-medium">Tồn kho dư thừa</div>
                      <div className="text-sm text-muted-foreground">
                        10% sản phẩm có tồn kho cao, cần có kế hoạch tiêu thụ
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="text-center mt-8 text-sm text-muted-foreground">
        <p>© 2025 Bản quyền thuộc về nhóm 6.</p>
      </div>
    </div>
  )
}
