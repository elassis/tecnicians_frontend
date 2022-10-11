import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../axiosRequest";

function Profile() {
  const params = useParams();
  const responseArr = [];
  const [proData, setProData] = useState();

  async function getProfileData() {
    await http
      .get(`/api/technician/${params.id}`)
      .then((response) => {
        if (response.status === 200) {
          responseArr.push(...response.data);
          setProData(responseArr);
        }
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div>
      {proData && (
        <div>
          <h3>personal info</h3>
          {proData[0][0].first_name} {proData[0][0].last_name}
          <h3>professional info</h3>
          {proData[1].map((item) => {
            return (
              <p key={item.id}>
                {item.name} | {item.price_hour}
              </p>
            );
          })}
          <h3>Previous Jobs info</h3>
          {proData[2].map((item) => {
            return (
              <p key={item.id}>
                Worked as {item.name} | {item.job_ranking}
              </p>
            );
          })}
        </div>
      )}
      <br />
      <button>Book</button>
    </div>
  );
}

export default Profile;
