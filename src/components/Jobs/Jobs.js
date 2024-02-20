import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_JOBS, UPDATE_JOB } from "../../apis/jobsApi";
import { RANKING_INDEX_API } from "../../apis/rankingsApi";
import http from "../../axiosRequest";
import { showRankingModal } from "../../redux/slices/Modals/modalSlice";
import RankingModal from "../Modals/RankingModal";
import ModalStructure from "../Modals/ModalStructure";

function Jobs() {
  const { id } = useParams();
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [option, setOption] = useState(null);
  const [jobObject, setJobObject] = useState({});
  const [rankedJobs, setRankedJobs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getJobs();
    verifyRankedJob();
  }, []);

  async function getJobs() {
    await http
      .get(GET_JOBS.replace("id", id))
      .then((response) => {
        if (
          response.status === 200 &&
          Object.values(response.data).length > 0
        ) {
          setReceived([...response.data.received]);
          setSent([...response.data.sent]);
          setOption([...response.data.received].concat("received"));
        }
      })
      .catch((error) => console.log(error));
  }

  async function updateJob(id, status) {
    await http
      .put(UPDATE_JOB.replace("id", id), { status })
      .then((response) => {
        if (response.status === 200) {
          getJobs();
        }
      })
      .catch((error) => console.log(error));
  }

  async function verifyRankedJob() {
    let idsArray = [];
    const result = await http.get(RANKING_INDEX_API);
    result.data.map((e) => idsArray.push(e.job_id));
    setRankedJobs(idsArray);
    return result;
  }

  function MssgStructure(props) {
    const { data } = props;
    const today = new Date();
    return (
      data &&
      data.slice(0, data.length - 1).map((item, i) => {
        return (
          <div key={i}>
            <p>
              {data.includes("sent") ? "to:" : "from:"} {item.first_name}{" "}
              {item.last_name}
            </p>
            <p>{item.text}</p>

            <p>
              from: {item.begin_date || "N/A"} to: {item.end_date || "N/A"}
            </p>

            <p>status: {item.status}</p>
            {data.includes("sent") &&
              item.status === "accepted" &&
              today.getTime() > new Date(item.end_date).getTime() &&
              !rankedJobs.includes(item.id) && (
                <button
                  onClick={() => {
                    setJobObject({
                      job_id: item.id,
                      tech_id: item.technician_id,
                    });
                    dispatch(showRankingModal(true));
                  }}
                >
                  rank this job
                </button>
              )}
            {!data.includes("sent") && item.status === "pending" && (
              <div>
                <button onClick={() => updateJob(item.id, "accepted")}>
                  accept
                </button>
                <button onClick={() => updateJob(item.id, "rejected")}>
                  reject
                </button>
              </div>
            )}
          </div>
        );
      })
    );
  }

  function Options() {
    return (
      <>
        <button onClick={() => setOption(received.concat("received"))}>
          Received
        </button>
        <button onClick={() => setOption(sent.concat("sent"))}>Sent</button>
      </>
    );
  }

  return (
    <div>
      <Options />
      <MssgStructure data={option} />

      <ModalStructure
        children={<RankingModal {...jobObject} />}
        reducer={"rankingModal"}
        action={showRankingModal}
      />
    </div>
  );
}

export default Jobs;
