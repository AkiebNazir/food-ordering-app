
import type { Restaurant, MenuItem, Review, Order, MenuCategory } from './types';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Palace',
    cuisine: 'Italian',
    rating: 4.5,
    deliveryTime: '30-45 min',
    distance: '2.5 km',
    imageUrl: 'https://placehold.co/600x400.png',
    photos: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    dataAiHint: 'pizza restaurant',
  },
  {
    id: '2',
    name: 'Burger Barn',
    cuisine: 'American',
    rating: 4.2,
    deliveryTime: '25-40 min',
    distance: '1.8 km',
    imageUrl: 'https://placehold.co/600x400.png',
    photos: ['https://placehold.co/800x600.png'],
    dataAiHint: 'burger joint',
  },
  {
    id: '3',
    name: 'Sushi Spot',
    cuisine: 'Japanese',
    rating: 4.8,
    deliveryTime: '40-55 min',
    distance: '3.2 km',
    imageUrl: 'https://placehold.co/600x400.png',
    photos: ['https://placehold.co/800x600.png'],
    dataAiHint: 'sushi shop',
  },
  {
    id: '4',
    name: 'Curry House',
    cuisine: 'Indian',
    rating: 4.6,
    deliveryTime: '35-50 min',
    distance: '4.0 km',
    imageUrl: 'https://placehold.co/600x400.png',
    photos: ['https://placehold.co/800x600.png'],
    dataAiHint: 'indian curry',
  },
];

export const mockReviews: Review[] = [
  { id: 'r1', userName: 'Alice', rating: 5, comment: 'Amazing pizza, fast delivery!', date: '2024-05-20' },
  { id: 'r2', userName: 'Bob', rating: 4, comment: 'Good burgers, a bit greasy.', date: '2024-05-18' },
  { id: 'r3', userName: 'Charlie', rating: 5, comment: 'Best sushi in town!', date: '2024-05-22' },
];

export const mockMenu: MenuCategory[] = [
  {
    name: 'Appetizers',
    items: [
      { id: 'm1', name: 'Garlic Bread', description: 'Crusty bread with garlic butter.', price: 5.99, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'garlic bread' },
      { id: 'm2', name: 'Spring Rolls', description: 'Crispy vegetable spring rolls.', price: 6.50, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'spring rolls' },
    ]
  },
  {
    name: 'Main Courses',
    items: [
      { 
        id: 'm3', 
        name: 'Margherita Pizza', 
        description: 'Classic Margherita with fresh basil and mozzarella.', 
        price: 12.99, 
        imageUrl: 'https://placehold.co/300x200.png',
        dataAiHint: 'margherita pizza',
        variants: [{ name: 'Size', options: [{name: 'Regular'}, {name: 'Large', priceChange: 3}]}],
        addOns: [{name: 'Extra Cheese', price: 1.50}, {name: 'Olives', price: 1.00}]
      },
      { 
        id: 'm4', 
        name: 'Cheeseburger', 
        description: 'Juicy beef patty with cheddar cheese.', 
        price: 9.50, 
        imageUrl: 'https://placehold.co/300x200.png',
        dataAiHint: 'cheeseburger food',
        variants: [{ name: 'Patty', options: [{name: 'Single'}, {name: 'Double', priceChange: 2.50}]}],
      },
      { id: 'm5', name: 'Salmon Teriyaki', description: 'Grilled salmon with teriyaki sauce.', price: 15.00, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'salmon teriyaki' },
    ]
  },
  {
    name: 'Desserts',
    items: [
      { id: 'm6', name: 'Chocolate Cake', description: 'Rich decadent chocolate cake.', price: 7.00, imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'chocolate cake' },
    ]
  }
];

mockRestaurants.forEach(restaurant => {
  restaurant.reviews = mockReviews.slice(0, Math.floor(Math.random() * mockReviews.length) + 1);
  restaurant.menu = mockMenu;
});


export const mockOrders: Order[] = [
  {
    id: 'order123',
    restaurantName: 'Pizza Palace',
    items: [{ name: 'Margherita Pizza', quantity: 1 }, { name: 'Coke', quantity: 2 }],
    totalAmount: 18.99,
    status: 'Out for Delivery',
    estimatedDeliveryTime: '15 min remaining',
    deliveryAddress: '123 Main St, Anytown, USA',
    currentLocation: { lat: 34.0522, lng: -118.2437 }, // Example coords
    statusHistory: [
      { status: 'Confirmed', timestamp: '2024-05-23T10:00:00Z' },
      { status: 'Preparing', timestamp: '2024-05-23T10:05:00Z' },
      { status: 'Out for Delivery', timestamp: '2024-05-23T10:30:00Z' },
    ]
  },
  {
    id: 'order456',
    restaurantName: 'Burger Barn',
    items: [{ name: 'Cheeseburger', quantity: 2 }],
    totalAmount: 19.00,
    status: 'Delivered',
    estimatedDeliveryTime: 'Delivered at 1:15 PM',
    deliveryAddress: '456 Oak Ave, Anytown, USA',
    statusHistory: [
      { status: 'Confirmed', timestamp: '2024-05-22T12:30:00Z' },
      { status: 'Preparing', timestamp: '2024-05-22T12:35:00Z' },
      { status: 'Out for Delivery', timestamp: '2024-05-22T12:55:00Z' },
      { status: 'Delivered', timestamp: '2024-05-22T13:15:00Z' },
    ]
  }
];

export const mockUser: User = {
  id: 'user1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatarUrl: 'https://placehold.co/100x100.png'
};
