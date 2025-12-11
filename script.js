
function openAppointmentForm() {
  alert("Appointment form open hoga yahan.");
}


document.addEventListener('DOMContentLoaded', function(){
const items = document.querySelectorAll('.timeline-item');
const obs = new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add('in-view');
obs.unobserve(entry.target);
}
})
},{threshold:0.15});


items.forEach(i=>obs.observe(i));
});

// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');

function showTimelineItems() {
    const triggerBottom = window.innerHeight * 0.85;

    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;

        if(itemTop < triggerBottom) {
            item.classList.add('show');
        }
    });
}

window.addEventListener('scroll', showTimelineItems);
window.addEventListener('load', showTimelineItems);

// Newsletter form
const form = document.getElementById('newsletter-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    if(email) {
        formMessage.textContent = "Thank you for subscribing!";
        form.reset();
    } else {
        formMessage.textContent = "Please enter a valid email.";
    }
});

// Example: Highlight active nav link dynamically
const currentLocation = location.href;
const menuItem = document.querySelectorAll('.nav-menu li a');
menuItem.forEach(link => {
    if(link.href === currentLocation){
        link.classList.add('active');
    }
});

// Client-side validation + submit handling (for Formspree)
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('advocateForm');
  const msg = document.getElementById('formMessage');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    msg.textContent = '';

    // Basic HTML5 check
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Prepare form data
    const formData = new FormData(form);

    // Optional: add extra meta fields
    formData.append('_subject', 'New Advocate Registration — CyberKanun');

    // Submit to Formspree endpoint (action attribute)
    try {
      const resp = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (resp.ok) {
        msg.style.color = 'green';
        msg.textContent = 'Thank you! Your application has been submitted.';
        form.reset();
      } else {
        const data = await resp.json();
        msg.style.color = 'crimson';
        msg.textContent = data.error || 'Submission failed. Try again later.';
      }
    } catch (err) {
      msg.style.color = 'crimson';
      msg.textContent = 'Network error. Please try again later.';
      console.error(err);
    }
  });
});


document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', function() {
            alert('Selected option: ' + this.value);
        });
    });
    let slideIndex = 1;
        let autoSlide;
        showSlides(slideIndex);

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        function showSlides(n) {
            let slides = document.getElementsByClassName("testimonial");
            let dots = document.getElementsByClassName("pagination")[0].getElementsByTagName("span");
            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (let i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex - 1].style.display = "flex";
            dots[slideIndex - 1].className += " active";
        }

        function togglePlayPause() {
            let playPauseBtn = document.querySelector('.play-pause');
            if (!autoSlide) {
                autoSlide = setInterval(() => plusSlides(1), 3000);
                playPauseBtn.innerHTML = '&#9209;';
            } else {
                clearInterval(autoSlide);
                autoSlide = null;
                playPauseBtn.innerHTML = '&#9208;';
            }
        }

    document.getElementById('advocateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('https://formspree.io/f/your-endpoint', { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
            document.getElementById('formMessage').textContent = 'Form submitted successfully!';
        })
        .catch(error => {
            document.getElementById('formMessage').textContent = 'Error submitting form.';
        });
});

document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.querySelector('input[type="email"]').value;
    alert(`Subscribed with email: ${email}. Thank you!`);
    this.reset();
});

document.getElementById("contactForm").addEventListener("submit", function(event){
  event.preventDefault(); // default submit roka
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  if(name === "" || email === "" || subject === "" || message === ""){
    alert("Please fill all the fields!"); // custom notification
  } else {
    alert("Message sent successfully!");
    this.submit(); // ab form submit hoga
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './test');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 📩 Email transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your_email@gmail.com",     // आपका Gmail
    pass: "your_app_password",        // Gmail App Password (normal password नहीं चलेगा)
  },
});

// 📝 API endpoint for form submit
app.post("/contact", (req, res) => {
  const { fullName, contactNumber, email, expert, message } = req.body;

  const mailOptions = {
    from: email,
    to: "your_email@gmail.com",   // जहाँ notification आना है
    subject: "New Callback Request",
    text: `
      📌 New Request Received:

      Full Name: ${fullName}
      Contact Number: ${contactNumber}
      Email: ${email}
      Expert: ${expert}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error: ", error);
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Notification sent successfully!");
  });
});

// 🚀 Server run
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

const mailOptions = {
  from: email,
  to: "your_email@gmail.com",
  subject: "New Callback Request",
  html: `
    <h2>📩 New Callback Request</h2>
    <p><strong>Full Name:</strong> ${fullName}</p>
    <p><strong>Contact Number:</strong> ${contactNumber}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Expert:</strong> ${expert}</p>
    <p><strong>Message:</strong><br>${message}</p>
  `
};

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 1121;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    cb(null, './test');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
if (!fs.existsSync('./test')) {
  fs.mkdirSync('./test');
}

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  res.send(`File uploaded successfully: ${req.file.filename}`);
});
app.get('/', (req, res) => {
  res.send(`
    <h1>Upload a File</h1>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  `);
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

