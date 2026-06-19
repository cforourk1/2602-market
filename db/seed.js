import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createOrder } from "#db/queries/orders";
import { createOrderProduct } from "#db/queries/orders_products";
import { createProduct } from "#db/queries/products";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const user = await createUser(faker.internet.username(), "password12345");

await createProduct("Leash and collar set", "Assorted colors for dogs up to 20lbs", 19.99);
await createProduct("Tennis Ball", "Great for playing fetch", 1.99);
await createProduct("Lincoln's best dog food", "Roast beef, rice, and yams", 0.99);
await createProduct("Lincoln's Treat Mix", "Various dried meats", 9.99);
await createProduct("Dog Bed", "Cozy bed with extra soft fleece", 49.99);
await createProduct("Dog Blanket", "Soft fleece blanket sized for medium size dogs", 19.99);
await createProduct("Hot Dog Stuffie", "Perfect for game days!", 8.99);
await createProduct("Rope Toy", "Small braided rope", 6.99);
await createProduct("Squeaky Ball", "Small extra loud squeaky ball for maximum chaos", 5.99);
await createProduct("Waste Bags", "100 count biodegradable waste bags", 9.99);

const order = await createOrder(faker.date.past(), "Please leave at door, Lincoln will bark.", user.id);

  for (let i = 1; i <= 5; i++) {
    await createOrderProduct(order.id, i, faker.number.int({ min: 1, max: 10 }));
  }
}
