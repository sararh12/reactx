import axios from "axios";

export async function getTopCourse(Count:string) {
    const result=await axios.get(`https://classapi.sepehracademy.ir/api/Home/GetCoursesTop?Count=${Count}`)

    return result
    
}