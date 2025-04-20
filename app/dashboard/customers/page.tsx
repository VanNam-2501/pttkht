"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Search, Plus, AlertCircle, Pencil } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"

interface Customer {
  id: string
  name: string
  birthdate: string
  address: string
  phone: string
  points: number
  registrationDate: string
}

export default function CustomersPage() {
  const [name, setName] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null)
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "KH12345",
      name: "Nguyễn Văn A",
      birthdate: "1985-05-15",
      address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
      phone: "0912345678",
      points: 250,
      registrationDate: "2025-02-10",
    },
    {
      id: "KH23456",
      name: "Trần Thị B",
      birthdate: "1990-08-22",
      address: "456 Đường Nguyễn Huệ, Quận 1, TP.HCM",
      phone: "0923456789",
      points: 180,
      registrationDate: "2025-02-25",
    },
    {
      id: "KH34567",
      name: "Lê Văn C",
      birthdate: "1978-11-30",
      address: "789 Đường Cách Mạng Tháng 8, Quận 3, TP.HCM",
      phone: "0934567890",
      points: 320,
      registrationDate: "2025-03-12",
    },
  ])

  const handleAddCustomer = () => {
    if (!name.trim()) {
      setErrorMessage("Họ tên là bắt buộc")
      setShowError(true)
      return
    }

    if (!birthdate.trim()) {
      setErrorMessage("Ngày sinh là bắt buộc")
      setShowError(true)
      return
    }

    if (!address.trim()) {
      setErrorMessage("Địa chỉ là bắt buộc")
      setShowError(true)
      return
    }

    if (!phone.trim()) {
      setErrorMessage("Số điện thoại là bắt buộc")
      setShowError(true)
      return
    }

    const newCustomer: Customer = {
      id: `KH${Math.floor(10000 + Math.random() * 90000)}`,
      name,
      birthdate,
      address,
      phone,
      points: 0,
      registrationDate: new Date().toISOString().split("T")[0],
    }

    setCustomers([newCustomer, ...customers])
    setShowAddDialog(false)
    resetForm()
  }

  const handleEditCustomer = () => {
    if (!currentCustomer) return

    if (!name.trim()) {
      setErrorMessage("Họ tên là bắt buộc")
      setShowError(true)
      return
    }

    if (!birthdate.trim()) {
      setErrorMessage("Ngày sinh là bắt buộc")
      setShowError(true)
      return
    }

    if (!address.trim()) {
      setErrorMessage("Địa chỉ là bắt buộc")
      setShowError(true)
      return
    }

    if (!phone.trim()) {
      setErrorMessage("Số điện thoại là bắt buộc")
      setShowError(true)
      return
    }

    const updatedCustomers = customers.map((customer) =>
      customer.id === currentCustomer.id
        ? {
            ...customer,
            name,
            birthdate,
            address,
            phone,
          }
        : customer,
    )

    setCustomers(updatedCustomers)
    setShowEditDialog(false)
    resetForm()
  }

  const handleEditClick = (customer: Customer) => {
    setCurrentCustomer(customer)
    setName(customer.name)
    setBirthdate(customer.birthdate)
    setAddress(customer.address)
    setPhone(customer.phone)
    setShowError(false)
    setShowEditDialog(true)
  }

  const resetForm = () => {
    setName("")
    setBirthdate("")
    setAddress("")
    setPhone("")
    setShowError(false)
    setCurrentCustomer(null)
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý khách hàng thân thiết</h1>
        <p className="text-muted-foreground">Quản lý khách hàng tham gia chương trình khách hàng thân thiết</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo mã, tên hoặc số điện thoại..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Thêm khách hàng
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm khách hàng thân thiết</DialogTitle>
              <DialogDescription>
                Điền thông tin để đăng ký khách hàng vào chương trình khách hàng thân thiết.
              </DialogDescription>
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
                <Label htmlFor="name">Họ tên</Label>
                <Input
                  id="name"
                  placeholder="Nhập họ tên đầy đủ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthdate">Ngày sinh</Label>
                <Input id="birthdate" type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  placeholder="Nhập địa chỉ đầy đủ"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Hủy
              </Button>
              <Button onClick={handleAddCustomer}>Đăng ký</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chỉnh sửa thông tin khách hàng</DialogTitle>
              <DialogDescription>Cập nhật thông tin khách hàng thân thiết.</DialogDescription>
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
                <Label htmlFor="edit-name">Họ tên</Label>
                <Input
                  id="edit-name"
                  placeholder="Nhập họ tên đầy đủ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-birthdate">Ngày sinh</Label>
                <Input
                  id="edit-birthdate"
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-address">Địa chỉ</Label>
                <Input
                  id="edit-address"
                  placeholder="Nhập địa chỉ đầy đủ"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-phone">Số điện thoại</Label>
                <Input
                  id="edit-phone"
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Hủy
              </Button>
              <Button onClick={handleEditCustomer}>Lưu thay đổi</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách khách hàng thân thiết</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã KH</TableHead>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>Ngày sinh</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>Điểm tích lũy</TableHead>
                  <TableHead>Ngày đăng ký</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.birthdate}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                        {customer.points} điểm
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.registrationDate}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEditClick(customer)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <Users className="h-12 w-12 mb-2 text-muted-foreground/50" />
              <p>Không tìm thấy khách hàng nào</p>
              <p className="text-sm">Thêm khách hàng mới hoặc điều chỉnh bộ lọc tìm kiếm</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
