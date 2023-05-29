import { createStore } from 'vuex'

export default createStore({
  state: {
    dataWeather: null,
    modal:false,
    citys: []
  },
  getters: {
    icoWeather(state){
      if (!!state.dataWeather) {
        return state.dataWeather.weather[0].icon
      }
    },

    city(state){
      if (!!state.dataWeather) {
        return state.dataWeather.name
      }
    },

    temp(state){
      if (!!state.dataWeather) {
        return Math.round(state.dataWeather.main.temp)
      }
    },

    descriptionWeather(state){
      if (!!state.dataWeather) {
        return state.dataWeather.weather[0].description
      }
    },

    tempFeelsLike(state){
      if (!!state.dataWeather) {
        return Math.round(state.dataWeather.main.feels_like)
      }
    },

    showModal(state){
      return state.modal
    }
  },
  mutations: {
    updateDataWeather(state, data){
      state.dataWeather = data
    },

    updateDataCitys(state, data){
      state.citys = data
    },

    closeModal(state){
      state.modal = false;
    },

    openModal(state){
      state.modal = true;
    }
  },
  actions: {
    async fetchDataWeather(ctx, city){

      city = (localStorage.getItem('city')) ? localStorage.getItem('city') : 
             (localStorage.getItem('cityGeolocation')) ? localStorage.getItem('cityGeolocation') : 'Москва';

      const apiKey = '7a28604d21ba9247aee5adb523184bc9'
      const res = await fetch (`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`)
      const resData = await res.json()
      ctx.commit('updateDataWeather', resData)
    }
  }
})
