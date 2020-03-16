import("../pkg/index.js").catch(console.error).then(console.log("this thing happened")).then(results => {
    console.log(results.use_OSRng());
});
