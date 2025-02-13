<?php
function get_flag() {
    if($_SERVER["REMOTE_ADDR"] === "127.0.0.1" || $_SERVER["REMOTE_ADDR"] === "::1") {
        return "GoN{REDACTED}";
    } else {
        return "GoN{NOPE}";
    }
}

function get_hint() {
    return array_rand(
        array_flip(
            array(
                "Cheers!",
                "You can do it!",
                "I believe you!",
                "Ganabare~",
                "A little bit more...",
                "You already tired?",
                "ㅋ",
            )
        ), 1);
}
