import {connection as Connection} from 'websocket';


export default interface ConnectionContainer {
    [key: string]: Connection
}
