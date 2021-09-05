/**
 * 获取指定 localStorage
 * @param {string} key 获取的 key 名 
 * @returns 返回获取到的数据
 */
export const getLocal = (key) => JSON.parse(localStorage.getItem(key))

/**
 * 存储指定 localStorage
 * @param {string} key 存储的 key 名
 * @param {string | object} data 要存储的数据
 */
export const setLocal = (key, data) => localStorage.setItem(key, JSON.stringify(data))

/**
 * 判断指定 LocalStorage 是否存在
 * @param {string} key 判断的 key 名 
 * @returns 返回是否存在的 boolean 值
 */
export const hasLocal = (key) => localStorage.hasOwnProperty(key)