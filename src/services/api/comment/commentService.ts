import http from "@/services/interceptor/interceptor"

export async function GetMyComments() {


    const res = await http.get(`/SharePanel/GetMyCoursesComments`);

    return res;
    
}

export async function GetNewsComments() {

    const res=await http.get(`/SharePanel/GetMyNewsComments`);

    return res;
    
}