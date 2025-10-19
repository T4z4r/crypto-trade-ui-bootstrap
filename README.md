# Cryptix - Professional Crypto Trading Platform

A modern, responsive cryptocurrency trading platform UI with advanced dark/light mode theming, interactive charts, and comprehensive navigation system.

## 🚀 Features

### ✅ Core Functionality
- **Responsive Dashboard** - Real-time portfolio overview with live data
- **Advanced Trading Interface** - Professional trading page with charts and order management
- **Wallet Management** - Asset holdings, allocation, and transaction history
- **Transaction Tracking** - Complete transaction history and filtering
- **User Profile Management** - User settings and preferences

### ✅ Advanced Theming
- **Dark/Light Mode Toggle** - Seamless theme switching with localStorage persistence
- **Consistent Design Language** - Unified styling across all components
- **Accessibility Compliant** - Proper contrast ratios and ARIA labels
- **Theme-Aware Components** - All elements adapt to selected theme

### ✅ Interactive Charts
- **Portfolio Overview Chart** - Real-time portfolio value tracking in wallet
- **Trading Charts** - Advanced price charts with multiple timeframes
- **Chart.js Integration** - High-performance charting with dark mode support
- **Real-time Updates** - Live data updates every few seconds

### ✅ Navigation & UX
- **Multilevel Sidebar Menu** - Organized navigation with dropdown sections
- **Authentication Integration** - Sign In/Sign Up options in sidebar
- **Responsive Layout** - Works perfectly on desktop and mobile devices
- **Smooth Animations** - Polished transitions and hover effects

## 📁 Project Structure

```
crypto-trade-ui-bootstrap/
├── index.html              # Main dashboard page
├── dashboard.html          # Dashboard with portfolio overview
├── trading.html           # Advanced trading interface
├── wallet.html            # Wallet management with portfolio chart
├── transactions.html      # Transaction history
├── profile.html           # User profile management
├── signin.html            # Authentication - Sign In
├── signup.html            # Authentication - Sign Up
├── charts.html            # Chart components demo
├── modals.html            # Modal components demo
├── alerts.html            # Alert components demo
├── forms.html             # Form components demo
├── tables.html            # Table components demo
├── components.html        # UI components demo
├── widgets.html           # Widget components demo
├── icons.html             # Icon library demo
├── assets/
│   ├── css/
│   │   ├── styles.css     # Main stylesheet with dark/light modes
│   │   └── styles.scss    # SCSS source file
│   └── js/
│       ├── app.js         # Main application JavaScript
│       ├── charts.js      # Chart functionality
│       ├── transactions.js # Transaction management
│       └── icons.js       # Icon management
├── README.md              # This file
└── cspell.json           # Spell checker configuration
```

## 🛠 Technologies Used

- **HTML5** - Semantic markup and accessibility
- **CSS3** - Modern styling with CSS custom properties (variables)
- **JavaScript (ES6+)** - Modern JavaScript with classes and modules
- **Bootstrap 5.3.2** - Responsive framework and components
- **Highcharts** - Professional charting library
- **SCSS** - CSS preprocessing for maintainable styles

## ⚡ Key Features Implemented

### Dark/Light Mode System
- **CSS Custom Properties** - Theme variables for consistent styling
- **LocalStorage Persistence** - Remembers user's theme preference
- **Smooth Transitions** - Animated theme switching
- **Complete Coverage** - All components support both themes

### Interactive Charts
- **Portfolio Chart** - Real-time portfolio value tracking
- **Trading Charts** - Price charts with multiple indicators
- **Responsive Design** - Charts adapt to container sizes
- **Dark Mode Optimized** - Proper contrast and visibility

### Navigation System
- **Multilevel Menus** - Organized sidebar with dropdown sections
- **Active State Management** - Clear indication of current page
- **Responsive Sidebar** - Collapsible on mobile devices
- **Consistent Styling** - Uniform appearance across all pages

### Authentication Flow
- **Sign In/Sign Up Pages** - Professional authentication interface
- **Form Validation** - Client-side validation and feedback
- **Theme Support** - Full dark/light mode compatibility
- **Navigation Integration** - Accessible from sidebar menu

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone or download** the project files to your local machine

2. **Serve the files** using a local web server:

   **Option 1: Using Python (if installed)**
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option 2: Using Node.js (if installed)**
   ```bash
   npx http-server
   ```

   **Option 3: Using PHP (if installed)**
   ```bash
   php -S localhost:8000
   ```

3. **Open your browser** and navigate to `http://localhost:8000`

### Direct File Access
You can also open any HTML file directly in your browser by double-clicking it or using the browser's "Open File" option.

## 📖 Usage

### Theme Switching
- Click the **sun/moon icon** in the top-right corner of any page to toggle between dark and light modes
- Your preference is automatically saved and will persist across browser sessions

### Navigation
- Use the **sidebar menu** to navigate between different sections
- Click the **"Authentication"** dropdown to access Sign In/Sign Up pages
- All navigation elements provide visual feedback on hover and active states

### Charts Interaction
- **Hover over chart elements** to see detailed tooltips
- Charts automatically update with new data every few seconds
- Use the **time period dropdown** (where available) to change chart timeframes

## 🎨 Design System

### Color Palette
- **Primary Accent**: `#10b981` (Green)
- **Secondary Accent**: `#6200ff` (Purple)
- **Dark Theme**: `#0b0f12` to `#0f1720` (Dark grays)
- **Light Theme**: `#ffffff` to `#f8f9fa` (Light grays)

### Typography
- **Font Family**: Inter, system-ui, -apple-system, "Segoe UI", Roboto
- **Responsive Scaling**: Font sizes adapt to screen size
- **Proper Contrast**: All text meets WCAG accessibility standards

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Consistent styling with hover effects
- **Forms**: Professional input styling with focus states
- **Navigation**: Clear hierarchy with active states

## 🔧 Recent Improvements

### ✅ Dark Mode Fixes
- **Text Visibility**: Fixed all text visibility issues in dark mode
- **Form Styling**: Enhanced form inputs for better contrast
- **Chart Rendering**: Optimized charts for dark theme visibility
- **Navigation Elements**: Improved sidebar contrast and readability

### ✅ Navigation Enhancements
- **Multilevel Menus**: Added Authentication submenu to all pages
- **Active States**: Fixed full-width active menu indicators
- **Hover Effects**: Enhanced hover feedback across all navigation elements
- **Responsive Design**: Improved mobile navigation experience

### ✅ Chart Integration
- **Portfolio Chart**: Added working portfolio chart to wallet page
- **Real-time Updates**: Live data updates every 5 seconds
- **Interactive Elements**: Hover tooltips and smooth animations
- **Theme Compatibility**: Proper dark/light mode chart styling

### ✅ UI Polish
- **Version Display**: Added v0.1 version text to all pages
- **Button Styling**: Enhanced Back to Dashboard button with animations
- **Loading States**: Improved page loading experience
- **Error Handling**: Better error handling for missing elements

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** (1200px and above)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

All components adapt their layout and styling based on screen size while maintaining functionality and visual appeal.

## 🔒 Accessibility

- **WCAG Compliant**: Meets Web Content Accessibility Guidelines
- **Keyboard Navigation**: Full keyboard accessibility support
- **Screen Reader Friendly**: Proper ARIA labels and semantic HTML
- **High Contrast**: Excellent contrast ratios in both themes

## 📈 Performance

- **Optimized Loading**: Efficient resource loading and caching
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Lightweight**: Minimal external dependencies
- **Fast Rendering**: Optimized for quick page loads

## 🤝 Contributing

This project demonstrates modern web development practices including:
- Responsive design principles
- Accessibility best practices
- Modern CSS techniques (Custom Properties, Grid, Flexbox)
- JavaScript ES6+ features
- Professional UI/UX design

## 📄 License

This project is created for educational and demonstration purposes.

---

**Cryptix v0.1** - Professional Crypto Trading Platform UI
Built with modern web technologies and attention to detail.