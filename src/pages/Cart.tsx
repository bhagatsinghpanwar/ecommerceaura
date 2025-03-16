
import React from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  Trash2, 
  ArrowLeft, 
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  
  // Fixed shipping and tax calculation
  const shipping = cartItems.length > 0 ? 10.00 : 0;
  const tax = cartTotal * 0.07; // 7% tax rate
  const orderTotal = cartTotal + shipping + tax;
  
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
                <Link to="/products" className="animate-pulse">Continue Shopping</Link>
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
                        <div key={item.id} className="flex gap-4 animate-fade-in">
                          <Link to={`/product/${item.id}`} className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 bg-muted/30">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                            />
                          </Link>
                          
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <Link to={`/product/${item.id}`} className="font-medium hover:text-primary transition-colors">
                                {item.name}
                              </Link>
                              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              ${item.price.toFixed(2)} each
                            </p>
                            
                            <div className="flex justify-between">
                              <div className="flex items-center border border-input rounded-md w-24">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                                >
                                  -
                                </button>
                                <div className="flex-1 text-center">{item.quantity}</div>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                                >
                                  +
                                </button>
                              </div>
                              
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-muted-foreground hover:text-destructive text-sm flex items-center gap-1 transition-colors"
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
                      <span>${cartTotal.toFixed(2)}</span>
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
                      <span>${orderTotal.toFixed(2)}</span>
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
