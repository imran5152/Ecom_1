import React from 'react';
import { FaRocket, FaUsers, FaHeart } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen py-16 px-6">

      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4">About <span className="text-indigo-600">ShopEase</span></h1>
        <p className="text-xl text-gray-600">Where innovation meets trust in online shopping.</p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">
        <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df
" alt="Our Mission" className="rounded-lg shadow-lg" />
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            At ShopEase, our mission is to make e-commerce simple, accessible, and trustworthy for everyone. Whether you’re buying daily essentials or premium gadgets, we make sure you get value and quality — every time.
          </p>
          <p className="text-lg text-gray-600">
            With thousands of satisfied users, we believe in pushing the boundaries of customer experience.
          </p>
        </div>
      </div>


      <div className="max-w-6xl mx-auto text-center mb-20">
        <h2 className="text-3xl font-bold mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition">
            <FaRocket className="text-4xl text-indigo-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
            <p className="text-gray-600">Lightning-fast deliveries and real-time order tracking.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition">
            <FaUsers className="text-4xl text-indigo-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Community Focused</h3>
            <p className="text-gray-600">We value every customer and build long-lasting relationships.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition">
            <FaHeart className="text-4xl text-indigo-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
            <p className="text-gray-600">Our support is always available — human, fast & helpful.</p>
          </div>
        </div>
      </div>


      <div className="max-w-6xl mx-auto text-center mb-20">
        <h2 className="text-3xl font-bold mb-12">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { name: 'Afrid Khan', role: 'Founder & CEO' },
            { name: 'Riya Kapoor', role: 'CTO' },
            { name: 'Neha Joshi', role: 'Lead Designer' },
            { name: 'Karan Mehta', role: 'Marketing Head' }
          ].map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
              <img
                src={`https://source.unsplash.com/100x100/?person,face&sig=${index}`}
                alt={member.name}
                className="rounded-full w-24 h-24 mx-auto mb-4 object-cover"
              />
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-indigo-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>


      <div className="text-center text-gray-500 text-sm mt-16">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </div>
  );
};

export default About;
