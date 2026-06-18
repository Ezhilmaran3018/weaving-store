import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navbar
    home: 'Home',
    products: 'Products',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    logout: 'Logout',
    dashboard: 'Dashboard',
    cart: 'Cart',
    wishlist: 'Wishlist',
    search: 'Search sarees...',

    // Hero
    heroTitle: 'Discover Timeless Indian Sarees',
    heroSubtitle: 'Handwoven by master artisans, delivered to your doorstep',
    shopNow: 'Shop Now',
    exploreCollection: 'Explore Collection',

    // Home
    featuredCollection: 'Featured Collection',
    whyChooseUs: 'Why Choose Us',
    authenticCraftsmanship: 'Authentic Craftsmanship',
    authenticDesc: 'Handwoven by master artisans',
    premiumQuality: 'Premium Quality',
    premiumDesc: 'Best fabrics and finest materials',
    fastShipping: 'Fast Shipping',
    fastDesc: 'Secure and quick delivery',

    // Products
    allProducts: 'All Products',
    addToCart: 'Add to Cart',
    addToWishlist: 'Add to Wishlist',
    viewDetails: 'View Details',
    price: 'Price',
    rating: 'Rating',
    reviews: 'Reviews',
    outOfStock: 'Out of Stock',

    // About
    aboutTitle: 'About SilkWeave',
    ourStory: 'Our Story',
    aboutDesc1: 'SilkWeave was born from a passion for preserving the timeless art of traditional Indian saree weaving. We work directly with master artisans to bring authentic, handwoven sarees to your doorstep.',
    aboutDesc2: 'Every saree tells a story of heritage, craftsmanship, and dedication. We believe in supporting our artisans and celebrating the beauty of Indian textiles.',
    sustainable: 'Sustainable',
    sustainableDesc: 'Eco-friendly practices and fair trade',
    supportArtisans: 'Support Our Artisans',
    supportDesc: "When you shop with SilkWeave, you're directly supporting our weaving community.",
    learnMore: 'Learn More',

    // Contact
    contactTitle: 'Contact Us',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',

    // Cart
    cartTitle: 'Your Cart',
    emptyCart: 'Your cart is empty',
    total: 'Total',
    checkout: 'Checkout',
    remove: 'Remove',
    quantity: 'Quantity',

    // Wishlist
    wishlistTitle: 'Your Wishlist',
    emptyWishlist: 'Your wishlist is empty',

    // Auth
    signIn: 'Sign In',
    signUp: 'Sign Up',
    createAccount: 'Create Account',
    password: 'Password',
    fullName: 'Full Name',
    alreadyAccount: 'Already have an account?',
    noAccount: "Don't have an account?",

    // Footer
    footerTagline: 'Authentic Indian Sarees',
    allRights: 'All rights reserved',
  },
  ta: {
    // Navbar
    home: 'முகப்பு',
    products: 'பொருட்கள்',
    about: 'எங்களை பற்றி',
    contact: 'தொடர்பு',
    login: 'உள்நுழை',
    logout: 'வெளியேறு',
    dashboard: 'டாஷ்போர்டு',
    cart: 'வண்டி',
    wishlist: 'விருப்பப்பட்டியல்',
    search: 'புடவைகளை தேடுங்கள்...',

    // Hero
    heroTitle: 'காலமெல்லாம் நிலைக்கும் இந்திய புடவைகள்',
    heroSubtitle: 'கைவினை கலைஞர்களால் நெய்யப்பட்டு உங்கள் வீட்டிற்கு வருகிறது',
    shopNow: 'இப்போது வாங்குங்கள்',
    exploreCollection: 'தொகுப்பை காணுங்கள்',

    // Home
    featuredCollection: 'சிறப்பு தொகுப்பு',
    whyChooseUs: 'ஏன் எங்களை தேர்வு செய்யணும்',
    authenticCraftsmanship: 'உண்மையான கைவினை',
    authenticDesc: 'தலைசிறந்த கலைஞர்களால் கைநெசவு',
    premiumQuality: 'உயர் தரம்',
    premiumDesc: 'சிறந்த துணிகள் மற்றும் தரமான பொருட்கள்',
    fastShipping: 'விரைவான டெலிவரி',
    fastDesc: 'பாதுகாப்பான மற்றும் விரைவான டெலிவரி',

    // Products
    allProducts: 'அனைத்து பொருட்கள்',
    addToCart: 'வண்டியில் சேர்',
    addToWishlist: 'விருப்பத்தில் சேர்',
    viewDetails: 'விவரங்கள் காண',
    price: 'விலை',
    rating: 'மதிப்பீடு',
    reviews: 'மதிப்புரைகள்',
    outOfStock: 'கையிருப்பு இல்லை',

    // About
    aboutTitle: 'சில்க்வீவ் பற்றி',
    ourStory: 'எங்கள் கதை',
    aboutDesc1: 'சில்க்வீவ் பாரம்பரிய இந்திய புடவை நெசவின் காலமெல்லாம் நிலைக்கும் கலையை பாதுகாக்கும் ஆர்வத்திலிருந்து பிறந்தது. உண்மையான, கைநெசவு புடவைகளை உங்கள் வீட்டிற்கு கொண்டு வர நாங்கள் கலைஞர்களுடன் நேரடியாக பணியாற்றுகிறோம்.',
    aboutDesc2: 'ஒவ்வொரு புடவையும் பாரம்பரியம், கைவினை மற்றும் அர்ப்பணிப்பின் கதையை சொல்கிறது. நாங்கள் எங்கள் கலைஞர்களை ஆதரிப்பதிலும் இந்திய ஜவுளியின் அழகை கொண்டாடுவதிலும் நம்பிக்கை கொண்டிருக்கிறோம்.',
    sustainable: 'நிலையான',
    sustainableDesc: 'சுற்றுச்சூழல் நட்பான நடைமுறைகள்',
    supportArtisans: 'எங்கள் கலைஞர்களை ஆதரியுங்கள்',
    supportDesc: 'சில்க்வீவில் கடை பார்க்கும்போது, நீங்கள் நேரடியாக எங்கள் நெசவு சமுதாயத்தை ஆதரிக்கிறீர்கள்.',
    learnMore: 'மேலும் அறிய',

    // Contact
    contactTitle: 'தொடர்பு கொள்ளுங்கள்',
    name: 'பெயர்',
    email: 'மின்னஞ்சல்',
    message: 'செய்தி',
    send: 'செய்தி அனுப்பு',

    // Cart
    cartTitle: 'உங்கள் வண்டி',
    emptyCart: 'உங்கள் வண்டி காலியாக உள்ளது',
    total: 'மொத்தம்',
    checkout: 'செலுத்து',
    remove: 'நீக்கு',
    quantity: 'அளவு',

    // Wishlist
    wishlistTitle: 'உங்கள் விருப்பப்பட்டியல்',
    emptyWishlist: 'உங்கள் விருப்பப்பட்டியல் காலியாக உள்ளது',

    // Auth
    signIn: 'உள்நுழைவு',
    signUp: 'பதிவு செய்',
    createAccount: 'கணக்கு உருவாக்கு',
    password: 'கடவுச்சொல்',
    fullName: 'முழு பெயர்',
    alreadyAccount: 'ஏற்கனவே கணக்கு இருக்கிறதா?',
    noAccount: 'கணக்கு இல்லையா?',

    // Footer
    footerTagline: 'உண்மையான இந்திய புடவைகள்',
    allRights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const t = translations[language];
  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'ta' : 'en');

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);