import React, { useState } from "react";
import { useSelector } from "react-redux";

const BookModal = () => {
  const tech = useSelector((state) => state.technician.tech);
  const elements = useSelector((state) => state.technician.skills);

  const skillsArr = Object.values(elements);

  return (
    <div>
      <h3>Technician name</h3>
      {tech.first_name} {tech.last_name}
      <h3>Skills</h3>
      {skillsArr.length > 0 &&
        skillsArr.map((item, index) => {
          return (
            <div key={index}>
              <p key={item.profession_id}>
                {item.name} | {item.price_hour} |{" "}
                <button>request for a job</button>
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default BookModal;
