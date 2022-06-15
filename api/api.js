const http = uni.$u.http

//注册
export const register = (params,config = {}) => http.post('/users/register',params,config)
//登录
export const login = (params,config = {}) => http.post('/users/login',params,config)
//获取已登录的用户信息
export const getUserInfo = (data) => http.get('/users/getUserInfo',{params:data,custom:{needToken:true}})
//获取主页推荐数据
export const getRecommend = (data) => http.get('/images/getRecommend',{params:data})
//根据图片栏目名字获取下的数据
export const getColumnDataByName = (data) => http.get('/images/getColumnDataByName',{params:data})
//根据图片类别名字获取数据
export const getImageByCategory = (data) => http.get('/images/getImageByCategory',{params:data})
//根据图片类别名字获取所有的标签名字
export const getAllTagListByCategory = (data) => http.get('/images/getAllTagListByCategory',{params:data})
//根据图片类别名字和标签名字获取下面的数据
export const getDataByTagAndCategory = (data) => http.get('/images/getDataByTagAndCategory',{params:data})
//获取某个类别下图片数据个数
export const getCategoryDataCount = (data) => http.get('/images/getCategoryDataCount',{params:data})
//根据id喜欢加一
export const updateLikeNumById = (data) => http.get('/images/updateLikeNumById',{params:data,custom:{needToken:true}})
//根据id查询用户喜欢的所有图片id
export const getLikeImageIdList = (data) => http.get('/images/getLikeImageIdList',{params:data,custom:{needToken:true}})
//随机获取五个图片类当栏目图片
export const getRanColumnImage = (data) => http.get('/images/getRanColumnImage',{params:data})
//根据文案栏目名字获取下的数据
export const getCharactersDataByColumn = (data) => http.get('/characters/getCharactersDataByColumn',{params:data})
//根据文案类别名字获取数据
export const getCharactersByCategory = (data) => http.get('/characters/getCharactersByCategory',{params:data})
//根据文案类别名字获取所有的标签名字
export const getCharactersAllTagByCategory = (data) => http.get('/characters/getCharactersAllTagByCategory',{params:data})
//根据文案类别名字获取所有的标签名字
export const getCharactersDataByTagAndCategory = (data) => http.get('/characters/getCharactersDataByTagAndCategory',{params:data})
//根据栏目获取里面的分类名字
export const getCategoryByColumn = (data) => http.get('/search/getCategoryByColumn',{params:data})
//根据栏目和用户输入关键字获取数据list
export const searchDateByColumnAndKeyword = (data) => http.get('/search/searchDateByColumnAndKeyword',{params:data})












