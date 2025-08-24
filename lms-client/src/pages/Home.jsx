import React from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../context/CoursesContext';
import CourseCard from '../components/CourseCard';
import '../styles/Home.css';

export default function Home() {
  const { courses } = useCourses();
  const featuredCourses = courses.slice(0, 3); // Show first 3 courses as featured

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Expand Your Knowledge, Master New Skills</h1>
            <p>Discover expert-led courses across various domains and advance your career with our comprehensive learning platform.</p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
              <Link to="/Register" className="btn btn-secondary">Get Started</Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <span>📚</span>
              <p>100+ Courses</p>
            </div>
            <div className="floating-card card-2">
              <span>👨‍🏫</span>
              <p>Expert Instructors</p>
            </div>
            <div className="floating-card card-3">
              <span>🎯</span>
              <p>Practical Learning</p>
            </div>
            {/* <div className="main-hero-image">
              <img src="/images/react1.jpg" alt="Online Learning" />
            </div> */}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2>Why Learn With Us?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">📖</div>
              <h3>Comprehensive Curriculum</h3>
              <p>Our courses are designed by industry experts to provide you with the most relevant and up-to-date knowledge.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">⏱️</div>
              <h3>Learn at Your Pace</h3>
              <p>Access course materials anytime, anywhere, and progress through lessons according to your schedule.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎓</div>
              <h3>Earn Certificates</h3>
              <p>Receive recognized certificates upon completion to showcase your skills to employers.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💬</div>
              <h3>Community Support</h3>
              <p>Join a community of learners and get support from instructors and peers throughout your journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="featured-courses">
        <div className="container">
          <div className="section-header">
            <h2>Featured Courses</h2>
            <p>Discover our most popular learning paths</p>
            <Link to="/courses" className="view-all">View All Courses →</Link>
          </div>
          <div className="courses-grid">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Students Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The courses are well-structured and the instructors are knowledgeable. I've significantly improved my skills!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div className="author-info">
                  <h4>Vijay Chatterjee</h4>
                  <p>Software Developer</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The platform is intuitive and the community support is amazing. I've completed 5 courses already!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">AS</div>
                <div className="author-info">
                  <h4>Priya Reddy</h4>
                  <p>Data Analyst</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The practical projects helped me build a portfolio that landed me a new job. Highly recommended!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">MJ</div>
                <div className="author-info">
                  <h4>Arjun verma</h4>
                  <p>UX Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Start Your Learning Journey Today</h2>
            <p>Join thousands of students advancing their careers with our courses</p>
            <div className="cta-actions">
              <Link to="/Register" className="btn btn-primary">Sign Up Free</Link>
              <Link to="/courses" className="btn btn-secondary">Explore Courses</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}