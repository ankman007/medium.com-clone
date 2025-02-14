const apiBaseURL = "http://localhost:8000/";

const endpoints = {
  health: "/health",
  auth: {
    register: "/user/register",
    login: "/user/login",
    changePassword: "/user/change-password",
    profile: "/user/profile",
    sendResetPasswordLinkToEmail: "/user/send-password-email",
    resetPassword: (userId: string, token: string) => `/user/reset-password/${userId}/${token}`,
    logout: "/user/logout",
  },
  posts: {
    getAllArticles: () => "/articles",
    createArticle: () => "/articles/create",
    getArticleDetail: (articleId: string) => `/articles/${articleId}`,
    updateArticle: (articleId: string) => `/articles/${articleId}`,
    deleteArticle: (articleId: string) => `/articles/${articleId}`,

    // getUserArticles: (userId: string) => `/posts/students/${userId}`,
    // addMedia: (postId: string) => `/posts/${postId}/medias`,
    // updateMedia: (postId: string, mediaLinkId: string) =>
    //   `/posts/${postId}/medias/${mediaLinkId}`,
    // deleteMedia: (postId: string, mediaLinkId: string) =>
    //   `/posts/${postId}/medias/${mediaLinkId}`,

    // comments: {
    //   getAllComments: (postId: string, rest: object) => {
    //     const queryString = buildQueryString(rest);
    //     return `/posts/${postId}/comments${queryString ? `?${queryString}` : ""}`;
    //   },
    //   createComment: (postId: string) => `/posts/${postId}/comments`,
    //   updateComment: (postId: string, commentId: string) =>
    //     `/posts/${postId}/comments/${commentId}`,
    //   deleteComment: (postId: string, commentId: string) =>
    //     `/posts/${postId}/comments/${commentId}`,
    // },
  },
};

const urls = {
  base: apiBaseURL,
  health: apiBaseURL + endpoints.health,
  auth: {
    login: apiBaseURL + endpoints.auth.login,
    register: apiBaseURL + endpoints.auth.register,
    profile: apiBaseURL + endpoints.auth.profile,
    resetPassword: endpoints.auth.resetPassword, 
    sendResetPasswordLinkToEmail: apiBaseURL + endpoints.auth.sendResetPasswordLinkToEmail,
  },
  posts: {
    getAllArticles: () => apiBaseURL + endpoints.posts.getAllArticles(),
    createArticle: () => apiBaseURL + endpoints.posts.createArticle(),
    getArticleDetail: (articleId: string) => apiBaseURL + endpoints.posts.getArticleDetail(articleId),
    updateArticle: (articleId: string) => apiBaseURL + endpoints.posts.updateArticle(articleId),
    deleteArticle: (articleId: string) => apiBaseURL + endpoints.posts.deleteArticle(articleId),
    
    // getUserArticles: (userId: string) => apiBaseURL + endpoints.posts.getUserArticles(userId),
    // comments: {
    //   getAllComments: (postId: string, rest: object) =>
    //     apiBaseURL + endpoints.posts.comments.getAllComments(postId, rest),
    //   createComment: (postId: string) => apiBaseURL + endpoints.posts.comments.createComment(postId),
    // },
  },
};

export { endpoints, urls };
