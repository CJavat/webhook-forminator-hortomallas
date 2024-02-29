"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daysToMilliseconds = void 0;
const daysToMilliseconds = (days) => {
    const daysToHours = days * 24;
    const hours = 60;
    const seconds = 60;
    const milliseconds = 1000;
    return ((daysToHours * hours) * seconds) * milliseconds;
};
exports.daysToMilliseconds = daysToMilliseconds;
