// Google Analytics 4 and SEO Monitoring Setup
// This file contains the configuration for tracking SEO performance

// Google Analytics 4 Configuration
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 ID

// Enhanced ecommerce tracking for local business platform
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args);
  }
};

// Track business page views
export const trackBusinessView = (businessName: string, category: string, city: string) => {
  gtag('event', 'view_business', {
    business_name: businessName,
    category: category,
    city: city,
    event_category: 'business_engagement'
  });
};

// Track search queries
export const trackSearch = (query: string, city: string, category: string, results: number) => {
  gtag('event', 'search', {
    search_term: query,
    city: city,
    category: category,
    results_count: results,
    event_category: 'user_interaction'
  });
};

// Track contact button clicks
export const trackContact = (businessName: string, contactMethod: string) => {
  gtag('event', 'contact_business', {
    business_name: businessName,
    contact_method: contactMethod, // 'phone', 'email', 'whatsapp'
    event_category: 'conversion'
  });
};

// Core Web Vitals tracking
export const trackWebVitals = () => {
  if ('web-vital' in window) {
    // Track CLS (Cumulative Layout Shift)
    gtag('event', 'web_vitals', {
      event_category: 'performance',
      cls_score: 'auto',
    });
    
    // Track FID (First Input Delay)
    gtag('event', 'web_vitals', {
      event_category: 'performance',
      fid_score: 'auto',
    });
    
    // Track LCP (Largest Contentful Paint)
    gtag('event', 'web_vitals', {
      event_category: 'performance',
      lcp_score: 'auto',
    });
  }
};

// Local SEO tracking
export const trackLocalInteraction = (action: string, city: string) => {
  gtag('event', 'local_interaction', {
    action: action, // 'view_city', 'filter_category', 'view_directions'
    city: city,
    event_category: 'local_seo'
  });
};

// Enhanced Google Tag Manager setup for comprehensive tracking
export const initializeAnalytics = () => {
  // Initialize GA4
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    // Enhanced ecommerce settings
    enhanced_ecommerce: true,
    // Custom dimensions for local business tracking
    custom_map: {
      custom_dimension_1: 'city',
      custom_dimension_2: 'business_category',
      custom_dimension_3: 'verification_status'
    },
    // Cookie settings for GDPR compliance
    cookie_flags: 'secure;samesite=none',
    // Anonymize IP for privacy
    anonymize_ip: true
  });
  
  // Track core web vitals
  trackWebVitals();
};

// Schema.org structured data for better SEO
export const generateBusinessSchema = (business: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://localbasket.com/${business.city.toLowerCase()}/${business.category.toLowerCase().replace(/\s+/g, '-')}/${business.slug}`,
    "name": business.name,
    "description": business.description,
    "url": business.url,
    "telephone": business.phone,
    "email": business.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address,
      "addressLocality": business.city,
      "addressRegion": business.state,
      "postalCode": business.postalCode,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": business.coordinates?.lat,
      "longitude": business.coordinates?.lng
    },
    "aggregateRating": business.rating && business.reviewCount ? {
      "@type": "AggregateRating",
      "ratingValue": business.rating,
      "reviewCount": business.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "priceRange": business.priceRange,
    "openingHours": business.openingHours,
    "paymentAccepted": business.paymentMethods,
    "areaServed": {
      "@type": "City",
      "name": business.city
    }
  };
};

// SEO monitoring functions
export const monitorSEOHealth = () => {
  // Check for missing meta descriptions
  const metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription || !metaDescription.getAttribute('content')) {
    console.warn('SEO Warning: Missing meta description');
  }
  
  // Check for missing h1 tags
  const h1Tags = document.querySelectorAll('h1');
  if (h1Tags.length === 0) {
    console.warn('SEO Warning: Missing H1 tag');
  } else if (h1Tags.length > 1) {
    console.warn('SEO Warning: Multiple H1 tags found');
  }
  
  // Check for missing alt attributes on images
  const images = document.querySelectorAll('img');
  let imagesWithoutAlt = 0;
  images.forEach(img => {
    if (!img.getAttribute('alt')) {
      imagesWithoutAlt++;
    }
  });
  if (imagesWithoutAlt > 0) {
    console.warn(`SEO Warning: ${imagesWithoutAlt} images missing alt attributes`);
  }
  
  // Check page loading performance
  if ('performance' in window) {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    if (loadTime > 3000) {
      console.warn(`SEO Warning: Page load time is ${loadTime}ms (>3s)`);
    }
  }
};
