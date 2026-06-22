// import Button from 'react-bootstrap/Button';
// import axios from "axios"
// import { useEffect, useState } from "react"

// const Rddata = () => {
//     const [data, setData] = useState([])
//     const api = () => {
//         axios.get("http://localhost:8080/rduserdata") 
//             .then(res => {
//                 setData(res.data)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }

//     useEffect(() => {
//         api();
//     }, [])

//     return (
//         <>
//         <center> <h1>Rd User data </h1></center>
//         <table className="table table-dark">
//             <thead>
//                 <tr>
//                     <th scope="col">Rid</th>
//                     <th scope="col">Name</th>
//                     <th scope="col">Gender</th>
//                     <th scope="col">DOB</th>
//                     <th scope="col">Occupation</th>
//                     <th scope="col">Acno</th>
//                     <th scope="col">Adhar no</th>
//                      <th scope="col">PanNO</th>
//                     <th scope="col">Address</th>
//                     <th scope="col">RDamt</th>
//                     <th scope="col">RDdate</th>
//                      <th scope="col">Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {data.map((item) => {
//                     return(<tr>
//                         <td>{item.rid}</td>
//                         <td>{item.name}</td>
//                         <td>{item.gender}</td>
//                         <td>{item.dob}</td>
//                         <td>{item.occupation}</td>
//                         <td>{item.acno}</td>
//                         <td>{item.adharno}</td>
//                         <td>{item.panno}</td>
//                         <td>{item.addr}</td>
//                         <td>{item.rdamt}</td>
//                         <td>{item.rddate}</td>
//                        <td><Button variant="success">Update</Button>
//                         <Button variant="danger">Delete</Button></td>
//                     </tr>)
//                 })}
//             </tbody>
//         </table>
//         </>
//     );
// };
// export default Rddata;