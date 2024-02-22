export async function getSkills(id, http, dispatch, skillsArr,addSkills) {
  await http
    .get(`/api/tp/${id}`)
    .then((response) => {
      if (response.status === 200 && response.data.length > 0) {
        skillsArr = [];
        response.data.map((tech) => skillsArr.push(tech));
        dispatch(addSkills(skillsArr));
      }
    })
    .catch((error) => console.log(error));
}

