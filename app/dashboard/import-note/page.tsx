"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PackagePlus, Plus, Trash2, Printer, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ImportItem {
  id: string
  productCode: string
  productName: string
  quantity: number
  actualQuantity: number
  supplier: string
}

export default function ImportNotePage() {
  const [productCode, setProductCode] = useState("")
  const [quantity, setQuantity] = useState("")
  const [actualQuantity, setActualQuantity] = useState("")
  const [supplier, setSupplier] = useState("")
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [importItems, setImportItems] = useState<ImportItem[]>([])
  const [selectedRequest, setSelectedRequest] = useState("")

  // Dữ liệu mô phỏng yêu cầu nhập hàng đang chờ
  const pendingRequests = [
    { id: "YC001", description: "Yêu cầu nhập thực phẩm cơ bản - 15/02/2025" },
    { id: "YC002", description: "Yêu cầu nhập đồ uống - 16/03/2025" },
    { id: "YC003", description: "Yêu cầu nhập sản phẩm vệ sinh - 05/04/2025" },
  ]

  // Dữ liệu mô phỏng sản phẩm cho mỗi yêu cầu
  const requestProducts = {
    YC001: [
      {
        id: "SP1",
        productCode: "SP12345",
        productName: "Gạo Tám Thơm 1kg",
        quantity: 50,
        supplier: "Công ty TNHH Thực phẩm Việt",
      },
      {
        id: "SP2",
        productCode: "SP23456",
        productName: "Đậu Đen 1kg",
        quantity: 30,
        supplier: "Công ty TNHH Thực phẩm Việt",
      },
    ],
    YC002: [
      {
        id: "SP3",
        productCode: "SP34567",
        productName: "Nước suối 500ml",
        quantity: 100,
        supplier: "Công ty CP Nước giải khát Việt Nam",
      },
      {
        id: "SP4",
        productCode: "SP45678",
        productName: "Nước ngọt có ga 2L",
        quantity: 40,
        supplier: "Công ty CP Nước giải khát Việt Nam",
      },
    ],
    YC003: [
      {
        id: "SP5",
        productCode: "SP56789",
        productName: "Nước rửa chén 500ml",
        quantity: 60,
        supplier: "Công ty TNHH Hóa phẩm Sạch",
      },
      {
        id: "SP6",
        productCode: "SP67890",
        productName: "Bột giặt 1kg",
        quantity: 25,
        supplier: "Công ty TNHH Hóa phẩm Sạch",
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
      setErrorMessage("Số lượng yêu cầu phải là số dương")
      setShowError(true)
      return
    }

    if (!actualQuantity.trim() || isNaN(Number(actualQuantity)) || Number(actualQuantity) < 0) {
      setErrorMessage("Số lượng thực nhận phải là số không âm")
      setShowError(true)
      return
    }

    if (!supplier.trim()) {
      setErrorMessage("Nhà cung cấp là bắt buộc")
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

    const newItem: ImportItem = {
      id: `SP${Math.floor(1000 + Math.random() * 9000)}`,
      productCode,
      productName: productNames[Math.floor(Math.random() * productNames.length)],
      quantity: Number(quantity),
      actualQuantity: Number(actualQuantity),
      supplier,
    }

    setImportItems([...importItems, newItem])
    resetItemForm()
  }

  const handleRemoveItem = (id: string) => {
    setImportItems(importItems.filter((item) => item.id !== id))
  }

  const handleSelectRequest = (requestId: string) => {
    setSelectedRequest(requestId)

    if (requestId && requestProducts[requestId as keyof typeof requestProducts]) {
      const products = requestProducts[requestId as keyof typeof requestProducts]

      // Chuyển đổi sản phẩm từ yêu cầu thành mục nhập hàng
      const items: ImportItem[] = products.map((product) => ({
        id: product.id,
        productCode: product.productCode,
        productName: product.productName,
        quantity: product.quantity,
        actualQuantity: product.quantity, // Ban đầu bằng số lượng yêu cầu
        supplier: product.supplier,
      }))

      setImportItems(items)
    } else {
      setImportItems([])
    }
  }

  const resetItemForm = () => {
    setProductCode("")
    setQuantity("")
    setActualQuantity("")
    setSupplier("")
    setShowError(false)
  }

  const handleCreateImportNote = () => {
    if (importItems.length === 0) {
      setErrorMessage("Thêm ít nhất một sản phẩm vào phiếu nhập")
      setShowError(true)
      return
    }

    alert("Phiếu nhập hàng đã được tạo thành công!")
    setImportItems([])
    setSelectedRequest("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Phiếu nhập hàng (UC-08)</h1>
        <p className="text-muted-foreground">Tạo phiếu nhập hàng để ghi nhận sản phẩm nhập vào kho</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách sản phẩm nhập</CardTitle>
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
                <div className="grid gap-4 md:grid-cols-5">
                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="product-code">Mã sản phẩm</Label>
                    <Input
                      id="product-code"
                      placeholder="Mã sản phẩm"
                      value={productCode}
                      onChange={(e) => setProductCode(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="quantity">SL yêu cầu</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Số lượng"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="actual-quantity">SL thực nhận</Label>
                    <Input
                      id="actual-quantity"
                      type="number"
                      placeholder="Số lượng thực tế"
                      min="0"
                      value={actualQuantity}
                      onChange={(e) => setActualQuantity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="supplier">Nhà cung cấp</Label>
                    <Input
                      id="supplier"
                      placeholder="Nhà cung cấp"
                      value={supplier}
                      onChange={(e) => setSupplier(e.target.value)}
                    />
                  </div>

                  <div className="flex items-end md:col-span-1">
                    <Button onClick={handleAddItem} className="w-full">
                      <Plus className="mr-2 h-4 w-4" /> Thêm
                    </Button>
                  </div>
                </div>

                {importItems.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã SP</TableHead>
                        <TableHead>Tên sản phẩm</TableHead>
                        <TableHead className="text-center">SL yêu cầu</TableHead>
                        <TableHead className="text-center">SL thực nhận</TableHead>
                        <TableHead>Nhà cung cấp</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {importItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.productCode}</TableCell>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-center">{item.actualQuantity}</TableCell>
                          <TableCell>{item.supplier}</TableCell>
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
                    <PackagePlus className="h-12 w-12 mb-2 text-muted-foreground/50" />
                    <p>Chưa có sản phẩm nào</p>
                    <p className="text-sm">Thêm sản phẩm vào phiếu nhập hoặc chọn từ yêu cầu nhập hàng</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" /> In phiếu
              </Button>
              <Button onClick={handleCreateImportNote}>Tạo phiếu nhập</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Yêu cầu nhập hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="request-select">Chọn yêu cầu nhập hàng</Label>
                  <Select value={selectedRequest} onValueChange={handleSelectRequest}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn yêu cầu nhập hàng" />
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
              <CardTitle>Thông tin phiếu nhập</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="note-id">Số phiếu nhập</Label>
                  <Input id="note-id" value={`PN${Math.floor(10000 + Math.random() * 90000)}`} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note-date">Ngày nhập</Label>
                  <Input id="note-date" type="date" value={new Date().toISOString().split("T")[0]} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note-items">Tổng số mặt hàng</Label>
                  <Input id="note-items" value={importItems.length} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note-total-quantity">Tổng số lượng</Label>
                  <Input
                    id="note-total-quantity"
                    value={importItems.reduce((sum, item) => sum + item.actualQuantity, 0)}
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
