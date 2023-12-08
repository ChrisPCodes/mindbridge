
import React, { useState } from 'react';
//import './AccordionStyles.css';

const Accordion = ({answers,title, active, setActive}) => { //creating a dynamic accordion for Q/As
   console.log(active, answers);
   return(
      <div className = "Accordion">
         <div className="AccordionHeading">
            {/* <div className='Container'></div> */}
            <p>{title}</p>
            <span onClick={()=> setActive(title)}>
                {active == title ? '-' : '+'}
            </span>
         </div>
      <div className={(active === title ? 'show' : '') + 'AccordionContent'}>
         <div className='Container'>
            <span> {answers[active]}</span> 
         </div>
      </div>
      </div>
   ) // the divs are used to create the answer and question
   // container and an indication of which answer is being displayed
}

export default Accordion;