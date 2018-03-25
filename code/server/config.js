
const devConfig = {
    app: {
        env: 'development',
        port: '3000',
        host: 'http://localhost:3000/',
    }
}

const prodConfig = {
    app: {
        env: 'production',
        port: '3000',
        host: 'http://localhost:3000/'
    }
}
export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig