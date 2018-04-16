import { ITask } from '../types/Task';
import config from '../config'
import getUrlQuery from './getUrlQuery';

const HOST = 'https://beta.todoist.com/API/v8';
const clientId = config.clientId;
const scope = 'data:read_write';
const notSoSecret = 'adfkjadlkfj';

class Todoist {
    static async getAccessToken(code: string) {

        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify({
                code
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const result = await fetch('https://us-central1-prioritymatrix-7e786.cloudfunctions.net/getAccessToken', options);
        if (result.status !== 200) {
            alert('ERROR');
        }

        const json = await result.json();
        console.assert(json.token_type === 'Bearer');
        window.localStorage.setItem('accessToken', json.access_token);
        window.location.href = config.self_host;

        return json.access_token;
    }

    static async revokeAccessToken(access_token: string) {
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify({
                access_token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const result = await fetch('https://us-central1-prioritymatrix-7e786.cloudfunctions.net/revokeAccessToken', options);
        if (result.status !== 200) {
            alert('ERROR');
        }

        const json = await result.json();
        return json.access_token; 
    }

    public isLoggedIn: boolean = false;
    private apitoken: string;
    constructor() {
        if (localStorage.accessToken) {
            this.apitoken = localStorage.accessToken;
            this.isLoggedIn = true;
            return this;
        }

        // check if code in url
        const query = getUrlQuery();
        if (query.code) {
            Todoist.getAccessToken(query.code);
        }
    }

    public async logIn() {
        window.location.href = `https://todoist.com/oauth/authorize?client_id=${clientId}&scope=${scope}&state=${notSoSecret}`;
    }
    
    public async logOut() {
        localStorage.removeItem('accessToken');
        await Todoist.revokeAccessToken(this.apitoken);
        window.location.href = config.self_host;
    }

    public async getTasks() {
        const result = await fetch(HOST + '/tasks', this.getDefaultOptions())
        if (result.status === 403) {
            this.logOut();
            return
        }
        return result.json();
    }

    public async updateTask(task: ITask): Promise<boolean> {
        const options = this.getDefaultOptions();
        options.method = 'POST';
        const data = {
            priority: task.priority
        }
        options.body = JSON.stringify(data);
        const target = HOST + '/tasks/' + task.id;
        const result = await fetch(target, options)
        if (result.status === 204 || result.status === 200) {
            return true
        }
        return false;
    }

    private getDefaultOptions(): RequestInit {
        return {
            headers: {
                Authorization: `Bearer ${this.apitoken}`,
                'Content-Type': 'application/json'
            }
        }
    }
}

export default Todoist