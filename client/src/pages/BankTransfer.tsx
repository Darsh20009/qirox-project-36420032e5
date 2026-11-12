import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Building2, CreditCard, CheckCircle2, Copy, Image, Send } from "lucide-react";
import alRajhiLogo from "@assets/image_1774519535375.png";
import bankAlbiladLogo from "@assets/image_1774519559474.png";
import anbLogo from "@assets/image_1774519613573.png";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/use-seo";

const DONATION_TYPES = [
  { value: "hajj", label: "خدمة الحجاج" },
  { value: "umrah", label: "خدمة المعتمرين" },
  { value: "general", label: "دعم عام" },
];

export default function BankTransfer() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  useSEO({
    title: "التحويل البنكي",
    description: "بيانات التحويل البنكي لجمعية معين لخدمات الحج والعمرة ستُضاف بعد اعتمادها رسمياً.",
  });
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const initialAmount = searchParams.get("amount") || "";
  const initialType = searchParams.get("type") || "";
  const donorNameParam = searchParams.get("donorName");
  const initialDonorName = donorNameParam ? decodeURIComponent(donorNameParam) : user?.name || "";
  const initialBankName = searchParams.get("bankName") ? decodeURIComponent(searchParams.get("bankName")!) : (user as any)?.bankName || "";
  const initialIban = searchParams.get("iban") ? decodeURIComponent(searchParams.get("iban")!) : (user as any)?.iban || "";

  const [formData, setFormData] = useState({
    donorName: initialDonorName,
    donorPhone: user?.mobile || "",
    donorEmail: (user as any)?.email || "",
    amount: initialAmount,
    type: initialType,
    bankName: initialBankName,
    iban: initialIban,
    transferDate: new Date().toISOString().split('T')[0],
    notes: ""
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string>("");

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        donorName: prev.donorName || user.name || "",
        donorPhone: prev.donorPhone || (user as any).mobile || "",
        donorEmail: prev.donorEmail || (user as any).email || "",
      }));
    }
  }, [user]);

  const { data: bankAccounts } = useQuery<any[]>({
    queryKey: ['/api/bank-accounts'],
  });
  
  const submitMutation = useMutation({
    mutationFn: async (data: { formData: typeof formData, file: File }) => {
      const submitFormData = new FormData();
      submitFormData.append('donorName', data.formData.donorName);
      submitFormData.append('donorPhone', data.formData.donorPhone);
      submitFormData.append('donorEmail', data.formData.donorEmail || '');
      submitFormData.append('amount', data.formData.amount);
      submitFormData.append('type', data.formData.type);
      submitFormData.append('bankName', data.formData.bankName);
      submitFormData.append('transferDate', data.formData.transferDate);
      submitFormData.append('notes', data.formData.notes);
      submitFormData.append('file', data.file);
      
      const res = await fetch('/api/bank-transfers', {
        method: 'POST',
        body: submitFormData
      });
      if (!res.ok) throw new Error('Failed to submit');
      return res.json();
    },
    onSuccess: () => {
      setReceiptFile(null);
      setReceiptPreview("");
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إرسال الإيصال",
        variant: "destructive"
      });
    }
  });
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const copyIban = async (iban: string) => {
    await navigator.clipboard.writeText(iban);
    toast({ title: "تم النسخ", description: "تم نسخ رقم الآيبان" });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.type) {
      toast({
        title: "بيانات ناقصة",
        description: "الرجاء تعبئة المبلغ ونوع التبرع",
        variant: "destructive"
      });
      return;
    }

    if (!receiptFile) {
      toast({
        title: "صورة الإيصال مطلوبة",
        description: "الرجاء رفع صورة إيصال التحويل البنكي",
        variant: "destructive"
      });
      return;
    }
    
    submitMutation.mutate({ formData, file: receiptFile }, {
      onSuccess: () => {
        const campaignName = formData.type === "hajj"
          ? "خدمة الحجاج"
          : formData.type === "umrah"
            ? "خدمة المعتمرين"
            : "تبرع عام";
        setLocation(`/donation-success?amount=${formData.amount}&campaignName=${encodeURIComponent(campaignName)}&method=transfer`);
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-l from-primary to-teal-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Building2 className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">التحويل البنكي</h1>
            <p className="text-white/80">تبرع عبر التحويل البنكي المباشر</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h2 className="text-2xl font-bold font-heading mb-3">التحويل البنكي</h2>
              <p className="text-muted-foreground leading-8">
                بيانات الحسابات البنكية للجمعية الجديدة غير مضافة بعد. لن نعرض حسابات الجمعية السابقة؛
                يرجى استخدام وسيلة دفع أخرى حتى اعتماد الحسابات الرسمية لجمعية معين لخدمات الحج والعمرة.
              </p>
            </div>

            {/* Upload Form */}
            <div>
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-primary" />
                    رفع إيصال التحويل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <fieldset disabled={!bankAccounts?.length} className="space-y-6 disabled:opacity-50">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="donorName">اسم المتبرع</Label>
                        <Input
                          id="donorName"
                          value={formData.donorName}
                          onChange={(e) => setFormData(prev => ({ ...prev, donorName: e.target.value }))}
                          placeholder="الاسم الكريم"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="donorPhone">رقم الجوال</Label>
                        <Input
                          id="donorPhone"
                          type="tel"
                          value={formData.donorPhone}
                          onChange={(e) => setFormData(prev => ({ ...prev, donorPhone: e.target.value }))}
                          placeholder="05xxxxxxxx"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="donorEmail">
                        البريد الإلكتروني
                        <span className="text-xs text-muted-foreground mr-2">(لاستلام تنبيهات حالة تبرعك)</span>
                      </Label>
                      <Input
                        id="donorEmail"
                        type="email"
                        value={formData.donorEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, donorEmail: e.target.value }))}
                        placeholder="example@email.com"
                        dir="ltr"
                        data-testid="input-donor-email"
                        autoComplete="email"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">مبلغ التحويل *</Label>
                        <Input
                          id="amount"
                          type="number"
                          required
                          value={formData.amount}
                          onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">نوع التبرع *</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نوع التبرع" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-2 shadow-xl">
                            <SelectItem value="hajj" className="py-3 hover:bg-emerald-50 cursor-pointer border-b">خدمة الحجاج</SelectItem>
                            <SelectItem value="umrah" className="py-3 hover:bg-emerald-50 cursor-pointer border-b">خدمة المعتمرين</SelectItem>
                            <SelectItem value="general" className="py-3 hover:bg-emerald-50 cursor-pointer">تبرع عام</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankName">البنك المحول منه</Label>
                        <Input
                          id="bankName"
                          value={formData.bankName}
                          onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                          placeholder="اسم البنك"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="transferDate">تاريخ التحويل</Label>
                        <Input
                          id="transferDate"
                          type="date"
                          value={formData.transferDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, transferDate: e.target.value }))}
                        />
                      </div>
                    </div>

                    {/* Receipt Upload */}
                    <div className="space-y-2">
                      <Label>صورة الإيصال *</Label>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
                          ${receiptPreview ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}
                      >
                        {receiptPreview ? (
                          <div className="space-y-4">
                            <img
                              src={receiptPreview}
                              alt="Receipt"
                              className="max-h-48 mx-auto rounded-lg shadow-md"
                            />
                            <div className="flex items-center justify-center gap-2 text-primary">
                              <CheckCircle2 className="w-5 h-5" />
                              <span className="font-medium">تم رفع الصورة</span>
                            </div>
                            <p className="text-sm text-muted-foreground">اضغط لتغيير الصورة</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                              <Image className="w-8 h-8 text-gray-400" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">اضغط لرفع صورة الإيصال</p>
                              <p className="text-sm text-muted-foreground">PNG, JPG حتى 10MB</p>
                            </div>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">ملاحظات إضافية</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="أي ملاحظات أو توجيهات..."
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-lg font-bold bg-gradient-brand"
                      disabled={submitMutation.isPending || !bankAccounts?.length}
                    >
                      {submitMutation.isPending ? (
                        "جاري الإرسال..."
                      ) : (
                        <>
                          <Send className="w-5 h-5 ml-2" />
                          إرسال الإيصال
                        </>
                      )}
                    </Button>
                    </fieldset>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
