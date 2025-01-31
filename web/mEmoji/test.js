let rand_next = 1;
const rand = () => {
    rand_next = rand_next * 1103515245 + 12345;
    return rand_next
}

console.log(rand())