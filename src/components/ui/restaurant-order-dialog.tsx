import { useState, useMemo } from "react"
import { Plus, Minus, Trash2, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogClose } from "@radix-ui/react-dialog"





interface MenuItem {
  id: number;
  name: string;
  price: number;
}
const availableMenuItems: MenuItem[] = [
  { id: 1, name: "Combo 1", price: 60.00 },
  { id: 2, name: "Combo 2", price: 75.00 },
  { id: 3, name: "Combo 3", price: 110.00 },
  { id: 4, name: "Combo 4", price: 120.00 },
  { id: 5, name: "Combo Low Carb", price: 80.00 },
  { id: 6, name: "Combo Oishii Esp", price: 210.00 },
  { id: 7, name: "Combo Oishii", price: 250.00 },
  { id: 8, name: "Combo Hot", price: 80.00 },
  { id: 9, name: "Combo Hot Especial", price: 100.00 },
  { id: 10, name: "Combo Festival", price: 145.00 },
  { id: 11, name: "Combo Joe", price: 95.00 },
  { id: 12, name: "Combo Japa", price: 55.00 },
  { id: 13, name: "Combo Omega 3", price: 65.00 },
  { id: 14, name: "Combo Especial", price: 230.00 },
  { id: 15, name: "Combo Lanzoni", price: 75.00 },
  { id: 16, name: "Sunomono", price: 18.00 },
  { id: 17, name: "Ceviche Misto", price: 60.00 },
  { id: 18, name: "Ceviche Tilápia", price: 50.00 },
  { id: 19, name: "Ceviche Salmão", price: 60.00 },
  { id: 20, name: "Barquinha Salmão", price: 20.00 },
  { id: 21, name: "Guioza de Carne", price: 38.00 },
  { id: 22, name: "Sobá Grande", price: 45.00 },
  { id: 23, name: "Sobá Pequeno", price: 25.00 },
  { id: 24, name: "Yakisoba", price: 45.00 },
  { id: 25, name: "Temaki Salmão", price: 38.00 },
  { id: 26, name: "Temaki Skin", price: 35.00 },
  { id: 27, name: "Temaki Salmão Empanado", price: 45.00 },
  { id: 28, name: "Temaki Salmão sem Arroz", price: 45.00 },
  { id: 29, name: "Temaki Salmão Filadélfia", price: 40.00 },
  { id: 30, name: "Temaki Hot", price: 40.00 },
  { id: 31, name: "Temaki Hot Especial", price: 48.00 },
  { id: 32, name: "Sushi Dog", price: 48.00 },
  { id: 33, name: "Poke de Salmão e Shimeji", price: 65.00 },
  { id: 34, name: "Poke Oishii", price: 75.00 },
  { id: 35, name: "Poke Salmão", price: 65.00 },
  { id: 36, name: "Sashimi Salmão Selado", price: 57.00 },
  { id: 37, name: "Sashimi Salmão Especial", price: 60.00 },
  { id: 38, name: "Sashimi Salmão", price: 55.00 },
  { id: 39, name: "Sashimi Salmão Trufado", price: 60.00 },
  { id: 40, name: "Sashimi Salmão Crazy", price: 60.00 },
  { id: 41, name: "Sashimi Croc", price: 60.00 },
  { id: 42, name: "Sophia Eibi", price: 55.00 },
  { id: 43, name: "Sophia Filadélfia", price: 48.00 },
  { id: 44, name: "Sophia Oishii", price: 55.00 },
  { id: 45, name: "Sophia Shimeji", price: 48.00 },
  { id: 46, name: "Sophia Maracujá", price: 48.00 },
  { id: 47, name: "Joe Salmão", price: 45.00 },
  { id: 48, name: "Joe Doritos", price: 40.00 },
  { id: 49, name: "Joe Maracujá", price: 45.00 },
  { id: 50, name: "Joe Apimentado", price: 43.00 },
  { id: 51, name: "Joe Biquinho", price: 40.00 },
  { id: 52, name: "Joe Geléia de Morango", price: 35.00 },
  { id: 53, name: "Joe Shimeji", price: 43.00 }]

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve conter ao menos 2 caracteres.",
  }),
  address: z.string().min(5, {
    message: "O endereço deve conter ao menos 5 caracteres.",
  }),
  paymentMethod: z.enum(["card", "pix", "cash", "debt"], {
    required_error: "Selecione um método de pagamento para proseguir.",
  }),
  deliveryMethod: z.enum(["delivery", "pickup"], {
    required_error: "Selecione o método de entrega para prosseguir.",
  }),
  
})

// ... (keep the availableMenuItems array as is)

interface OrderItem extends MenuItem {
  quantity: number;
}

export default function RestaurantOrderDialog() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      paymentMethod: undefined,
      deliveryMethod: "delivery",
      
    
    },
  })

  const deliveryMethod = form.watch("deliveryMethod")

  const filteredMenuItems = useMemo(() => {
    if (searchTerm.trim() === "") return []
    return availableMenuItems
      .filter(item =>
        item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      .slice(0, 3)
  }, [searchTerm])

  const calculateTotal = () => {
    const itemsTotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const deliveryFee = deliveryMethod === "delivery" ? 5 : 0
    return itemsTotal + deliveryFee
  }

  const handleQuantityChange = (item: MenuItem, change: number) => {
    setOrderItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((orderItem) => orderItem.id === item.id);
  
      // Copie os itens anteriores
      const updatedItems = [...prevItems];
  
      if (existingItemIndex > -1) {
        // Atualize a quantidade do item existente
        updatedItems[existingItemIndex].quantity += change;
  
        // Remova o item se a quantidade for <= 0
        if (updatedItems[existingItemIndex].quantity <= 0) {
          updatedItems.splice(existingItemIndex, 1);
        }
      } else if (change > 0) {
        // Adicione um novo item
        updatedItems.push({ ...item, quantity: 1 });
        setSearchTerm(""); // Limpe o termo de pesquisa
      }
  
      // **Atualize o formulário com os itens atualizados**
      
  
      return updatedItems;
    });
  };
  

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (orderItems.length === 0) {
      alert("Adicione pelo menos um item ao pedido.");
      return;
    }
  
    const completeOrder = {
      ...values,
      items: orderItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        total: item.quantity * item.price,
      })),
      totalAmount: calculateTotal(),
    };
  
    console.log("Pedido completo:", completeOrder);}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Novo Pedido</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar Comanda</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 opacity-50" />
                <Input
                  placeholder="Pesquise pelos itens no cardápio"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              {filteredMenuItems.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Menu Item</TableHead>
                      <TableHead className="text-right">Item Price</TableHead>
                      <TableHead className="w-[100px]">Add</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMenuItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">R${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item, 1)}
                            aria-label={`Add ${item.name} to order`}
                          >
                            <Plus className="h-4 w-4"></Plus>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {orderItems.length > 0 && (
                <Table>
                  <TableBody>
                    {orderItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">R${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item, -1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item, 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(item, -item.quantity)}
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pagamento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um método de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="card">Cartão</SelectItem>
                      <SelectItem value="pix">Pix</SelectItem>
                      <SelectItem value="cash">Dinheiro</SelectItem>
                      <SelectItem value="debt">Fiado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Envio</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="delivery" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Delivery
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="pickup" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Balcão
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R${orderItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>
              {deliveryMethod === "delivery" && (
                <div className="flex justify-between">
                  <span>Taxa de entrega</span>
                  <span>R$5.00</span>
                </div>
              )}
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>R${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            <Button type="submit" className="w-full bg-emerald-600 text-white font-bold">
              Confirmar Pedido
            </Button>
            
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

