
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useReducer, useMemo } from 'react';
import type { MenuItem, CartItem, SelectedVariantOption, ItemAddOn } from '../lib/types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { menuItem: MenuItem; quantity: number; selectedVariant?: SelectedVariantOption; selectedAddOns: ItemAddOn[] } }
  | { type: 'REMOVE_ITEM'; payload: { cartItemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { cartItemId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
};

function generateCartItemId(menuItemId: string, variant?: SelectedVariantOption, addOns?: ItemAddOn[]): string {
  let id = menuItemId;
  if (variant) {
    id += `_variant_${variant.variantName}_${variant.optionName}`;
  }
  if (addOns && addOns.length > 0) {
    const sortedAddOns = [...addOns].sort((a, b) => a.name.localeCompare(b.name));
    id += sortedAddOns.map(ao => `_addon_${ao.name.replace(/\s+/g, '-')}`).join('');
  }
  return id;
}


const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { menuItem, quantity, selectedVariant, selectedAddOns } = action.payload;
      
      const unitPrice = menuItem.price + (selectedVariant?.priceChange || 0) + selectedAddOns.reduce((sum, ao) => sum + ao.price, 0);
      const cartItemId = generateCartItemId(menuItem.id, selectedVariant, selectedAddOns);

      const existingItemIndex = state.items.findIndex(item => item.cartItemId === cartItemId);

      if (existingItemIndex > -1) {
        // Item with same variant/addons already exists, update quantity
        const updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            const newQuantity = item.quantity + quantity;
            return { 
              ...item, 
              quantity: newQuantity,
              totalPrice: item.unitPrice * newQuantity,
            };
          }
          return item;
        });
        return { ...state, items: updatedItems };
      } else {
        // Add as new item
        const newItem: CartItem = {
          cartItemId,
          menuItemId: menuItem.id,
          name: menuItem.name,
          imageUrl: menuItem.imageUrl,
          quantity,
          basePrice: menuItem.price,
          selectedVariant,
          selectedAddOns,
          unitPrice,
          totalPrice: unitPrice * quantity,
        };
        return { ...state, items: [...state.items, newItem] };
      }
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.cartItemId !== action.payload.cartItemId),
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item =>
          item.cartItemId === action.payload.cartItemId
            ? { ...item, quantity: Math.max(1, action.payload.quantity), totalPrice: item.unitPrice * Math.max(1, action.payload.quantity) } // Ensure quantity is at least 1
            : item
        ).filter(item => item.quantity > 0), // Optionally remove if quantity becomes 0, but above ensures min 1
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addItem: (menuItem: MenuItem, quantity: number, selectedVariant?: SelectedVariantOption, selectedAddOns?: ItemAddOn[]) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  cartTotalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (menuItem: MenuItem, quantity: number, selectedVariant?: SelectedVariantOption, selectedAddOns: ItemAddOn[] = []) => {
    dispatch({ type: 'ADD_ITEM', payload: { menuItem, quantity, selectedVariant, selectedAddOns } });
  };

  const removeItem = (cartItemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { cartItemId } });
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartItemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const totalItems = useMemo(() => state.items.reduce((sum, item) => sum + item.quantity, 0), [state.items]);
  const cartTotalAmount = useMemo(() => state.items.reduce((sum, item) => sum + item.totalPrice, 0), [state.items]);

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, updateQuantity, clearCart, totalItems, cartTotalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
