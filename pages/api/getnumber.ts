import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import { supabase } from "@/app/supabaseClient";

type Response = {
  message: string;
};

const accountSid = process.env.NEXT_SUPABASE_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_SUPABASE_TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    const { country, email } = req.query;

    if (!country || typeof country !== "string") {
      res
        .status(400)
        .json({ message: "Invalid or missing 'country' parameter" });
      return;
    }

    const availableNumbers = await client.availablePhoneNumbers(country)
                                      .local
                                      .list({smsEnabled: true});

    const chosenNumber = availableNumbers[0].phoneNumber;

      const purchasedNumber = await client.incomingPhoneNumbers.create({
                              phoneNumber: chosenNumber,
                              smsUrl: process.env.NEXT_SUPABASE_TWILIO_WRITE_FUNCTION_URL,
                              addressSid: process.env.NEXT_SUPABASE_TWILIO_ADDRESS_ID,
                            });

        console.log('you just purchased a number!')
        console.log(purchasedNumber);


    try {
      const data = [{ email: email, phone_number: purchasedNumber.phoneNumber, full_number_details: purchasedNumber, region: country }];

      const { error } = await supabase.from("numbers").insert(data);

      if (error) {
        console.error(error);
      } else {
        console.log("Data inserted:", data);
      }
    } catch (err) {
      console.error("Error during data insertion:", err);
    }

      res.status(200).json({ message: `${email} Purchased number: ${purchasedNumber.phoneNumber} for country ${country}` });

  } catch (error) {
    console.error("Error purchasing phone number:", error);
    res.status(500).json({ message: "Error purchasing phone number" });
  }
}
