import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Keystone Plant Provisions collects, uses, and protects your information when you visit keystoneplants.com, place an order, or attend our pop-up sales.",
};

const css = `
.legal-shell { width: min(760px, calc(100% - 2rem)); margin: 0 auto; padding: clamp(2.5rem, 6vw, 5rem) 0 clamp(5rem, 8vw, 8rem); color: var(--kn-ink); }
.legal-header { border-bottom: 1px solid var(--kn-line); padding-bottom: 1.75rem; margin-bottom: .5rem; }
.legal-title { margin: 0; color: var(--kn-green); font-family: var(--font-fraunces), serif; font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 570; letter-spacing: -.045em; line-height: 1.02; }
.legal-updated { margin: .8rem 0 0; color: var(--kn-terra); font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }

.legal-prose { margin-top: 2rem; }
.legal-prose h2 { margin: 2.5rem 0 .8rem; color: var(--kn-green); font-family: var(--font-fraunces), serif; font-size: 1.45rem; font-weight: 600; letter-spacing: -.02em; line-height: 1.15; }
.legal-prose h3 { margin: 1.7rem 0 .55rem; color: var(--kn-green2); font-family: var(--font-fraunces), serif; font-size: 1.15rem; font-weight: 600; }
.legal-prose p { margin: .9rem 0; color: var(--kn-muted); line-height: 1.75; }
.legal-prose ul, .legal-prose ol { margin: .9rem 0; padding-left: 1.45rem; color: var(--kn-muted); }
.legal-prose li { margin: .45rem 0; line-height: 1.65; }
.legal-prose li::marker { color: var(--kn-ochre); }
.legal-prose a { color: var(--kn-green); font-weight: 700; text-decoration: underline; text-decoration-color: var(--kn-ochre); text-underline-offset: .2em; }
.legal-prose a:hover { color: var(--kn-terra); }
.legal-prose strong { color: var(--kn-ink); }
.legal-prose table { width: 100%; border-collapse: collapse; margin: 1.25rem 0; font-size: .9rem; }
.legal-prose th, .legal-prose td { border: 1px solid var(--kn-line); padding: .7rem .85rem; text-align: left; vertical-align: top; }
.legal-prose th { background: color-mix(in srgb, var(--kn-surface) 85%, transparent); color: var(--kn-green); font-weight: 700; }
.legal-prose td { color: var(--kn-muted); }
.legal-note { margin-top: 2.75rem; padding-top: 1.5rem; border-top: 1px solid var(--kn-line); color: var(--kn-muted); font-style: italic; line-height: 1.7; }
`;

export default function PrivacyPage(): React.ReactElement {
  return (
    <div className="legal-shell">
      <style>{css}</style>

      <header className="legal-header">
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last updated: September 11, 2026</p>
      </header>

      <div className="legal-prose">
        <p>
          Keystone Plant Provisions (&quot;Keystone Plants&quot;, &quot;we&quot;, &quot;us&quot;, or
          &quot;our&quot;) respects your privacy. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit www.keystoneplants.com (the
          &quot;Site&quot;), place an order, attend our pop-up sales, or interact with us.
        </p>

        <h2>Contact Us</h2>
        <p>
          <strong>Keystone Plant Provisions</strong>
          <br />
          Email: <a href="mailto:hello@keystoneplants.com">hello@keystoneplants.com</a>
          <br />
          Location: Wyndmoor, PA
          <br />
          Instagram:{" "}
          <a href="https://www.instagram.com/keystoneplantprovisions">
            @keystoneplantprovisions
          </a>
        </p>
        <p>We aim to respond within 48 hours.</p>

        <h2>Information We Collect</h2>

        <h3>Information You Provide Directly</h3>
        <ul>
          <li>
            <strong>Order Information:</strong> When you purchase plants online or pre-order for
            pop-up sales, we collect your name, shipping address, billing address, email address,
            phone number, and payment details (processed securely by our payment processor — we do
            not store full credit card numbers).
          </li>
          <li>
            <strong>Plant Inquiries:</strong> When you contact us via email or our contact form
            about plant sourcing, custom orders, or availability, we collect your name, email, and
            the details of your request.
          </li>
          <li>
            <strong>Pop-Up Sale Pre-Orders:</strong> If you place a pre-order for pickup at one of
            our pop-up events, we collect your name, email, order details, and pickup preferences.
          </li>
          <li>
            <strong>Newsletter Signups:</strong> If you subscribe to our email list, we collect your
            email address and, optionally, your name and gardening interests.
          </li>
          <li>
            <strong>Social Media Interactions:</strong> If you interact with us on Instagram or
            other social platforms, we may see your public profile information and messages you send
            us.
          </li>
        </ul>

        <h3>Information Collected Automatically</h3>
        <p>Our Site is hosted on Squarespace, which automatically collects certain data:</p>
        <ul>
          <li>
            <strong>Usage Data:</strong> Pages visited, time on site, referral sources, click
            patterns, and approximate geographic location (city/region level).
          </li>
          <li>
            <strong>Device Data:</strong> Browser type, operating system, screen resolution, and
            language preferences.
          </li>
          <li>
            <strong>Cookies:</strong> Squarespace places cookies for essential site functionality,
            analytics, and security. We do not currently use third-party advertising cookies, but may
            add analytics tools (such as Google Analytics) in the future. If we do, we will update
            this policy and re-collect consent where required.
          </li>
        </ul>

        <h3>Information from Third Parties</h3>
        <ul>
          <li>
            <strong>Payment Processors:</strong> Stripe or Square (via Squarespace) processes your
            payment and shares transaction confirmation with us.
          </li>
          <li>
            <strong>Shipping Partners:</strong> If we ship plants to you, we share your address and
            contact information with our delivery carrier (e.g., USPS, UPS, or local courier).
          </li>
          <li>
            <strong>Google Sheets:</strong> Our public plant list is hosted on Google Sheets.
            Viewing the sheet is subject to Google&apos;s privacy practices.
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ol>
          <li>
            <strong>Fulfill orders:</strong> Process payments, prepare plant orders, coordinate
            pickup or delivery, and send order confirmations and shipping notifications.
          </li>
          <li>
            <strong>Communicate with you:</strong> Respond to plant inquiries, notify you of
            upcoming pop-up sales, share gardening tips (if you subscribe), and inform you of order
            status.
          </li>
          <li>
            <strong>Improve our offerings:</strong> Understand which plants are most popular,
            optimize our plant list, and plan future sales events.
          </li>
          <li>
            <strong>Maintain the Site:</strong> Ensure the website functions properly, prevent
            fraud, and protect against security threats.
          </li>
          <li>
            <strong>Comply with legal obligations:</strong> Tax reporting, record keeping, and
            responding to lawful requests.
          </li>
        </ol>

        <h2>Cookies and Tracking</h2>

        <h3>What Are Cookies</h3>
        <p>
          Cookies are small text files stored on your device that help websites function and
          remember your preferences.
        </p>

        <h3>Cookies We Use</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Purpose</th>
              <th>Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Essential</strong>
              </td>
              <td>Required for core functionality</td>
              <td>Shopping cart, checkout flow, session state</td>
            </tr>
            <tr>
              <td>
                <strong>Analytics</strong>
              </td>
              <td>Understand visitor behavior</td>
              <td>Squarespace Analytics, Google Analytics (if enabled)</td>
            </tr>
            <tr>
              <td>
                <strong>Security</strong>
              </td>
              <td>Protect against fraud and abuse</td>
              <td>Squarespace security cookies, CAPTCHA</td>
            </tr>
            <tr>
              <td>
                <strong>Functional</strong>
              </td>
              <td>Remember your preferences</td>
              <td>Plant list view settings, region selection</td>
            </tr>
          </tbody>
        </table>

        <h3>Your Choices</h3>
        <p>
          Most web browsers allow you to control cookies through their settings. You can delete
          existing cookies and block future cookies, though this may affect your ability to use
          certain features like the shopping cart.
        </p>
        <p>
          If we add advertising or advanced analytics cookies in the future, we will display a
          cookie consent banner allowing you to accept or reject non-essential cookies.
        </p>

        <h2>How We Share Your Information</h2>
        <p>We do not sell your personal information. We share data only in the following circumstances:</p>
        <ul>
          <li>
            <strong>Squarespace:</strong> Our website platform, which hosts the Site and processes
            some data on our behalf.
          </li>
          <li>
            <strong>Payment Processors:</strong> Stripe or Square processes your payment securely.
            We receive confirmation of payment but do not see your full credit card details.
          </li>
          <li>
            <strong>Shipping Carriers:</strong> USPS, UPS, or local couriers receive your shipping
            address and contact information to deliver your plants.
          </li>
          <li>
            <strong>Service Providers:</strong> Email marketing platforms (if we use one),
            accounting software, and customer support tools.
          </li>
          <li>
            <strong>Legal Compliance:</strong> When required by law, subpoena, or to protect our
            rights, safety, or property.
          </li>
          <li>
            <strong>Business Transfers:</strong> If Keystone Plant Provisions is acquired or merged,
            customer information may be transferred as part of that transaction.
          </li>
        </ul>

        <h2>Data Security</h2>
        <p>We implement reasonable measures to protect your information:</p>
        <ul>
          <li>Our Site uses HTTPS/TLS encryption for all data transmission.</li>
          <li>
            Payment processing is handled by PCI-compliant providers (Stripe/Square); we never
            store your full credit card numbers.
          </li>
          <li>
            Access to customer data is limited to the owners and any authorized team members who
            need it to fulfill orders.
          </li>
        </ul>
        <p>
          No internet transmission is 100% secure. While we strive to protect your data, we cannot
          guarantee absolute security.
        </p>

        <h2>Data Retention</h2>
        <ul>
          <li>
            <strong>Order and Payment Data:</strong> Retained for 7 years for tax and accounting
            purposes, as required by law.
          </li>
          <li>
            <strong>Email Correspondence:</strong> Retained for 2 years unless you request deletion.
          </li>
          <li>
            <strong>Newsletter Subscriptions:</strong> Retained until you unsubscribe. Unsubscribe
            links are included in every email.
          </li>
          <li>
            <strong>Analytics Data:</strong> Retained according to our analytics provider&apos;s
            policies (typically 26 months for Google Analytics).
          </li>
        </ul>

        <h2>Your Privacy Rights</h2>
        <p>Depending on your location, you may have the following rights:</p>

        <h3>For All Users</h3>
        <ul>
          <li>
            <strong>Access:</strong> Request a copy of the personal data we hold about you.
          </li>
          <li>
            <strong>Correction:</strong> Request that we correct inaccurate or incomplete data.
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your personal data, subject to legal
            retention requirements (e.g., tax records).
          </li>
          <li>
            <strong>Objection:</strong> Object to receiving marketing emails by clicking
            &quot;unsubscribe&quot; in any email.
          </li>
        </ul>

        <h3>For California Residents (CCPA)</h3>
        <p>You have the right to:</p>
        <ul>
          <li>Know what personal information we collect and how we use it.</li>
          <li>
            Request deletion of your personal information (with exceptions for legal obligations).
          </li>
          <li>Opt out of the sale of personal information (we do not sell personal information).</li>
          <li>Non-discrimination for exercising your privacy rights.</li>
        </ul>
        <p>
          To exercise CCPA rights, email{" "}
          <a href="mailto:hello@keystoneplants.com">hello@keystoneplants.com</a> with &quot;CCPA
          Request&quot; in the subject line.
        </p>

        <h3>For Pennsylvania and Other US Residents</h3>
        <p>
          Pennsylvania law requires us to notify you of any data breaches affecting your personal
          information. We will comply with all applicable state breach notification laws.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Keystone Plant Provisions is not directed at children under 13. We do not knowingly
          collect personal information from children under 13. If you believe we have inadvertently
          collected such data, contact us immediately at{" "}
          <a href="mailto:hello@keystoneplants.com">hello@keystoneplants.com</a> and we will delete
          it.
        </p>

        <h2>Third-Party Links</h2>
        <p>Our Site contains links to:</p>
        <ul>
          <li>Our public plant list on Google Sheets</li>
          <li>Our Instagram profile and other social media</li>
          <li>Google Maps for directions to pop-up sale locations</li>
          <li>Partner nurseries or growers (if listed)</li>
        </ul>
        <p>
          Each of these has its own privacy policy. We encourage you to review them before providing
          personal information.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy periodically. The &quot;Last updated&quot; date at the
          top will reflect the most recent revision. For material changes, we will post a notice on
          the Site for 30 days.
        </p>

        <h2>Compliance Statement</h2>
        <p>Keystone Plant Provisions complies with applicable privacy laws including:</p>
        <ul>
          <li>California Consumer Privacy Act (CCPA)</li>
          <li>Pennsylvania Breach of Personal Information Notification Act</li>
          <li>Federal Trade Commission (FTC) guidelines on data practices</li>
          <li>Children&apos;s Online Privacy Protection Act (COPPA)</li>
        </ul>
      </div>

      <p className="legal-note">
        Keystone Plant Provisions is a native plant nursery based in Wyndmoor, Pennsylvania. Thank
        you for trusting us with your information and for supporting native plant gardening.
      </p>
    </div>
  );
}
