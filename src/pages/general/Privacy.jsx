import React from 'react'
import { Link } from 'react-router-dom'

function Privacy() {
    return (
        <main className="main-content main-content-bg mt-0 ps">
            <div className="mt-3 position-relative pt-0 pb-4 w-100">
                <div className="row mt-6 px-4">
                    <div className="col-12 col-md-12 px-md-12 ms-2 text-start">
                        <div className="row mt-0">
                            <div className="mt-3 d-flex alignitems-center">
                                <Link to={'/sign-up'} className="">
                                <h6 className=" mb-2"> Back to Sign Up</h6>
                                </Link>
                            </div>
                        </div>
                        <h1 className=" font-weight-bold mt-0">Privacy Policy</h1>
                        <p className=" mt-4">1. Information Collection</p>
                        <p className="">We collect personal information from you when creating an account</p>
                        <p className="">The types of personal information we collect may include:</p>
                        <ul className="">
                            <li>Your name and email address.</li>
                            <li>Your mailing address and phone number.</li>
                            <li>Your payment information, such as credit card number and phone number</li>
                            <li>Your IP address and browser information.</li>
                            <li>Your browsing history and activity on the Website and Platform.</li>
                        </ul>
                        <p className=" mt-4">2. Use of Information</p>
                        <p className="">We use your personal information to give you access to our platform</p>
                        <p className=" mt-4">3. Data Security</p>
                        <p className="">
                            We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. 
                            However, no website is completely secure, and we cannot guarantee the security of your information.
                        </p>
                        <p className=" mt-4">4. Third-Party Sharing</p>
                        <p className="">
                            We may share your personal information with third-party service providers who assist us in operating our platform and providing our services. 
                            These third-party service providers are bound by contractual obligations to keep your information confidential and use it only for the purposes authorized by us.
                        </p>
                        <p className="">
                            We may also disclose your personal information if required by law, such as in response to a court order or subpoena.
                        </p>
                        <p className=" mt-4">5. Cookies and Tracking Technologies</p>
                        <p className="">
                            We use cookies and similar tracking technologies to collect information about your browsing activity on our website. 
                            This information helps us personalize your experience and improve our services. 
                            You can control the use of cookies by adjusting the settings on your browser.
                        </p>
                        <p className=" mt-4">6. User Rights</p>
                        <p className="">
                            You have the right to access, correct, or delete your personal information. You may also object to the processing of your personal information or restrict its use. 
                            To exercise these rights, please contact us at <a className="link-danger" href="mailto:https://info@almanissoko.com">info@almanissoko.com</a>.
                        </p>
                        <p className=" mt-4">7. Retention Period</p>
                        <p className="">
                            We will retain your personal information for as long as necessary to provide you with our services and fulfill our legal obligations. 
                            We will then delete your information or render it anonymous..
                        </p>
                        <p className=" mt-4">8. International Transfers</p> 
                        <p className="">
                            If you are located outside of Kenya, your personal information may be transferred to and processed in countries other than your own. 
                            These countries may have different data protection laws than your own country. 
                            We will take appropriate safeguards to protect your personal information when it is transferred to other countries.
                        </p>
                        <p className=" mt-4">9. Updates to this Policy</p>
                        <p className="">
                            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our website..
                        </p>
                        <p className=" mt-4">10. Contact Us</p>
                        <p className="">
                            If you have any questions about this Privacy Policy, please contact us at <a className="link-danger" href="mailto:https://info@almanissoko.com">info@almanissoko.com</a>.
                        </p>
                    </div>
                </div>
            </div>
            <div className="ps-2 mt-2">
                
            </div>
        </main>
    )
}

export default Privacy
