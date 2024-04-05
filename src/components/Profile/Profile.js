import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData } from "../../apis/ApiActions";
import { FETCH_TECHNICIAN_DATA } from "../../apis/techniciansApi";
import { FETCH_USER_DATA } from "../../apis/usersApi";
import { Container } from "../../common/Layout/Container";
import { StyledBackButton, StyledSection } from "./ProfileStyles";
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

function Profile() {
  const params = useParams();
  const dispatch = useDispatch();
  const { tech } = useSelector((state) => state.technician);
  const { editInfoModal, editProfessionsModal, jobsModal } = useSelector(
    (state) => state.modals
  );
  const { user } = useSelector((state) => state);
  const isThereFeeback = (job) => job.status === "completed";
  const isUserOwner = isOwner(tech?.user_info?.user_id, user?.id)

  //TODO - REFACTOR THIS USER SHOULD BE FETCH FROM STATE
  async function getProfileData() {
    let url = null;

    if (Number(params.id) === user?.id && user?.type === "client") {
      url = FETCH_USER_DATA.replace("{email}", user?.email);
    } else {
      url = FETCH_TECHNICIAN_DATA.replace("{id}", params.id);
    }

    fetchData(url, dispatch, addTechnician);
  }

  useEffect(() => {
    getProfileData();
  }, [params.id, user]);

  const TitleProps = {
    weight: "700",
    size: "20px",
    className: "title",
  };

  return (
    <Container>
      <StyledBackButton>
        <Link url={"/home"} children={"Back"} />
      </StyledBackButton>
      <StyledSection display={true}>
        <div className="first-col">
          <Avatar />
        </div>
        <div className="second-col">
          <Text {...TitleProps} children={"Personal info"} />
          <Text
            className={"name"}
            weight={"700"}
            children={`${tech?.user_info?.first_name} ${tech?.user_info?.last_name}`}
          />
          {isUserOwner && (
            <Text className={"email"} children={`${tech?.user_info?.email}`} />
          )}
          {tech?.user_info?.type !== "client" && (
            <StarRatings
              rating={tech?.user_info?.rankingAvg}
              starDimension="15px"
              starSpacing="15px"
              starRatedColor="#ccc000"
            />
          )}
          <Text
            children={`member since: ${formatDate(
              tech?.user_info?.registered_since
            )}`}
          />
          {isUserOwner && (
            <Text
              className={"address"}
              children={`#${tech?.user_info?.address?.number} ${tech?.user_info?.address?.street}, ${tech?.user_info?.address?.sector}, ${tech?.user_info?.address?.city}`}
            />
          )}
        </div>
        <div className="third-col">
          {isUserOwner && (
            <Button callBack={() => dispatch(showEditInfoModal(true))}>
              Edit
            </Button>
          )}
        </div>
      </StyledSection>
      <StyledSection display={tech?.user_info?.type !== "client"}>
        <div className="first-col professional-col">
          <Text {...TitleProps} children={"Professional info"} />
          <div className="prof-tags">
            {tech?.user_info?.professions?.map((prof) => {
              return (
                <Tag key={prof.id} children={`${prof.name} - ${prof.price}`} />
              );
            })}
          </div>
        </div>
        {isUserOwner && (
          <Button callBack={() => dispatch(showEditProfessionsModal(true))}>
            Edit
          </Button>
        )}
      </StyledSection>
      <StyledSection display={tech?.user_info?.type !== "client"}>
        <div className="first-col feedback-col">
          <Text {...TitleProps} children={"Jobs & Feedback"} />
          {tech?.jobs?.length > 0 && (
            <JobFeedback defaultTab={"feedback"} jobs={tech.jobs} />
          )}
        </div>
      </StyledSection> 
      {editInfoModal && (
        <ModalLayout
          title={"Edit Info"}
          children={<EditInfoModal {...tech.user_info} />}
          action={showEditInfoModal}
        />
      )}
      {editProfessionsModal && (
        <ModalLayout
          title={"Edit Professions"}
          children={
            <EditProfessionModal
              userProfessions={tech?.user_info?.professions}
            />
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
