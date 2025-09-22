import { DataSource } from 'typeorm';
import { Product } from '../products/entities/product.entity';

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
      image: 'https://images.unsplash.com/photo-1587202372775-f2e23b1456e2',
    },
    {
      name: 'Gaming Headset',
      description: 'Surround sound gaming headset',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1592503251874-6a21b64d65f0',
    },
    {
      name: 'External SSD 1TB',
      description: 'Portable high-speed SSD',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1587829741756-2e9bb4f7b3d2',
    },
    {
      name: 'Webcam HD',
      description: '1080p HD webcam for streaming',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1587829741637-5f15c5e4f90b',
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
      image: 'https://images.unsplash.com/photo-1512499617640-c2f999018b72',
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
  ];

  for (const p of products) {
    const product = productRepo.create(p);
    await productRepo.save(product);
  }

  console.log('Products seeded successfully!');
};
