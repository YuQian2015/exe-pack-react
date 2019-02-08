// 引入action
import { FETCH_ANIME} from "./type";

// 导出一个方法，获取影片
// export function fetchAnime() {
//     // 里面再导出一个方法，接收dispatch, dispatch会将获取的数据传到reducer
//     return function (dispatch) {
//         fetch('https://ghibliapi.herokuapp.com/films')
//             .then(res => res.json())
//             .then(anime => dispatch({
//                 type: FETCH_ANIME,
//                 payload: anime
//             }));
//     }
// }

// 简写
export const fetchAnime = () => dispatch => {
    fetch('https://ghibliapi.herokuapp.com/films')
        .then(res => res.json())
        .then(anime => dispatch({
            type: FETCH_ANIME,
            payload: anime
        }))
}

