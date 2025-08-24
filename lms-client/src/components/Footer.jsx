import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Footer(){
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} LMS — Minimal Starter</div>
      <Link to="/contact">Contact Us</Link>
    </footer>
  )
}