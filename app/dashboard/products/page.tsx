"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Plus,
  AlertCircle,
  ScanBarcodeIcon as BarcodeScanner,
  Pencil,
  Store,
  Filter,
  ArrowUpDown,
} from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Product {
  id: string
  code: string
  name: string
  category: string
  price: number
  cost: number
  stock: number
  supplier: string
  status: "active" | "inactive"
}

export default function ProductsPage() {
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [cost, setCost] = useState("")
  const [supplier, setSupplier] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([
    {
      id: "SP001",
      code: "SP12345",
      name: "Gạo Tám Thơm 1kg",
      category: "Thực phẩm",
      price: 35000,
      cost: 28000,
      stock: 50,
      supplier: "Công ty TNHH Thực phẩm Việt",
      status: "active",
    },
    {
      id: "SP002",
      code: "SP23456",
      name: "Đậu Đen 1kg",
      category: "Thực phẩm",
      price: 25000,
      cost: 18000,
      stock: 30,
      supplier: "Công ty TNHH Thực phẩm Việt",
      status: "active",
    },
    {
      id: "SP003",
      code: "SP34567",
      name: "Đường Trắng 1kg",
      category: "Thực phẩm",
      price: 22000,
      cost: 16000,
      stock: 40,
      supplier: "Công ty CP Đường Biên Hòa",
      status: "active",
    },
    {
      id: "SP004",
      code: "SP45678",
      name: "Cà Phê Rang 500g",
      category: "Đồ uống",
      price: 75000,
      cost: 55000,
      stock: 25,
      supplier: "Công ty CP Cà phê Trung Nguyên",
      status: "active",
    },
    {
      id: "SP005",
      code: "SP56789",
      name: "Sữa Tươi 1L",
      category: "Đồ uống",
      price: 28000,
      cost: 20000,
      stock: 60,
      supplier: "Công ty CP Vinamilk",
      status: "active",
    },
    {
      id: "SP006",
      code: "SP67890",
      name: "Dầu Ăn 1L",
      category: "Thực phẩm",
      price: 45000,
      cost: 32000,
      stock: 35,
      supplier: "Công ty TNHH Thực phẩm Việt",
      status: "inactive",
    },
  ])
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  // Mô phỏng quét mã vạch
  const handleScanBarcode = () => {
    setIsScanning(true)

    // Mô phỏng thời gian quét
    setTimeout(() => {
      const productCode = "SP" + Math.floor(10000 + Math.random() * 90000)
      setCode(productCode)
      setIsScanning(false)
    }, 1000)
  }

  const handleAddProduct = () => {
    if (!code.trim()) {
      setErrorMessage("Mã sản phẩm là bắt buộc")
      setShowError(true)
      return
    }

    if (!name.trim()) {
      setErrorMessage("Tên sản phẩm là bắt buộc")
      setShowError(true)
      return
    }

    if (!category.trim()) {
      setErrorMessage("Danh mục là bắt buộc")
      setShowError(true)
      return
    }

    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      setErrorMessage("Giá bán phải là số dương")
      setShowError(true)
      return
    }

    if (!cost.trim() || isNaN(Number(cost)) || Number(cost) <= 0) {
      setErrorMessage("Giá nhập phải là số dương")
      setShowError(true)
      return
    }

    if (!supplier.trim()) {
      setErrorMessage("Nhà cung cấp là bắt buộc")
      setShowError(true)
      return
    }

    // Kiểm tra mã sản phẩm đã tồn tại chưa
    if (products.some((product) => product.code === code)) {
      setErrorMessage("Mã sản phẩm đã tồn tại")
      setShowError(true)
      return
    }

    const newProduct: Product = {
      id: `SP${Math.floor(1000 + Math.random() * 9000)}`,
      code,
      name,
      category,
      price: Number(price),
      cost: Number(cost),
      stock: 0,
      supplier,
      status: "active",
    }

    setProducts([newProduct, ...products])
    setShowAddDialog(false)
    resetForm()
  }

  const handleEditProduct = () => {
    if (!currentProduct) return

    if (!name.trim()) {
      setErrorMessage("Tên sản phẩm là bắt buộc")
      setShowError(true)
      return
    }

    if (!category.trim()) {
      setErrorMessage("Danh mục là bắt buộc")
      setShowError(true)
      return
    }

    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      setErrorMessage("Giá bán phải là số dương")
      setShowError(true)
      return
    }

    if (!cost.trim() || isNaN(Number(cost)) || Number(cost) <= 0) {
      setErrorMessage("Giá nhập phải là số dương")
      setShowError(true)
      return
    }

    if (!supplier.trim()) {
      setErrorMessage("Nhà cung cấp là bắt buộc")
      setShowError(true)
      return
    }

    const updatedProducts = products.map((product) =>
      product.id === currentProduct.id
        ? {
            ...product,
            name,
            category,
            price: Number(price),
            cost: Number(cost),
            supplier,
          }
        : product,
    )

    setProducts(updatedProducts)
    setShowEditDialog(false)
    resetForm()
  }

  const handleEditClick = (product: Product) => {
    setCurrentProduct(product)
    setCode(product.code)
    setName(product.name)
    setCategory(product.category)
    setPrice(product.price.toString())
    setCost(product.cost.toString())
    setSupplier(product.supplier)
    setShowError(false)
    setShowEditDialog(true)
  }

  const handleToggleStatus = (product: Product) => {
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p,
    )

    setProducts(updatedProducts)
  }

  const resetForm = () => {
    setCode("")
    setName("")
    setCategory("")
    setPrice("")
    setCost("")
    setSupplier("")
    setShowError(false)
    setCurrentProduct(null)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortField) return 0

    const fieldA = a[sortField as keyof Product]
    const fieldB = b[sortField as keyof Product]

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
    }

    if (typeof fieldA === "number" && typeof fieldB === "number") {
      return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA
    }

    return 0
  })

  const filteredProducts = sortedProducts.filter((product) => {
    const matchesSearch =
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const activeProducts = filteredProducts.filter((product) => product.status === "active")
  const inactiveProducts = filteredProducts.filter((product) => product.status === "inactive")

  // Lấy danh sách các danh mục duy nhất
  const categories = ["all", ...Array.from(new Set(products.map((product) => product.category)))]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý thông tin sản phẩm</h1>
        <p className="text-muted-foreground">Quản lý danh mục sản phẩm của cửa hàng</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo mã, tên, danh mục..."
              className="pl-8 border-green-200 focus-visible:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-green-200 hover:bg-green-50 hover:text-green-700">
                <Filter className="mr-2 h-4 w-4" /> Lọc
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <Label className="text-xs font-medium">Danh mục</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="mt-1 w-full border-green-200 focus:ring-green-500">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả danh mục</SelectItem>
                    {categories
                      .filter((c) => c !== "all")
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 button-effect">
              <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thêm sản phẩm mới</DialogTitle>
              <DialogDescription>Điền thông tin để thêm sản phẩm mới vào hệ thống.</DialogDescription>
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
                <Label htmlFor="code">Mã sản phẩm</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="code"
                      placeholder="Nhập hoặc quét mã sản phẩm"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      disabled={isScanning}
                      className="border-green-200 focus-visible:ring-green-500"
                    />
                    {isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                        <div className="animate-pulse">Đang quét...</div>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleScanBarcode}
                    disabled={isScanning}
                    className="border-green-200 hover:bg-green-50 hover:text-green-700"
                  >
                    <BarcodeScanner className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Tên sản phẩm</Label>
                <Input
                  id="name"
                  placeholder="Nhập tên sản phẩm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-green-200 focus-visible:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Danh mục</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="border-green-200 focus:ring-green-500">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Thực phẩm">Thực phẩm</SelectItem>
                    <SelectItem value="Đồ uống">Đồ uống</SelectItem>
                    <SelectItem value="Sữa và sản phẩm từ sữa">Sữa và sản phẩm từ sữa</SelectItem>
                    <SelectItem value="Hóa phẩm">Hóa phẩm</SelectItem>
                    <SelectItem value="Đồ dùng cá nhân">Đồ dùng cá nhân</SelectItem>
                    <SelectItem value="Rau củ quả">Rau củ quả</SelectItem>
                    <SelectItem value="Đông lạnh">Đông lạnh</SelectItem>
                    <SelectItem value="Bánh kẹo">Bánh kẹo</SelectItem>
                    <SelectItem value="Khác">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Giá bán (VNĐ)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="1000"
                    min="1000"
                    placeholder="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border-green-200 focus-visible:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cost">Giá nhập (VNĐ)</Label>
                  <Input
                    id="cost"
                    type="number"
                    step="1000"
                    min="1000"
                    placeholder="0"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="border-green-200 focus-visible:ring-green-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier">Nhà cung cấp</Label>
                <Input
                  id="supplier"
                  placeholder="Nhập tên nhà cung cấp"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="border-green-200 focus-visible:ring-green-500"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAddDialog(false)}
                className="border-green-200 hover:bg-green-50 hover:text-green-700"
              >
                Hủy
              </Button>
              <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700">
                Thêm sản phẩm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
            <DialogDescription>Cập nhật thông tin sản phẩm.</DialogDescription>
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
              <Label htmlFor="edit-code">Mã sản phẩm</Label>
              <Input id="edit-code" value={code} disabled className="bg-muted" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-name">Tên sản phẩm</Label>
              <Input
                id="edit-name"
                placeholder="Nhập tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-green-200 focus-visible:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-category">Danh mục</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-green-200 focus:ring-green-500">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Thực phẩm">Thực phẩm</SelectItem>
                  <SelectItem value="Đồ uống">Đồ uống</SelectItem>
                  <SelectItem value="Sữa và sản phẩm từ sữa">Sữa và sản phẩm từ sữa</SelectItem>
                  <SelectItem value="Hóa phẩm">Hóa phẩm</SelectItem>
                  <SelectItem value="Đồ dùng cá nhân">Đồ dùng cá nhân</SelectItem>
                  <SelectItem value="Rau củ quả">Rau củ quả</SelectItem>
                  <SelectItem value="Đông lạnh">Đông lạnh</SelectItem>
                  <SelectItem value="Bánh kẹo">Bánh kẹo</SelectItem>
                  <SelectItem value="Khác">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-price">Giá bán (VNĐ)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="1000"
                  min="1000"
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border-green-200 focus-visible:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-cost">Giá nhập (VNĐ)</Label>
                <Input
                  id="edit-cost"
                  type="number"
                  step="1000"
                  min="1000"
                  placeholder="0"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="border-green-200 focus-visible:ring-green-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-supplier">Nhà cung cấp</Label>
              <Input
                id="edit-supplier"
                placeholder="Nhập tên nhà cung cấp"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="border-green-200 focus-visible:ring-green-500"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              className="border-green-200 hover:bg-green-50 hover:text-green-700"
            >
              Hủy
            </Button>
            <Button onClick={handleEditProduct} className="bg-green-600 hover:bg-green-700">
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-green-50 p-1">
          <TabsTrigger value="active" className="data-[state=active]:bg-white data-[state=active]:text-green-700">
            Sản phẩm đang bán ({activeProducts.length})
          </TabsTrigger>
          <TabsTrigger value="inactive" className="data-[state=active]:bg-white data-[state=active]:text-green-700">
            Sản phẩm ngừng bán ({inactiveProducts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Danh sách sản phẩm đang bán</CardTitle>
            </CardHeader>
            <CardContent>
              {activeProducts.length > 0 ? (
                <div className="rounded-md border border-green-100">
                  <Table>
                    <TableHeader className="bg-green-50">
                      <TableRow>
                        <TableHead className="cursor-pointer hover:text-green-700" onClick={() => handleSort("code")}>
                          <div className="flex items-center">
                            Mã SP
                            {sortField === "code" && <ArrowUpDown className="ml-1 h-3 w-3" />}
                          </div>
                        </TableHead>
                        <TableHead className="cursor-pointer hover:text-green-700" onClick={() => handleSort("name")}>
                          <div className="flex items-center">
                            Tên sản phẩm
                            {sortField === "name" && <ArrowUpDown className="ml-1 h-3 w-3" />}
                          </div>
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:text-green-700"
                          onClick={() => handleSort("category")}
                        >
                          <div className="flex items-center">
                            Danh mục
                            {sortField === "category" && <ArrowUpDown className="ml-1 h-3 w-3" />}
                          </div>
                        </TableHead>
                        <TableHead
                          className="text-right cursor-pointer hover:text-green-700"
                          onClick={() => handleSort("price")}
                        >
                          <div className="flex items-center justify-end">
                            Giá bán
                            {sortField === "price" && <ArrowUpDown className="ml-1 h-3 w-3" />}
                          </div>
                        </TableHead>
                        <TableHead
                          className="text-right cursor-pointer hover:text-green-700"
                          onClick={() => handleSort("cost")}
                        >
                          <div className="flex items-center justify-end">
                            Giá nhập
                            {sortField === "cost" && <ArrowUpDown className="ml-1 h-3 w-3" />}
                          </div>
                        </TableHead>
                        <TableHead
                          className="text-center cursor-pointer hover:text-green-700"
                          onClick={() => handleSort("stock")}
                        >
                          <div className="flex items-center justify-center">
                            Tồn kho
                            {sortField === "stock" && <ArrowUpDown className="ml-1 h-3 w-3" />}
                          </div>
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:text-green-700"
                          onClick={() => handleSort("supplier")}
                        >
                          <div className="flex items-center">
                            Nhà cung cấp
                            {sortField === "supplier" && <ArrowUpDown className="ml-1 h-3 w-3" />}
                          </div>
                        </TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeProducts.map((product) => (
                        <TableRow key={product.id} className="table-row-hover">
                          <TableCell>{product.code}</TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-right">{product.price.toLocaleString()} đ</TableCell>
                          <TableCell className="text-right">{product.cost.toLocaleString()} đ</TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant="outline"
                              className={product.stock > 10 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}
                            >
                              {product.stock}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.supplier}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditClick(product)}
                                className="hover:bg-green-50 hover:text-green-700"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleToggleStatus(product)}
                                className="hover:bg-red-50 hover:text-red-700"
                              >
                                <Store className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <Store className="h-12 w-12 mb-2 text-muted-foreground/50" />
                  <p>Không tìm thấy sản phẩm nào</p>
                  <p className="text-sm">Thêm sản phẩm mới hoặc điều chỉnh bộ lọc tìm kiếm</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive">
          <Card className="border-red-100">
            <CardHeader>
              <CardTitle className="text-red-800">Danh sách sản phẩm ngừng bán</CardTitle>
            </CardHeader>
            <CardContent>
              {inactiveProducts.length > 0 ? (
                <div className="rounded-md border border-red-100">
                  <Table>
                    <TableHeader className="bg-red-50">
                      <TableRow>
                        <TableHead>Mã SP</TableHead>
                        <TableHead>Tên sản phẩm</TableHead>
                        <TableHead>Danh mục</TableHead>
                        <TableHead className="text-right">Giá bán</TableHead>
                        <TableHead className="text-right">Giá nhập</TableHead>
                        <TableHead className="text-center">Tồn kho</TableHead>
                        <TableHead>Nhà cung cấp</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inactiveProducts.map((product) => (
                        <TableRow key={product.id} className="table-row-hover">
                          <TableCell>{product.code}</TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-right">{product.price.toLocaleString()} đ</TableCell>
                          <TableCell className="text-right">{product.cost.toLocaleString()} đ</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className="bg-gray-50 text-gray-700">
                              {product.stock}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.supplier}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleToggleStatus(product)}
                              className="hover:bg-green-50 hover:text-green-700"
                            >
                              <Store className="h-4 w-4 text-green-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <Store className="h-12 w-12 mb-2 text-muted-foreground/50" />
                  <p>Không có sản phẩm nào đã ngừng bán</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
