import { MongoClient } from "mongodb";
import { MUEEN_PUBLIC_CONTENT } from "./content-defaults";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mueen_dev";

async function seedContent() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db();
  
  // Seed content pages
  const contents = Object.values(MUEEN_PUBLIC_CONTENT);

  for (const content of contents) {
    const existing = await db.collection("content").findOne({ slug: content.slug });
    if (!existing || !String(existing.content || "").trim()) {
      await db.collection("content").updateOne(
        { slug: content.slug },
        { $set: { ...content, updatedAt: new Date() } },
        { upsert: true }
      );
    }
  }

  // Seed bank accounts
  const bankAccounts: any[] = [];

  for (const account of bankAccounts) {
    await db.collection("bank_accounts").updateOne(
      { iban: account.iban },
      { $set: { ...account, createdAt: new Date() } },
      { upsert: true }
    );
  }

  // Seed default roles
  const roles = [
    { name: "admin", nameAr: "مدير النظام", permissions: ["all"] },
    { name: "accountant", nameAr: "محاسب", permissions: ["donations", "reports", "transfers"] },
    { name: "delivery", nameAr: "مندوب توصيل", permissions: ["delivery_orders"] },
    { name: "user", nameAr: "مستخدم", permissions: ["donate", "profile"] }
  ];

  for (const role of roles) {
    await db.collection("roles").updateOne(
      { name: role.name },
      { $set: { ...role, createdAt: new Date() } },
      { upsert: true }
    );
  }

  // Seed system stats
  await db.collection("system_stats").updateOne(
    {},
    { $set: { 
      totalOrganizations: 50,
      totalBeneficiaries: 8350,
      employee_fees_percentage: 10,
      updatedAt: new Date()
    }},
    { upsert: true }
  );

  console.log("Content seeded successfully!");
  await client.close();
}

seedContent().catch(console.error);
