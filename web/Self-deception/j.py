import base64, binascii
print(base64.urlsafe_b64encode(binascii.a2b_hex('398480b6588e85b5e73f90f1eca396f74f1453822b24dfb9b8fee38ad1375a83')).replace(b'=',b''))
