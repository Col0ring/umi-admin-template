/*
 * @Author: Col0ring
 * @Date: 2020-06-10 22:14:48
 * @LastEditTime: 2020-06-10 22:18:44
 * @LastEditors: Col0ring
 * @FilePath: /src/pages/users/interface.ts
 */

export interface SingleUserType {
  id: string | number;
  name: string;
  email: string;
  create_time: string;
  update_time: string;
  status: number;
}
