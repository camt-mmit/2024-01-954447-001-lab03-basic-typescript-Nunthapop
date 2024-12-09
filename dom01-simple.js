"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const number1 = [
        ...document.querySelectorAll("input[type='number'].app-elem-input"),
    ];
    const ComPutResult = () => {
        const result = number1.reduce((result, number1) => {
            return result + number1.valueAsNumber;
        }, 0); //บวกกันไปเรื่อยๆ
        console.debug(number1, result);
        const output = document.querySelector("output.app-elem-result");
        if (output !== null) {
            output.value = `${result}`;
        }
        else {
            console.error("output not found");
        }
    };
    number1.forEach((number1) => {
        number1.addEventListener("change", ComPutResult);
    });
    ComPutResult();
});
