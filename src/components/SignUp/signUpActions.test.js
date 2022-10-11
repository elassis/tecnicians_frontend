import { saveTechnicianProfessions } from "./signUpActions";

test('', () => {
  const id = 1;
  const data = {
    cellphone: "8294368573",
    city: "2",
    email: "elassis@gmail.com",
    first_name: "enmanuel",
    identification: "01800735258",
    last_name: "lassis",
    number: "35",
    password: "rosa107",
    price_profession_0: "200",
    price_profession_1: "250",
    profession_0: "1",
    profession_1: "3",
    sector: "enriquillo",
    street: "secundino gomez",
  };
  const result = saveTechnicianProfessions(id, data);
  console.log(result);
})