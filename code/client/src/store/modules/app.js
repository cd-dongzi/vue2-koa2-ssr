import axios from '../../utils/fetch'
const app = {
    state: {
        movieList: [],
        movieDetail: null
    },
    mutations: {
        MOVIELIST(state, list) {
            state.movieList = list
        },
        MOVIEDETAIL(state, info) {
            state.movieDetail = info
        }
    },
    actions: {
        getMovieList ({commit}) {
            return new Promise( (resolve, reject) => {
                axios.get('getMovieList')
                    .then( res => {
                        commit('MOVIELIST', res.data.subjects)
                        resolve(res)
                    }).catch(e =>{
                        reject(e)
                    })
            })
        },
        getMovieDetail ({commit}, id) {
            return new Promise( (resolve, reject) => {
                axios.get('getMovieDetail', { id })
                    .then( res => {
                        commit('MOVIEDETAIL', res.data)
                        resolve(res)
                    }).catch(e =>{
                        reject(e)
                    })
            })
        }
    }
}
export default app