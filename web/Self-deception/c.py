from Crypto.PublicKey import RSA
import base64

# Your JWK values
n_base64url = "l9EID7UIYqCsgvrfXK7N4ibGl2obtKH5Ox74N7U96iZsNOH3aByJy4Lqci_IXKz8YARnvo3R5lfNuXJNcf8QtvIA-7Fd4w5iHmKdYzpkLeRyOe1nOacQcUooVnRvmRtrOmsp3kGHR8oZnhsCqqvEjCugyekcwb4lS5KMmkzjlj1l4sw5h3NcgI18xvgeviRMzrbWFyxsFZ8NYlWVOL8n9ToH821RS5XnAnW8AbgeM_C5CfNs4XnH8HeIJiuERsKgwcXxKUggmi-VWJki9LRDIBuoLhlaTKpRAawenmfxk1C4DjqOjoVKmlTMAeGQb7cJE5AKwN-x2LyqBIFFkXhM3w"
e_base64url = "AQAB"

# Base64 URL decode
n = base64.urlsafe_b64decode(n_base64url + '==')
e = base64.urlsafe_b64decode(e_base64url + '==')

n = int.from_bytes(n, "big")   
e = int.from_bytes(e, "big")   
print(n, e)

publicKey = RSA.construct((n, e))
publicKeyPem = publicKey.exportKey() # export in X.509/SPKI format

with open("public.pem", "w") as f:
    f.write(publicKeyPem.decode('utf8'))
