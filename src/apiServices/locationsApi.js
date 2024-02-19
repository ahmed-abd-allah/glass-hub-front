import axiosApi from "../axios";

const handleSuccess = (res) => {
  console.log(res + "this is data ");
  return res;
};

const handleFailure = (e) => {
  console.log(JSON.stringify(e.response?.data?.errors) + "this is an error ");
  return e.response?.data?.errors;
};

export default {
  async getLocations() {
    try {
      const response = await axiosApi.get(`/location`);
      return handleSuccess(response);
    } catch (error) {
      return handleFailure(error);
    }
  },

  async createLocation(location) {
    try {
      const response = await axiosApi.post(`/location`, location);
      return handleSuccess(response);
    } catch (error) {
      return handleFailure(error);
    }
  },
};
