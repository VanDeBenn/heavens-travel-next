import { http } from "#/utils/http";

const url = {
  blogs: () => "/blogs",
  blog: (id: string) => `/blogs/${id}`,
};

const api = {
  create(data: any) {
    return http.post(url.blogs()).send(data);
  },
  getBlogs() {
    return http.fetcher(url.blogs());
  },
  getBlog(id: string) {
    return http.fetcher(url.blog(id));
  },
  updateBlog(id: string, data: any) {
    return http.put(url.blog(id)).send(data);
  },
  deleteBlog(id: string) {
    return http.del(url.blog(id));
  },
};

export const blogRepository = {
  url,
  api,
};
