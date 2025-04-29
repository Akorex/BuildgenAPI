import { NextFunction, Request, Response } from "express";
import { UserModel } from "./auth.model";
import { CLERK_WEBHOOK_SECRET } from "../../env";
import { Webhook } from "svix";

// auth controllers
class UserController {
  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const webhookSecret = CLERK_WEBHOOK_SECRET;

      // Get Svix headers
      const svixId = req.header("svix-id");
      const svixTimestamp = req.header("svix-timestamp");
      const svixSignature = req.header("svix-signature");

      if (!svixId || !svixTimestamp || !svixSignature) {
        res.status(400).json({ error: "Missing required Svix headers" });
        return;
      }

      const payload = JSON.stringify(req.body);

      const headers = {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      };

      const wh = new Webhook(webhookSecret);

      try {
        const event = wh.verify(payload, headers);
        console.log("Event Verified:", event);

        // Parse webhook data
        const data = req.body;
        const eventType = data.type;
        const email = data.data?.email_addresses[0]?.email_address;
        const clerkUserId = data.data?.id;

        if (eventType === "user.created") {
          // Create or get user
          let user = await UserModel.findOne({ email });
          if (!user) {
            user = await UserModel.create({
              email,
              clerkUserId,
            });
          }
          res.status(200).json({ message: "User created successfully" });
          return;
        }

        res.status(200).json({ message: "Webhook processed and received" });
      } catch (error) {
        if (error instanceof Error) {
          console.error("Webhook verification failed:", error.message);
          res.status(400).json({ error: "Invalid signature" });
          return;
        }
        throw error;
      }
    } catch (error) {
      console.error("Error processing webhook:", error);
      res.status(500).json({ error: "Unexpected error" });
    }
  };
}

export default new UserController();
