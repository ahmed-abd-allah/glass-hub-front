import axiosApi from "../axios"

export default {
  async uploadImage(Image) {



    return await axiosApi
      .post(`/resourses`, Image, { headers: {
        'Content-Type': 'multipart/form-data',
      } } )
      .then(res => {
        console.log(res.data.url + "this is data ")
        
        return res.data.url
      })
      .catch(e => {
        console.log(
          JSON.stringify(e.response?.data?.errors) + "this is an error ",
        )

        return e.response?.data?.errors
      })
  },
}