import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Pricing.css';

const GreenTickIcon = () => (
  <img src='https://duzycfafl38re.cloudfront.net/Website/Images/tick2311202217560924112022100903.png' alt='network error' />
);

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [plans, setPlans] = useState([]);

  
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const addPlan = async () => {
    try {
      const newPlan = {
        title: 'New Plan',
        features: ['New Feature 1', 'New Feature 2'],
        monthlyPrice: '$19.99',
        yearlyPrice: '$199.99',
      };
  
      console.log('New Plan:', newPlan); // Log the new plan object
  
      const response = await axios.post('http://localhost:8000/api/plans', newPlan);
      console.log('Add Plan Response:', response.data); // Log the response from the API
  
      fetchPlans();
    } catch (error) {
      console.error('Error adding plan:', error);
    }
  };
  

  const deletePlan = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/plans/${id}`);
      fetchPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const updatePlan = async (id, updatedPlan) => {
    try {
      await axios.put(`http://localhost:8000/api/plans/${id}`, updatedPlan);
      fetchPlans();
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  const handleEdit = (planIndex) => {
    const updatedPlans = [...plans];
    updatedPlans[planIndex].editing = true;
    setPlans(updatedPlans);
  };

  const handleSave = (planIndex, planId) => {
    const updatedPlan = plans[planIndex];
    delete updatedPlan.editing;
    updatePlan(planId, updatedPlan);
  };

  const handleChange = (e, field, planIndex) => {
    const { value } = e.target;
    const updatedPlans = [...plans];
    updatedPlans[planIndex][field] = value;
    setPlans(updatedPlans);
  };

  const handleChangeFeature = (e, featureIndex, planIndex) => {
    const { value } = e.target  ;
    // Create a deep copy of the plans array
    const updatedPlans = JSON.parse(JSON.stringify(plans));
    // Update the specific feature text
    updatedPlans[planIndex].features[featureIndex].text = value;
    // Update the state with the new plans array
    setPlans(updatedPlans);
  };
  

  return (
    <div>
      <Container className="mt-5 pricing-section" id="pricing">
        <h2 className="text-center mb-4">Choose Your Plan</h2>
        <Row className="justify-content-center">
          {plans.map((plan, index) => (
            <Col key={index} md={4} className="mb-4">
              <div className="pricing-card-wrapper d-flex flex-column h-100">
                <Card className="text-center pricing-card h-100" style={{ background: '#fff', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
                  <Card.Header className="pricing-card-header">
                    {plan.editing ? (
                      <Form.Control type="text" value={plan.title} onChange={(e) => handleChange(e, 'title', index)} />
                    ) : (
                      <h3 className="pricing-card-title">{plan.title}</h3>
                    )}
                  </Card.Header>
                  <Card.Body className="pricing-card-body d-flex flex-column justify-content-between">
                  <div>
                      <ul className="pricing-card-features">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="pricing-card-feature">
                            <span className="pricing-card-feature-icon"><GreenTickIcon /></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Card.Text className="pricing-card-price" style={{ fontSize: '35px' }}>{selectedPlan === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}</Card.Text>
                      <div style={{ paddingTop: '15px', fontSize: '18px' }}>{selectedPlan === 'monthly' ? '/Month' : '/Year'}</div>
                    </div>
                  </Card.Body>
                  {plan.editing ? (
                    <Button variant="primary" block onClick={() => handleSave(index, plan.planId)}>Save</Button>
                  ) : (
                    <Button variant="primary" block onClick={() => handleEdit(index)}>Edit</Button>
                  )}
                  <Button variant="danger" block onClick={() => deletePlan(plan.planId)}>Delete</Button>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
        <Button variant="success" onClick={addPlan}>Add Plan</Button>
      </Container>
    </div>
  );
};

export default PricingPage;
