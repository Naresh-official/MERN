import { Resend } from "resend";

async function sendVerificationEmail(
    email: string,
    verifyCode: string
): Promise<any> {
    const resend = new Resend(process.env.RESEND_API_KEY as string);
    const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>", // TODO: Change to your verified domain
        to: [email],
        subject: "Verify your email",
        html: `<!DOCTYPE html>
<html>
    <body
        style="
            background-color: #000;
            color: #fff;
            font-family: Arial, sans-serif;
            padding: 20px;
            text-align: center;
        "
    >
        <h2>Verify Your Account</h2>

        <p>
            To activate your MERN Eats account, use the code below or click the
            verification link.
        </p>
        <p
            style="
                font-size: 24px;
                font-weight: bold;
                color: #ffa500;
                border: 1px solid #ffa500;
                border-radius: 15px;
                padding: 10px;
                display: inline-block;
            "
        >
            ${verifyCode}
        </p>
        <p style="margin: 20px 0">Or verify directly:</p>
        <a
            href="{{verificationLink}}"
            style="
                color: #000;
                text-decoration: none;
                padding: 15px;
                background-color: #ffa500;
                border-radius: 15px;
                font-weight: bold;
            "
            >Verify My Account</a
        >
        <p style="margin-top: 50px">
            If this wasn’t you, please ignore this email.
        </p>

        <p>- MERN Eats Team</p>
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

export default sendVerificationEmail;
