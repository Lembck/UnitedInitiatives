export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

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
                    1. Information We Collect
                </h2>
                <p className="mb-4">
                    We collect the following information when you use our
                    service:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Phone Number:</strong> We collect your phone
                        number solely for account verification and password
                        reset purposes.
                    </li>
                    <li>
                        <strong>SMS Messages:</strong> We send SMS verification
                        codes to your phone number to verify your identity and
                        enable password recovery.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    2. How We Use Your Information
                </h2>
                <p className="mb-4">
                    Your phone number is used exclusively for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Verifying your identity during account creation</li>
                    <li>Sending password reset verification codes</li>
                    <li>
                        Securing your account through two-factor authentication
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    3. Information Sharing and Third Parties
                </h2>
                <p className="mb-4">
                    <strong>
                        We do not share, sell, rent, or trade your phone number
                        or any personal information with third parties for
                        marketing purposes.
                    </strong>
                </p>
                <p className="mb-4">
                    We use Twilio as our SMS service provider to deliver
                    verification codes. Twilio processes your phone number
                    solely to deliver our messages and operates under strict
                    data protection agreements. Your information is not used by
                    Twilio for their own marketing purposes.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    4. Marketing Communications
                </h2>
                <p className="mb-4">
                    <strong>
                        We will never use your phone number for marketing,
                        promotional, or advertising purposes.
                    </strong>{" "}
                    You will only receive transactional messages related to
                    account verification and password recovery.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    5. Data Security
                </h2>
                <p className="mb-4">
                    We implement industry-standard security measures to protect
                    your phone number and personal information from unauthorized
                    access, disclosure, alteration, or destruction. Your data is
                    encrypted both in transit and at rest.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    6. Data Retention
                </h2>
                <p className="mb-4">
                    We retain your phone number only as long as necessary to
                    provide account verification services and comply with legal
                    obligations. You may request deletion of your phone number
                    by contacting us.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of SMS messages at any time</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    8. Children's Privacy
                </h2>
                <p className="mb-4">
                    Our service is not intended for children under 13 years of
                    age. We do not knowingly collect personal information from
                    children under 13.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    9. Changes to This Privacy Policy
                </h2>
                <p className="mb-4">
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Last Updated" date.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
                <p className="mb-4">
                    If you have any questions about this Privacy Policy, please
                    contact us at:
                </p>
                <ul className="list-none space-y-1">
                    <li>Email: privacy@yourcompany.com</li>
                    <li>Phone: [Your Support Phone Number]</li>
                    <li>Address: [Your Company Address]</li>
                </ul>
            </section>
        </div>
    );
}
