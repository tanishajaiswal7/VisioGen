import React from "react";

const About = () => (
  <section className="max-w-3xl mx-auto mt-20 p-8 bg-gray-800 rounded-lg shadow text-white">
    <h2 className="text-3xl font-bold mb-4">About Us</h2>
    <p className="mb-2">
      <b>VisioGen</b> is an AI-powered image generation platform. We use advanced models like <b>Stability AI</b> and <b>OpenAI DALL-E</b> to help you create stunning visuals from your imagination.
    </p>
    <p className="mb-2">
      <b>Why this website?</b> We believe everyone should have access to creative AI tools. VisioGen lets you generate, share, and explore unique images for free, making AI art accessible to all.
    </p>
    <p>
      <b>Tech Stack:</b> React, Node.js, MongoDB, Stability AI, OpenAI, Tailwind CSS.
    </p>
  </section>
);

export default About;
