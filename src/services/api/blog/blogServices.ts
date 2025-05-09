import axios from "axios";

export async function getBlogs(RowsOfPage:number,PageNumber:number) {
    const result=await axios.get(`https://classapi.sepehracademy.ir/api/News?PageNumber=${PageNumber}&RowsOfPage=${RowsOfPage}`)


    return result
    
}