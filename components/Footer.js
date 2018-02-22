import React from 'react';
import FooterNavigation from './FooterNavigation';



const Footer = () => {
  return(
    <div className="footer">

		<div className="footerWrapper">

			<div className="footerCol">

				<div className="siteLink"><a href="http://mediagrand.co.uk" target="blank"><img src="assets/imgs/mguk-logo.png" alt="" /></a></div>

				<div className="socialBarFooter">
					<ul className="socialFooter">
						<li><a href="https://www.facebook.com/Lost-Gloves-122945611633232/"><img src="assets/imgs/facebook_logo.png" alt="" /></a></li>
						<li><a href="gloves.html"><img src="assets/imgs/twitter_logo.png" alt="" /></a></li>
						<li><a href="about.html"><img src="assets/imgs/google+_logo.png" alt="" /></a></li>
					</ul>
				</div>
			</div>


			<div className="footerCol">

        <FooterNavigation />

			</div>


			<div className="footerCol">

				<div className="copyNotice">&copy; 2017 Media Grand. All Rights Reserved.</div>

				<div className="footerLegal">
					<ul className="legal-footer">
						<li><a href="index.html">terms of use</a></li>
						<li><a href="draw.html">privacy policy</a></li>

					</ul>
				</div>
			</div>

		</div>
	</div>



  )
}

export default Footer;
