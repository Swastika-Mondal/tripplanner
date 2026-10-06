import React from 'react';
import { Github, Linkedin, Twitter, Code, Heart, Coffee, Star, Sparkles, Rocket, Globe, Users } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      bio: 'Full-stack developer with a passion for creating seamless user experiences.',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Michael Rodriguez',
      role: 'UI/UX Designer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      bio: 'Creative designer focused on building beautiful and intuitive interfaces.',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Emily Watson',
      role: 'Backend Developer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      bio: 'Database expert specializing in scalable and secure applications.',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'David Kim',
      role: 'Frontend Developer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      bio: 'React enthusiast with a keen eye for responsive design and animations.',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  return (
    <div
      className="min-h-screen pt-16 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 relative overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.45)), url("https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      {/* Decorative Blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20">
            <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              About TripOnTip
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We're a fun-loving team of creators making your travel dreams come true! ✨
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Rocket className="w-12 h-12 text-yellow-400 mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-white/90 mb-8">
                At TripOnTip, we turn travel dreams into reality with a sprinkle of magic! ✨ Our tools make planning your next adventure as fun as the journey itself.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[{ icon: Code, label: 'Innovation', color: 'text-cyan-400' }, { icon: Heart, label: 'Passion', color: 'text-pink-400' }, { icon: Star, label: 'Quality', color: 'text-yellow-400' }]
                  .map((item, index) => (
                    <div key={index} className="bg-white/30 backdrop-blur-sm p-4 rounded-2xl border border-white/20 transform hover:scale-105 transition-transform duration-300">
                      <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-2 animate-wiggle`} />
                      <p className="font-semibold text-white">{item.label}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Our Mission"
                className="relative rounded-2xl transform group-hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <Users className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white">Meet Our Team</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white/20 backdrop-blur-lg rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 border border-white/20"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-t-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="relative w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <div className="flex space-x-4">
                    {[{ icon: Github, href: member.social.github }, { icon: Linkedin, href: member.social.linkedin }, { icon: Twitter, href: member.social.twitter }]
                      .map((social, idx) => (
                        <a
                          key={idx}
                          href={social.href}
                          className="text-white hover:text-yellow-400 transform hover:scale-110 transition-all duration-300"
                        >
                          <social.icon className="w-6 h-6" />
                        </a>
                      ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-yellow-400 font-medium mb-3">{member.role}</p>
                <p className="text-white/80 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ value: '5K+', label: 'Happy Users', icon: Users }, { value: '100+', label: 'Countries', icon: Globe }, { value: '10K+', label: 'Itineraries', icon: Coffee }, { value: '24/7', label: 'Support', icon: Heart }]
            .map((stat, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-yellow-400 mx-auto mb-4 animate-bounce" />
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
        </div>
      </div>

      <style jsx="true">{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes tilt {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(1deg); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-wiggle {
          animation: wiggle 3s ease-in-out infinite;
        }
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default About;
