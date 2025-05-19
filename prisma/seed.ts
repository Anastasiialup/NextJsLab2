import { PrismaClient, Prisma } from "@/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        name: "Nina",
        email: "nina@prisma.io",
        address: "Київ, вул. Хрещатик 1"
    },
    {
        name: "Nastya",
        email: "nastya@prisma.io",
        address: "Львів, вул. Франка 10"
    },
];

async function main() {
    console.log("Починаємо наповнення бази даних...");

    for (const user of userData) {
        const createdUser = await prisma.user.create({ data: user });
        console.log(`Створено користувача: ${createdUser.name}`);
    }

    console.log("Наповнення завершено.");
}

main()
    .catch((e) => {
        console.error("Помилка при наповненні:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
