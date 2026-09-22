import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of keystoneplants.com and purchases from Keystone Plant Provisions, including orders, returns, and liability.",
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
.legal-note { margin-top: 2.75rem; padding-top: 1.5rem; border-top: 1px solid var(--kn-line); color: var(--kn-muted); font-style: italic; line-height: 1.7; }
`;

export default function TermsPage(): React.ReactElement {
  return (
    <div className="legal-shell">
      <style>{css}</style>

      <header className="legal-header">
        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-updated">Last updated: September 11, 2026</p>
      </header>

      <div className="legal-prose">
        <p>
          Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;)
          carefully before using www.keystoneplants.com (the &quot;Site&quot;) or purchasing plants
          from Keystone Plant Provisions (&quot;Keystone Plants&quot;, &quot;we&quot;, &quot;us&quot;,
          or &quot;our&quot;).
        </p>
        <p>
          Your access to and use of the Site is conditioned on your acceptance of and compliance
          with these Terms. By accessing or using the Site, placing an order, or attending our
          pop-up sales, you agree to be bound by these Terms. If you disagree with any part of the
          terms, you may not access the Site or place orders.
        </p>

        <h2>About Keystone Plant Provisions</h2>
        <p>
          Keystone Plant Provisions is a native plant nursery based in Wyndmoor, Pennsylvania. We
          specialize in native plants for the Mid-Atlantic and Northeast regions, offering plants
          through online sales, pre-orders, and pop-up sales events. Contact:{" "}
          <a href="mailto:hello@keystoneplants.com">hello@keystoneplants.com</a>.
        </p>

        <h2>1. Use of the Site</h2>

        <h3>Permitted Use</h3>
        <p>You may use the Site to:</p>
        <ul>
          <li>Browse our plant catalog and plant list.</li>
          <li>Purchase plants online or place pre-orders for pop-up sales.</li>
          <li>Contact us about plant sourcing, custom orders, or gardening questions.</li>
          <li>Subscribe to our email newsletter.</li>
          <li>Follow us on linked social media platforms.</li>
        </ul>

        <h3>Prohibited Use</h3>
        <p>You may not:</p>
        <ul>
          <li>Use automated tools to scrape our plant catalog, pricing, or content without written permission.</li>
          <li>Attempt to interfere with the Site&apos;s security, functionality, or payment processing.</li>
          <li>Submit false or fraudulent order information.</li>
          <li>Use the Site for any unlawful purpose.</li>
          <li>Resell plants purchased from us in a manner that misrepresents their origin or quality.</li>
        </ul>
        <p>
          We reserve the right to refuse service, terminate accounts, or cancel orders at our
          discretion.
        </p>

        <h2>2. Products and Orders</h2>

        <h3>Plant Availability</h3>
        <p>
          All plant availability is subject to change. Our plant list is updated regularly, but
          specific species may sell out or become unavailable due to seasonality, growing
          conditions, or supply from our network of growers.
        </p>
        <ul>
          <li>
            <strong>Online Orders:</strong> Plants shown as &quot;in stock&quot; on the Site are
            available for purchase subject to the terms below.
          </li>
          <li>
            <strong>Pre-Orders:</strong> Pre-orders for pop-up sales must be placed by the stated
            deadline (typically Thursday before the sale). Pre-orders help us reserve plants for you
            but do not guarantee availability if unforeseen supply issues arise.
          </li>
          <li>
            <strong>Plant Sourcing:</strong> If you request plants we do not currently stock, we
            will make reasonable efforts to source them through our grower network. Sourcing
            requests do not guarantee availability or pricing until confirmed.
          </li>
        </ul>

        <h3>Pricing</h3>
        <p>
          All prices are listed in US Dollars (USD) and do not include applicable sales tax, which
          will be calculated at checkout based on your location. Prices are subject to change
          without notice. If a pricing error occurs, we reserve the right to cancel the order and
          refund any payment made.
        </p>

        <h3>Payment</h3>
        <p>
          We accept payment through Stripe or Square (processed via Squarespace). Payment is
          required at the time of purchase. We do not accept checks, money orders, or cash for
          online orders.
        </p>

        <h3>Shipping and Delivery</h3>
        <ul>
          <li>
            <strong>Shipping:</strong> We ship plants to addresses within the continental United
            States. Shipping costs are calculated at checkout based on destination, order size, and
            carrier rates. We typically ship Monday through Wednesday to minimize transit time.
          </li>
          <li>
            <strong>Local Pickup:</strong> If you select pickup at a pop-up sale, you must collect
            your order during the specified event hours. Orders not collected may be forfeited or
            subject to a re-stocking fee.
          </li>
          <li>
            <strong>Plant Condition on Arrival:</strong> We pack plants carefully to survive
            transit, but live plants are perishable. If your plants arrive damaged, see our Returns
            section below.
          </li>
        </ul>

        <h2>3. Returns and Refunds</h2>

        <h3>Live Plants</h3>
        <p>Because plants are living, perishable items, we handle returns on a case-by-case basis:</p>
        <ul>
          <li>
            <strong>Damaged in Transit:</strong> If your plants arrive severely damaged or dead,
            contact us at{" "}
            <a href="mailto:hello@keystoneplants.com">hello@keystoneplants.com</a> within 48 hours
            of delivery with photos. We will issue a replacement (if available) or a full refund.
          </li>
          <li>
            <strong>Incorrect Item:</strong> If you receive the wrong plant, contact us within 48
            hours of delivery. We will arrange a replacement and cover return shipping for the
            incorrect item.
          </li>
          <li>
            <strong>Change of Mind:</strong> We do not accept returns for change of mind or if a
            plant fails to thrive after planting, as plant health depends on proper planting, soil
            conditions, watering, and climate — factors beyond our control once the plant leaves our
            care.
          </li>
          <li>
            <strong>Pop-Up Sale Purchases:</strong> Plants purchased in person at pop-up sales are
            final sale unless clearly defective at the time of purchase.
          </li>
        </ul>

        <h3>Refund Processing</h3>
        <p>
          Approved refunds will be processed to the original payment method within 5-10 business
          days. Refund timing may vary depending on your bank or card issuer.
        </p>

        <h2>4. Plant Care and Disclaimer</h2>

        <h3>Gardening Success</h3>
        <p>
          We provide general planting and care guidance on our Site, via email, and at pop-up
          events. However:
        </p>
        <ul>
          <li>
            <strong>Individual Results Vary:</strong> Plant health and survival depend on soil type,
            sunlight, drainage, watering practices, local climate, pests, and other factors outside
            our control.
          </li>
          <li>
            <strong>No Guarantee:</strong> We do not guarantee that any plant will thrive in your
            specific garden conditions.
          </li>
          <li>
            <strong>Regional Appropriateness:</strong> While we focus on native plants suited to the
            Mid-Atlantic and Northeast, it is your responsibility to verify that a species is
            appropriate for your specific ecoregion, soil type, and light conditions.
          </li>
          <li>
            <strong>Invasive Potential:</strong> Some native plants can spread aggressively in
            certain conditions. Research each species&apos; growth habits before planting.
          </li>
        </ul>

        <h3>Not Professional Advice</h3>
        <p>
          Information on our Site about plant selection, garden design, and ecology is for
          educational purposes only and does not constitute professional landscaping, ecological
          restoration, or legal advice (e.g., regarding local ordinances or invasive species
          regulations).
        </p>

        <h2>5. Intellectual Property</h2>

        <h3>Our Content</h3>
        <p>
          All content on the Site — including plant descriptions, photographs, logos, and written
          guides — is the property of Keystone Plant Provisions or its content creators and is
          protected by copyright and trademark law.
        </p>
        <p>You may:</p>
        <ul>
          <li>View and share links to our pages on social media.</li>
          <li>Quote brief excerpts with proper attribution and a link back.</li>
        </ul>
        <p>You may not:</p>
        <ul>
          <li>
            Copy our full plant descriptions or photographs to build a competing nursery catalog or
            directory without written permission.
          </li>
          <li>Use our logo or branding without prior written consent.</li>
          <li>Remove watermarks or attribution from images.</li>
        </ul>

        <h3>User Content</h3>
        <p>
          If you submit photos of plants purchased from us, garden designs, or testimonials, you
          grant us a non-exclusive, royalty-free license to use that content on our Site, social
          media, and marketing materials with proper attribution (unless you request anonymity).
        </p>

        <h2>6. Third-Party Services</h2>
        <p>Our Site uses:</p>
        <ul>
          <li>
            <strong>Squarespace:</strong> For website hosting and e-commerce functionality.
          </li>
          <li>
            <strong>Stripe / Square:</strong> For payment processing.
          </li>
          <li>
            <strong>Google Sheets:</strong> For our public plant list.
          </li>
          <li>
            <strong>Instagram:</strong> For social media embedding and photos.
          </li>
          <li>
            <strong>Google Maps:</strong> For directions to pop-up sale locations.
          </li>
        </ul>
        <p>
          Each third-party service has its own terms and privacy practices. We are not responsible
          for their services, content, or data handling.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law:</p>
        <ul>
          <li>
            Keystone Plant Provisions and its owners shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages.
          </li>
          <li>
            Our total liability for any claim arising from your use of the Site or purchase of
            plants shall not exceed the total amount you paid to us in the 12 months preceding the
            claim, or $500, whichever is greater.
          </li>
          <li>
            We are not liable for plant loss or damage caused by improper planting, weather events,
            pests, disease, or conditions outside our control after delivery or pickup.
          </li>
        </ul>

        <h2>8. Disclaimer of Warranties</h2>
        <p>
          The Site and all products are provided <strong>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot;</strong>{" "}
          without warranties of any kind, either express or implied, including but not limited to
          merchantability, fitness for a particular purpose, or non-infringement.
        </p>
        <p>We do not warrant that:</p>
        <ul>
          <li>The Site will be uninterrupted, timely, secure, or error-free.</li>
          <li>Plant descriptions will be perfectly accurate for every garden condition.</li>
          <li>Any errors in content will be corrected immediately.</li>
        </ul>

        <h2>9. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the
          Commonwealth of Pennsylvania, United States, without regard to its conflict of law
          provisions.
        </p>
        <p>
          Any dispute arising from these Terms shall first be attempted to be resolved through
          good-faith negotiation. If unresolved, disputes shall be submitted to binding arbitration
          in Montgomery County, Pennsylvania, under the rules of the American Arbitration
          Association.
        </p>

        <h2>10. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Changes will be effective
          immediately upon posting to the Site with an updated &quot;Last updated&quot; date. Your
          continued use of the Site after changes constitutes acceptance of the new Terms. For
          material changes, we will post a notice on the Site for 30 days.
        </p>

        <h2>11. Severability</h2>
        <p>
          If any provision of these Terms is held invalid or unenforceable, the remaining provisions
          will continue in full force and effect.
        </p>

        <h2>12. Entire Agreement</h2>
        <p>
          These Terms, together with our <Link href="/privacy">Privacy Policy</Link>, constitute the
          entire agreement between you and Keystone Plant Provisions regarding the Site and
          supersede any prior agreements.
        </p>
      </div>

      <p className="legal-note">
        Keystone Plant Provisions — Wyndmoor, Pennsylvania. Connecting people to native plants since
        2024. Thank you for supporting local, native plant gardening.
      </p>
    </div>
  );
}
