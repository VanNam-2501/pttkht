"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Percent, Search, Plus, AlertCircle, Pencil, Trash2 } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

interface Promotion {
  id: string
  name: string
  type: "discount" | "bundle" | "gift"
  value: number
  startDate: string
  endDate: string
  description: string
  status: "active" | "inactive" | "scheduled"
  products: string[]
}

export default function PromotionsPage() {
  const [name, setName] = useState("")
  const [type, setType] = useState<"discount" | "bundle" | "gift">("discount")
  const [value, setValue] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [products, setProducts] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [currentPromotion, setCurrentPromotion] = useState<Promotion | null>(null)
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: "KM001",
      name: "Giảm giá mùa xuân",
      type: "discount",
      value: 10,
      startDate: "2025-02-01",
      endDate: "2025-03-15",
      description: "Giảm giá 10% cho tất cả sản phẩm đồ uống trong mùa xuân",
      status: "active",
      products: ["Nước suối 500ml", "Nước ngọt có ga 2L", "Trà xanh 0 độ"],
    },
    {
      id: "KM002",
      name: "Mua 2 tặng 1",
      type: "bundle",
      value: 3,
      startDate: "2025-03-01",
      endDate: "2025-03-31",
      description: "Mua 2 sản phẩm cùng loại được tặng 1 sản phẩm tương tự",
      status: "inactive",
      products: ["Sữa tươi 1L", "Sữa chua", "Phô mai"],
    },
    {
      id: "KM003",
      name: "Quà tặng kèm",
      type: "gift",
      value: 1,
      startDate: "2025-04-01",
      endDate: "2025-04-15",
      description: "Tặng 1 gói mì khi mua 5 gói cùng loại",
      status: "scheduled",
      products: ["Mì gói Hảo Hảo", "Mì gói Omachi", "Mì gói Kokomi"],
    },
  ])

  // Danh sách sản phẩm mẫu
  const sampleProducts = [
    "Gạo Tám Thơm 1kg",
    "Đậu Đen 1kg",
    "Đường Trắng 1kg",
    "Cà Phê Rang 500g",
    "Sữa Tươi 1L",
    "Dầu Ăn 1L",
    "Nước suối 500ml",
    "Nước ngọt có ga 2L",
    "Trà xanh 0 độ",
    "Sữa chua",
    "Phô mai",
    "Mì gói Hảo Hảo",
    "Mì gói Omachi",
    "Mì gói Kokomi",
  ]

  const handleAddPromotion = () => {
    if (!name.trim()) {
      setErrorMessage("Tên chương trình khuyến mãi là bắt buộc")
      setShowError(true)
      return
    }

    if (!type) {
      setErrorMessage("Loại khuyến mãi là bắt buộc")
      setShowError(true)
      return
    }

    if (!value.trim() || isNaN(Number(value)) || Number(value) <= 0) {
      setErrorMessage("Giá trị khuyến mãi phải là số dương")
      setShowError(true)
      return
    }

    if (!startDate.trim()) {
      setErrorMessage("Ngày bắt đầu là bắt buộc")
      setShowError(true)
      return
    }

    if (!endDate.trim()) {
      setErrorMessage("Ngày kết thúc là bắt buộc")
      setShowError(true)
      return
    }

    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage("Ngày kết thúc phải sau ngày bắt đầu")
      setShowError(true)
      return
    }

    if (products.length === 0) {
      setErrorMessage("Phải chọn ít nhất một sản phẩm")
      setShowError(true)
      return
    }

    // Xác định trạng thái dựa trên ngày
    const today = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)
    let status: "active" | "inactive" | "scheduled" = "inactive"

    if (today >= start && today <= end) {
      status = "active"
    } else if (today < start) {
      status = "scheduled"
    }

    const newPromotion: Promotion = {
      id: `KM${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      type,
      value: Number(value),
      startDate,
      endDate,
      description,
      status,
      products,
    }

    setPromotions([newPromotion, ...promotions])
    setShowAddDialog(false)
    resetForm()
  }

  const handleEditPromotion = () => {
    if (!currentPromotion) return

    if (!name.trim()) {
      setErrorMessage("Tên chương trình khuyến mãi là bắt buộc")
      setShowError(true)
      return
    }

    if (!type) {
      setErrorMessage("Loại khuyến mãi là bắt buộc")
      setShowError(true)
      return
    }

    if (!value.trim() || isNaN(Number(value)) || Number(value) <= 0) {
      setErrorMessage("Giá trị khuyến mãi phải là số dương")
      setShowError(true)
      return
    }

    if (!startDate.trim()) {
      setErrorMessage("Ngày bắt đầu là bắt buộc")
      setShowError(true)
      return
    }

    if (!endDate.trim()) {
      setErrorMessage("Ngày kết thúc là bắt buộc")
      setShowError(true)
      return
    }

    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage("Ngày kết thúc phải sau ngày bắt đầu")
      setShowError(true)
      return
    }

    if (products.length === 0) {
      setErrorMessage("Phải chọn ít nhất một sản phẩm")
      setShowError(true)
      return
    }

    // Xác định trạng thái dựa trên ngày
    const today = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)
    let status: "active" | "inactive" | "scheduled" = "inactive"

    if (today >= start && today <= end) {
      status = "active"
    } else if (today < start) {
      status = "scheduled"
    }

    const updatedPromotions = promotions.map((promotion) =>
      promotion.id === currentPromotion.id
        ? {
            ...promotion,
            name,
            type,
            value: Number(value),
            startDate,
            endDate,
            description,
            status,
            products,
          }
        : promotion,
    )

    setPromotions(updatedPromotions)
    setShowEditDialog(false)
    resetForm()
  }

  const handleEditClick = (promotion: Promotion) => {
    setCurrentPromotion(promotion)
    setName(promotion.name)
    setType(promotion.type)
    setValue(promotion.value.toString())
    setStartDate(promotion.startDate)
    setEndDate(promotion.endDate)
    setDescription(promotion.description)
    setProducts(promotion.products)
    setShowError(false)
    setShowEditDialog(true)
  }

  const handleDeletePromotion = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa chương trình khuyến mãi này?")) {
      setPromotions(promotions.filter((promotion) => promotion.id !== id))
    }
  }

  const resetForm = () => {
    setName("")
    setType("discount")
    setValue("")
    setStartDate("")
    setEndDate("")
    setDescription("")
    setProducts([])
    setShowError(false)
    setCurrentPromotion(null)
  }

  const filteredPromotions = promotions.filter(
    (promotion) =>
      promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.products.some((product) => product.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleToggleProduct = (product: string) => {
    if (products.includes(product)) {
      setProducts(products.filter((p) => p !== product))
    } else {
      setProducts([...products, product])
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
            Đang hoạt động
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
            Sắp diễn ra
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">
            Đã kết thúc
          </Badge>
        )
      default:
        return null
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "discount":
        return "Giảm giá"
      case "bundle":
        return "Mua X tặng Y"
      case "gift":
        return "Quà tặng kèm"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý chương trình khuyến mãi</h1>
        <p className="text-muted-foreground">Quản lý các chương trình khuyến mãi của cửa hàng</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên, mô tả hoặc sản phẩm..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Thêm khuyến mãi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thêm chương trình khuyến mãi mới</DialogTitle>
              <DialogDescription>Điền thông tin để tạo chương trình khuyến mãi mới.</DialogDescription>
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
                <Label htmlFor="name">Tên chương trình</Label>
                <Input
                  id="name"
                  placeholder="Nhập tên chương trình khuyến mãi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Loại khuyến mãi</Label>
                <Select value={type} onValueChange={(value: "discount" | "bundle" | "gift") => setType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại khuyến mãi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Giảm giá</SelectItem>
                    <SelectItem value="bundle">Mua X tặng Y</SelectItem>
                    <SelectItem value="gift">Quà tặng kèm</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">
                  {type === "discount"
                    ? "Phần trăm giảm giá (%)"
                    : type === "bundle"
                      ? "Số lượng sản phẩm (X+Y)"
                      : "Số lượng quà tặng"}
                </Label>
                <Input
                  id="value"
                  type="number"
                  min="1"
                  placeholder={type === "discount" ? "Ví dụ: 10 (cho 10%)" : "Nhập số lượng"}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Ngày bắt đầu</Label>
                  <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">Ngày kết thúc</Label>
                  <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  placeholder="Mô tả chi tiết về chương trình khuyến mãi"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Sản phẩm áp dụng</Label>
                <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto border rounded-md p-2">
                  {sampleProducts.map((product) => (
                    <div key={product} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`product-${product}`}
                        checked={products.includes(product)}
                        onChange={() => handleToggleProduct(product)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label htmlFor={`product-${product}`} className="text-sm">
                        {product}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Hủy
              </Button>
              <Button onClick={handleAddPromotion}>Thêm khuyến mãi</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa chương trình khuyến mãi</DialogTitle>
            <DialogDescription>Cập nhật thông tin chương trình khuyến mãi.</DialogDescription>
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
              <Label htmlFor="edit-name">Tên chương trình</Label>
              <Input
                id="edit-name"
                placeholder="Nhập tên chương trình khuyến mãi"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-type">Loại khuyến mãi</Label>
              <Select value={type} onValueChange={(value: "discount" | "bundle" | "gift") => setType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại khuyến mãi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Giảm giá</SelectItem>
                  <SelectItem value="bundle">Mua X tặng Y</SelectItem>
                  <SelectItem value="gift">Quà tặng kèm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-value">
                {type === "discount"
                  ? "Phần trăm giảm giá (%)"
                  : type === "bundle"
                    ? "Số lượng sản phẩm (X+Y)"
                    : "Số lượng quà tặng"}
              </Label>
              <Input
                id="edit-value"
                type="number"
                min="1"
                placeholder={type === "discount" ? "Ví dụ: 10 (cho 10%)" : "Nhập số lượng"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-startDate">Ngày bắt đầu</Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-endDate">Ngày kết thúc</Label>
                <Input id="edit-endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Mô tả</Label>
              <Textarea
                id="edit-description"
                placeholder="Mô tả chi tiết về chương trình khuyến mãi"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Sản phẩm áp dụng</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto border rounded-md p-2">
                {sampleProducts.map((product) => (
                  <div key={product} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`edit-product-${product}`}
                      checked={products.includes(product)}
                      onChange={() => handleToggleProduct(product)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor={`edit-product-${product}`} className="text-sm">
                      {product}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleEditPromotion}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách chương trình khuyến mãi</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredPromotions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã KM</TableHead>
                  <TableHead>Tên chương trình</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Giá trị</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromotions.map((promotion) => (
                  <TableRow key={promotion.id}>
                    <TableCell>{promotion.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{promotion.name}</div>
                        <div className="text-sm text-muted-foreground">{promotion.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeText(promotion.type)}</TableCell>
                    <TableCell>
                      {promotion.type === "discount"
                        ? `${promotion.value}%`
                        : promotion.type === "bundle"
                          ? `${Math.floor(promotion.value)}+${promotion.value - Math.floor(promotion.value) > 0 ? 1 : 0}`
                          : promotion.value}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Từ: {new Date(promotion.startDate).toLocaleDateString()}</div>
                        <div>Đến: {new Date(promotion.endDate).toLocaleDateString()}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(promotion.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(promotion)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeletePromotion(promotion.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <Percent className="h-12 w-12 mb-2 text-muted-foreground/50" />
              <p>Không tìm thấy chương trình khuyến mãi nào</p>
              <p className="text-sm">Thêm chương trình mới hoặc điều chỉnh bộ lọc tìm kiếm</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
