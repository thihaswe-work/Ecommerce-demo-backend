import { Product } from 'src/entities/product.entity';
import { DataSource } from 'typeorm';

export const seedProducts = async (dataSource: DataSource) => {
  const productRepo = dataSource.getRepository(Product);

  const products: Partial<Product>[] = [
    {
      name: 'Gaming Laptop',
      description: 'High performance laptop for gaming',
      price: 1999.99,
      image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68',
    },
    {
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
    },
    {
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard',
      price: 129.99,
      image: '',
    },
    {
      name: 'Gaming Headset',
      description: 'Surround sound gaming headset',
      price: 79.99,
      image: '',
    },
    {
      name: 'External SSD 1TB',
      description: 'Portable high-speed SSD',
      price: 149.99,
      image: '',
    },
    {
      name: 'Webcam HD',
      description: '1080p HD webcam for streaming',
      price: 59.99,
      image: '',
    },
    {
      name: 'Smartphone 128GB',
      description: 'Latest smartphone with high-res camera',
      price: 699.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    },
    {
      name: 'Tablet 10 inch',
      description: 'High resolution display tablet',
      price: 399.99,
      image: '',
    },
    {
      name: 'Bluetooth Speaker',
      description: 'Portable wireless speaker',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f',
    },
    {
      name: 'Fitness Watch',
      description: 'Track your workouts and health',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b',
    },
    {
      name: 'Wireless Headphones',
      description:
        'Premium noise-cancelling wireless headphones with 30-hour battery life.',
      price: 199.99,
      image: '/products/wireless-headphones.jpg',
    },
    {
      name: 'Smart Watch',
      description:
        'Track your fitness, receive notifications, and more with this sleek smart watch.',
      price: 249.99,
      image: '/products/smart-watch.jpg',
    },
    {
      name: 'Portable Bluetooth Speaker',
      description:
        'Waterproof portable speaker with 360° sound and 24-hour battery life.',
      price: 89.99,
      image: '/products/bluetooth-speaker.jpg',
    },
    {
      name: 'Laptop Backpack',
      description:
        'Durable, water-resistant backpack with padded laptop compartment and USB charging port.',
      price: 59.99,
      image: '/products/laptop-backpack.jpg',
    },
    {
      name: 'Wireless Charging Pad',
      description: 'Fast wireless charging for all Qi-enabled devices.',
      price: 29.99,
      image: '/products/wireless-charging-pad.jpg',
    },
    {
      name: 'Mechanical Keyboard',
      description:
        'RGB backlit mechanical keyboard with customizable keys and tactile feedback.',
      price: 129.99,
      image: '/products/mechanical-keyboard.jpg',
    },
    {
      name: 'Ultra HD Monitor',
      description: '27-inch 4K monitor with HDR support and adjustable stand.',
      price: 349.99,
      image: '/products/uhd-monitor.jpg',
    },
    {
      name: 'Wireless Mouse',
      description:
        'Ergonomic wireless mouse with adjustable DPI and long battery life.',
      price: 49.99,
      image: '/products/wireless-mouse.jpg',
    },
    {
      name: 'Gaming Chair',
      description:
        'Ergonomic gaming chair with lumbar support and adjustable armrests.',
      price: 299.99,
      image: '/products/gaming-chair.jpg',
    },
    {
      name: 'Webcam HD',
      description:
        '1080p HD webcam with auto-focus and built-in microphone for video calls.',
      price: 79.99,
      image: '/products/webcam-hd.jpg',
    },
    {
      name: 'Tablet Stand',
      description:
        'Adjustable aluminum tablet stand compatible with all tablet sizes.',
      price: 39.99,
      image: '/products/tablet-stand.jpg',
    },
    {
      name: 'USB-C Hub',
      description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader.',
      price: 69.99,
      image: '/products/usb-c-hub.jpg',
    },
    {
      name: 'Desk Lamp LED',
      description:
        'Adjustable LED desk lamp with touch control and wireless charging base.',
      price: 89.99,
      image: '/products/desk-lamp-led.jpg',
    },
    {
      name: 'Phone Case',
      description:
        'Protective phone case with military-grade drop protection and wireless charging support.',
      price: 24.99,
      image: '/products/phone-case.jpg',
    },
    {
      name: 'Portable SSD',
      description:
        '1TB portable SSD with USB-C connectivity and 540MB/s transfer speeds.',
      price: 149.99,
      image: '/products/portable-ssd.jpg',
    },
    {
      name: 'Fitness Tracker',
      description:
        'Water-resistant fitness tracker with heart rate monitor and 7-day battery life.',
      price: 99.99,
      image: '/products/fitness-tracker.jpg',
    },
  ];

  for (const p of products) {
    const product = productRepo.create(p);
    await productRepo.save(product);
  }

  console.log('Products seeded successfully!');
};
