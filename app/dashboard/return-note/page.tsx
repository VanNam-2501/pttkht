"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, Plus, Trash2, Printer, AlertCircle, ScanBarcodeIcon as BarcodeScanner } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface ReturnItem {
  id: string
  productCode: string
  productName: string
  quantity: number
  reason: string
  supplier: string
}

export default function ReturnNotePage() {
  const [productCode, setProductCode] = useState("")
  const [quantity, setQuantity] = useState("")
  const [reason, setReason] = useState("damaged")
  const [supplier, setSupplier] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [returnItems, setReturnItems] = useState<ReturnItem[]>([])
  const [notes, setNotes] = useState("")

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

    if (!reason) {
      setErrorMessage("Lý do trả hàng là bắt buộc")
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

    const newItem: ReturnItem = {
      id: `SP${Math.floor(1000 + Math.random() * 9000)}`,
      productCode,
      productName: productNames[Math.floor(Math.random() * productNames.length)],
      quantity: Number(quantity),
      reason,
      supplier,
    }

    setReturnItems([...returnItems, newItem])
    resetItemForm()
  }

  const handleRemoveItem = (id: string) => {
    setReturnItems(returnItems.filter((item) => item.id !== id))
  }

  const resetItemForm = () => {
    setProductCode("")
    setQuantity("")
    setReason("damaged")
    setShowError(false)
  }

  const getReasonText = (reasonCode: string) => {
    switch (reasonCode) {
      case "damaged":
        return "Sản phẩm hư hỏng"
      case "expired":
        return "Sản phẩm hết hạn"
      case "quality":
        return "Vấn đề chất lượng"
      case "wrong":
        return "Sản phẩm không đúng"
      default:
        return reasonCode
    }
  }

  const handleCreateReturnNote = () => {
    if (returnItems.length === 0) {
      setErrorMessage("Thêm ít nhất một sản phẩm vào phiếu trả hàng")
      setShowError(true)
      return
    }

    alert("Phiếu trả hàng đã được tạo thành công!")
    setReturnItems([])
    setNotes("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Phiếu trả hàng (UC-11)</h1>
        <p className="text-muted-foreground">Tạo phiếu trả hàng cho nhà cung cấp</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách sản phẩm trả</CardTitle>
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

                  <div className="space-y-2 md:col-span-1">
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

                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="reason">Lý do</Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn lý do" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="damaged">Sản phẩm hư hỏng</SelectItem>
                        <SelectItem value="expired">Sản phẩm hết hạn</SelectItem>
                        <SelectItem value="quality">Vấn đề chất lượng</SelectItem>
                        <SelectItem value="wrong">Sản phẩm không đúng</SelectItem>
                      </SelectContent>
                    </Select>
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

                {returnItems.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã SP</TableHead>
                        <TableHead>Tên sản phẩm</TableHead>
                        <TableHead className="text-center">Số lượng</TableHead>
                        <TableHead>Lý do</TableHead>
                        <TableHead>Nhà cung cấp</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {returnItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.productCode}</TableCell>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell>{getReasonText(item.reason)}</TableCell>
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
                    <Package className="h-12 w-12 mb-2 text-muted-foreground/50" />
                    <p>Chưa có sản phẩm nào</p>
                    <p className="text-sm">Thêm sản phẩm vào phiếu trả hàng</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" /> In phiếu
              </Button>
              <Button onClick={handleCreateReturnNote}>Tạo phiếu trả hàng</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin phiếu trả</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="note-id">Số phiếu trả</Label>
                  <Input id="note-id" value={`PT${Math.floor(10000 + Math.random() * 90000)}`} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note-date">Ngày trả</Label>
                  <Input id="note-date" type="date" value={new Date().toISOString().split("T")[0]} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note-items">Tổng số mặt hàng</Label>
                  <Input id="note-items" value={returnItems.length} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note-total-quantity">Tổng số lượng</Label>
                  <Input
                    id="note-total-quantity"
                    value={returnItems.reduce((sum, item) => sum + item.quantity, 0)}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Ghi chú</Label>
                  <Textarea
                    id="notes"
                    placeholder="Ghi chú thêm về việc trả hàng"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
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
