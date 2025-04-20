"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScanBarcodeIcon as BarcodeScanner, Store, ShieldCheck, Leaf } from "lucide-react"

export default function LoginPage() {
  const [barcode, setBarcode] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Mô phỏng việc quét mã vạch
  const handleScanBarcode = () => {
    setIsScanning(true)
    setError("")

    // Mô phỏng thời gian quét
    setTimeout(() => {
      // Mã vạch giả lập
      const simulatedBarcode = "NV" + Math.floor(10000 + Math.random() * 90000)
      setBarcode(simulatedBarcode)
      setIsScanning(false)

      // Mô phỏng xác thực thành công sau 1 giây
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    }, 1500)
  }

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (barcode.trim() === "") {
      setError("Vui lòng nhập mã thẻ nhân viên")
      return
    }

    // Mô phỏng xác thực
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  // Tập trung vào ô input khi trang tải
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="min-h-screen grocery-login-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-md mb-4">
            <Leaf className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-800">Hệ thống quản lý bán hàng tạp hoá</h1>
          <p className="text-green-600 mt-1">Phần mềm quản lý hiệu quả</p>
        </div>

        <Card className="w-full shadow-xl border-0 overflow-hidden glass-effect">
          <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
          <CardHeader className="space-y-1 text-center pt-8">
            <div className="flex justify-center mb-4">
              <Store className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">Đăng Nhập Hệ Thống</CardTitle>
            <CardDescription>Quản lý bán hàng tạp hoá</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <form onSubmit={handleManualLogin}>
              <div className="space-y-2">
                <Label htmlFor="barcode" className="text-green-700">
                  Mã thẻ nhân viên
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="barcode"
                    ref={inputRef}
                    placeholder="Nhập hoặc quét mã thẻ"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    className="flex-1 border-green-200 focus-visible:ring-green-500"
                    disabled={isScanning}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleScanBarcode}
                    disabled={isScanning}
                    className="shrink-0 border-green-200 hover:bg-green-50 hover:text-green-600"
                  >
                    <BarcodeScanner className="h-5 w-5" />
                  </Button>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </form>

            {isScanning && (
              <div className="flex items-center justify-center p-6">
                <div className="animate-pulse flex flex-col items-center">
                  <BarcodeScanner className="h-10 w-10 text-green-600 mb-3" />
                  <p className="text-sm text-green-600 font-medium">Đang quét mã thẻ...</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="pb-8">
            <Button
              className="w-full bg-green-600 hover:bg-green-700 button-effect"
              onClick={handleManualLogin}
              disabled={isScanning || barcode.trim() === ""}
            >
              <ShieldCheck className="mr-2 h-4 w-4" /> Đăng nhập
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center mt-6 text-sm text-green-700 opacity-75">© 2025 Bản quyền thuộc về nhóm 6.</div>
      </div>
    </div>
  )
}
