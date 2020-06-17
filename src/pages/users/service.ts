/*
 * @Author: Col0ring
 * @Date: 2020-06-08 21:02:07
 * @LastEditTime: 2020-06-10 21:16:30
 * @LastEditors: Col0ring
 * @FilePath: /src/pages/users/service.ts
 */

import request from '@/utils/request';
export function reqGetList() {
  return request('http://public-api-v1.aspirantzhang.com/users');
}

export function reqAddRecord(values: any) {
  return request(`http://public-api-v1.aspirantzhang.com/users`, {
    method: 'post',
    data: values,
  });
}
export function reqEditRecord(id: string | number, values: any) {
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'put',
    data: values,
  });
}

export function reqDeleteRecord(id: string | number) {
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
  });
}
