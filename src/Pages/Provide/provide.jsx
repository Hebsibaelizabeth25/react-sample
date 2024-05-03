import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import './provide.css'
export default function DynamicDemo() {
    const [tabs] = useState([
        {
            header: 'Title I',
            children: <p className="m-0">Content 1</p>
        },
        {
            header: 'Title II',
            children: <p className="m-0">Content 2 </p>
        },
        {
            header: 'Title III',
            children: <p className="m-0">Content 3 </p>
        },
        {
          header: 'Title I',
          children: <p className="m-0">Content 1</p>
      },
      {
          header: 'Title II',
          children: <p className="m-0">Content 2 </p>
      },
      {
          header: 'Title III',
          children: <p className="m-0">Content 3 </p>
      }
    ]);

    const createDynamicTabs = () => {
        return tabs.map((tab, i) => {
            return (
                <AccordionTab key={tab.header} header={tab.header} disabled={tab.disabled}>
                    {tab.children}
                </AccordionTab>
            );
        });
    };

    return (
        <div className="card">
          <div id='upper-provide'>
<h1>What are all we providing here </h1>
<ul > 
  <li >Excellent Teaching</li>
  <li>All Sports</li>
  <li>Extra Curricular Activites</li>
  <li>Early Morning Yoga Classes</li>
  <li>Soft Skill Developing Classes</li>

</ul>
</div>
          <h3>Classes & Fee Details</h3>

             <Accordion id='style-class'>{createDynamicTabs()}</Accordion>
        </div>
    )
}
        