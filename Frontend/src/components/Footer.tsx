import React from 'react';

export default function Footer() {
  return (
    <footer className="text-black py-8 " style={{ backgroundColor: 'rgb(172, 226, 225)' }}>
      <div className="container mx-auto flex flex-wrap justify-between gap-10 font-sans">
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <h3 className="text-lg font-bold mb-4">About Us</h3>
          <p className="text-sm leading-relaxed">
          At our CUD Dentist Clinic, we're not just about appointments – we're about relationships. Led by a team of skilled and compassionate professionals, we prioritize your comfort and well-being above all else. From routine cleanings to advanced treatments, our expertise ensures that every smile receives the care it deserves. Step into our clinic, where precision meets empathy, and let us redefine your dental experience, one visit at a time
          </p>
        </div>

        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="text-sm">123 Street Name<br />City, Country<br />info@example.com<br />(123) 456-7890</p>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};
