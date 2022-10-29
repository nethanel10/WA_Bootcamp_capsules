let tabel=document.querySelector('.tabel');
let titels=['id','FirstName','Last name','Age','Capsules','city','hobbey','gender'];

//*function that fetch the data and return promisses 
const fetchdata= async(url)=>{
try{
const res=await fetch(url)
const data=await res.json()
return data;
}
catch(e){
console.log(e)
}
}
//*funtction that recive the data from 2 groups and merge them to one array. 
//*and push the merge array and students details from api one  to new array 
async function getsutudents(){
let group1=await(fetchdata("https://capsules7.herokuapp.com/api/group/one"))
let group2=await(fetchdata("https://capsules7.herokuapp.com/api/group/two"))
 let merrgedata=[...group1,...group2]
// console.log(merrgedata)
let studentsdetails=[];
for(let i=0;i<merrgedata.length;i++){
    const student=fetchdata(`https://capsules7.herokuapp.com/api/user/${merrgedata[i].id}`)
studentsdetails.push(student)

}
const data=await Promise.all(studentsdetails)
console.log(data)
const sracturedata=structurestudentObj(merrgedata,studentsdetails)
// console.log(sracturedata);
return data
}

const structurestudentObj=(arr)=>{
    return arr.map((student)=>{
        return {
            id:student.id,
            firstname:student.firstName,
            lastname:student.lastName,


        }

    })
}

//*functions that display the data in the screen 
//* build tabel
//*paint the head of tabel
const headtabel=(text)=>{
const header=document.createElement('div')
header.textContent=text;
header.classList.add('title')
tabel.appendChild(header)
}
//*paint row in the tabel
const rowtabel=(arrofdata)=>{
    const row=document.createElement('div')
    row.classList.add('row')
    arrofdata.forEach(element=>{
const cell=document.createElement('div')
cell.classList.add('cell')
cell.textContent=element
row.appendChild(cell)

    });
    tabel.appendChild(row)
}
//* function that paint the page 
const paintpage=async()=>{
headtabel('')
rowtabel(titels)
const stddata=await getsutudents()
stddata.forEach((std)=>{
const newarr=[std.id,
    std.firstName,
    std.lastName,
    std.age,
    std.capsule,
    std.city,
    std.hobby,
    std.gender,
];
rowtabel(newarr)

})
}
paintpage()
