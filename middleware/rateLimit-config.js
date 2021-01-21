const rateLimit = require("express-rate-limit");

exports.sauceViewLimiter = rateLimit({
    windowMs: 2 * 60 * 60 * 1000,
    max: 200,
    message: "Too many requests, wait for a while before you try again."
});

exports.sauceActionLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 40,
    message: "Too many requests, wait for a while before you try again."
});

exports.sauceLikeLimiter = rateLimit({
    windowMs: 2 * 60 * 60 * 1000,
    max: 100,
    message: "Too many likes/dislikes"
});

exports.accessCreateAccountLimiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 5,
    message: "Too many attempts, wait for a while before you try again."
});