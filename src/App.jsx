import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MobileWrapper from './components/MobileWrapper';
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import AuthModal from './components/AuthModal';
import HomeScreen from './components/HomeScreen';
import CategoriesScreen from './components/CategoriesScreen';
import DiagnosticScreen from './components/DiagnosticScreen';
import AccountScreen from './components/AccountScreen';
import NotificationScreen from './components/NotificationScreen';
import MyBookingsScreen from './components/MyBookingsScreen';
import ScheduleSlotScreen from './components/ScheduleSlotScreen';
import PaymentScreen from './components/PaymentScreen';
import CartModal from './components/CartModal';
import ProductDetailModal from './components/ProductDetailModal';
import LocationDrawer from './components/LocationDrawer';
import BottomNav from './components/BottomNav';
import FloatingCartBar from './components/FloatingCartBar';
import { PRODUCTS } from './data/products';

export default function App() {
  // App navigation state
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLocationDrawer, setShowLocationDrawer] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('San Diego (Downtown)');
  const [currentUser, setCurrentUser] = useState(null);

  // Layout mode: iPhone frame vs responsive full container
  const [isDeviceFrame, setIsDeviceFrame] = useState(true);

  // Tab navigation
  const [activeTab, setActiveTab] = useState('home');
  const [bookingSchedule, setBookingSchedule] = useState(null);

  // E-Commerce state - Initially completely empty
  const [cartItems, setCartItems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Handle Cart Operations
  const handleAddToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId);

  // Handle Splash Screen Completion
  const handleSplashFinish = () => {
    setShowSplash(false);
    setShowOnboarding(true);
  };

  return (
    <MobileWrapper>
      {/* 1. Splash Screen */}
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}

      {/* 2. Onboarding Flow */}
      {!showSplash && showOnboarding && (
        <OnboardingScreen 
          onComplete={() => setShowOnboarding(false)} 
          onOpenAuth={() => {
            setShowAuthModal(true);
          }}
        />
      )}

      {/* 3. Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onLogin={(userData) => {
            setCurrentUser(userData);
            setShowAuthModal(false);
            setShowOnboarding(false);
          }}
          onGuest={() => {
            setShowAuthModal(false);
            setShowOnboarding(false);
          }}
          onClose={() => {
            setShowAuthModal(false);
          }}
        />
      )}

      {/* 4. Bottom-To-Top Location Picker Drawer */}
      <LocationDrawer
        isOpen={showLocationDrawer}
        onClose={() => setShowLocationDrawer(false)}
        selectedLocality={selectedLocation}
        onSelectLocality={(loc) => setSelectedLocation(loc)}
      />

      {/* 5. Main Screens with Bottom Nav */}
      {!showSplash && !showOnboarding && (
        <div className="flex-1 flex flex-col h-full relative">
          {activeTab === 'home' && (
            <HomeScreen
              onSelectProduct={(id) => setSelectedProductId(id)}
              onAddToCart={handleAddToCart}
              onUpdateQty={handleUpdateQty}
              cartItems={cartItems}
              onOpenDiagnostic={() => setActiveTab('diagnostic')}
              onOpenCategories={() => setActiveTab('categories')}
              onOpenLocation={() => setShowLocationDrawer(true)}
              onOpenAccount={() => setActiveTab('account')}
              onOpenNotifications={() => setActiveTab('notifications')}
              currentUser={currentUser}
              selectedLocation={selectedLocation}
              cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
            />
          )}

          {activeTab === 'categories' && (
            <CategoriesScreen
              onSelectProduct={(id) => setSelectedProductId(id)}
              onAddToCart={handleAddToCart}
            />
          )}

          {activeTab === 'cart' && (
            <CartModal
              items={cartItems}
              onUpdateQty={handleUpdateQty}
              onRemove={handleRemoveItem}
              onClear={handleClearCart}
              onExplore={() => setActiveTab('categories')}
              onProceedToSchedule={() => setActiveTab('schedule')}
            />
          )}

          {activeTab === 'schedule' && (
            <ScheduleSlotScreen
              totalAmount={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
              selectedLocation={selectedLocation}
              onBack={() => setActiveTab('cart')}
              onConfirmBooking={(bookingData) => {
                setBookingSchedule(bookingData);
                setActiveTab('payment');
              }}
            />
          )}

          {activeTab === 'payment' && (
            <PaymentScreen
              amount={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
              bookingInfo={bookingSchedule}
              onBack={() => setActiveTab('bookings')}
              onPaymentSuccess={(paymentData) => {
                handleClearCart();
                setTimeout(() => {
                  setActiveTab('bookings');
                }, 2200);
              }}
            />
          )}

          {activeTab === 'diagnostic' && (
            <DiagnosticScreen
              onSelectProduct={(id) => setSelectedProductId(id)}
              onBack={() => setActiveTab('home')}
            />
          )}

          {activeTab === 'account' && (
            <AccountScreen
              user={currentUser}
              onLogout={() => setCurrentUser(null)}
              onOpenAuth={() => setShowAuthModal(true)}
              onBack={() => setActiveTab('home')}
              onOpenNotifications={() => setActiveTab('notifications')}
              onOpenBookings={() => setActiveTab('bookings')}
            />
          )}

          {activeTab === 'bookings' && (
            <MyBookingsScreen
              onBack={() => setActiveTab('account')}
              onBookNew={() => setActiveTab('categories')}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationScreen
              onBack={() => setActiveTab('home')}
              onOpenTab={(tab) => setActiveTab(tab)}
            />
          )}

          {/* Real App Booking Bottom Dock: Floating Modern Rounded Tab Bar Dock */}
          {activeTab !== 'diagnostic' && activeTab !== 'notifications' && activeTab !== 'schedule' && activeTab !== 'payment' && activeTab !== 'bookings' && (
            <div className="flex-shrink-0 z-30 px-3.5 pb-4 pt-1 pointer-events-none">
              <AnimatePresence>
                {cartItems.length > 0 && activeTab !== 'cart' && (
                  <div className="pointer-events-auto mb-2">
                    <FloatingCartBar
                      items={cartItems}
                      onGoToCart={() => setActiveTab('cart')}
                    />
                  </div>
                )}
              </AnimatePresence>

              {/* Floating Modern Rounded Bottom Navigation Bar */}
              <div className="pointer-events-auto">
                <BottomNav
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. Product Detail Modal / Sheet */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProductId(null)}
          onAddToCart={(prod, qty) => {
            handleAddToCart(prod, qty);
            setSelectedProductId(null);
          }}
          isInCart={cartItems.some((it) => it.id === selectedProduct.id)}
        />
      )}
    </MobileWrapper>
  );
}
