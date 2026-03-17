import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonical, type = 'website' }) => {
    const siteTitle = 'JN Shah Associates | Financial Excellence';
    const fullTitle = title ? `${title} | JN Shah Associates` : siteTitle;
    const defaultDescription = 'JN Shah Associates is a multi-generational CA firm in Vadodara, Gujarat, providing professional audit, taxation, and business advisory services with integrity and excellence.';
    const metaDescription = description || defaultDescription;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* OpenGraph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:site_name" content="JN Shah Associates" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />

            {/* JSON-LD Structured Data for CA Firm */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "AccountingService",
                    "name": "JN Shah Associates",
                    "alternateName": "JN Shah Associates",
                    "description": defaultDescription,
                    "logo": "https://jnshah.com/logo.png", // Replace with real logo URL later
                    "url": "https://jnshah.com",
                    "telephone": "+91-7622811384",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "8th Floor, Sandesh Bhavan, Near Vuda Circle (L & T Circle), Jalaram Nagar 1, Karelibaug",
                        "addressLocality": "Vadodara",
                        "addressRegion": "Gujarat",
                        "postalCode": "390008",
                        "addressCountry": "IN"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": "22.5028",
                        "longitude": "73.4682"
                    },
                    "founder": [
                        {
                            "@type": "Person",
                            "name": "CA Nayan Shah"
                        },
                        {
                            "@type": "Person",
                            "name": "CA Jay Shah"
                        }
                    ],
                    "areaServed": "India",
                    "priceRange": "$$"
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
