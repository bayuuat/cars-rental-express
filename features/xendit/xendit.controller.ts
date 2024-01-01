import { Response, Request } from "express";
import { Balance } from "xendit-node/balance_and_transaction/models";
import { CreateInvoiceRequest, Invoice } from "xendit-node/invoice/models";
import { xenditClient } from "../../utils/xendit";

class XenditController {
	public async balance(req: Request, res: Response) {
		try {
			const { Balance: balanceClient } = xenditClient;
			const xenBalance: Balance = await balanceClient.getBalance({});

			return res.status(200).send(xenBalance);
		} catch (error) {
			console.error(error);
			return res.send({ error: "Internal Server Error" });
		}
	}

	public async invoice(req: Request, res: Response) {
		const data: CreateInvoiceRequest = {
			amount: 250000,
			invoiceDuration: "3600",
			externalId: "test1234",
			description: "Test Invoice",
			currency: "IDR",
			reminderTime: 1,
			items: [
				{
					name: "Air Conditioner",
					quantity: 1,
					price: 100000,
					category: "Electronic",
					url: "https://yourcompany.com/example_item",
				},
			],
		};

		try {
			const { Invoice: InvoiceClient } = xenditClient;
			const response: Invoice = await InvoiceClient.createInvoice({ data });

			return res.status(200).send(response);
		} catch (error) {
			console.error(error);
			return res.send({ error: "Internal Server Error" });
		}
	}

	public async callback(req: Request, res: Response) {
		try {
			const { body } = req;
			console.log(body);
			if (body.status === "PAID") {
				console.log(`Invoice successfully paid with status ${body.status} and id ${body.id}`);
			}
			res.sendStatus(200).end();
		} catch (error) {
			console.error(error);
			return res.send({ error: "Internal Server Error" });
		}
	}
}

export default new XenditController();
