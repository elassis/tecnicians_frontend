import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData } from "../../apis/ApiActions";
import { FETCH_TECHNICIAN_DATA } from "../../apis/techniciansApi";
import { FETCH_USER_DATA } from "../../apis/usersApi";
import { Container } from "../../common/Layout/Container";
import { StyledBackButton} from "./ProfileStyles";
import Avatar from "../../common/components/Avatar/Avatar";
import Text from "../../common/components/Text/Text";
import { addTechnician } from "../../redux/slices/Technician/technicianSlice";
import StarRatings from "react-star-ratings";
import { formatDate } from "../../common/utils";
import Tag from "../../common/components/Tag/Tag";
import Link from "../../common/components/Link/Link";
import Button from "../../common/components/Button/Button";
import ModalLayout from "../../common/Layout/ModalLayout/ModalLayout";
import {
  showEditInfoModal,
  showEditProfessionsModal,
  showJobsModal,
} from "../../redux/slices/Modals/modalSlice";
import EditInfoModal from "../Modals/EditInfoModal/EditInfoModal";
import EditProfessionModal from "../Modals/EditProfessionsModal/EditProfessionsModal";
import JobFeedback from "./JobFeedback/JobFeedback";
import JobsModal from "../Modals/JobsModal/JobsModal";
import { isOwner } from "../../common/utils";
import Section from "./Section/Section";
import { setResponse } from "../../redux/slices/Response/responseSlice";

function Profile() {
  const params = useParams();
  const dispatch = useDispatch();
  const { user_info } = useSelector((state) => state.technician.tech?.data?.data || {});
  const { jobs } = useSelector((state) => state.technician.tech?.data?.data || {});
  const { editInfoModal, editProfessionsModal, jobsModal } = useSelector(
    (state) => state.modals
  );
  const { user } = useSelector((state) => state);
  const isThereFeeback = (job) => job.status === "completed";
  const isUserOwner = isOwner(user_info?.user_id, user?.id);

  async function getProfileData() {
    let url = null;

    if (Number(params.id) === user?.id && user?.type === "client") {
      url = FETCH_USER_DATA.replace("{email}", user?.email);
    } else {
      url = FETCH_TECHNICIAN_DATA.replace("{id}", params.id);
    }
    dispatch(setResponse({}));
    fetchData(url, dispatch, addTechnician);
  }

  useEffect(() => {
    getProfileData();
  }, [params.id, user]);


  return (
    <Container>
      <StyledBackButton>
        <Link url={"/home"} children={"Back"} />
      </StyledBackButton>
      {user_info && (
        <Section
          title={"Personal info"}
          firstRowChildren={<Avatar />}
          secondRowChildren={
            <>
              <Text className={"name"} weight={"700"} children={`${user_info?.first_name} ${user_info?.last_name}`}/>
              {isUserOwner && (<Text className={"email"} children={`${user_info?.email}`} />)}
              {user_info?.type !== "client" && (
                <StarRatings
                  rating={user_info?.rankingAvg}
                  starDimension="15px"
                  starSpacing="15px"
                  starRatedColor="#ccc000"
                />
              )}
              <Text children={`member since: ${formatDate(user_info?.registered_since)}`}/>
              {isUserOwner && (<Text className={"address"} children={`#${user_info?.address?.number} ${user_info?.address?.street}, ${user_info?.address?.sector}, ${user_info?.address?.city}`}/>)}
            </>
          }
          button={<>{isUserOwner && (<Button callBack={() => dispatch(showEditInfoModal(true))}>Edit</Button>)}</>}
        />
      )}
      {user_info && (
        <>
          <Section
            title={"Professional info"}
            firstRowChildren={
              <>
                {user_info?.professions?.map((prof) => {
                  return (
                    <Tag key={prof.id} children={`${prof.name} - ${prof.price}`} />
                  );
                })}
              </>}
            button={<>{isUserOwner && (<Button callBack={() => dispatch(showEditProfessionsModal(true))}>Edit</Button>)}</>}    
          />
          <Section
            title={"Jobs & Feedback"}
            firstRowChildren={
                <>
                {jobs?.length > 0 && (
                  <JobFeedback defaultTab={"feedback"} jobs={jobs} />
                )}
                </>
              }
          />
        </>
      )}
      {editInfoModal && user_info && (
        <ModalLayout
          title={"Edit Info"}
          children={<EditInfoModal {...user_info} />}
          action={showEditInfoModal}
        />
      )}
      {editProfessionsModal && user_info && (
        <ModalLayout
          title={"Edit Professions"}
          children={
            <EditProfessionModal userProfessions={user_info?.professions} />
          }
          action={showEditProfessionsModal}
        />
      )}
      {jobsModal && (
        <ModalLayout
          title={"Update job"}
          children={<JobsModal />}
          action={showJobsModal}
        />
      )}
    </Container>
  );
}

export default Profile;
