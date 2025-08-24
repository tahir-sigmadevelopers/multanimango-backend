import mongoose from "mongoose";
import { MangoModel } from "./MangoProducts/Model.js";
import { contactModel } from "./ContactUs.jsx/Model.js";
import connectDb from "./db.js";

const seedMangoes = [
  {
    name: "Chaunsa Mango",
    price: "1200",
    description: "Sweet and juicy Chaunsa mango, known for its rich flavor and smooth texture. Perfect for eating fresh or making desserts.",
    image: {
      public_id: "sample_chaunsa",
      url: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop"
    }
  },
  {
    name: "Sindhri Mango",
    price: "1000",
    description: "Famous Sindhri mango with its distinctive sweet taste and golden yellow color. A favorite among mango lovers.",
    image: {
      public_id: "sample_sindhri",
      url: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop"
    }
  },
  {
    name: "Langra Mango",
    price: "900",
    description: "Traditional Langra mango with its unique green skin and sweet, aromatic flesh. Perfect for traditional recipes.",
    image: {
      public_id: "sample_langra",
      url: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop"
    }
  },
  {
    name: "Dussehri Mango",
    price: "800",
    description: "Popular Dussehri mango known for its fiberless flesh and excellent taste. Great for eating and juicing.",
    image: {
      public_id: "sample_dussehri",
      url: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop"
    }
  },
  {
    name: "Anwar Ratol",
    price: "1100",
    description: "Premium Anwar Ratol mango with its distinctive taste and aroma. A luxury variety for special occasions.",
    image: {
      public_id: "sample_anwar_ratol",
      url: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop"
    }
  },
  {
    name: "Fajri Mango",
    price: "950",
    description: "Early season Fajri mango with its unique flavor profile. Perfect for those who can't wait for mango season.",
    image: {
      public_id: "sample_fajri",
      url: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop"
    }
  }
];

const seedContacts = [
  {
    name: "Ahmed Khan",
    email: "ahmed.khan@email.com",
    whatsappNo: "923001234567",
    message: "I'm interested in bulk order of Chaunsa mangoes for my restaurant. Please provide pricing details."
  },
  {
    name: "Fatima Ali",
    email: "fatima.ali@email.com",
    whatsappNo: "923001234568",
    message: "Do you deliver to Karachi? I want to order some Sindhri mangoes for my family."
  },
  {
    name: "Muhammad Hassan",
    email: "m.hassan@email.com",
    whatsappNo: "923001234569",
    message: "Looking for organic mangoes. Do you have any pesticide-free options available?"
  },
  {
    name: "Ayesha Malik",
    email: "ayesha.malik@email.com",
    whatsappNo: "923001234570",
    message: "I need mangoes for a wedding event. Can you provide custom packaging and delivery?"
  },
  {
    name: "Usman Raza",
    email: "usman.raza@email.com",
    whatsappNo: "923001234571",
    message: "Interested in wholesale prices for export. Please contact me for business discussion."
  },
  {
    name: "Sana Ahmed",
    email: "sana.ahmed@email.com",
    whatsappNo: "923001234572",
    message: "Do you have any special offers for first-time customers? I'd like to try your mangoes."
  },
  {
    name: "Bilal Khan",
    email: "bilal.khan@email.com",
    whatsappNo: "923001234573",
    message: "Looking for ripe mangoes for immediate consumption. What's your delivery timeline?"
  },
  {
    name: "Zara Khan",
    email: "zara.khan@email.com",
    whatsappNo: "923001234574",
    message: "I want to order mangoes for my office. Do you provide corporate discounts?"
  }
];

const seedDatabase = async () => {
  try {
    await connectDb();
    
    // Clear existing data
    await MangoModel.deleteMany({});
    await contactModel.deleteMany({});
    
    console.log("Cleared existing data");
    
    // Insert mangoes
    const insertedMangoes = await MangoModel.insertMany(seedMangoes);
    console.log(`Inserted ${insertedMangoes.length} mangoes`);
    
    // Insert contacts
    const insertedContacts = await contactModel.insertMany(seedContacts);
    console.log(`Inserted ${insertedContacts.length} contacts`);
    
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
