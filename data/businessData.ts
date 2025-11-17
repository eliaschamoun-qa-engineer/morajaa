// Dummy data for businesses with images and contact information

export interface BusinessData {
  images: string[];
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  website: string;
  openingHours: string[];
  description: string;
}

// Helper to generate business data based on type and name
export function getBusinessData(businessName: string, type: 'realEstate' | 'carDealer' | 'broker'): BusinessData {
  // Generate a consistent index based on business name for consistent data
  const nameHash = businessName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  if (type === 'realEstate') {
    const realEstateImages = [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    ];
    
    const addresses = [
      'شارع الحمرا، بيروت، لبنان',
      'المنطقة الحرة، بيروت، لبنان',
      'زقاق البلاط، بيروت، لبنان',
      'شارع الحمرا، الأشرفية، بيروت',
      'الدورة، بيروت، لبنان',
    ];
    
    const phones = [
      '+961 1 123 456',
      '+961 1 234 567',
      '+961 1 345 678',
      '+961 1 456 789',
      '+961 1 567 890',
    ];
    
    const websites = [
      'www.example-realestate.com',
      'www.property-lb.com',
      'www.estate-lebanon.com',
      'www.realestate-lb.com',
      'www.properties.com',
    ];
    
    const index = nameHash % 5;
    
    return {
      images: realEstateImages,
      rating: 4.2 + (nameHash % 8) * 0.1, // Rating between 4.2 and 4.9
      reviewCount: 15 + (nameHash % 50), // Reviews between 15 and 64
      address: addresses[index],
      phone: phones[index],
      website: websites[index],
      openingHours: [
        'الاثنين - الجمعة: 9:00 ص - 6:00 م',
        'السبت: 10:00 ص - 4:00 م',
        'الأحد: مغلق',
      ],
      description: 'شركة رائدة في مجال التطوير العقاري في لبنان، تقدم حلولاً سكنية وتجارية عالية الجودة. نحن ملتزمون بتقديم أفضل الخدمات لعملائنا الكرام مع سنوات من الخبرة في السوق اللبناني.',
    };
  }
  
  if (type === 'carDealer') {
    const carDealerImages = [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    ];
    
    const addresses = [
      'شارع الكرنتينا، بيروت، لبنان',
      'الدورة، بيروت، لبنان',
      'المنطقة الحرة، بيروت، لبنان',
      'زقاق البلاط، بيروت، لبنان',
      'شارع الحمرا، بيروت، لبنان',
    ];
    
    const phones = [
      '+961 1 111 222',
      '+961 1 222 333',
      '+961 1 333 444',
      '+961 1 444 555',
      '+961 1 555 666',
    ];
    
    const websites = [
      'www.cars-lebanon.com',
      'www.automotive-lb.com',
      'www.motors-beirut.com',
      'www.cardealer-lb.com',
      'www.autos-lebanon.com',
    ];
    
    const index = nameHash % 5;
    
    return {
      images: carDealerImages,
      rating: 4.3 + (nameHash % 7) * 0.1, // Rating between 4.3 and 4.9
      reviewCount: 20 + (nameHash % 60), // Reviews between 20 and 79
      address: addresses[index],
      phone: phones[index],
      website: websites[index],
      openingHours: [
        'الاثنين - السبت: 8:00 ص - 7:00 م',
        'الأحد: 10:00 ص - 6:00 م',
      ],
      description: 'وكالة سيارات معتمدة تقدم مجموعة واسعة من السيارات الجديدة والمستعملة. نحن نضمن الجودة والموثوقية في كل عملية بيع مع خدمة ما بعد البيع المتميزة.',
    };
  }
  
  // Broker type
  const brokerImages = [
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
  ];
  
  const addresses = [
    'الأشرفية، بيروت، لبنان',
    'المنطقة الحرة، بيروت، لبنان',
    'زقاق البلاط، بيروت، لبنان',
    'الدورة، بيروت، لبنان',
    'شارع الحمرا، بيروت، لبنان',
  ];
  
  const phones = [
    '+961 3 111 222',
    '+961 3 222 333',
    '+961 3 333 444',
    '+961 3 444 555',
    '+961 3 555 666',
  ];
  
  const websites = [
    'www.broker-lebanon.com',
    'www.property-broker.com',
    'www.realestate-broker-lb.com',
    'www.broker-services.com',
    'www.property-agent-lb.com',
  ];
  
  const index = nameHash % 5;
  
  return {
    images: brokerImages,
    rating: 4.4 + (nameHash % 6) * 0.1, // Rating between 4.4 and 4.9
    reviewCount: 10 + (nameHash % 40), // Reviews between 10 and 49
    address: addresses[index],
    phone: phones[index],
    website: websites[index],
    openingHours: [
      'الاثنين - الجمعة: 9:00 ص - 6:00 م',
      'السبت: 10:00 ص - 2:00 م',
      'الأحد: مغلق',
    ],
    description: 'وسيط عقاري محترف يتمتع بخبرة واسعة في السوق اللبناني. نساعدك في العثور على العقار المثالي الذي يناسب احتياجاتك وميزانيتك مع خدمة استشارية شاملة.',
  };
}

