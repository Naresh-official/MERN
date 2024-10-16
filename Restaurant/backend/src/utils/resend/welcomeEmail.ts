import { Resend } from "resend";

async function sendWelcomeEmail(
    email: string,
    verifyCode: string
): Promise<any> {
    const resend = new Resend(process.env.RESEND_API_KEY as string);
    const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>", // TODO: Change to your verified domain
        to: [email],
        subject: "Welcome to MERN Eats!",
        html: `<!DOCTYPE html>
<html>
    <body
        style="
            background-color: #000;
            color: #fff;
            font-family: Arial, sans-serif;
            padding: 20px;
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
        "
    >
        <h2 style="color: #ffa500">Welcome to MERN Eats! 🍕</h2>

        <p style="font-size: 18px; line-height: 1.6">
            Hey there, foodie! <br />
            You’ve officially joined the tastiest community on the web. At MERN
            Eats, we don’t just deliver food – we deliver experiences. From your
            favorite local joints to international delicacies, it's all just a
            click away!
        </p>

        <h3 style="color: #ffa500">🍔 What’s on the Menu?</h3>
        <p style="font-size: 16px">
            Whether you're craving a juicy burger, authentic sushi, or a
            delicious vegan bowl, MERN Eats has you covered. Check out some of
            the most popular dishes right now!
        </p>

        <p
            style="
                font-size: 20px;
                font-weight: bold;
                color: #ffa500;
                border: 1px solid #ffa500;
                border-radius: 15px;
                padding: 10px;
                display: inline-block;
                margin-top: 20px;
            "
        >
            Hungry? Let’s get started!
        </p>

        <p style="margin: 20px 0; color: #ffa500">Discover top dishes today:</p>
        <a
            href="{{homeLink}}" // TODO: Replace with actual link
            style="
                color: #000;
                text-decoration: none;
                padding: 15px;
                background-color: #ffa500;
                border-radius: 15px;
                font-weight: bold;
            "
            >Browse the Menu</a
        >

        <h3 style="color: #ffa500; margin-top: 50px">
            🔥 How to Make the Most of MERN Eats:
        </h3>
        <ul
            style="
                text-align: left;
                display: inline-block;
                margin: 0 auto;
                padding: 0;
                list-style: none;
            "
        >
            <li style="margin: 10px 0; font-size: 16px">
                ✔️ <strong>Create your favorites list:</strong> Easily save your
                go-to meals for quick ordering.
            </li>
            <li style="margin: 10px 0; font-size: 16px">
                ✔️ <strong>Exclusive discounts:</strong> Look out for promo
                codes and deals we send your way. Keep an eye on your inbox! 💸
            </li>
            <li style="margin: 10px 0; font-size: 16px">
                ✔️ <strong>Try something new:</strong> Explore trending meals
                and discover new cuisines every day!
            </li>
        </ul>

        <h3 style="color: #ffa500; margin-top: 40px">👩‍🍳 Got Questions?</h3>
        <p style="font-size: 16px">
            Our team is here for you! If you have any issues, need
            recommendations, or just want to say hi, feel free to reply to this
            email. We're always happy to help you find your next great meal!
        </p>

        <p style="margin-top: 50px; color: #ffa500">
            Dig in and enjoy,
            <br />- The MERN Eats Team
        </p>

        <footer style="margin-top: 30px; color: #777">
            <small
                >If you didn’t sign up for MERN Eats, please disregard this
                email.</small
            >
        </footer>
    </body>
</html>

`,
    });

    if (data) {
        return data;
    }

    if (error) {
        throw new Error(error.message);
    }
}

export default sendWelcomeEmail;
