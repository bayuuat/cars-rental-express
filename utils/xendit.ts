import { Xendit } from "xendit-node";

export const xenditClient = new Xendit({
	secretKey: process.env.XENDIT_KEY!,
	xenditURL: "https://api.xendit.co",
});
