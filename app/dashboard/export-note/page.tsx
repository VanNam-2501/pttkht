"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PackageCheck, Plus, Trash2, Printer, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ExportItem {
  id: string
  productCode: string
  productName: string
  quantity: number
  destination: string
}

export default function ExportNotePage() {
  const [productCode, setProductCode] = useState("")
  const [quantity, setQuantity] = useState("")
  const [destination, setDestination] = useState("Quầy bán hàng")
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [exportItems, setExportItems] = useState<ExportItem[]>([])
  const [selectedRequest, setSelectedRequest] = useState("")

  // Dữ liệu mô phỏng yêu cầu xuất hàng đang chờ
  const pendingRequests = [
    { id: "YC001", description: "Yêu cầu xuất hàng lên quầy - 20/02/2025" },
    { id: "YC002", description: "Yêu cầu xuất hàng khuyến mãi - 18/03/2025" },
    { id: "YC003", description: "Yêu cầu xuất hàng trưng bày - 10/04/2025" },
  ]

  // Dữ liệu mô phỏng sản phẩm cho mỗi yêu cầu
  const requestProducts = {
    YC001: [
      {
        id: "SP1",
        productCode: "SP12345",
        productName: "Gạo Tám Thơm 1kg",
        quantity: 20,
        destination: "Quầy bán hàng",
      },
      { id: "SP2", productCode: "SP23456", productName: "Đậu Đen 1kg", quantity: 15, destination: "Quầy bán hàng" },
    ],
    YC002: [
      {
        id: "SP3",
        productCode: "SP34567",
        productName: "Nước suối 500ml",
        quantity: 50,
        destination: "Khu vực khuyến mãi",
      },
      {
        id: "SP4",
        productCode: "SP45678",
        productName: "Nước ngọt có ga 2L",
        quantity: 20,
        destination: "Khu vực khuyến mãi",
      },
    ],
    YC003: [
      {
        id: "SP5",
        productCode: "SP56789",
        productName: "Nước rửa chén 500ml",
        quantity: 30,
        destination: "Khu vực trưng bày",
      },
      {
        id: "SP6",
        productCode: "SP67890",
        productName: "Bột giặt 1kg",
        quantity: 15,
        destination: "Khu vực trưng bày",
      },
    ],
  }

  const handleAddItem = () => {
    if (!productCode.trim()) {
      setErrorMessage("Mã sản phẩm là bắt buộc")
      setShowError(true)
      return
    }

    if (!quantity.trim() || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      setErrorMessage("Số lượng phải là số dương")
      setShowError(true)
      return
    }

    if (!destination.trim()) {
      setErrorMessage("Nơi đến là bắt buộc")
      setShowError(true)
      return
    }

    // Mô phỏng kiểm tra sản phẩm
    const productNames = [
      "Gạo Tám Thơm 1kg",
      "Đậu Đen 1kg",
      "Đường Trắng 1kg",
      "Cà Phê Rang 500g",
      "Sữa Tươi 1L",
      "Dầu Ăn 1L",
    ]

    const newItem: ExportItem = {
      id: `SP${Math.floor(1000 + Math.random() * 9000)}`,
      productCode,
      productName: productNames[Math.floor(Math.random() * productNames.length)],
      quantity: Number(quantity),
      destination,
    }

    setExportItems([...exportItems, newItem])
    resetItemForm()
  }

  const handleRemoveItem = (id: string) => {
    setExportItems(exportItems.filter((item) => item.id !== id))
  }

  const handleSelectRequest = (requestId: string) => {
    setSelectedRequest(requestId)

    if (requestId && requestProducts[requestId as keyof typeof requestProducts]) {
      const products = requestProducts[requestId as keyof typeof requestProducts]

      // Chuyển đổi sản phẩm từ yêu cầu thành mục xuất hàng
      const items: ExportItem[] = products.map((product) => ({
        id: product.id,
        productCode: product.productCode,
        productName: product.productName,
        quantity: product.quantity,
        destination: product.destination,
      }))

      setExportItems(items)
    } else {
      setExportItems([])
    }
  }

  const resetItemForm = () => {
    setProductCode("")
    setQuantity("")
    setDestination("Quầy bán hàng")
    setShowError(false)
  }

  const handleCreateExportNote = () => {
    if (exportItems.length === 0) {
      setErrorMessage("Thêm ít nhất một sản phẩm vào phiếu xuất")
      setShowError(true)
      return
    }

    alert("Phiếu xuất hàng đã được tạo thành công!")
    setExportItems([])
    setSelectedRequest("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Phiếu xuất hàng (UC-09)</h1>
        <p className="text-muted-foreground">Tạo phiếu xuất hàng để ghi nhận sản phẩm xuất ra khỏi kho</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách sản phẩm xuất</CardTitle>
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
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-code">Mã sản phẩm</Label>
                    <Input
                      id="product-code"
                      placeholder="Mã sản phẩm"
                      value={productCode}
                      onChange={(e) => setProductCode(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Số lượng</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Số lượng"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination">Nơi đến</Label>
                    <Select value={destination} onValueChange={setDestination}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nơi đến" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Quầy bán hàng">Quầy bán hàng</SelectItem>
                        <SelectItem value="Khu vực khuyến mãi">Khu vực khuyến mãi</SelectItem>
                        <SelectItem value="Khu vực trưng bày">Khu vực trưng bày</SelectItem>
                        <SelectItem value="Quầy thu ngân">Quầy thu ngân</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button onClick={handleAddItem} className="w-full">
                      <Plus className="mr-2 h-4 w-4" /> Thêm
                    </Button>
                  </div>
                </div>

                {exportItems.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã SP</TableHead>
                        <TableHead>Tên sản phẩm</TableHead>
                        <TableHead className="text-center">Số lượng</TableHead>
                        <TableHead>Nơi đến</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {exportItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.productCode}</TableCell>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell>{item.destination}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-red-500"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                    <PackageCheck className="h-12 w-12 mb-2 text-muted-foreground/50" />
                    <p>Chưa có sản phẩm nào</p>
                    <p className="text-sm">Thêm sản phẩm vào phiếu xuất hoặc chọn từ yêu cầu xuất hàng</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" /> In phiếu
              </Button>
              <Button onClick={handleCreateExportNote}>Tạo phiếu xuất</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Yêu cầu xuất hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="request-select">Chọn yêu cầu xuất hàng</Label>
                  <Select value={selectedRequest} onValueChange={handleSelectRequest}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn yêu cầu xuất hàng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Không chọn yêu cầu</SelectItem>
                      {pendingRequests.map((request) => (
                        <SelectItem key={request.id} value={request.id}>
                          {request.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedRequest && (
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Chi tiết yêu cầu</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mã yêu cầu:</span>
                        <span>{selectedRequest}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ngày tạo:</span>
                        <span>
                          {pendingRequests.find((r) => r.id === selectedRequest)?.description.split(" - ")[1]}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Số sản phẩm:</span>
                        <span>{requestProducts[selectedRequest as keyof typeof requestProducts]?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin phiếu xuất</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="note-id">Số phiếu xuất</Label>
                  <Input id="note-id" value={`PX${Math.floor(10000 + Math.random() * 90000)}`} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note-date">Ngày xuất</Label>
                  <Input id="note-date" type="date" value={new Date().toISOString().split("T")[0]} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note-items">Tổng số mặt hàng</Label>
                  <Input id="note-items" value={exportItems.length} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note-total-quantity">Tổng số lượng</Label>
                  <Input
                    id="note-total-quantity"
                    value={exportItems.reduce((sum, item) => sum + item.quantity, 0)}
                    disabled
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
