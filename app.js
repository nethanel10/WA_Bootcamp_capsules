const BASE_URL = "https://capsules7.herokuapp.com/api";
const GET_USERS_URI = (page) => `${BASE_URL}/group/${page}`;
const GET_USER_URI = (id) => `${BASE_URL}/user/${id}`;

var isLoading = true;

const fetchData = async (uri, param) => {
  let res = await fetch(uri(param));
  res = await res.json();
  return res;
};

const generateData = async () => {
  const group1 = await fetchData(GET_USERS_URI, "one");
  const group2 = await fetchData(GET_USERS_URI, "two");
  const groupsMerge = [...group2, ...group1];
  let users = [];
  for (let i = 0; i < groupsMerge.length; i++) {
    const res = await fetchData(GET_USER_URI, groupsMerge[i].id);
    users.push(res);
  }
  if (users !== []) return users;
  return;
};

const appInit = async () => {
  //htmlize the last localstorage data
  let lastData = localStorage.getItem("users");
  if (lastData) {
    lastData = JSON.parse(lastData);
    mapTable(lastData)
  }
  //call generate data and store it in the local storage
  const users = await generateData();
  if (users) localStorage.setItem("users", JSON.stringify(users));
  console.log(users);
  //htmlize the updated data
  mapTable(users)

};

const mapTable = (users) => {
    var tbody = document.getElementById("tb")
    users.map(user => {
        let tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${user.name}</td>
        `
        co
    })
}
appInit();
