import { ShrimpyApiClient, ShrimpyWsClient} from 'shrimpy-node';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

const shrimpyPublicKey = process.env.SHRIMPY_PUBLIC_API_KEY;
const shrimpyPrivateKey = process.env.SHRIMPY_PRIVATE_API_KEY;
let shrimpyApiClient = new ShrimpyApiClient(shrimpyPublicKey, shrimpyPrivateKey);

let errorHandler = (error) => { console.log(error) };

let handler = (msg) => { console.log(msg) };

const subscribeData  = {
    "type": "subscribe",
    "pair": "btc-usd",
    "exchange": "coinbasepro",
    "channel": "trade"
};

const unsubscribeData = {
    "type": "unsubscribe",
    "pair": "btc-usd",
    "exchange": "coinbasepro",
    "channel": "trade"
};

const connectWS = async( errorHandler, handler, subscribeData ) => {
    try {
        let token = await shrimpyApiClient.getToken();
        console.log(token);
        let client = new ShrimpyWsClient(errorHandler,token);
        client.connect();
        client.subscribe(subscribeData, handler);
    } catch (err) {
        console.log(err.message);
    }
};

connectWS(errorHandler, handler, subscribeData);