import React from 'react';
import PricingCard from '../components/pricingCard';

const PricingSection = () =>
{
  const plans = [
    {
      title: 'Starter',
      description: 'Best option for personal use & for your next project.',
      price: '$29',
      pricePeriod: '/month',
      features: [
        'Individual configuration',
        'No setup, or hidden fees',
        'Team size: 1 developer',
        'Premium support: 6 months',
        'Free updates: 6 months',
      ],
      buttonText: 'Get started',
    },
    {
      title: 'Company',
      description: 'Relevant for multiple users, extended & premium support.',
      price: '$99',
      pricePeriod: '/month',
      features: [
        'Individual configuration',
        'No setup, or hidden fees',
        'Team size: 10 developers',
        'Premium support: 24 months',
        'Free updates: 24 months',
      ],
      buttonText: 'Get started',
    },
    {
      title: 'Enterprise',
      description: 'Best for large scale uses and extended redistribution rights.',
      price: '$499',
      pricePeriod: '/month',
      features: [
        'Individual configuration',
        'No setup, or hidden fees',
        'Team size: 100+ developers',
        'Premium support: 36 months',
        'Free updates: 36 months',
      ],
      buttonText: 'Get started',
    },
  ];

  return (
    <section className="bg-gray-100">
      <div className="py-4 pt-0 px-4 mx-auto max-w-screen-xl lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            Pricing
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl">
            Explore our range of affordable pricing options tailored to your needs.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              pricePeriod={plan.pricePeriod}
              features={plan.features}
              buttonText={plan.buttonText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
