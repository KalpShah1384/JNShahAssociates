import { motion } from "framer-motion";
import { Star, TrendingUp, Award, Users, Target, CheckCircle, MessageSquare, ArrowRight, Calculator, Shield, Zap, Trophy, Building2, Briefcase } from "lucide-react";

const SuccessStories = () => {
  const successStories = [
    {
      id: 1,
      company: "TechStart Solutions",
      industry: "Technology",
      challenge: "Complex international tax compliance for a rapidly growing SaaS company",
      solution: "Implemented automated tax compliance system and international tax optimization",
      results: [
        "80% reduction in compliance time",
        "₹25 lakh annual tax savings through proper structuring",
        "Eliminated all tax audit risks"
      ],
      testimonial: "JN Shah Associates transformed our tax compliance from a nightmare to a seamless process. Their expertise in international tax law saved us significant costs and gave us peace of mind to focus on growing our business.",
      clientName: "Rajesh Kumar",
      position: "CEO",
      rating: 5,
      metrics: {
        savings: "₹25L",
        timeReduction: "80%",
        complianceScore: "100%"
      }
    },
    {
      id: 2,
      company: "GreenField Manufacturing",
      industry: "Manufacturing",
      challenge: "Inaccurate tax filings leading to penalties and cash flow issues",
      solution: "Comprehensive tax audit, penalty resolution, and improved compliance processes",
      results: [
        "₹50 lakh in tax refunds and penalty waivers",
        "Zero compliance violations for 3 years",
        "Improved cash flow management"
      ],
      testimonial: "The team's meticulous approach to our tax audit resulted in substantial savings and a solid foundation for future compliance. Their attention to detail is exceptional.",
      clientName: "Priya Sharma",
      position: "Finance Director",
      rating: 5,
      metrics: {
        savings: "₹50L",
        compliancePeriod: "3 years",
        auditSuccess: "100%"
      }
    },
    {
      id: 3,
      company: "RetailMax Stores",
      industry: "Retail",
      challenge: "Delayed GST refunds causing working capital constraints",
      solution: "Streamlined GST compliance and refund claim optimization",
      results: [
        "3-month average refund processing time",
        "₹2.5 crore additional working capital unlocked",
        "100% accurate GST filings"
      ],
      testimonial: "Their GST expertise helped us unlock significant working capital that was tied up in delayed refunds. The team's proactive approach made all the difference.",
      clientName: "Amit Patel",
      position: "Operations Head",
      rating: 5,
      metrics: {
        capitalUnlocked: "₹2.5Cr",
        processingTime: "3 months",
        accuracy: "100%"
      }
    },
    {
      id: 4,
      company: "Prime Properties",
      industry: "Real Estate",
      challenge: "Complex tax audit with potential ₹10 crore liability",
      solution: "Comprehensive audit defense and tax planning strategy",
      results: [
        "₹10 crore liability completely eliminated",
        "Successful audit defense with zero penalties",
        "Long-term tax optimization strategy implemented"
      ],
      testimonial: "Facing a major tax audit was terrifying, but JN Shah Associates' strategic approach turned a potential disaster into a complete victory. Their expertise is unmatched.",
      clientName: "Sunita Reddy",
      position: "Managing Director",
      rating: 5,
      metrics: {
        liabilityEliminated: "₹10Cr",
        auditOutcome: "Victory",
        penaltyAmount: "₹0"
      }
    },
    {
      id: 5,
      company: "EcomExpress India",
      industry: "E-commerce",
      challenge: "Inconsistent tax treatment across multiple marketplaces and jurisdictions",
      solution: "Unified tax compliance framework and automated reporting system",
      results: [
        "60% reduction in compliance costs",
        "Real-time tax compliance monitoring",
        "Cross-border tax optimization"
      ],
      testimonial: "Managing taxes across multiple platforms was overwhelming. JN Shah Associates created a seamless system that handles everything automatically while ensuring full compliance.",
      clientName: "Vikram Singh",
      position: "Founder & CEO",
      rating: 5,
      metrics: {
        costReduction: "60%",
        compliance: "Real-time",
        optimization: "Cross-border"
      }
    }
  ];

  const overallStats = {
    totalSavings: "₹1.25Cr+",
    clientsServed: "500+",
    complianceRate: "99.9%",
    auditSuccess: "95%"
  };

  return (
    <div className="bg-gray-50 pt-28 pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Trophy className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-gray-900">Client Success Stories</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real clients. See how we've helped businesses across industries
            achieve financial success through expert accounting and tax services.
          </p>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {Object.entries(overallStats).map(([key, value]) => (
            <div key={key} className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
              <div className="text-sm text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Success Stories */}
        <div className="space-y-12">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
              {/* Story Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{story.company}</h3>
                    <p className="text-blue-100">{story.industry} Industry</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(story.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold">{value}</div>
                      <div className="text-xs text-blue-100 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Challenge & Solution */}
                  <div>
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                        <Target className="w-5 h-5 text-red-500" />
                        <span>Challenge</span>
                      </h4>
                      <p className="text-gray-600">{story.challenge}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Solution</span>
                      </h4>
                      <p className="text-gray-600">{story.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                      <span>Key Results</span>
                    </h4>
                    <ul className="space-y-3">
                      {story.results.map((result, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <MessageSquare className="w-8 h-8 text-blue-500 mb-4" />
                  <blockquote className="text-gray-700 italic text-lg mb-4">
                    "{story.testimonial}"
                  </blockquote>
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-gray-500" />
                    <cite className="text-gray-900 font-medium">
                      {story.clientName}, {story.position}
                    </cite>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Success Stories?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let's discuss how we can help your business achieve similar results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
              <span>Schedule Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Our Services
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SuccessStories;
