
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Minus, Plus, Trash2 } from 'lucide-react';

// Temporary mock data until we implement Supabase
const initialCartItems = [
  {
    id: '1',
    title: 'دوره پیشرفته جاوااسکریپت',
    instructor: 'علی محمدی',
    price: 1950000,
    image: '/course1.jpg',
    quantity: 1
  },
  {
    id: '2',
    title: 'دوره پیشرفته پایتون',
    instructor: 'محمد حسینی',
    price: 1850000,
    image: '/course2.jpg',
    quantity: 1
  }
];

const CartPage = () => {
  const [items, setItems] = React.useState([]);
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    } else {
      setItems(initialCartItems);
      localStorage.setItem('cart', JSON.stringify(initialCartItems));
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const updateQuantity = (id: string, change: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
    toast.success('سبد خرید بروزرسانی شد');
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success('محصول از سبد خرید حذف شد');
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    toast.success('در حال انتقال به درگاه پرداخت...');
    // Here we would integrate with a payment gateway
  };

  return (
    <div className="container mx-auto py-8 px-4 rtl">
      <h1 className="text-2xl font-bold mb-6">سبد خرید</h1>
      
      {items.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p>سبد خرید شما خالی است</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full md:w-32 h-32 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600 mb-2">مدرس: {item.instructor}</p>
                      <p className="text-luko-teal font-bold mb-2">
                        {new Intl.NumberFormat('fa-IR').format(item.price)} تومان
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="mr-2"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>خلاصه سفارش</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>جمع کل:</span>
                    <span className="font-bold">
                      {new Intl.NumberFormat('fa-IR').format(total)} تومان
                    </span>
                  </div>
                  <Button 
                    className="w-full bg-luko-teal hover:bg-luko-teal/90"
                    onClick={handleCheckout}
                  >
                    ادامه فرآیند خرید
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
