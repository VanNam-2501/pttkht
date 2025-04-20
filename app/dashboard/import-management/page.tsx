"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Truck, Search, Plus, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ImportRequest {
  id: string
  productCode: string
  productName: string
  quantity: number
  supplier: string
  status: "pending" | "completed" | "cancelled"
  date: string
}

export default function ImportManagementPage() {
  const [productCode, setProductCode] = useState("")
  const [quantity, setQuantity] = useState("")
  const [supplier, setSupplier] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [importRequests, setImportRequests] = useState<ImportRequest[]>([
    {
      id: "YC001",
      productCode: "SP12345",
      productName: "Gạo Tám Thơm 1kg",
      quantity: 50,
      supplier: "Công ty TNHH Thực phẩm Việt",
      status: "completed",
      date: "2025-02-15",
    },
    {
      id: "YC002",
      productCode: "SP23456",
      productName: "Đậu Đen 1kg",
      quantity: 30,
      supplier: "Công ty TNHH Thực phẩm Việt",
      status: "pending",
      date: "2025-03-16",
    },
    {
      id: "YC003",
      productCode: "SP34567",
      productName: "Đường Trắng 1kg",
      quantity: 40,
      supplier: "Công ty CP Đường Biên Hòa",
      status: "pending",
      date: "2025-04-05",
    },
  ])

  const pendingRequests = [
    { id: "YC001", description: "Yêu cầu nhập thực phẩm cơ bản - 15/02/2025" },
    { id: "YC002", description: "Yêu cầu nhập đồ uống - 16/03/2025" },
    { id: "YC003", description: "Yêu cầu nhập sản phẩm vệ sinh - 05/04/2025" },
  ]

  const handleAddImportRequest = () => {
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

    const newImportRequest: ImportRequest = {
      id: `YC${Math.floor(1000 + Math.random() * 9000)}`,
      productCode,
      productName: productNames[Math.floor(Math.random() * productNames.length)],
      quantity: Number(quantity),
      supplier,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    }

    setImportRequests([newImportRequest, ...importRequests])
    setShowAddDialog(false)
    resetForm()
  }

  const resetForm = () => {
    setProductCode("")
    setQuantity("")
    setSupplier("")
    setShowError(false)
  }

  const filteredRequests = importRequests.filter(
    (request) =>
      request.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý nhập hàng</h1>
        <p className="text-muted-foreground">Quản lý việc nhập hàng vào kho</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo mã, tên hoặc nhà cung cấp..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Tạo yêu cầu nhập hàng
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo yêu cầu nhập hàng mới</DialogTitle>
              <DialogDescription>Điền thông tin chi tiết để tạo yêu cầu nhập hàng vào kho.</DialogDescription>
            </DialogHeader>

            {showError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Lỗi</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="product-code">Mã sản phẩm</Label>
                <Input
                  id="product-code"
                  placeholder="Nhập mã sản phẩm"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Số lượng</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Nhập số lượng"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier">Nhà cung cấp</Label>
                <Input
                  id="supplier"
                  placeholder="Nhập tên nhà cung cấp"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Hủy
              </Button>
              <Button onClick={handleAddImportRequest}>Tạo yêu cầu</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách yêu cầu nhập hàng</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredRequests.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã YC</TableHead>
                  <TableHead>Mã SP</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Nhà cung cấp</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.productCode}</TableCell>
                    <TableCell>{request.productName}</TableCell>
                    <TableCell>{request.quantity}</TableCell>
                    <TableCell>{request.supplier}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          request.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : request.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {request.status === "completed"
                          ? "Hoàn thành"
                          : request.status === "pending"
                            ? "Đang chờ"
                            : "Đã hủy"}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <Truck className="h-12 w-12 mb-2 text-muted-foreground/50" />
              <p>Không tìm thấy yêu cầu nào</p>
              <p className="text-sm">Tạo yêu cầu mới hoặc điều chỉnh bộ lọc tìm kiếm</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
