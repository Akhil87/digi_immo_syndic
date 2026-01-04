import axios from "axios";
import { base_url } from "../base_url";

export const login = async (email, password) => {
  const encodedCredentials = btoa("Pearl:PearlProdChecker@12390");
  const formdata = new FormData();
  formdata.append("userName", email);
  formdata.append("password", password);
  try {
    const res = await axios.post(`${base_url}/admin/login`, formdata, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "multipart/form-data"
      }
    });
    return { status: res.status, data: res.data };
  } catch (error) {
    console.log(error);

    return error;
  }
};
