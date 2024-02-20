export const saveTechnicianProfessions = (id, data) => {
  let arr = [];
  let i = 0;
  let objArr = [];
  Object.entries(data).map((e) => {
    if (e[0].match(/profession_/i)) {
      arr.push(e);
    }
  });
  while (i < arr.length) {
    let obj = {
      user: id,
      profession: null,
      price: null,
    };
    arr.forEach((e) => {
      if(e[0] === `price_profession_${i}`){
        obj["price"] = parseInt(e[1]);
      }
      if(e[0] === `profession_${i}`){
        obj["profession"] = parseInt(e[1],10);
      }
    });
    //eslint-disable-next-line
    obj["price"] !== null && obj["profession"] !== null ? objArr.push(obj) : "";
    i++;
  }

  return objArr;
};
