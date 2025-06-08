import dotenv from "dotenv";
import bunyan from "bunyan";

dotenv.config({});
class Config {
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public PORT: string | number;
  public STRIPE_SECRET_KEY: string | undefined;
  public STRIPE_WEBHOOK_SECRET: string | undefined;
  public STRIPE_WEBHOOK_SECRET2: string | undefined;
  public DATABASE_URL: string | undefined;

  constructor() {
    this.JWT_TOKEN = process.env.JWT_TOKEN || "1234";
    this.NODE_ENV = process.env.NODE_ENV || "";
    this.PORT = process.env.PORT || "";
    this.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
    this.STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
    this.STRIPE_WEBHOOK_SECRET2 = process.env.STRIPE_WEBHOOK_SECRET2 || "";
    this.DATABASE_URL = process.env.DATABASE_URL || ""; 
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: "debug" });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }
}

export const config: Config = new Config();
