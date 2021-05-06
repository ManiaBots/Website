module.exports = {
    images: {
        domains: ['cdn.discordapp.com']
    },
    future: {
        webpack5: true
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true
            }
        ]
    }
}