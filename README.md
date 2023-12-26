<p align="center">
    <picture>
        <!-- Image for dark mode -->
        <source media="(prefers-color-scheme: dark)" srcset="https://github.com/Airlock-Auth/airlock-auth/assets/47309835/f48ea20c-242d-4d79-b852-833220ea51c6">
        <!-- Image for light mode (default image) -->
        <img src="https://github.com/Airlock-Auth/airlock-auth/assets/47309835/aa360624-19b2-427a-839f-3e3e004181d1" />
    </picture>
</p>


## Airlock

Airlock is a Next JS project by Rory Garton-Smith. Airlock provides a method of securing yourself against 2FA SMS security limitations.

This is the public build of the Airlock project. Please see airlock.fm for the commercial build.
This repo allows you to build your own version of Airlock and self-host. If you'd rather not go through the trouble, just make an account at Airlock.Fm

#### Why?

A major issue in the opsec world is that banks and some government services still use SMS based 2-factor authentication in favor of the more modern app-based 2FA. Reasons why this is an issue:

1. **Mobile Number Re-Use:** Mobile numbers get reused. Someone in Australia has my old number now, and I'm not the first person to have my US number.
2. **Security Vulnerabilities:** Mobile numbers are insecure. There are stories of people maliciously ringing phone companies to ask for 2FA codes.
3. **International Travel Issues:** If you're traveling internationally, you can get locked out of your bank or other accounts if you can't receive SMS in that country.
4. **Inaccessibility During Flights:** If you're on a plane, you can't receive SMS.
5. **Issues for People who Travel or have Moved:** For someone who moved to the US from Australia, like me, being locked out of all Australian banks due to not having the old Australian number anymore was a significant issue. ING literally would not let me transfer money as I did not have my old phone number still available.

**Enter Airlock:**

Airlock is a mechanism to register a number into your own private database. You can use that number when signing up for services. When services send texts, you can view them here, grouped by number and region. Thus, it's useful for 2FA SMS, especially for those who travel or live out of phone reception.


#### How it works:

**1. Make an account:**

![screely-1700550746258](https://github.com/Airlock-Auth/airlock-auth/assets/47309835/4d1bde99-96aa-4375-b28b-070a887bc296)


**2. Grab a number in every region you need one:**

![screely-1700550725870](https://github.com/Airlock-Auth/airlock-auth/assets/47309835/dc9fb735-b5de-40be-815e-34b9ed4ec2ef)


**3. Visit your airlock whenever you need to receive an SMS 2FA in that country:**

![screely-1700550700247](https://github.com/Airlock-Auth/airlock-auth/assets/47309835/9029a99c-4992-4a7d-9d64-f7eb13bc806b)


#### How to Generate your Airlock and Run:

1.  **Initial Setup:**

    - Sign up for Supabase.
    - Go to the Supabase SQL Editor, select "User Management Starter" and run it.

      - Then, create the necessary tables with the following SQL commands:

      ```sql
      -- Create the first table
      CREATE TABLE table_one (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT now(),
        phone_number TEXT,
        email TEXT,
        full_number_details JSONB,
        region TEXT
      );
      ```

      ```sql
      -- Create the second table
      CREATE TABLE table_two (
        id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT now(),
        from TEXT,
        body TEXT,
        to TEXT
      );
      ```

    - Add Supabase environment variables into `.env.local`.
    - Optional step - Adjust the table security rules as appropriate for your security levels.

    - Now Sign up for Twilio.
    - Create a new free tier account. The starting balance should be sufficient (they give you $12 or so for free, this should last a long time).
    - Open up 'Functions and Assets' and click on Services.
    - Build a new service.
    - Load the Supabase env vars into the twilio server side env vars:
    - Import the 'got' dependency into the twilio console.
    - Add this for the code:

      ```javascript
      exports.handler = async function (context, event, callback) {
        const axios = require("axios");

        const SUPABASE_URL = "LOAD_FROM_TWILIO_ENV_VARS";
        const SUPABASE_KEY = "LOAD_FROM_TWILIO_ENV_VARS";
        const TABLE_NAME = "messages";

        const { Body, From, To } = event;

        const url = `${SUPABASE_URL}/rest/v1/${TABLE_NAME}`;

        const headers = {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        };

        const data = {
          from: From,
          to: To,
          body: Body,
        };

        try {
          const response = await axios.post(url, data, { headers: headers });

          callback(null, `Message saved: ${JSON.stringify(response.data)}`);
        } catch (error) {
          callback(error);
        }
      };
      ```

      - You're now good to go. When you create new numbers in Airlock it automatically assigns them the above function as their callback. This then routes their messages securely into your private table in Supabase.

2.  **Installation and Running the Server:**

- Install dependencies.
- Run the development server using one of the following commands:

  ```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  # or
  bun dev
  ```

- Open [http://localhost:3000](http://localhost:3000) with your browser.

- You can now generate new numbers in a new region with a single click and see any messages that are sent to them in a neat layout.

#### Optional Vercel Step:

This project includes all necessary imports for deployment on Vercel, should you wish to host it there.
