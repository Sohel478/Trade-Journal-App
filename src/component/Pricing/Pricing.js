
// import React from 'react';
// import { Container, Row, Col, Card, Button} from 'react-bootstrap';
// import { FaChartLine, FaShieldAlt, FaUsers } from 'react-icons/fa';
// import { BiDollarCircle } from 'react-icons/bi';
// import './Pricing.css';
// import Footer from '../Footer/Footer';
// import Navigation from '../Home/Naviagtion';

// const GreenTickIcon = () => (
//   <img src='https://duzycfafl38re.cloudfront.net/Website/Images/tick2311202217560924112022100903.png' alt='network error'/>
// );


// const PricingPage = () => {


//   const features = [
//     { icon: <FaChartLine />, title: 'Advanced Charts', description: 'Visualize market trends with interactive charts.' },
//     { icon: <BiDollarCircle />, title: 'Real-time Data', description: 'Stay updated with live pricing and market data.' },
//     { icon: <FaShieldAlt />, title: 'Secure Transactions', description: 'Ensuring the safety of your financial transactions.' },
//     { icon: <FaUsers />, title: 'Expert Support', description: 'Access priority support from our expert team.' },
//   ];


//   const plans = [
//     {
//       title: 'Basic Plan',
//       features: [
//         { icon: <GreenTickIcon />, text: 'Essential Features' },
//         { icon: <GreenTickIcon />, text: 'Real-time Market Data' },
//         { icon: <GreenTickIcon /> , text: 'Limited Analytics Tools' },
//         { icon: <GreenTickIcon /> , text: 'Market Breadth' },
//         { icon: <GreenTickIcon /> , text: 'Pre-Defined Trading Strategies' },
//         { icon: <GreenTickIcon /> , text: 'Investment Ideas' },
//         { icon: <GreenTickIcon /> , text: 'Derivative Analytics' },
//         { icon: <GreenTickIcon /> , text: 'Combination Scans' },
//         { icon: <GreenTickIcon /> , text: 'Company Filings' },
//         { icon: <GreenTickIcon />, text: 'Access to interactive Edge Chart' },
//         { icon: <GreenTickIcon />, text: 'Tab Customization' },

//       ],
//       price: '$9.99/month',
//       color: 'dark',
//     },
//     // {
//     //   title: 'Pro Plan',
//     //   features: [
//     //     { icon: <FaChartLine />, text: 'Advanced Trading Features' },
//     //     { icon: <FaShieldAlt />, text: 'Comprehensive Analytics' },
//     //     { icon: <FaUsers />, text: 'Priority Customer Support' },
//     //   ],
//     //   price: '$19.99/month',
//     //   color: 'dark',
//     // },
//     { 
//       title: 'Premium Plan',
//       features: [
//         { icon: <GreenTickIcon />, text: 'Full Access to All Features' },
//         { icon: <GreenTickIcon />, text: 'Personalized Analytics Dashboard' },
//         { icon: <GreenTickIcon />, text: '24/7 Premium Support' },
//         { icon: <GreenTickIcon />, text: 'Technical Peer Comparison' },
//         { icon: <GreenTickIcon />, text: 'Sectoral/Company analysis' },
//         { icon: <GreenTickIcon />, text: 'Trading and Investment ideas' },
//       ],
//       price: '$29.99/month',
//       color: 'dark',
//     },
//   ];

//   return (
//     <div>
//       <Navigation />
//       {/* Hero Section with Banner */}
//       <div className="hero-banner" >
//         <Container className="py-5 text-center">
//           <h1 className="display-4">Empower Your Trading Journey</h1>
//           <p className="lead">Unlock advanced features and make informed decisions in the financial markets.</p>
//           <Button variant="primary" size="lg">
//             Get Started
//           </Button>
//         </Container>
//       </div>

//       {/* Features Section */}
//       {/* <Container id="features" className="py-5"> */}
//       <Container id="features"  className="py-5">
//         <h2 className="text-center mb-4">Key Features</h2>
//         <Row className="justify-content-center">
//           {features.map((feature, index) => (
//             <Col key={index} md={4} className="mb-4">
//               <Card className="text-center">
//                 <Card.Body>
//                   <Card.Title>{feature.icon}</Card.Title>
//                   <Card.Title>{feature.title}</Card.Title>
//                   <Card.Text>{feature.description}</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>

//       {/* Pricing Section */}
//       <Container className="mt-5 pricing-section" id="pricing">
//   <h2 className="text-center mb-4">Choose Your Plan</h2>
//   <Row className="justify-content-center">
//     {plans.map((plan, index) => (
//       <Col key={index} md={4} className="mb-4">
//         <Card className={`text-center pricing-card`} style={{ background: '#fff', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
//           <Card.Header className="pricing-card-header">
//             <h3 className="pricing-card-title">{plan.title}</h3>
//           </Card.Header>
//           <Card.Body className="pricing-card-body">
//             <ul className="pricing-card-features">
//               {plan.features.map((feature, i) => (
//                 <li key={i} className="pricing-card-feature">
//                   <span className="pricing-card-feature-icon">{feature.icon}</span>
//                   {feature.text}
//                 </li>
//               ))}
//             </ul>
//             <Card.Text className="pricing-card-price">{plan.price}</Card.Text>
//           </Card.Body>
//           <Button variant={plan.color} block>
//            Buy Now
//           </Button>
//         </Card>
//       </Col>
//     ))}
//   </Row>
// </Container>

//       {/* Contact Section */}
//       <Container id="contact" className="py-5 text-center">
//         <h2 className="mb-4">Contact Us</h2>
//         <p>Have questions or need assistance? Reach out to our support team.</p>
//         <Button variant="primary" size="lg">
//           Contact Support
//         </Button>
//       </Container>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default PricingPage;


import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaChartLine, FaShieldAlt, FaUsers } from 'react-icons/fa';
import { BiDollarCircle } from 'react-icons/bi';
import './Pricing.css';
// import Footer from '../Footer/Footer';
// import Navigation from '../Home/Naviagtion';

const GreenTickIcon = () => (
  <img src='https://duzycfafl38re.cloudfront.net/Website/Images/tick2311202217560924112022100903.png' alt='network error' />
);

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const handlePlanToggle = (value) => {
    setSelectedPlan(value);
  };

  const plans = [
    {
      title: 'Basic Plan',
      features: [
        { icon: <GreenTickIcon />, text: 'Essential Features' },
        { icon: <GreenTickIcon />, text: 'Real-time Market Data' },
        { icon: <GreenTickIcon />, text: 'Limited Analytics Tools' },
        { icon: <GreenTickIcon />, text: 'Market Breadth' },
        { icon: <GreenTickIcon />, text: 'Pre-Defined Trading Strategies' },
        { icon: <GreenTickIcon />, text: 'Investment Ideas' },
        { icon: <GreenTickIcon />, text: 'Derivative Analytics' },
        { icon: <GreenTickIcon />, text: 'Combination Scans' },
        { icon: <GreenTickIcon />, text: 'Company Filings' },
        { icon: <GreenTickIcon />, text: 'Access to interactive Edge Chart' },
        { icon: <GreenTickIcon />, text: 'Tab Customization' },
      ],
      monthlyPrice: '$9.99',
      yearlyPrice: '$99.99',
    },
    {
      title: 'Premium Plan',
      features: [
        { icon: <GreenTickIcon />, text: 'Full Access to All Features' },
        { icon: <GreenTickIcon />, text: 'Personalized Analytics Dashboard' },
        { icon: <GreenTickIcon />, text: '24/7 Premium Support' },
        { icon: <GreenTickIcon />, text: 'Technical Peer Comparison' },
        { icon: <GreenTickIcon />, text: 'Sectoral/Company analysis' },
        { icon: <GreenTickIcon />, text: 'Trading and Investment ideas' },
      ],
      monthlyPrice: '$29.99',
      yearlyPrice: '$299.99',
    },
  ];

  return (
    <div>
      {/* <Navigation /> */}
      {/* <div className="hero-banner">
        <Container className="py-5 text-center">
          <h1 className="display-4">Empower Your Trading Journey</h1>
          <p className="lead">Unlock advanced features and make informed decisions in the financial markets.</p>
          <Button variant="primary" size="lg">Get Started</Button>
        </Container>
      </div> */}

      <Container className="mt-5 pricing-section" id="pricing">
        <h2 className="text-center mb-4">Choose Your Plan</h2>
        <div className="d-flex justify-content-center mb-3">
        <div className="toggle-container">
              <Button
                variant={selectedPlan === 'monthly' ? 'primary' : 'outline-primary'}
                onClick={() => handlePlanToggle('monthly')}
                className="mx-2 monthly-toggle"
                style={{ border: 'none', borderRadius:'20px' }} 
              >
                Monthly
              </Button>
              <Button
                variant={selectedPlan === 'yearly' ? 'primary' : 'outline-primary'}
                onClick={() => handlePlanToggle('yearly')}
                className="mx-2 yearly-toggle" 
                style={{ border: 'none',borderRadius:'20px' }} 
              >
                Yearly
              </Button>
        </div>

        </div>
        <Row className="justify-content-center">
            {plans.map((plan, index) => (
                <Col key={index} md={4} className="mb-4">
                  <div className="pricing-card-wrapper d-flex flex-column h-100"> 
            <Card className={`text-center pricing-card h-100`} style={{ background: '#fff', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
        <Card.Header className="pricing-card-header">
                <h3 className="pricing-card-title">{plan.title}</h3>
        </Card.Header>
          <Card.Body className="pricing-card-body d-flex flex-column justify-content-between"> 
            <div>
              <ul className="pricing-card-features">
                {plan.features.map((feature, i) => (
                  <li key={i} className="pricing-card-feature">
                    <span className="pricing-card-feature-icon">{feature.icon}</span>
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
              <Card.Text className="pricing-card-price" style={{fontSize:'35px'}}>{selectedPlan === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}</Card.Text>
              <div style={{paddingTop:'15px', fontSize:'18px'}}>{selectedPlan === 'monthly' ? '/Month' : '/year'}</div>
            </div>
          </Card.Body>
          <Button variant="dark" block>Buy Now</Button>
        </Card>

        </div>
          </Col>
          ))}
        </Row>
      </Container>
  {/* Contact Section */}
          <Container id="contact" className="py-5 text-center">
          <h2 className="mb-4">Contact Us</h2>
          <p>Have questions or need assistance? Reach out to our support team.</p>
        <Button variant="primary" size="lg">
          Contact Support
        </Button>
          </Container>
      {/* <Footer /> */}
    </div>
  );
};

export default PricingPage;

