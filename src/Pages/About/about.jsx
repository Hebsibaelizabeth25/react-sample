import './about.css';
import img1 from '../../assets/about-img.jpg';
import img2 from '../../assets/about-2.jpg'; // Assuming you have another image for history

function About() {
  return (
    <div id='overall-about'>
      <h1>About Our School</h1>
      <div id='about'>
        <div className='about-content'>
          <h3>Our Vision</h3>
          <p>Our school's vision is rooted in the belief that every individual has the potential to lead a fulfilling and purposeful life. We are dedicated to empowering students to realize their full potential by fostering physical strength, intellectual curiosity, and moral integrity.</p>
        </div>
        <img src={img1} alt="Our Vision" className="about-image" />
      </div>
      <div id='about'>
        <img src={img2} alt="Our History" className="about-image" />
        <div className='about-content'>
          <h3>Our History</h3>
          <p>Founded in 1890, WISDOM SPRING SCHOOL has a rich history of academic excellence and community involvement. Since its inception, the school has been committed to providing quality education and fostering the holistic development of its students.</p>
        </div>
      </div>
    </div>
  );
}

export default About;