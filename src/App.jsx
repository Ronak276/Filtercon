import React, { useState } from 'react';
import MobileWrapper from './components/MobileWrapper';
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import AuthModal from './components/AuthModal';
import HomeScreen from './components/HomeScreen';
import CategoriesScreen from './components/CategoriesScreen';
import DiagnosticScreen from './components/DiagnosticScreen';
import AccountScreen from './components/AccountScreen';
import CartModal from './components/CartModal';
import ProductDetailModal from './components/ProductDetailModal';
import LocationDrawer from './components/LocationDrawer';
import BottomNav from './components/BottomNav';
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

  // E-Commerce state
  const [cartItems, setCartItems] = useState([
    { ...PRODUCTS[2], quantity: 1 },
  ]);
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
        <OnboardingScreen onComplete={() => setShowOnboarding(false)} />
      )}

      {/* 3. Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onLogin={(userData) => {
            setCurrentUser(userData);
            setShowAuthModal(false);
          }}
          onGuest={() => setShowAuthModal(false)}
          onClose={() => setShowAuthModal(false)}
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
              onOpenDiagnostic={() => setActiveTab('diagnostic')}
              onOpenCategories={() => setActiveTab('categories')}
              onOpenLocation={() => setShowLocationDrawer(true)}
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
            />
          )}

          {activeTab === 'diagnostic' && (
            <DiagnosticScreen
              onSelectProduct={(id) => setSelectedProductId(id)}
            />
          )}

          {activeTab === 'account' && (
            <AccountScreen
              user={currentUser}
              onLogout={() => setCurrentUser(null)}
              onOpenAuth={() => setShowAuthModal(true)}
            />
          )}

          {/* Bottom Navigation */}
          <BottomNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
          />
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
