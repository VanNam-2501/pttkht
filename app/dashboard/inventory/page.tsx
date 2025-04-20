"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ClipboardList, Search, ScanBarcodeIcon as BarcodeScanner, Printer, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface InventoryItem {
  id: string
  productCode: string
  productName: string
  systemQuantity: number
  actualQuantity: number
  difference: number
  status: "match" | "surplus" | "shortage"
  location: string
  lastUpdated: string
}

export default function InventoryPage() {
  const [productCode, setProductCode] = useState("")
  const [actualQuantity, setActualQuantity] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: "KK001",
      productCode: "SP12345",
      productName: "Gạo Tám Thơm 1kg",
      systemQuantity: 50,
      actualQuantity: 48,
      difference: -2,
      status: "shortage",
      location: "Kệ A1",
      lastUpdated: "2025-02-25",
    },
    {
      id: "KK002",
      productCode: "SP23456",
      productName: "Đậu Đen 1kg",
      systemQuantity: 30,
      actualQuantity: 30,
      difference: 0,
      status: "match",
      location: "Kệ A2",
      lastUpdated: "2025-03-15",
    },
    {
      id: "KK003",
      productCode: "SP34567",
      productName: "Đường Trắng 1kg",
      systemQuantity: 40,
      actualQuantity: 42,
      difference: 2,
      status: "surplus",
      location: "Kệ A3",
      lastUpdated: "2025-04-05",
    },
  ])

  // Mô phỏng quét mã vạch
  const handleScanBarcode = () => {
    setIsScanning(true)

    // Mô phỏng thời gian quét
    setTimeout(() => {
      const productId = "SP" + Math.floor(10000 + Math.random() * 90000)
      setProductCode(productId)
      setIsScanning(false)
    }, 1000)
  }

  const handleAddInventoryCheck = () => {
    if (!productCode.trim()) {
      setErrorMessage("Mã sản phẩm là bắt buộc")
      setShowError(true)
      return
    }

    if (!actualQuantity.trim() || isNaN(Number(actualQuantity)) || Number(actualQuantity) < 0) {
      setErrorMessage("Số lượng thực tế phải là số không âm")
      setShowError(true)
      return
    }

    // Mô phỏng kiểm tra sản phẩm trong hệ thống
    const productNames = [
      "Gạo Tám Thơm 1kg",
      "Đậu Đen 1kg",
      "Đường Trắng 1kg",
      "Cà Phê Rang 500g",
      "Sữa Tươi 1L",
      "Dầu Ăn 1L",
    ]

    const systemQuantity = Math.floor(20 + Math.random() * 50)
    const actualQty = Number(actualQuantity)
    const difference = actualQty - systemQuantity

    const newItem: InventoryItem = {
      id: `KK${Math.floor(1000 + Math.random() * 9000)}`,
      productCode,
      productName: productNames[Math.floor(Math.random() * productNames.length)],
      systemQuantity,
      actualQuantity: actualQty,
      difference,
      status: difference === 0 ? "match" : difference > 0 ? "surplus" : "shortage",
      location: `Kệ ${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(1 + Math.random() * 5)}`,
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setInventoryItems([newItem, ...inventoryItems])
    resetForm()
  }

  const resetForm = () => {
    setProductCode("")
    setActualQuantity("")
    setShowError(false)
  }

  const filteredItems = inventoryItems.filter(
    (item) =>
      item.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "match":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
            Đúng
          </Badge>
        )
      case "surplus":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
            Thừa
          </Badge>
        )
      case "shortage":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
            Thiếu
          </Badge>
        )
      default:
        return null
    }
  }

  const handleFinishInventory = () => {
    alert("Kiểm kê đã hoàn thành thành công!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kiểm kê hàng (UC-10)</h1>
        <p className="text-muted-foreground">Thực hiện kiểm kê và kiểm soát hàng tồn kho</p>
      </div>

      <Tabs defaultValue="check" className="space-y-4">
        <TabsList>
          <TabsTrigger value="check">Kiểm kê</TabsTrigger>
          <TabsTrigger value="report">Báo cáo</TabsTrigger>
        </TabsList>

        <TabsContent value="check" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kiểm kê hàng tồn kho</CardTitle>
            </CardHeader>
            <CardContent>
              {showError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Lỗi</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="product-code">Mã sản phẩm</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          id="product-code"
                          placeholder="Mã sản phẩm"
                          value={productCode}
                          onChange={(e) => setProductCode(e.target.value)}
                          disabled={isScanning}
                        />
                        {isScanning && (
                          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                            <div className="animate-pulse">Đang quét...</div>
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="icon" onClick={handleScanBarcode} disabled={isScanning}>
                        <BarcodeScanner className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="actual-quantity">Số lượng thực tế</Label>
                    <Input
                      id="actual-quantity"
                      type="number"
                      placeholder="Số lượng đếm được"
                      min="0"
                      value={actualQuantity}
                      onChange={(e) => setActualQuantity(e.target.value)}
                    />
                  </div>

                  <div className="flex items-end">
                    <Button onClick={handleAddInventoryCheck} className="w-full">
                      Kiểm tra
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm theo mã, tên hoặc vị trí..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {filteredItems.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã SP</TableHead>
                        <TableHead>Tên sản phẩm</TableHead>
                        <TableHead className="text-center">SL hệ thống</TableHead>
                        <TableHead className="text-center">SL thực tế</TableHead>
                        <TableHead className="text-center">Chênh lệch</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Vị trí</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.productCode}</TableCell>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell className="text-center">{item.systemQuantity}</TableCell>
                          <TableCell className="text-center">{item.actualQuantity}</TableCell>
                          <TableCell className="text-center">
                            <span
                              className={
                                item.difference === 0
                                  ? "text-green-600"
                                  : item.difference > 0
                                    ? "text-blue-600"
                                    : "text-red-600"
                              }
                            >
                              {item.difference > 0 ? `+${item.difference}` : item.difference}
                            </span>
                          </TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell>{item.location}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                    <ClipboardList className="h-12 w-12 mb-2 text-muted-foreground/50" />
                    <p>Chưa có sản phẩm nào được kiểm kê</p>
                    <p className="text-sm">Quét hoặc nhập mã sản phẩm và số lượng thực tế</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" /> In báo cáo
              </Button>
              <Button onClick={handleFinishInventory}>Hoàn thành kiểm kê</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="report" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tổng kết kiểm kê</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-green-600">
                      {inventoryItems.filter((item) => item.status === "match").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Sản phẩm đúng</div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {inventoryItems.filter((item) => item.status === "surplus").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Sản phẩm thừa</div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-red-600">
                      {inventoryItems.filter((item) => item.status === "shortage").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Sản phẩm thiếu</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Thống kê</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tổng số sản phẩm kiểm kê:</span>
                    <span className="font-medium">{inventoryItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Độ chính xác:</span>
                    <span className="font-medium">
                      {Math.round(
                        (inventoryItems.filter((item) => item.status === "match").length / inventoryItems.length) * 100,
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ngày kiểm kê:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
