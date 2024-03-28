import React from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import Text from "../../../common/components/Text/Text";
import { ModalBackground, ModalBody } from "./ModalLayoutStyles";

const ModalLayout = (props) => {
  const { children, action, title } = props;
  const dispatch = useDispatch();
  
  return (
    <ModalBackground>
      <ModalBody>
        <div className="heading">
          <Text size={"20px"} weight={"700"}>
            {title || "Modal"}
          </Text>
          <Button
            callBack={() => {
              dispatch(action(false));
            }}
          >
            X
          </Button>
        </div>
        {children}
      </ModalBody>
    </ModalBackground>
  );
};

export default ModalLayout;
