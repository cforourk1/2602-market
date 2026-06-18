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

  for (let i = 0; i < 10; i++) {
    await createProduct(
      faker.commerce.productName(),
      faker.commerce.productDescription(),
      faker.commerce.price()
    );
  }

  const order = await createOrder(faker.date.past(), faker.lorem.sentence(), user.id);

  for (let i = 1; i <= 5; i++) {
    await createOrderProduct(order.id, i, faker.number.int({ min: 1, max: 10 }));
  }
}
