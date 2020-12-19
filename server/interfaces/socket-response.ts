import ConnectionContainer from './connection-container';

export default interface SocketResponse {
    type: string,
    data?:  {
        users?: ConnectionContainer,
        userActivity: string[],
        countValue?: number
    }
}