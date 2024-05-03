import './contact.css';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'; // Import solid icons
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'; // Import brand icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Contact() {
    return (
        <div id="contact">
            <div className='contact-box'>
                <h1>Address</h1>
                <ul>
                    <li><FontAwesomeIcon icon={faLocationDot}/> No:132 rich street</li>
                    <li>G.N Nagar, Chennai-22</li>
                </ul>
            </div>
            <div className='contact-box'>
                <h1>Contact Us</h1>
                <ul>
                    <li><FontAwesomeIcon icon={faPhone} />  0909099091 or 0909099092</li>
                    <li><FontAwesomeIcon icon={faEnvelope} />  wisdomspring@gmail.com</li>
                </ul>
            </div>       
            <div className='contact-box'>
                <h1>Our Social Medias</h1>
                <ul>
                    <li><FontAwesomeIcon icon={faInstagram} />-WisdomSpringSchool</li> {/* Use Instagram icon here */}
                    <li><FontAwesomeIcon icon={faYoutube} />-Wisdom Spring School Chennai</li> {/* Use YouTube icon here */}
                </ul>
            </div> 
        </div>
    );
}

export default Contact;