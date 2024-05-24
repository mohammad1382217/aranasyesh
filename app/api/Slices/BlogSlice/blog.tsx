export const initialBlog: BlogState = {
  blogs: { previous: null, page: 1, next: null, results: [] },
  blogPost: {
    title: "",
    body: "",
    created: "",
    cover: "",
    meta_title: "",
    meta_description: "",
  },
  error: null,
};

export const BlogReducer = (state: BlogState, action: Action): BlogState => {
  switch (action.type) {
    case "FETCH_SUCCESS_blogs":
      return {
        ...state,
        blogs: action.payload,
      };
    case "FETCH_SUCCESS_blogPost":
      return {
        ...state,
        blogPost: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Types

export interface main {
  image: string;
}
export interface side {
  image: string;
  link: string;
}
export interface CardBlog {
  id: number;
  title: string;
  body: any;
  created: string;
  cover: string;
  meta_title: string;
  meta_description: string;
}

export interface BlogState {
  blogs: blogs;
  blogPost: blogPost;
  error: any;
}
export interface blogs {
  previous: string | null;
  page: number;
  next: string | null;
  results: Array<CardBlog>;
}
export interface blogPost {
  title: string;
  body: any;
  created: string;
  cover: string;
  meta_title: string;
  meta_description: string;
}
export interface Action {
  type: string;
  payload?: any;
}
