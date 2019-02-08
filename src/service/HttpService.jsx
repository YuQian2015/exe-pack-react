
import LocalDB from 'local-db';
const userCollection = new LocalDB('user');

class HttpService {
    Authorization: "";
    constructor() {
        this.getUserToekn();
    }

    getUserToekn() {
        const user = userCollection.query({});
        if (user.length) {
            this.Authorization = user[0].token;
        }
    }

    getQueryString(params) {
        let query = [];
        for (let key in params) {
            query.push(key + "=" + params[key]);
        }
        return query.join("&");
    }

    get(url, params) {
        this.getUserToekn();
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            const query = this.getQueryString(params);
            if (query) {
                url += "?" + query;
            }
            request.open("GET", url, true);
            request.withCredentials = true;
            if (this.Authorization) {
                request.setRequestHeader("Authorization", this.Authorization);
            }
            request.send();
            request.onreadystatechange = () => {
                if (request.readyState == 4) {
                    const status = request.status;
                    if (status >= 200 && status < 300) {
                        try {
                            const res = JSON.parse(request.responseText);
                            this.Authorization = request.getResponseHeader("Authorization");
                            if(this.Authorization) {
                                userCollection.drop();
                                userCollection.insert({
                                    time: new Date().getTime(),
                                    token: this.Authorization
                                });
                            }
                            resolve(res);
                        } catch (e) {
                            console.error(e);
                        }
                        return
                    }
                    if (status == 403) {
                        window.location.replace("#/sign-in");
                        userCollection.drop();
                        reject()
                        return
                    }
                    if (status == 400) {
                        console.log();
                        reject(error)
                    }
                }
            };
        });
    }

    post(url, params) {

        this.getUserToekn();
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.onreadystatechange = () => {
                if (request.readyState == 4) {
                    const status = request.status;
                    if (status >= 200 && status < 300) {
                        const res = JSON.parse(request.responseText);
                        this.Authorization = request.getResponseHeader("Authorization");
                        if(this.Authorization) {
                            userCollection.drop();
                            userCollection.insert({
                                time: new Date().getTime(),
                                token: this.Authorization
                            });
                        }
                        resolve(res);
                        return
                    }
                    if (status == 403) {
                        window.location.replace("#/sign-in");
                        userCollection.drop();
                        reject();
                        return
                    }
                    if (status == 400) {
                        reject();
                        console.log(error);
                    }
                }
            };
            request.open("POST", url, true);
            //request.withCredentials = true;
            request.setRequestHeader("Content-Type", "application/json");
            if (this.Authorization) {
                request.setRequestHeader("Authorization", this.Authorization);
            }

            request.send(JSON.stringify(params));
        });
    }
}

let HTTP = new HttpService();

export default HTTP
