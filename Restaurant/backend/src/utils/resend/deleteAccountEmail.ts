import { Resend } from "resend";

async function sendDeleteAccountEmail(
    fullName: string,
    email: string
): Promise<any> {
    const resend = new Resend(process.env.RESEND_API_KEY as string);
    const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>", // TODO: Change to your verified domain
        to: [email],
        subject: "🚨 Confirm Your MERN Eats Account Deletion Request",
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
        <h2 style="color: #ffa500; font-size: 30px">
            Account Deletion Request
        </h2>

        <p style="font-size: 18px; line-height: 1.6">
            Hi there, <br />
            We received a request to delete your MERN Eats account. If you did
            not make this request, please ignore this email. Your account will
            remain safe and active.
        </p>

        <p style="font-size: 18px; color: #ffa500; margin-top: 20px">
            <strong>Account Deletion Details:</strong>
        </p>
        <ul
            style="
                text-align: left;
                display: inline-block;
                list-style: none;
                color: #ffa500;
                font-size: 16px;
            "
        >
            <li style="margin: 10px 0">
                ✔️ Full Name: <strong>${fullName}</strong>
            </li>
            <li style="margin: 10px 0">
                ✔️ Email: <strong>${email}</strong>
            </li>
            <li style="margin: 10px 0">
                ✔️ Deletion Date: <strong>${new Date()}</strong>
            </li>
        </ul>

        <p style="margin-top: 20px">
            To confirm this action, please click the button below:
        </p>
        <a
            href="{{deleteAccountLink}}"
            style="
                color: #000;
                text-decoration: none;
                padding: 15px;
                margin: 20px 0;
                display: inline-block;
                background-color: #ffa500;
                border-radius: 15px;
                font-weight: bold;
            "
            >Confirm Account Deletion</a
        >

        <p style="color: #ffa500">
            Note: Once deleted, your account data cannot be recovered.
        </p>

        <p style="color: #777; margin-top: 30px">
            <small
                >If you did not make this request, no further action is
                needed.</small
            >
        </p>

        <p style="margin-top: 50px; color: #ffa500">- MERN Eats Support Team</p>
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

export default sendDeleteAccountEmail;
