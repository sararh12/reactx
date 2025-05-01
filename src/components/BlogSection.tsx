
import BlogPage from '@/pages/BlogPage';
import React from 'react';
import { Link } from 'react-router-dom';

 interface BlogPost {
   id: string;
  title: string;
  miniDescribe:string;
  currentImageAddressTumb: string | null;
  insertDate: string;
  addUserFullName: string;
  newCategoryName:string;
 }

const BlogSection: React.FC<{blogData:BlogPost[] | null }>=({blogData})=> {
  
  if(blogData===null  || blogData.length===0){
    return<div className='text-center py-16'>Loading blog posts or none available...</div>
  }

  const blogElements = blogData.map((post)=>(
    <div key={post.id} className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow direction-300 flex flex-col'>
      <Link to={`/blog/${post.id}`} className='black h-48 overflow-hidden'>
      <img
      src={post.currentImageAddressTumb || "/placeholder-image.jpg"}
      alt={post.title}
      className='w-full h-full object-cover'
      onError={(e)=>(e.currentTarget.src='/placeholder-image.jpg')}
      />
      </Link>
      <div className='p-6 flex flex-col flex-grow'>
        <div className='text-sm text-gray-500 mb-2'>
          {new Date(post.insertDate).toLocaleDateString('fa-IR')}
        </div>
      <Link to={`/blog/${post.id}`} className='block'>
        <h3 className='text-xl font-bold mb-3 hover:text-luko-teal transition-colors duration-300'>{post.title}</h3>
      </Link>
      <p className='text-gray-600 mb-4 flex-grow'>{post.miniDescribe}</p>
      <div className='text-sm text-gray-500 mt-auto pt-2'>
        نویسنده: {post.addUserFullName} | دسته بندی: {post.newCategoryName}
      </div>
      <Link to={`/blog/${post.id}`} className="text-luko-teal hover:underline font-medium inline-flex items-center">
                  مطالعه بیشتر
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
      </div>

    </div>
  ))


  return (
    <section className="py-16 rtl">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">اخبار و مقالات</h2>
        <div className="w-24 h-1 bg-luko-teal mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogElements}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/blog" className="bg-white border-2 border-luko-teal text-luko-teal hover:bg-luko-teal hover:text-white transition-colors duration-300 font-medium rounded-lg px-8 py-3">
            مشاهده تمام مقالات
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
