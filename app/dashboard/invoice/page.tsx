"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScanBarcodeIcon as BarcodeScanner, Plus, Printer, Search, Trash2, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Product {
  id: string
  name: string
  price: number
  quantity: number
}

export default function InvoicePage() {
  const [barcode, setBarcode] = useState("")
  const [customerBarcode, setCustomerBarcode] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [isScanningCustomer, setIsScanningCustomer] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [discount, setDiscount] = useState(0)
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [showLoyaltyDialog, setShowLoyaltyDialog] = useState(false)

  // Mô phỏng quét mã vạch sản phẩm
  const handleScanBarcode = () => {
    setIsScanning(true)

    // Mô phỏng thời gian quét
    setTimeout(() => {
      const productId = "SP" + Math.floor(10000 + Math.random() * 90000)
      const productNames = [
        "Gạo Tám Thơm 1kg",
        "Đậu Đen 1kg",
        "Đường Trắng 1kg",
        "Cà Phê Rang 500g",
        "Sữa Tươi 1L",
        "Dầu Ăn 1L",
        "Muối Tinh 1kg",
        "Mì Gói Hảo Hảo",
        "Bột Mì 1kg",
        "Nước Mắm 500ml",
      ]
      const randomName = productNames[Math.floor(Math.random() * productNames.length)]
      const randomPrice = Number.parseFloat((20000 + Math.random() * 80000).toFixed(0))

      const newProduct = {
        id: productId,
        name: randomName,
        price: randomPrice,
        quantity: 1,
      }

      setProducts([...products, newProduct])
      setBarcode("")
      setIsScanning(false)
    }, 1000)
  }

  // Mô phỏng quét thẻ khách hàng
  const handleScanCustomerBarcode = () => {
    setIsScanningCustomer(true)

    // Mô phỏng thời gian quét
    setTimeout(() => {
      const customerId = "KH" + Math.floor(10000 + Math.random() * 90000)
      setCustomerBarcode(customerId)
      setCustomerName("Nguyễn Văn A")
      setIsScanningCustomer(false)

      // Mô phỏng điểm tích lũy và khuyến mãi
      setLoyaltyPoints(Math.floor(Math.random() * 500))
      setDiscount(Math.floor(Math.random() * 10))
      setShowLoyaltyDialog(true)
    }, 1000)
  }

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return

    setProducts(products.map((product) => (product.id === id ? { ...product, quantity } : product)))
  }

  const calculateSubtotal = () => {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    return subtotal - subtotal * (discount / 100)
  }

  const handleFinishSale = () => {
    alert("Hoá đơn đã được tạo thành công!")
    setProducts([])
    setCustomerBarcode("")
    setCustomerName("")
    setDiscount(0)
    setLoyaltyPoints(0)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lập hoá đơn (UC-03)</h1>
        <p className="text-muted-foreground">Tạo hoá đơn cho khách hàng và áp dụng điểm tích lũy</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Input
                    placeholder="Quét hoặc nhập mã sản phẩm"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
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
                <Button variant="default" onClick={handleScanBarcode} disabled={isScanning}>
                  <Plus className="h-4 w-4 mr-2" /> Thêm
                </Button>
              </div>

              {products.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead className="text-right">Đơn giá</TableHead>
                      <TableHead className="text-center">SL</TableHead>
                      <TableHead className="text-right">Thành tiền</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell className="text-right">{product.price.toLocaleString()} đ</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 rounded-full"
                              onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{product.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 rounded-full"
                              onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {(product.price * product.quantity).toLocaleString()} đ
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-red-500"
                            onClick={() => handleRemoveProduct(product.id)}
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
                  <ShoppingCart className="h-12 w-12 mb-2 text-muted-foreground/50" />
                  <p>Chưa có sản phẩm nào</p>
                  <p className="text-sm">Quét hoặc thêm sản phẩm để bắt đầu</p>
                </div>
              )}
            </CardContent>
          </Card>

          {products.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tổng kết hoá đơn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tổng tiền hàng:</span>
                    <span>{calculateSubtotal().toLocaleString()} đ</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá ({discount}%):</span>
                      <span>- {(calculateSubtotal() * (discount / 100)).toLocaleString()} đ</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Thành tiền:</span>
                    <span>{calculateTotal().toLocaleString()} đ</span>
                  </div>
                  {loyaltyPoints > 0 && (
                    <div className="flex justify-between text-blue-600 text-sm">
                      <span>Điểm tích lũy:</span>
                      <span>+{Math.floor(calculateTotal() / 10000)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" /> In hoá đơn
                </Button>
                <Button onClick={handleFinishSale}>Thanh toán</Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Khách hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-barcode">Thẻ khách hàng thân thiết</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="customer-barcode"
                        placeholder="Quét thẻ khách hàng"
                        value={customerBarcode}
                        onChange={(e) => setCustomerBarcode(e.target.value)}
                        disabled={isScanningCustomer}
                      />
                      {isScanningCustomer && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                          <div className="animate-pulse">Đang quét...</div>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleScanCustomerBarcode}
                      disabled={isScanningCustomer}
                    >
                      <BarcodeScanner className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {customerBarcode && (
                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{customerName}</h3>
                        <p className="text-sm text-muted-foreground">{customerBarcode}</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                        Khách hàng thân thiết
                      </Badge>
                    </div>
                    {loyaltyPoints > 0 && (
                      <div className="mt-2 text-sm">
                        <span className="text-muted-foreground">Điểm tích lũy: </span>
                        <span className="font-medium">{loyaltyPoints}</span>
                      </div>
                    )}
                  </div>
                )}

                {!customerBarcode && (
                  <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                    <Search className="h-10 w-10 mb-2 text-muted-foreground/50" />
                    <p>Chưa có thông tin khách hàng</p>
                    <p className="text-sm">Quét thẻ để áp dụng điểm tích lũy và khuyến mãi</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {products.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Thanh toán</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-20 flex flex-col">
                      <span className="text-lg">Tiền mặt</span>
                      <span className="text-xs text-muted-foreground">Thanh toán bằng tiền mặt</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col">
                      <span className="text-lg">Thẻ</span>
                      <span className="text-xs text-muted-foreground">Thẻ ATM/Tín dụng</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col">
                      <span className="text-lg">Chuyển khoản</span>
                      <span className="text-xs text-muted-foreground">Chuyển khoản ngân hàng</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col">
                      <span className="text-lg">Khác</span>
                      <span className="text-xs text-muted-foreground">Phương thức khác</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Dialog hiển thị thông tin điểm tích lũy */}
      <Dialog open={showLoyaltyDialog} onOpenChange={setShowLoyaltyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chương trình khách hàng thân thiết</DialogTitle>
            <DialogDescription>Đã xác định khách hàng có thẻ thân thiết</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="rounded-lg bg-green-50 p-4 text-green-700">
              <h4 className="font-semibold mb-1">Đã áp dụng khuyến mãi!</h4>
              <p>Khuyến mãi {discount}% đã được áp dụng cho đơn hàng này.</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 text-blue-700">
              <h4 className="font-semibold mb-1">Điểm tích lũy</h4>
              <p>Khách hàng sẽ tích lũy thêm {Math.floor(calculateTotal() / 10000)} điểm với đơn hàng này.</p>
              <p className="text-sm mt-1">Điểm hiện tại: {loyaltyPoints}</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowLoyaltyDialog(false)}>Tiếp tục</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
