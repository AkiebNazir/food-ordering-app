
export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  imageUrl: string;
  photos?: string[];
  reviews?: Review[];
  menu?: MenuCategory[];
  dataAiHint?: string; // Added from RestaurantCard usage
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number; // Base price
  imageUrl: string;
  variants?: ItemVariant[];
  addOns?: ItemAddOn[];
  dataAiHint?: string; // Added from MenuItemCard usage
};

export type ItemVariant = {
  name: string; // e.g., "Size", "Spice Level"
  options: { name: string; priceChange?: number }[]; // e.g., ["Small", "Medium", "Large"] or ["Mild", "Medium", "Hot"]
};

export type ItemAddOn = {
  name: string;
  price: number;
};

export type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

export type OrderStatus = "Confirmed" | "Preparing" | "Out for Delivery" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  restaurantName: string;
  items: { name: string; quantity: number }[]; // This might need to be CartItem[] in a real order
  totalAmount: number;
  status: OrderStatus;
  estimatedDeliveryTime: string; // Could be a Date object
  deliveryAddress: string;
  currentLocation?: { lat: number; lng: number }; // For live tracking
  statusHistory?: { status: OrderStatus; timestamp: string }[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

// Cart specific types
export type SelectedVariantOption = {
  variantName: string;
  optionName: string;
  priceChange: number; // Ensure priceChange is always a number, default to 0 if not applicable
};

export type CartItem = {
  cartItemId: string; // Unique ID for this specific instance in the cart (e.g., item + variant + addons combo)
  menuItemId: string;
  name: string;
  imageUrl: string;
  quantity: number;
  unitPrice: number; // Price of one unit with current selections (base + variant delta + addons)
  totalPrice: number; // unitPrice * quantity
  basePrice: number; // Original price of the menu item
  selectedVariant?: SelectedVariantOption;
  selectedAddOns: ItemAddOn[];
};
