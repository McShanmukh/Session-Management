/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
                <a
                  href="#"
                  target="_blank"
                >
                  AI_Databases
                </a>
              </li>
              <li>
                <a
                  href="/Aboutus"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                >
                  Our Blog
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, 
            We aim to understand the dynamics of the Data and use this knowledge to help our clients take informed decisions 
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
