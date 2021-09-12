//checks for browser service worker support
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker.js')
    .then((object) => {
        console.log('Registered service worker succesfully!', object)
    }).catch((err) => {
        console.log('Failed to register service worker', err)
    })
}