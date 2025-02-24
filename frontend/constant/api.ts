export const apiBaseURL = "http://localhost:8000/";

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
  },
};

export { endpoints, urls };
