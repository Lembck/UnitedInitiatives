export default function TermsAndConditions() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

            <p className="text-sm text-gray-600 mb-8">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                })}
            </p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    1. SMS Verification Program
                </h2>

                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Program Name</h3>
                    <p>Unitied Initiatives SMS Verification Service</p>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">
                        Program Description
                    </h3>
                    <p>
                        Our SMS Verification Service allows you to receive
                        one-time verification codes via text message to verify
                        your identity during account creation and to reset your
                        password if you forget it. This service is essential for
                        maintaining the security of your account.
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">
                        Message Frequency
                    </h3>
                    <p>
                        You will receive SMS messages only when you request
                        account verification or password reset. Message
                        frequency varies based on your usage but is typically
                        limited to 1-3 messages per request. We do not send
                        recurring, promotional, or marketing messages.
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">
                        Message and Data Rates
                    </h3>
                    <p>
                        <strong>Message and data rates may apply.</strong>{" "}
                        Standard SMS charges from your mobile carrier will apply
                        to messages sent and received. Please check with your
                        mobile carrier for details about your messaging plan and
                        any associated charges.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    2. How to Get Help
                </h2>
                <p className="mb-4">
                    For support or questions about our SMS verification service,
                    you can:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>
                        Text <strong>HELP</strong> to our service number for
                        assistance
                    </li>
                    <li>Email us at: support@yourcompany.com</li>
                    <li>Call us at: [Your Support Phone Number]</li>
                    <li>Visit our help center at: [Your Help Center URL]</li>
                </ul>
                <p>
                    When you text <strong>HELP</strong>, you will receive a
                    message with information about how to contact support.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    3. How to Stop Messages (Opt-Out)
                </h2>
                <p className="mb-4">
                    <strong>
                        To stop receiving SMS messages from us, text STOP to our
                        service number at any time.
                    </strong>
                </p>
                <p className="mb-4">
                    When you text <strong>STOP</strong>, you will receive a
                    confirmation message indicating that you have been
                    unsubscribed. After this, you will no longer receive SMS
                    verification codes from us. Please note that opting out may
                    prevent you from using certain features of our service that
                    require SMS verification, such as password recovery.
                </p>
                <p className="mb-4">
                    You can always opt back in by attempting to verify your
                    account again, which will resume SMS delivery.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    4. Supported Carriers
                </h2>
                <p className="mb-4">
                    Our SMS service is available to users on all major U.S. and
                    Canadian carriers, including but not limited to: AT&T,
                    T-Mobile, Verizon, Sprint, Boost, Cricket, and U.S.
                    Cellular. Carriers are not liable for delayed or undelivered
                    messages.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    5. User Responsibilities
                </h2>
                <p className="mb-4">
                    By using our SMS verification service, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        Provide a valid phone number that you have access to
                    </li>
                    <li>
                        Maintain the security of verification codes sent to your
                        phone
                    </li>
                    <li>Not share verification codes with others</li>
                    <li>
                        Notify us if your phone number changes or is no longer
                        in your possession
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Privacy</h2>
                <p className="mb-4">
                    Your privacy is important to us. Please review our{" "}
                    <a
                        href="/privacy-policy"
                        className="text-blue-600 hover:underline"
                    >
                        Privacy Policy
                    </a>{" "}
                    to understand how we collect, use, and protect your phone
                    number and personal information.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    7. Service Availability
                </h2>
                <p className="mb-4">
                    While we strive to provide reliable SMS verification
                    services, we cannot guarantee uninterrupted or error-free
                    service. SMS delivery may be affected by factors outside our
                    control, including carrier issues, network congestion, or
                    device limitations.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    8. Limitation of Liability
                </h2>
                <p className="mb-4">
                    We are not responsible for any charges incurred from your
                    mobile carrier, delays in message delivery, or failure to
                    receive messages due to carrier or device issues.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    9. Changes to Terms
                </h2>
                <p className="mb-4">
                    We reserve the right to modify these Terms and Conditions at
                    any time. We will notify you of any material changes by
                    posting the updated terms on this page and updating the
                    "Last Updated" date.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    10. Contact Information
                </h2>
                <p className="mb-4">
                    If you have any questions about these Terms and Conditions,
                    please contact us:
                </p>
                <ul className="list-none space-y-1">
                    <li>Email: support@yourcompany.com</li>
                    <li>Phone: [Your Support Phone Number]</li>
                    <li>Address: [Your Company Address]</li>
                </ul>
            </section>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-3">Quick Reference</h3>
                <ul className="space-y-2">
                    <li>
                        <strong>For Help:</strong> Text <strong>HELP</strong> or
                        email support@yourcompany.com
                    </li>
                    <li>
                        <strong>To Opt-Out:</strong> Text <strong>STOP</strong>
                    </li>
                    <li>
                        <strong>Message Frequency:</strong> As needed for
                        verification (typically 1-3 messages per request)
                    </li>
                    <li>
                        <strong>Cost:</strong> Message and data rates may apply
                    </li>
                </ul>
            </div>
        </div>
    );
}
