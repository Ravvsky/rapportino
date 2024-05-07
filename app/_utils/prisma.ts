import { PrismaClient } from "@prisma/client";

class PrismaSingleton {
  private static instance: PrismaSingleton | null = null;
  private prisma: PrismaClient;

  // Make the constructor public
  public constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): PrismaSingleton {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaSingleton();
    }
    return PrismaSingleton.instance;
  }

  // Make the class callable
  public call(): PrismaClient {
    return this.prisma;
  }
}

// Inherit types from PrismaClient
interface PrismaSingleton extends PrismaClient {}

export default PrismaSingleton;
