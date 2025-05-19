import http from "@/services/interceptor/interceptor"

export async function getBlogs(RowsOfPage:number,PageNumber:number) {
    const result=await http.get(`https://classapi.sepehracademy.ir/api/News?PageNumber=${PageNumber}&RowsOfPage=${RowsOfPage}`)


    return result
    
}

// add favorite news
export async function AddFavoriteBlogs(NewsId:string) {

    const res = await http.post(`/News/AddFavoriteNews?NewsId=${NewsId}`);

  return res;
    
}

// dashboard favorite news

export async function GetMyFavoriteNews() {


    const res = await http.get(`/SharePanel/GetMyFavoriteNews`);

    return res;
    
}

// get news by id

export async function GetBlogsById(articleId:string) {


    const res = await http.get(`/News/${articleId}`);

    return res;
    
}

// delete favorite news

export async function DeleteFavoriteNews(value) {
  
    console.log(value);
    const res=await http.delete(`/News/DeleteFavoriteNews`,{data:value});
  
    return res;
  }
