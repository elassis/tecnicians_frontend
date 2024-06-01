export const formatDate = (date) => {
  const formattedDate = new Date(date);
  return `${
    formattedDate.getMonth() + 1
  }/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;
};

export const addProfessionSelect = (dispatch, setSelectAmount) => {
  const defaultProfession = {
    id: 0,
    selectName: `profession_0`,
    selectValue: null,
    inputName: "price_profession_0",
    inputValue: null,
  };
  dispatch(setSelectAmount([defaultProfession]));
};

export const formatPayload = (id, data) => {
  let indexesArr = [],
    payloadArr = [];

  //add indexes to array
  Object.keys(data).map((e) => {
    let subArr = e.split("_");
    let index = subArr[subArr.length - 1];

    if (!indexesArr.includes(index)) {
      indexesArr.push(index);
    }
  });

  //add professions data object to payloadArr
  indexesArr.map((e) => {
    let subObject = {
      technician_id: id,
      profession_id: data[`profession_${e}`],
      price_hour: data[`price_profession_${e}`],
    };
    payloadArr.push(subObject);
  });

  return payloadArr;
};

export const isOwner = (refOne, refTwo) => refOne === refTwo;

export const defaultOption = { id: "default", name: "Select" };

export const ErrorsTypes = {
  wrongCredentials: "Oops! these credentials doesn't match our data, please try again.",
  duplicatedEntry: "Oops! there's a duplicated entry, please double check the identification and email fields."
}
