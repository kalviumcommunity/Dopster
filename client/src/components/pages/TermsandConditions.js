import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ResponsiveAppBar from './Navbar';
import Footer from './Footer';

const TermsandConditions = () => {
  return (
    <div>
      <ResponsiveAppBar/>
      <div style={{marginBottom:"10vh"}} >

      <div style={{textAlign:"center",margin:"5vh"}} >
    <h1>Terms and Conditions</h1>
    </div>
   <div id='all-accordian-div' >

   <div className='accordian' >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
         <h3>1.  Introduction</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Welcome to Dopster! By accessing and using our website or mobile application, you agree to comply with the terms and conditions outlined below. 
          If you do not agree with these terms and conditions, please do not use our services.
          </Typography>
        </AccordionDetails>
      </Accordion>
     
    </div>
    <div className='accordian' >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
         <h3>2.  User Conduct</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          By using Dopster, you agree to use our services only for lawful purposes and in a manner that does not infringe on the rights of others or restrict their use and enjoyment of the platform. You are solely responsible for any content that you post on Dopster and agree not to post any content that is offensive, defamatory, or infringes on any intellectual property rights.
          </Typography>
        </AccordionDetails>
      </Accordion>
     
    </div>
    <div className='accordian' >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
         <h3>3.  Intellectual Property</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          All content on Dopster, including but not limited to text, graphics, logos, images, and software, is the property of Dopster or its licensors and is protected by copyright and other intellectual property laws. You agree not to reproduce, distribute, or modify any content on Dopster without our prior written consent.
          </Typography>
        </AccordionDetails>
      </Accordion>
     
    </div>
    <div className='accordian' >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
         <h3>4.  Disclaimer of Warranties</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Dopster makes no representations or warranties about the accuracy, reliability, completeness, or timeliness of the content or services provided through our platform. We do not warrant that our services will be uninterrupted or error-free or that any defects in our platform will be corrected.
          </Typography>
        </AccordionDetails>
      </Accordion>
     
    </div>
    <div className='accordian' >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
         <h3>5.  Limitation of Liability</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Dopster shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our platform, including but not limited to lost profits, loss of data, or business interruption.
          </Typography>
        </AccordionDetails>
      </Accordion>
     
    </div>    
    <div className='accordian' >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
         <h3>6.  Modifications</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Dopster reserves the right to modify these terms and conditions at any time, without prior notice to you. Your continued use of our platform following any changes to these terms and conditions constitutes your acceptance of the revised terms.
          </Typography>
        </AccordionDetails>
      </Accordion>
     
    </div>
    

    
    </div>
      </div>
      <Footer/>
    </div>
  )
}

export default TermsandConditions
