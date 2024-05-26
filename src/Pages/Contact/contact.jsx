import './contact.css';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'; 
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Contact() {
    return (
        <div id="contact">
            <div className='contact-box'>
                <h1>Address</h1>
                    <p><FontAwesomeIcon icon={faLocationDot}/> No:132 rich street</p>
                    <p>G.N Nagar, Chennai-22</p>
            </div>
            <div className='contact-box'>
                <h1>Contact Us</h1>
                    <p><FontAwesomeIcon icon={faPhone} />  0909099091 or 0909099092</p>
                    <p><FontAwesomeIcon icon={faEnvelope} />  wisdomspring@gmail.com</p>
            </div>       
            <div className='contact-box'>
                <h1>Our Social Medias</h1>
                    <p><FontAwesomeIcon icon={faInstagram} />-WisdomSpringSchool</p> 
                    <p><FontAwesomeIcon icon={faYoutube} />-Wisdom Spring School Chennai</p>
            </div> 
        </div>
    );
}

export default Contact;