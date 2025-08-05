import { ShipWheel, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router";
import lpage from "/lpage.webp";

const LandingPage = () => {
  return (
    <div className="min-h-screen relative flex flex-col text-white">
      {/* BACKGROUND IMAGE with Parallax */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url(${lpage})`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="flex justify-between items-center px-6 py-4 bg-black bg-opacity-50 shadow-md">
          <div className="flex-1 flex justify-center">
            <h1 className="flex items-center gap-2 text-3xl font-bold text-primary">
              <ShipWheel className="w-8 h-8 text-white animate-spin-slow" />
              onlyStudy
            </h1>
          </div>
          <Link to="/login" className="absolute right-6 top-0.5">
            <button className="btn btn-primary btn-sm hover:scale-110 hover:shadow-lg hover:shadow-primary/50 transition-all">
              Login
            </button>
          </Link>
        </header>

        {/* ABOUT US */}
        <main className="flex-1 flex flex-col items-center text-center px-4 mt-12">
          <h2 className="text-5xl font-bold mb-4 animate-fade-in">Welcome to onlyStudy</h2>
          <p className="max-w-2xl text-lg opacity-90 mb-12 animate-slide-up">
            Your go-to platform for collaborative group study.  
            Connect with peers, join study groups, and learn together effectively 
            in a distraction-free environment!
          </p>

          {/* TESTIMONIALS */}
          <section className="w-full max-w-5xl mb-16 animate-fade-in">
            <h3 className="text-3xl font-semibold mb-8">What Our Students Say</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  text: "onlyStudy helped me find the perfect study group. My grades improved drastically!",
                  name: "Aarav Gupta",
                  role: "Engineering Student",
                  img: "https://avatar.iran.liara.run/public/1",
                },
                {
                  text: "Studying in a group kept me motivated and focused. Highly recommend onlyStudy!",
                  name: "Sanya Mehta",
                  role: "Medical Student",
                  img: "https://avatar.iran.liara.run/public/12",
                },
                {
                  text: "This platform made group study sessions fun and productive!",
                  name: "Karan Singh",
                  role: "MBA Student",
                  img: "https://avatar.iran.liara.run/public/33",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="card bg-white bg-opacity-10 backdrop-blur-md shadow-lg transform transition-all hover:translate-y-[-5px] hover:scale-105 hover:shadow-2xl"
                >
                  <div className="card-body">
                    <p className="italic text-sm">{testimonial.text}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={testimonial.img} alt={testimonial.name} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                        <p className="text-xs opacity-70">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT US */}
          <section className="w-full max-w-md text-center bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl transition-all animate-slide-up">
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-4 text-sm opacity-90">
              Have questions or feedback? We're here to help!
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@onlystudy.com</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Bengaluru, India</span>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="bg-black bg-opacity-50 text-center py-4 mt-12 text-xs opacity-70">
          © {new Date().getFullYear()} onlyStudy. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
