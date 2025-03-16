
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  Trash2, 
  ArrowLeft, 
  ArrowRight,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock cart data - in a real app this would come from context/state management
const initialCartItems = [
  {
    id: "1",
    name: "Modern Lounge Chair",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    quantity: 1
  },
  {
    id: "2",
    name: "Minimalist Table Lamp",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", 
    quantity: 2
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  const updateQuantity = (id: string, change: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
    toast.success("Cart updated");
  };
  
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };
  
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );
  
  const shipping = 10.00;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10 px-6 pt-32">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-medium mb-8">Your Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Button asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6">
                    <h2 className="font-medium mb-4">Cart Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</h2>
                    
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 bg-muted/30">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              ${item.price.toFixed(2)} each
                            </p>
                            
                            <div className="flex justify-between">
                              <div className="flex items-center border border-input rounded-md w-24">
                                <button 
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                                >
                                  -
                                </button>
                                <div className="flex-1 text-center">{item.quantity}</div>
                                <button 
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                                >
                                  +
                                </button>
                              </div>
                              
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-muted-foreground hover:text-destructive text-sm flex items-center gap-1"
                              >
                                <Trash2 className="h-4 w-4" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="px-6 py-4 bg-muted/10 border-t flex justify-between">
                    <Button variant="outline" asChild>
                      <Link to="/products" className="flex items-center gap-2">
                        <ArrowLeft size={16} />
                        Continue Shopping
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
                  <h2 className="font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6 flex items-center justify-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Proceed to Checkout
                  </Button>
                  
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Shipping and taxes calculated at checkout
                  </p>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
