import React from 'react'
import { ShoppingBag, Phone, Mail, MapPin, Clock, Star, UtensilsCrossedIcon } from 'lucide-react';
const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Column */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-600 p-2 rounded-full">
                   <UtensilsCrossedIcon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-bold">BookMyBite</h4>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Your favorite food delivery service. We bring delicious meals from the best restaurants right to your doorstep, fast and fresh.
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="h-4 w-4" />
                <span className="text-sm">24/7 Delivery Service</span>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['Menu', 'About Us', 'Contact', 'Terms of Service', 'Privacy Policy', 'Help Center'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info Column */}
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">+(91) 9872838371</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">BookMyBite@gmail.com</span>
                </div>
                <div className="flex items-start space-x-3 text-gray-400">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">BookMyBite - Food Hub , Pathanamthitta</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 FoodHub. All rights reserved. Delivering happiness, one meal at a time.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
